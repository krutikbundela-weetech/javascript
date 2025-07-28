import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { startNextDownload } from '../../../redux/slice/contentLibrary/contentLibrarySlice';
import { performanceMonitor } from './performanceMonitor';

const metrics = performanceMonitor.getMetrics();
console.log('🚀 ~ DownloadQueueManager.tsx:7 ~ metrics:', metrics);

// eslint-disable-next-line react/function-component-definition
const DownloadQueueManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Use more specific selectors to reduce unnecessary re-renders
  const downloadQueue = useSelector(
    (state: RootState) => state.contentLibrary.downloadQueue,
  );
  const isAnyDownloadInProgress = useSelector(
    (state: RootState) => state.contentLibrary.isAnyDownloadInProgress,
  );
  const currentDownload = useSelector(
    (state: RootState) => state.contentLibrary.currentDownload,
  );

  // Use ref to track previous state to detect changes
  const prevStateRef = useRef({
    queueLength: downloadQueue.length,
    isDownloading: isAnyDownloadInProgress,
    hasCurrentDownload: !!currentDownload,
  });

  // Debounced dispatch to prevent rapid successive calls
  const debouncedDispatchRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-start next download when queue is not empty and no download in progress
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const currentState = {
      queueLength: downloadQueue.length,
      isDownloading: isAnyDownloadInProgress,
      hasCurrentDownload: !!currentDownload,
    };

    // Check if we should start next download
    const shouldStartNext =
      downloadQueue.length > 0 && !isAnyDownloadInProgress && !currentDownload;

    // Also check if download just completed (was downloading, now not)
    const downloadJustCompleted =
      prevStateRef.current.isDownloading &&
      !isAnyDownloadInProgress &&
      !currentDownload;

    if (
      shouldStartNext ||
      (downloadJustCompleted && downloadQueue.length > 0)
    ) {
      // Clear any existing timeout
      if (debouncedDispatchRef.current) {
        clearTimeout(debouncedDispatchRef.current);
      }

      // Use setTimeout to ensure state has fully updated and avoid race conditions
      debouncedDispatchRef.current = setTimeout(() => {
        // Double-check conditions before dispatching
        if (
          downloadQueue.length > 0 &&
          !isAnyDownloadInProgress &&
          !currentDownload
        ) {
          dispatch(startNextDownload());
        }
        debouncedDispatchRef.current = null;
      }, 100); // Slightly longer delay for better stability

      // Cleanup timeout if component unmounts or dependencies change
      return () => {
        if (debouncedDispatchRef.current) {
          clearTimeout(debouncedDispatchRef.current);
          debouncedDispatchRef.current = null;
        }
      };
    }

    // Update previous state
    prevStateRef.current = currentState;
  }, [
    downloadQueue.length,
    isAnyDownloadInProgress,
    currentDownload,
    dispatch,
  ]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (debouncedDispatchRef.current) {
        clearTimeout(debouncedDispatchRef.current);
      }
    },
    [],
  );

  // This component doesn't render anything - it's just for background processing
  return null;
};

export default DownloadQueueManager;
