/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
import {
  Button,
  LinearProgress,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spinner from '../../../assets/images/loadingSpinner.svg';
import {
  fetchAllMediaForDownload,
  setDownloadBarState,
  clearDownloadBarState,
  completeCurrentDownload,
} from '../../../redux/slice/contentLibrary/contentLibrarySlice';
import { chunkMediaBySize, createMediaZip, triggerDownload } from './service';
import { AppDispatch, RootState } from '../../../redux/store';
import { toast } from 'react-toastify';
import { performanceMonitor } from './performanceMonitor';

export interface Media {
  id: string;
  mediaUrl: string;
  fileName?: string;
  mediaSize?: number;
  mediaType?: string;
  thumbnailImageUrl?: string;
  createdAt?: string;
  employee?: {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    nickName?: string;
    status?: string;
    thumbnailProfileImageUrl?: string;
    profileImageUrl?: string;
  };
}

type DownloadMediaBarProps = {
  onComplete?: () => void;
};

export default function DownloadMediaBar({
  onComplete,
}: DownloadMediaBarProps) {
  const downloadBarRequestId = useSelector(
    (state: RootState) => state.contentLibrary.downloadBarRequestId,
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    isDownloadMediaLoading,
    downloadMediaList,
    downloadMediaError,
    isAnyDownloadInProgress,
    downloadProgress,
    downloadStatus,
    downloadError,
    downloadBarSelectedUser,
    downloadBarMode,
    downloadBarRequestName,
    // New queue state
    downloadQueue,
    currentDownload,
  } = useSelector((state: RootState) => state.contentLibrary);

  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [noMedia, setNoMedia] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isAnyDownloadInProgress && !isDownloadComplete && !hasStarted) {
      setHasStarted(true);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleDownload();
    }
  }, [isAnyDownloadInProgress, isDownloadComplete, hasStarted]);

  useEffect(() => {
    if (!downloadBarRequestId) {
      setHasStarted(false);
      setIsDownloadComplete(false);
    }
  }, [downloadBarRequestId]);

  useEffect(() => {
    if (downloadBarRequestId && isAnyDownloadInProgress) {
      setHasStarted(false);
      setIsDownloadComplete(false);
    }
  }, [downloadBarRequestId]);

  const handleDownload = async () => {
    // Generate unique download ID for performance tracking
    const downloadId = `${downloadBarRequestId}_${Date.now()}`;

    // Start performance monitoring
    performanceMonitor.startDownloadMetrics(downloadId);
    console.log(
      `🚀 Starting download performance monitoring for: ${downloadId}`,
    );

    // Log initial system state
    console.log(
      `📊 Initial Memory Pressure: ${performanceMonitor.getMemoryPressure()}`,
    );
    console.log(
      `⚡ Main Thread Blocked: ${performanceMonitor.isMainThreadBlocked()}`,
    );

    dispatch(
      setDownloadBarState({
        downloadError: '',
        downloadStatus: 'Fetching media list...',
        isAnyDownloadInProgress: true,
        downloadProgress: 0,
      }),
    );

    try {
      // Record phase: Starting download
      performanceMonitor.recordPhase(downloadId, 'download_started');

      let mediaList: Media[] =
        downloadMediaList &&
        Array.isArray(downloadMediaList.contentLibraryResponse)
          ? (downloadMediaList.contentLibraryResponse as Media[])
          : [];

      // Record phase: Fetching media list
      performanceMonitor.recordPhase(downloadId, 'fetching_media_list');
      console.log(
        `📡 Fetching media list for request: ${downloadBarRequestId}`,
      );

      const result = await dispatch(
        fetchAllMediaForDownload(downloadBarRequestId),
      );

      if (
        result.payload &&
        result.payload.status === 200 &&
        result.payload.response &&
        Array.isArray(result.payload.response.contentLibraryResponse)
      ) {
        mediaList = result.payload.response.contentLibraryResponse;
        console.log(`✅ Successfully fetched ${mediaList.length} media items`);
      } else {
        throw new Error('Failed to fetch media list.');
      }

      // Record phase: Media list fetched
      performanceMonitor.recordPhase(downloadId, 'media_list_fetched');

      let filtered: Media[] = mediaList;
      if (
        downloadBarMode === 'selected' &&
        downloadBarSelectedUser &&
        downloadBarSelectedUser.length > 0
      ) {
        filtered = mediaList.filter((m: Media) =>
          downloadBarSelectedUser.includes(m.id),
        );
        console.log(`🔍 Filtered to ${filtered.length} selected media items`);
      }

      if (!filtered.length) {
        console.log(`❌ No media found for download`);
        performanceMonitor.recordPhase(downloadId, 'no_media_found');

        dispatch(
          setDownloadBarState({
            downloadStatus: 'No media in this request.',
            isAnyDownloadInProgress: false,
          }),
        );
        setNoMedia(true);

        // Complete current download immediately to allow queue processing
        dispatch(
          completeCurrentDownload({
            success: false,
            error: 'No media in this request.',
          }),
        );

        // End performance monitoring
        performanceMonitor.endDownloadMetrics(downloadId);

        setTimeout(() => {
          dispatch(clearDownloadBarState());
          setNoMedia(false);
          if (onComplete) onComplete();
        }, 5000);
        return;
      }

      // Calculate total size for logging
      const totalSize = filtered.reduce(
        (sum, media) => sum + (Number(media.mediaSize) || 0),
        0,
      );
      console.log(
        `📦 Total download size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      );

      dispatch(
        setDownloadBarState({ downloadStatus: 'Preparing download...' }),
      );

      // Record phase: Preparing chunks
      performanceMonitor.recordPhase(downloadId, 'preparing_chunks');

      // Yield to main thread before chunking
      await new Promise((resolve) => setTimeout(resolve, 0));

      const chunks = chunkMediaBySize(filtered);
      console.log(`🗂️ Split into ${chunks.length} chunks for download`);

      // Record phase: Chunks prepared
      performanceMonitor.recordPhase(downloadId, 'chunks_prepared');

      // Process chunks with better error handling and yielding
      for (let i = 0; i < chunks.length; i++) {
        const chunkStartTime = performance.now();
        console.log(
          `📁 Processing chunk ${i + 1}/${chunks.length} with ${chunks[i].length} files`,
        );

        // Record phase for each chunk
        performanceMonitor.recordPhase(downloadId, `chunk_${i + 1}_started`);

        // Log memory state before chunk processing
        console.log(
          `💾 Memory before chunk ${i + 1}: ${performanceMonitor.getMemoryPressure()}`,
        );

        dispatch(
          setDownloadBarState({
            downloadStatus: `Creating zip archive ${i + 1} of ${chunks.length}`,
          }),
        );

        try {
          // Create a throttled progress updater to prevent excessive Redux updates
          let lastProgressUpdate = 0;
          const progressThrottle = 100; // Update every 100ms max

          const zipBlob = await createMediaZip(chunks[i], (p) => {
            const now = Date.now();
            if (now - lastProgressUpdate > progressThrottle) {
              const overallProgress = (i + p) / chunks.length;
              dispatch(
                setDownloadBarState({ downloadProgress: overallProgress }),
              );
              lastProgressUpdate = now;

              // Log progress periodically
              if (Math.floor(p * 100) % 10 === 0) {
                console.log(
                  `⏳ Chunk ${i + 1} progress: ${Math.floor(p * 100)}%`,
                );
              }
            }
          });

          // Record phase: Chunk zip created
          performanceMonitor.recordPhase(
            downloadId,
            `chunk_${i + 1}_zip_created`,
          );

          const chunkDuration = performance.now() - chunkStartTime;
          console.log(
            `✅ Chunk ${i + 1} completed in ${chunkDuration.toFixed(2)}ms`,
          );
          console.log(
            `📊 Zip size: ${(zipBlob.size / 1024 / 1024).toFixed(2)}MB`,
          );

          // Yield to main thread before triggering download
          await new Promise((resolve) => setTimeout(resolve, 0));

          triggerDownload(zipBlob, `media-part-${i + 1}.zip`);

          // Record phase: Chunk download triggered
          performanceMonitor.recordPhase(
            downloadId,
            `chunk_${i + 1}_download_triggered`,
          );

          console.log(`⬇️ Download triggered for chunk ${i + 1}`);

          // Add a small delay between downloads to prevent browser overwhelm
          if (i < chunks.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          // Log memory state after chunk processing
          console.log(
            `💾 Memory after chunk ${i + 1}: ${performanceMonitor.getMemoryPressure()}`,
          );
        } catch (e) {
          const errorMessage = `Error creating zip ${i + 1}: ${e.message || e}`;
          console.error(`❌ ${errorMessage}`);

          // Record phase: Chunk error
          performanceMonitor.recordPhase(downloadId, `chunk_${i + 1}_error`);

          dispatch(
            setDownloadBarState({
              downloadError: errorMessage,
              isAnyDownloadInProgress: false,
            }),
          );

          // Complete current download with error
          dispatch(
            completeCurrentDownload({
              success: false,
              error: errorMessage,
            }),
          );

          // End performance monitoring with error
          performanceMonitor.endDownloadMetrics(downloadId);
          return;
        }
      }

      // Record phase: All chunks completed
      performanceMonitor.recordPhase(downloadId, 'all_chunks_completed');

      dispatch(
        setDownloadBarState({
          downloadStatus: 'Download complete',
          isAnyDownloadInProgress: false,
          downloadProgress: 1,
        }),
      );
      setIsDownloadComplete(true);

      console.log(`🎉 All downloads completed successfully!`);
      console.log(
        `📊 Final Memory Pressure: ${performanceMonitor.getMemoryPressure()}`,
      );

      // Complete current download immediately to allow queue processing
      dispatch(completeCurrentDownload({ success: true }));

      // Record phase: Download completed
      performanceMonitor.recordPhase(downloadId, 'download_completed');

      // End performance monitoring
      performanceMonitor.endDownloadMetrics(downloadId);

      // Show completion state briefly, then reset
      setTimeout(() => {
        setIsDownloadComplete(false);
        if (onComplete) onComplete();
      }, 2000);
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      console.error(`💥 Download failed: ${errorMessage}`);

      // Record phase: Download error
      performanceMonitor.recordPhase(downloadId, 'download_error');

      dispatch(
        setDownloadBarState({
          downloadError: errorMessage,
          isAnyDownloadInProgress: false,
          downloadStatus: '',
        }),
      );

      // Complete current download with error
      dispatch(
        completeCurrentDownload({
          success: false,
          error: errorMessage,
        }),
      );

      // End performance monitoring with error
      performanceMonitor.endDownloadMetrics(downloadId);
    }
  };

  const handleClose = () => {
    if (isAnyDownloadInProgress || isDownloadMediaLoading) {
      toast.info('Media Downloading in background');
    }
    dispatch(clearDownloadBarState());
    if (onComplete) onComplete();
  };

  // Show the download bar if there's an active download or items in queue
  if (!downloadBarRequestId && downloadQueue.length === 0) return null;

  return (
    <>
      <Box
        className="download-modal"
        sx={{
          paddingBottom: isCollapsed ? '10px' : '20px',
        }}
      >
        {/* Header */}
        <Box className="d-flex align-items-start justify-content-between text-trim">
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              flex: 1,
              letterSpacing: 0.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {isCollapsed
              ? downloadBarRequestName
                ? 'Downloading...'
                : 'Download Queue'
              : downloadBarRequestName || 'Download Queue'}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setIsCollapsed((prev) => !prev)}
            sx={{ ml: 1, mt: '-2px', mr: '-2px', transition: 'transform 0.3s' }}
          >
            <ExpandMoreIcon
              sx={{
                fontSize: 22,
                transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        </Box>
        {/* Body */}
        {!isCollapsed && (
          <Box>
            {/* Current Download Section - only show if there's an active download */}
            {downloadBarRequestId && (
              <>
                <Box
                  className="d-flex flex-row align-items-center justify-content-start"
                  my="10px"
                >
                  {!isAnyDownloadInProgress &&
                    !isDownloadMediaLoading &&
                    !noMedia && (
                      <CheckCircleIcon
                        sx={{ color: 'var(--darkGreen)', fontSize: 22, mr: 1 }}
                      />
                    )}
                  {(isAnyDownloadInProgress || isDownloadMediaLoading) &&
                    !noMedia && (
                      <img
                        src={spinner}
                        alt="Loading"
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          animation: 'spin 2s linear infinite',
                        }}
                      />
                    )}
                  {noMedia ? (
                    <Typography
                      className="fs-14 fw-semibold"
                      sx={{ color: 'var(--red)' }}
                    >
                      No media in this request
                    </Typography>
                  ) : !isAnyDownloadInProgress && !isDownloadMediaLoading ? (
                    <Typography
                      className="fs-14 fw-semibold"
                      sx={{ color: 'var(--darkGreen)' }}
                    >
                      Download Complete
                    </Typography>
                  ) : (
                    <Typography
                      className="fs-14 d-flex justify-content-between"
                      sx={{ flexGrow: 1 }}
                    >
                      Downloading...
                      <Typography className="fs-14">
                        {downloadStatus}
                      </Typography>
                    </Typography>
                  )}
                </Box>
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={downloadProgress * 100}
                    sx={{
                      height: 5,
                      borderRadius: 4,
                      backgroundColor:
                        !isAnyDownloadInProgress &&
                        !isDownloadMediaLoading &&
                        !noMedia
                          ? 'var(--lightGreen)'
                          : undefined,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          !isAnyDownloadInProgress &&
                          !isDownloadMediaLoading &&
                          !noMedia
                            ? 'var(--darkGreen)'
                            : undefined,
                      },
                    }}
                  />
                </Box>
                {downloadError && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {downloadError}
                  </Typography>
                )}
                {downloadMediaError && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {downloadMediaError.message}
                  </Typography>
                )}
              </>
            )}

            {/* Queue Display */}
            {downloadQueue.length > 0 && (
              <Box
                sx={{
                  mt: downloadBarRequestId ? 2 : 0,
                  pt: downloadBarRequestId ? 2 : 0,
                  borderTop: downloadBarRequestId
                    ? '1px solid var(--lightGray)'
                    : 'none',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: 'var(--gray)' }}
                >
                  Queued Downloads ({downloadQueue.length})
                </Typography>
                {downloadQueue.map((queueItem, index) => (
                  <Box key={queueItem.id} sx={{ mb: 1.5 }}>
                    <Box
                      className="d-flex flex-row align-items-center justify-content-start"
                      mb="5px"
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: 'var(--lightGray)',
                          border: '2px solid var(--gray)',
                          marginRight: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: 'var(--gray)',
                          }}
                        >
                          {index + 1}
                        </Typography>
                      </Box>
                      <Typography
                        className="fs-14"
                        sx={{
                          flexGrow: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {queueItem.requestName}
                      </Typography>
                      <Typography
                        className="fs-12"
                        sx={{ color: 'var(--gray)', ml: 1 }}
                      >
                        {queueItem.mode} mode
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={0}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'var(--lightGray)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'var(--gray)',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: 'var(--gray)', fontSize: '11px' }}
                    >
                      Waiting in queue...
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
      {/* Spinner animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}
