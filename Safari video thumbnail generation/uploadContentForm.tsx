/* eslint-disable no-plusplus */
import { useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import textConfiguration from '../../utils/testConfig/textConfig';
import MediaSaveMessageModal from '../webApp/contentLibrary/mediaSaveMessageModal';
import MediaSaveModal from '../webApp/contentLibrary/mediaSaveModal';
import Header from '../commonComponent/header';
import RequestMediaList from './requestMediaList';
import dayjs from 'dayjs';
import { handleAsyncThunk } from '../../api/service';
import { MessageMediaType } from '../../enum';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { uploadMedia } from '../../utils/service';
import { validateUploadFile, getFileSizeLimits } from './uploadContentService';
import { toast } from 'react-toastify';
import {
  CONTENT_LIBRARY_MESSAGES,
  supportedFileFormats,
  supportedVideoFormats,
  supportedDocumentFormats,
  CONTENT_LIBRARY_MAX_UPLOAD_COUNT,
  CONTENT_LIBRARY_THUMBNAIL_QUALITY,
} from '../../utils/const';
import { getTimezoneObjectById } from '../../utils/dateTime/timezone';
import OfflineModal from '../../commonComponent/OfflineModal';
import Loader from '../../commonComponent/loader';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface RequestData {
  id: string;
  name: string;
  expiryDate: string | Date;
  timezone: string;
  description?: string;
}

interface UploadContentFormProps {
  requestData: RequestData;
}

function SizeLimitText() {
  return (
    <Typography className="color-gray3 fs-12 mw-medium" mt={1}>
      {CONTENT_LIBRARY_MESSAGES.IMAGE_FILE_SPECS.replace(
        '{size}',
        getFileSizeLimits().image,
      )}{' '}
      <br />
      {CONTENT_LIBRARY_MESSAGES.VIDEO_FILE_SPECS.replace(
        '{size}',
        getFileSizeLimits().video,
      )}
      <br />
      {CONTENT_LIBRARY_MESSAGES.DOC_FILE_SPECS.replace(
        '{size}',
        getFileSizeLimits().document,
      )}
    </Typography>
  );
}

function UploadContentForm({ requestData }: UploadContentFormProps) {
  const { userResponse } = useSelector((state: RootState) => state.user);
  const { isOnline } = useSelector((state: RootState) => state.networkStatus);
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);
  const [isMediaSaveModalOpen, setIsMediaSaveModalOpen] = useState(false);
  const [selectedMediaList, setSelectedMediaList] = useState<any[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [isMediaSaveSuccessfully, setIsMediaSaveSuccessfully] = useState<
    boolean | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<
    Array<{
      name: string;
      size: number;
      progress: number;
      status: 'pending' | 'uploading' | 'completed' | 'error';
      error?: string;
    }>
  >([]);
  const [discardedInvalidCount, setDiscardedInvalidCount] = useState(0);
  const [showDiscardError, setShowDiscardError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to detect Safari
  const isSafari = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('chromium');
  };

  async function generateVideoThumbnail(videoFile: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let hasDrawn = false;
      let retryCount = 0;
      const maxRetries = isSafari() ? 3 : 1;

      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true; // Important for Safari
      video.src = URL.createObjectURL(videoFile);

      const cleanup = () => {
        URL.revokeObjectURL(video.src);
      };

      const drawThumbnail = () => {
        if (hasDrawn || !ctx || video.videoWidth <= 0 || video.videoHeight <= 0) {
          return;
        }

        const thumbnailWidth = Math.floor(
          video.videoWidth * CONTENT_LIBRARY_THUMBNAIL_QUALITY,
        );
        const thumbnailHeight = Math.floor(
          video.videoHeight * CONTENT_LIBRARY_THUMBNAIL_QUALITY,
        );
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;

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
            canvas.toBlob(
              (blob) => {
                cleanup();
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error('Failed to create thumbnail blob'));
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
          canvas.toBlob(
            (blob) => {
              cleanup();
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create thumbnail blob'));
              }
            },
            'image/jpeg',
            0.8,
          );
        }
      };

      video.addEventListener('loadedmetadata', () => {
        // Seek to 10% of the video duration or 1 second, whichever is smaller
        video.currentTime = Math.min(video.duration * 0.1, 1);
      });

      video.addEventListener('seeked', drawThumbnail);

      // Safari-specific: Also try on canplay event as backup
      if (isSafari()) {
        video.addEventListener('canplay', () => {
          if (!hasDrawn) {
            setTimeout(drawThumbnail, 200);
          }
        });
      }

      video.addEventListener('error', (e) => {
        cleanup();
        reject(
          new Error(
            `Error processing video: ${(e as any).message || 'Unknown error'}`,
          ),
        );
      });

      // Increased timeout for Safari
      setTimeout(() => {
        cleanup();
        reject(new Error('Video thumbnail generation timeout'));
      }, isSafari() ? 15000 : 10000);
    });
  }

  async function generateImageThumbnail(imageFile: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        if (ctx) {
          // Calculate thumbnail size (10% of original)
          const thumbnailWidth = Math.floor(
            img.width * CONTENT_LIBRARY_THUMBNAIL_QUALITY,
          );
          const thumbnailHeight = Math.floor(
            img.height * CONTENT_LIBRARY_THUMBNAIL_QUALITY,
          );

          canvas.width = thumbnailWidth;
          canvas.height = thumbnailHeight;

          ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create thumbnail blob'));
              }
            },
            'image/jpeg',
            1,
            // quality control 1 for 100% of generated thumbnail
          );
        }
      };

      img.onerror = () => {
        reject(new Error('Error processing image'));
      };

      img.src = URL.createObjectURL(imageFile);
    });
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    skipDuplicateCheck = false,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsProcessingFiles(true);
      try {
        const files = Array.from(event.target.files);
        const prevFiles = selectedMediaList.map((item) => item.file.name);
        const validFiles = [];
        let discardedCount = 0;

        const maxSelectable =
          CONTENT_LIBRARY_MAX_UPLOAD_COUNT - selectedMediaList.length;
        let addedCount = 0;

        for (let i = 0; i < files.length; i++) {
          if (addedCount >= maxSelectable) {
            discardedCount += files.length - i;
            break;
          }

          const file = files[i];
          let shouldAdd = true;

          // Check for duplicates
          if (
            !skipDuplicateCheck &&
            (prevFiles.includes(file.name) ||
              validFiles.some((f) => f.file.name === file.name))
          ) {
            shouldAdd = false;
          }

          // Handle HEIC/HEIF files
          const fileNameLower = file.name.toLowerCase();
          const isHeicOrHeif =
            fileNameLower.endsWith('.heic') || fileNameLower.endsWith('.heif');

          if (shouldAdd && isHeicOrHeif) {
            validFiles.push({
              file,
              mediaType: 'image',
              mediaSize: file.size.toString(),
              id: `${file.name}-${Date.now()}`,
              isValid: true,
              validationError: null,
              blobUrl: URL.createObjectURL(file),
            });
            addedCount++;
            shouldAdd = false;
          }

          // Check file types
          const isImage = supportedFileFormats.includes(file.type);
          const isVideo = supportedVideoFormats.includes(file.type);
          const isDocument = supportedDocumentFormats.includes(file.type);

          if (shouldAdd && !isImage && !isVideo && !isDocument) {
            discardedCount++;
            shouldAdd = false;
          }

          // Validate file
          const validation = validateUploadFile(file);
          if (shouldAdd && !validation.isValid) {
            discardedCount++;
            shouldAdd = false;
          }

          if (shouldAdd) {
            validFiles.push({
              file,
              mediaType: isVideo ? 'video' : isImage ? 'image' : 'document',
              mediaSize: file.size.toString(),
              id: `${file.name}-${Date.now()}`,
              isValid: true,
              validationError: null,
              blobUrl: URL.createObjectURL(file),
            });
            addedCount++;
          }
        }
        await new Promise((resolve) => {
          setTimeout(resolve, 200);
        });

        if (validFiles.length > 0) {
          setSelectedMediaList((prev) => [...prev, ...validFiles]);
        }

        setDiscardedInvalidCount(discardedCount);
        if (discardedCount > 0) {
          setShowDiscardError(true);
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error processing files:', error);
      } finally {
        setIsProcessingFiles(false);
      }
    }
  };

  const hasInvalidFiles = () => selectedMediaList.some((item) => !item.isValid);

  const handleSaveMedia = async () => {
    if (!isOnline) {
      setIsMediaSaveSuccessfully(false);
      return;
    }

    if (selectedMediaList.length === 0) {
      toast.error(CONTENT_LIBRARY_MESSAGES.NO_MEDIA_SELECTED);
      return;
    }

    if (hasInvalidFiles()) {
      toast.error(CONTENT_LIBRARY_MESSAGES.REMOVE_INVALID_FILES);
      return;
    }

    const validFiles = selectedMediaList.filter((item) => item.isValid);
    const initialUploadFiles = validFiles.map((item) => ({
      name: item.file.name,
      size: item.file.size,
      progress: 0,
      status: 'pending' as const,
    }));

    setUploadFiles(initialUploadFiles);
    setIsUploading(true);
    setIsMediaSaveModalOpen(false);

    try {
      const mediaDetails: any[] = [];
      const BATCH_SIZE = 3;
      const batches = [];

      for (let i = 0; i < validFiles.length; i += BATCH_SIZE) {
        batches.push(validFiles.slice(i, i + BATCH_SIZE));
      }

      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];

        const batchPromises = batch.map(async (item, itemIndex) => {
          const globalIndex = batchIndex * BATCH_SIZE + itemIndex;
          const fileNameLower = item.file.name.toLowerCase();
          const isHeicOrHeif =
            fileNameLower.endsWith('.heic') || fileNameLower.endsWith('.heif');

          const mediaType = isHeicOrHeif
            ? MessageMediaType.IMAGE
            : item.file.type.startsWith('video/')
              ? MessageMediaType.VIDEO
              : item.file.type.startsWith('image/')
                ? MessageMediaType.IMAGE
                : MessageMediaType.DOCUMENT;

          try {
            setUploadFiles((prev) =>
              prev.map((file, i) =>
                i === globalIndex ? { ...file, status: 'uploading' } : file,
              ),
            );

            // Upload only the main media file - no thumbnail needed
            const fileKey = await uploadMedia(
              {
                file: item.file,
                isTemp: false,
                mediaType,
                requestId: requestData.id,
                employeeId: userResponse?.response?.id,
                fileNumber: globalIndex + 1,
                isThumbnail: false,
              },
              null,
              (progress) => {
                setUploadFiles((prev) =>
                  prev.map((file, i) =>
                    i === globalIndex ? { ...file, progress } : file,
                  ),
                );
              },
              () => {},
              false,
            );

            let thumbnailUrl = '';

            // Generate and upload thumbnails for images and videos
            if (item.file.type.startsWith('video/')) {
              try {
                const thumbnailBlob = await generateVideoThumbnail(item.file);
                const thumbnailFile = new File(
                  [thumbnailBlob],
                  `${item.file.name}-thumbnail.jpg`,
                  { type: 'image/jpeg', lastModified: Date.now() },
                );
                thumbnailUrl = await uploadMedia(
                  {
                    file: thumbnailFile,
                    isTemp: false,
                    mediaType: MessageMediaType.IMAGE,
                    requestId: requestData.id,
                    employeeId: userResponse?.response?.id,
                    fileNumber: globalIndex + 1,
                    isThumbnail: true,
                  },
                  null,
                  () => {},
                  () => {},
                  false,
                );
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error generating video thumbnail:', error);
              }
            } else if (item.file.type.startsWith('image/')) {
              try {
                const thumbnailBlob = await generateImageThumbnail(item.file);
                const thumbnailFile = new File(
                  [thumbnailBlob],
                  `${item.file.name}-thumbnail.jpg`,
                  { type: 'image/jpeg', lastModified: Date.now() },
                );

                thumbnailUrl = await uploadMedia(
                  {
                    file: thumbnailFile,
                    isTemp: false,
                    mediaType: MessageMediaType.IMAGE,
                    requestId: requestData.id,
                    employeeId: userResponse?.response?.id,
                    fileNumber: globalIndex + 1,
                    isThumbnail: true,
                  },
                  null,
                  () => {},
                  () => {},
                  false,
                );
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error generating image thumbnail:', error);
              }
            }

            setUploadFiles((prev) =>
              prev.map((file, i) =>
                i === globalIndex
                  ? { ...file, status: 'completed', progress: 100 }
                  : file,
              ),
            );

            return {
              mediaUrl: fileKey,
              mediaSize: item.mediaSize,
              thumbnailImageUrl: thumbnailUrl,
              mediaType: item.mediaType,
              mediaFileName: item.file.name,
            };
          } catch (error) {
            console.error(`Error uploading ${item.file.name}:`, error);

            setUploadFiles((prev) =>
              prev.map((file, i) =>
                i === globalIndex
                  ? {
                      ...file,
                      status: 'error',
                      error: (error as any).message || 'Upload failed',
                    }
                  : file,
              ),
            );

            return null;
          }
        });

        // eslint-disable-next-line no-await-in-loop
        const batchResults = await Promise.allSettled(batchPromises);
        batchResults.forEach((result) => {
          if (result.status === 'fulfilled' && result.value) {
            mediaDetails.push(result.value);
          }
        });
      }

      // Submit to server
      const response = await handleAsyncThunk(
        `/content-library/submit-content/${requestData.id}`,
        'post',
        { employeeId: userResponse?.response?.id, mediaDetails },
        true,
      );

      if (response.status !== 200) {
        throw new Error('Failed to save media');
      }

      const isSuccess = uploadFiles.every(
        (file) => file.status === 'completed',
      );

      setTimeout(() => {
        setIsUploading(false);
        setIsMediaSaveSuccessfully(isSuccess);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsUploading(false);
        setIsMediaSaveSuccessfully(false);
      }, 1000);
    }
  };

  const handleUploadMoreFiles = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsMediaSaveSuccessfully(null);
    setSelectedMediaList([]);
    setUploadFiles([]);
    setIsUploading(false);
    handleFileChange(event, true); // Skip duplicate check for upload more functionality
  };

  const handleTryAgainUpload = () => {
    setIsMediaSaveSuccessfully(null);
    setUploadFiles([]);
    setIsUploading(false);
  };

  if (isMediaSaveSuccessfully !== null) {
    return (
      <MediaSaveMessageModal
        isMediaSaveSuccessfully={isMediaSaveSuccessfully}
        onFileSelect={(e) => {
          setSelectedMediaList([]);
          handleUploadMoreFiles(e);
        }}
        onTryAgain={handleTryAgainUpload}
        requestData={requestData}
      />
    );
  }

  return (
    <>
      <Box className="new-content-request-page">
        <Header logoTitle={textConfiguration.HEADER_TEXT.newContentRequest} />
        <Box
          className="text-center m-auto"
          maxWidth={{ md: '850px', sm: '534px' }}
          padding="20px"
          margin={selectedMediaList.length > 0 ? '-35px 0 0' : '20px 0px 44px'}
        >
          <Box>
            <Typography className="fs-16 fw-semibold color-gray" component="h2">
              {CONTENT_LIBRARY_MESSAGES.REQUEST_NAME_LABEL}
              <Typography className="fs-16 fw-semibold color-black1">
                {requestData?.name}
              </Typography>
            </Typography>
            <Typography className="color-black1 fs-12 mw-medium" marginY={0.5}>
              {CONTENT_LIBRARY_MESSAGES.LINK_EXPIRES_ON}{' '}
              {dayjs(requestData?.expiryDate).format('MM/DD/YYYY')},{' 23:59 '}
              {getTimezoneObjectById(requestData?.timezone)?.abbreviation}
            </Typography>
            <Typography className="color-black1 fs-12 mw-medium" mx="22px">
              {requestData?.description}
            </Typography>
            <RequestMediaList
              mediaList={selectedMediaList}
              setMediaList={(updater) => {
                setSelectedMediaList((prev) => {
                  const newList =
                    typeof updater === 'function' ? updater(prev) : updater;
                  prev.forEach((item) => {
                    if (
                      !newList.some((n) => n.id === item.id) &&
                      item.blobUrl
                    ) {
                      URL.revokeObjectURL(item.blobUrl);
                    }
                  });
                  return newList;
                });
              }}
              uploadFiles={uploadFiles}
              isUploading={isUploading}
              setOfflineModal={setOfflineModalOpen}
            />
            {showDiscardError && (
              <>
                <Typography
                  color="error"
                  className="fs-14 fw-semibold"
                  sx={{ mt: 2, textAlign: 'center' }}
                >
                  {CONTENT_LIBRARY_MESSAGES.FILES_CANNOT_UPLOAD.replace(
                    '{count}',
                    (
                      discardedInvalidCount +
                      selectedMediaList.filter((item) => !item.isValid).length
                    ).toString(),
                  )}
                </Typography>
                <SizeLimitText />
              </>
            )}
            {isUploading && (
              <Typography
                color="error"
                className="fs-14 fw-bold color-blue"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {CONTENT_LIBRARY_MESSAGES.FILES_UPLOADING}
              </Typography>
            )}
            <Box
              className="d-flex align-items-center justify-content-center"
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                mt: 3,
                gap: 3,
                '& button.MuiButton-root': {
                  padding: '10px 20px',
                  minWidth: '124px',
                },
              }}
            >
              <Button
                variant={
                  selectedMediaList.length > 0 ? 'outlined' : 'contained'
                }
                className={`fs-18 rounded ${(isUploading || selectedMediaList.length === CONTENT_LIBRARY_MAX_UPLOAD_COUNT) && 'component-disable'}`}
                component="label"
                sx={{
                  minWidth: '150px',
                  width: { xs: '100%', sm: 'auto' },
                  py: '9px',
                }}
                onClick={() => {
                  setOfflineModalOpen(!isOnline);
                  setShowDiscardError(false);
                }}
                tabIndex={-1}
                disabled={isUploading}
              >
                {selectedMediaList.length > 0
                  ? `${CONTENT_LIBRARY_MESSAGES.UPLOAD_MORE} (${selectedMediaList.length}/${CONTENT_LIBRARY_MAX_UPLOAD_COUNT})`
                  : CONTENT_LIBRARY_MESSAGES.UPLOAD_MEDIA}
                {isOnline && (
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    ref={fileInputRef}
                    accept="image/*,video/mp4,.mov,.mkv,.avi,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  />
                )}
              </Button>
              {selectedMediaList.length > 0 && (
                <Button
                  variant="contained"
                  className={`fs-18 rounded ${(isUploading || hasInvalidFiles()) && 'component-disable'}`}
                  onClick={() => setIsMediaSaveModalOpen(true)}
                  sx={{
                    minWidth: '150px',
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Save & Exit
                </Button>
              )}
            </Box>
            {selectedMediaList.length === 0 && !showDiscardError && (
              <SizeLimitText />
            )}
          </Box>
        </Box>
      </Box>
      {isMediaSaveModalOpen && (
        <MediaSaveModal
          isMediaSaveModalOpen={isMediaSaveModalOpen}
          setIsMediaSaveModalOpen={setIsMediaSaveModalOpen}
          onSave={handleSaveMedia}
          loading={false}
        />
      )}
      <OfflineModal open={offlineModalOpen} />
      <Loader loading={isProcessingFiles} />
    </>
  );
}
export default UploadContentForm;