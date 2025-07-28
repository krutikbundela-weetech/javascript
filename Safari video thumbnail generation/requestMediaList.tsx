import {
  Box,
  Grid,
  IconButton,
  Typography,
  LinearProgress,
} from '@mui/material';
import closeIconWhite from '../../assets/images/closeIconWhite.svg';
import closeIconBlack from '../../assets/images/BlackClose.svg';
import BlueDoc from '../../assets/images/BlueDoc.svg';
import imageThumb from '../../assets/images/imageThumb.svg';
import videoSvg from '../../assets/images/thumb.svg';
import PlayIcon from '../../assets/images/playVideo.svg';
import { useCallback, useMemo, useState, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface MediaItem {
  blobUrl: string;
  file: File;
  mediaType: string;
  mediaSize: string;
  id: string;
  uploadStatus?: 'pending' | 'uploading' | 'completed' | 'error';
  uploadProgress?: number;
  isValid?: boolean;
  validationError?: string | null;
}

interface RequestMediaListProps {
  mediaList: MediaItem[];
  setMediaList: (
    mediaList: MediaItem[] | ((prev: MediaItem[]) => MediaItem[]),
  ) => void;
  uploadFiles?: Array<{
    name: string;
    size: number;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    error?: string;
  }>;
  setOfflineModal;
  isUploading?: boolean;
}

function UploadProgress({ progress }: { progress: number }) {
  return (
    <Box
      className="position-absolute"
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        height: '108px',
        backgroundColor: 'rgba(12, 99, 202,0.4)',
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '100%',
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'var(--blue)',
            opacity: '0.8',
          },
        }}
      />
    </Box>
  );
}

const VideoPreview = memo(
  ({
    file,
    showProgressBar,
    progress,
  }: {
    file: File;
    showProgressBar: boolean;
    progress: number;
  }) => {
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoUrlRef = useRef<string | null>(null);

    // Helper function to detect Safari
    const isSafari = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('chromium');
    };

    useEffect(() => {
      const generateThumbnail = async () => {
        try {
          setIsLoading(true);
          setError(false);

          // Create video URL if not exists
          if (!videoUrlRef.current) {
            videoUrlRef.current = URL.createObjectURL(file);
          }

          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (!video || !canvas) return;

          video.src = videoUrlRef.current;
          video.muted = true;
          video.preload = 'metadata';
          video.playsInline = true; // Important for Safari

          let hasDrawn = false;
          let retryCount = 0;
          const maxRetries = isSafari() ? 3 : 1;

          const handleLoadedMetadata = () => {
            // Seek to 10% of video duration or 1 second, whichever is smaller
            const seekTime = Math.min(video.duration * 0.1, 1);
            video.currentTime = seekTime;
          };

          const drawThumbnail = () => {
            if (hasDrawn) return;

            try {
              const ctx = canvas.getContext('2d');
              if (!ctx || video.videoWidth <= 0 || video.videoHeight <= 0) return;

              // Set canvas dimensions to match video
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              // Safari workaround: Draw twice to ensure frame is captured
              if (isSafari()) {
                // First draw (may be black in Safari)
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Small delay then draw again for Safari
                setTimeout(() => {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  
                  // Check if canvas is black (Safari bug indicator)
                  const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 10), Math.min(canvas.height, 10));
                  const isBlack = imageData.data.every((value, index) => index % 4 === 3 || value < 10);
                  
                  if (isBlack && retryCount < maxRetries) {
                    retryCount++;
                    // Retry by seeking to a slightly different time
                    video.currentTime = Math.min(video.duration * (0.1 + retryCount * 0.05), video.duration * 0.5);
                    return;
                  }
                  
                  hasDrawn = true;
                  // Convert canvas to blob and create thumbnail URL
                  canvas.toBlob(
                    (blob) => {
                      if (blob) {
                        const thumbnailUrl = URL.createObjectURL(blob);
                        setThumbnail(thumbnailUrl);
                        setIsLoading(false);
                      } else {
                        setError(true);
                        setIsLoading(false);
                      }
                    },
                    'image/jpeg',
                    0.8,
                  );
                }, 100);
              } else {
                // Non-Safari browsers
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                hasDrawn = true;
                
                // Convert canvas to blob and create thumbnail URL
                canvas.toBlob(
                  (blob) => {
                    if (blob) {
                      const thumbnailUrl = URL.createObjectURL(blob);
                      setThumbnail(thumbnailUrl);
                      setIsLoading(false);
                    } else {
                      setError(true);
                      setIsLoading(false);
                    }
                  },
                  'image/jpeg',
                  0.8,
                );
              }
            } catch (err) {
              console.error('Error generating thumbnail:', err);
              setError(true);
              setIsLoading(false);
            }
          };

          const handleSeeked = drawThumbnail;

          const handleError = () => {
            setError(true);
            setIsLoading(false);
          };

          // Add event listeners
          video.addEventListener('loadedmetadata', handleLoadedMetadata);
          video.addEventListener('seeked', handleSeeked);
          video.addEventListener('error', handleError);

          // Safari-specific: Also try on canplay event as backup
          if (isSafari()) {
            video.addEventListener('canplay', () => {
              if (!hasDrawn) {
                setTimeout(drawThumbnail, 200);
              }
            });
          }

          // Cleanup function
          return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('seeked', handleSeeked);
            video.removeEventListener('error', handleError);
            if (isSafari()) {
              video.removeEventListener('canplay', drawThumbnail);
            }
          };
        } catch (err) {
          console.error('Error in generateThumbnail:', err);
          setError(true);
          setIsLoading(false);
        }
      };

      generateThumbnail();
    }, [file]);

    // Cleanup URLs on unmount
    useEffect(() => {
      return () => {
        if (videoUrlRef.current) {
          URL.revokeObjectURL(videoUrlRef.current);
        }
        if (thumbnail) {
          URL.revokeObjectURL(thumbnail);
        }
      };
    }, [thumbnail]);

    return (
      <Box className="position-relative w-100 h-100">
        {/* Hidden video and canvas elements for thumbnail generation */}
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          crossOrigin="anonymous"
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Display content */}
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Loading...
            </Typography>
          </Box>
        ) : error || !thumbnail ? (
          <img
            src={videoSvg}
            alt="video thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <img
            src={thumbnail}
            alt="video thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}

        {/* Play button overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <img src={PlayIcon} alt="play" style={{ width: '48px' }} />
        </Box>

        {/* Upload progress */}
        {showProgressBar && <UploadProgress progress={progress} />}
      </Box>
    );
  },
);

