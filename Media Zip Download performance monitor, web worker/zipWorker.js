/* eslint-disable no-restricted-globals */
// Web Worker for handling zip creation off the main thread
importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
);

self.onmessage = async function (e) {
  const { type, data } = e.data;

  if (type === 'CREATE_ZIP') {
    try {
      const { mediaList, cdnBaseUrl } = data;
      const zip = new JSZip();
      let completed = 0;

      // Process files in smaller batches
      const BATCH_SIZE = 5;

      for (let i = 0; i < mediaList.length; i += BATCH_SIZE) {
        const batch = mediaList.slice(i, i + BATCH_SIZE);

        // Process each file in the batch
        for (const media of batch) {
          const url = `${cdnBaseUrl}/${media.mediaUrl}`;
          const fileName =
            media.fileName || media.mediaUrl.split('/').pop() || 'file';

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch: ${url}`);
            }

            const blob = await response.blob();
            zip.file(fileName, blob);

            completed += 1;

            // Send progress update (0% to 70% for file gathering)
            const progress = (completed / mediaList.length) * 0.7;
            self.postMessage({
              type: 'PROGRESS',
              progress: progress,
            });
          } catch (error) {
            console.error('Error fetching media:', error);
            completed += 1; // Still increment to maintain progress
          }
        }

        // Small delay between batches to prevent overwhelming
        if (i + BATCH_SIZE < mediaList.length) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }

      // Generate zip with progress updates (70% to 100%)
      const zipBlob = await zip.generateAsync(
        {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 1 }, // Faster compression
        },
        (metadata) => {
          const zipProgress = 0.7 + (metadata.percent / 100) * 0.3;
          self.postMessage({
            type: 'PROGRESS',
            progress: zipProgress,
          });
        },
      );

      // Send the completed zip
      self.postMessage({
        type: 'COMPLETE',
        blob: zipBlob,
      });
    } catch (error) {
      self.postMessage({
        type: 'ERROR',
        error: error.message || 'Unknown error occurred',
      });
    }
  }
};