const MediaItemComponent = memo(
  ({
    item,
    uploadStatus,
    onRemove,
    isUploading,
  }: {
    item: MediaItem;
    uploadStatus: { status: string; progress: number };
    onRemove: () => void;
    isUploading: boolean;
  }) => {
    const [imgError, setImgError] = useState(false);
    const showProgressBar =
      isUploading &&
      uploadStatus.status !== 'none' &&
      uploadStatus.status !== 'completed';
    const isInvalid = item.isValid === false;

    const getValidationErrorMessage = useCallback((error: string | null) => {
      if (!error) return '';
      if (error.includes('File size exceeds')) return 'File size exceeds limit';
      if (error.includes('Unsupported file type')) {
        return 'Unsupported file type';
      }
      if (error.includes('empty or corrupted')) {
        return 'File is empty or corrupted';
      }
      return 'Invalid file';
    }, []);

    return (
      <Grid item xs={6} sm={3} md={1.97}>
        <Box
          className="rounded overflow-hidden bg-lightgray position-relative"
          height={108}
          sx={{
            border: isInvalid ? '2px solid var(--errorColor)' : 'none',
            opacity: isInvalid ? 0.7 : 1,
            mx: 'auto',
          }}
        >
          {/* Image handling */}
          {item.file.type.startsWith('image/') ||
          item.file.name.toLowerCase().endsWith('.heic') ||
          item.file.name.toLowerCase().endsWith('.heif') ? (
            <Box className="position-relative w-100 h-100">
              {item.file.type.startsWith('image/') ? (
                imgError ? (
                  <img
                    src={imageThumb}
                    alt="message-image"
                    className="bg-blueGradient object-fit-cover"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={item.blobUrl || URL.createObjectURL(item.file)}
                    alt={`media-${item.id}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={() => setImgError(true)}
                  />
                )
              ) : (
                <img
                  src={imageThumb}
                  alt={`media-${item.id}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {showProgressBar && (
                <UploadProgress progress={uploadStatus.progress} />
              )}
            </Box>
          ) : item.file.type.startsWith('video/') ? (
            /* Video handling with native thumbnail generation */
            <VideoPreview
              file={item.file}
              showProgressBar={showProgressBar}
              progress={uploadStatus.progress}
            />
          ) : (
            /* Document handling */
            <Box className="d-flex flex-column align-items-center justify-content-center h-100 p-2">
              <img
                src={BlueDoc}
                alt="document"
                style={{ width: '40px', height: '40px', marginBottom: '4px' }}
              />
              <Typography
                className="text-center color-blue fs-10 text-trim w-100"
                sx={{ paddingX: '10px', marginBottom: '2px' }}
              >
                {item.file.name}
              </Typography>
              {showProgressBar && (
                <UploadProgress progress={uploadStatus.progress} />
              )}
            </Box>
          )}

          {/* Remove button */}
          <IconButton
            className="bg-transparent position-absolute"
            sx={{
              display: isUploading ? 'none' : 'inline-flex',
              top: '-6px',
              right: '-6px',
              color:
                item.file.type.startsWith('image/') ||
                item.file.type.startsWith('video/')
                  ? 'var(--white)'
                  : 'var(--blue)',
            }}
            disableRipple
            onClick={onRemove}
            disabled={isUploading}
          >
            <img
              src={
                item.file.type.startsWith('image/') ||
                item.file.type.startsWith('video/')
                  ? closeIconWhite
                  : closeIconBlack
              }
              alt="closeIcon"
              style={{ borderRadius: '10px', opacity: isUploading ? 0.5 : 1 }}
            />
          </IconButton>

          {/* Error message for invalid files */}
          {isInvalid && item.validationError && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#ffebee',
                borderTop: '1px solid var(--errorColor)',
                padding: '2px 4px',
                zIndex: 10,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: '9px',
                  color: 'var(--errorColor)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  display: 'block',
                  lineHeight: '10px',
                }}
              >
                {getValidationErrorMessage(item.validationError)}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    );
  },
);

function RequestMediaList({
  setOfflineModal,
  mediaList,
  setMediaList,
  uploadFiles = [],
  isUploading = false,
}: RequestMediaListProps) {
  const handleRemove = useCallback(
    (indexToRemove: number) => {
      setMediaList((prev) => {
        const newList = [...prev];
        const [removedItem] = newList.splice(indexToRemove, 1);
        if (removedItem.blobUrl) {
          URL.revokeObjectURL(removedItem.blobUrl);
        }
        return newList;
      });
    },
    [setMediaList],
  );
  const { isOnline } = useSelector((state: RootState) => state.networkStatus);

  const getUploadStatus = useCallback(
    (index: number) => {
      if (!isUploading || !uploadFiles[index]) {
        return { status: 'none', progress: 0 };
      }
      return {
        status: uploadFiles[index].status,
        progress: uploadFiles[index].progress,
      };
    },
    [isUploading, uploadFiles],
  );

  const mediaItems = useMemo(
    () =>
      mediaList.map((item, index) => ({
        item,
        uploadStatus: getUploadStatus(index),
      })),
    [mediaList, getUploadStatus],
  );

  return (
    <Grid
      container
      spacing={2.5}
      margin={{
        md: '4px 0px 0px 10px',
        sm: '4px 0px 0 -20px',
        xs: '4px auto 0',
      }}
      maxWidth={{ sm: '780px', xs: '256px' }}
      className="flex-wrap justify-content-start position-relative"
      left={{ sm: '0', xs: '-10px' }}
    >
      {mediaItems.map(({ item, uploadStatus }, index) => (
        <MediaItemComponent
          key={item.id}
          item={item}
          uploadStatus={uploadStatus}
          onRemove={() => {
            setOfflineModal(!isOnline);
            if (isOnline) {
              handleRemove(index);
            }
          }}
          isUploading={isUploading}
        />
      ))}
    </Grid>
  );
}

export default memo(RequestMediaList);