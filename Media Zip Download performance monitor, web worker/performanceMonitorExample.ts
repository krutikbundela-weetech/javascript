// Example of how to use the Performance Monitor in your download process

import { performanceMonitor } from './performanceMonitor';

// Example usage in your download component
export function exampleDownloadWithMonitoring() {
  // 1. Start monitoring when download begins
  const downloadId = `download_${Date.now()}`;
  performanceMonitor.startDownloadMetrics(downloadId);

  // 2. Record different phases of your download
  performanceMonitor.recordPhase(downloadId, 'fetching_media_list');

  // ... fetch media list code ...

  performanceMonitor.recordPhase(downloadId, 'media_list_fetched', {
    mediaCount: 50,
    totalSizeMB: 125.5,
  });

  // 3. Record download statistics
  performanceMonitor.recordDownloadStats(downloadId, {
    fileCount: 50,
    totalSize: 125.5 * 1024 * 1024, // Convert to bytes
    chunkCount: 3,
  });

  // 4. Record each chunk processing
  for (let i = 0; i < 3; i++) {
    performanceMonitor.recordPhase(downloadId, `chunk_${i + 1}_started`);

    // ... process chunk ...

    performanceMonitor.recordPhase(downloadId, `chunk_${i + 1}_completed`, {
      chunkSize: 42 * 1024 * 1024, // 42MB
      filesInChunk: 17,
    });
  }

  // 5. End monitoring when download completes
  const summary = performanceMonitor.endDownloadMetrics(downloadId);

  // 6. Access the comprehensive performance data
  console.log('Download Performance Summary:', summary);
}

// Example of accessing performance data
export function checkPerformanceMetrics() {
  // Get all metrics
  const allMetrics = performanceMonitor.getMetrics();
  console.log('All Performance Metrics:', allMetrics);

  // Get specific metric type
  const longTasks = performanceMonitor.getMetrics('longTasks');
  console.log('Long Tasks:', longTasks);

  // Check current system state
  const memoryPressure = performanceMonitor.getMemoryPressure();
  const isBlocked = performanceMonitor.isMainThreadBlocked();

  console.log(`Memory Pressure: ${memoryPressure}`);
  console.log(`Main Thread Blocked: ${isBlocked}`);

  // Get recent download summaries
  const recentDownloads = performanceMonitor.getRecentDownloadSummaries(5);
  console.log('Recent Downloads:', recentDownloads);

  // Get performance trends
  const trends = performanceMonitor.getPerformanceTrends();
  console.log('Performance Trends:', trends);
}

// Example of what you'll see in console logs:

/*
📊 Performance Monitor - Download Started: download_1703123456789
⏰ Start Time: 2023-12-21T10:30:56.789Z
💾 Initial Memory: 45.23MB
🔧 Browser: Chrome 120
⚡ CPU Cores: 8
🌐 Connection: 4g

📍 Phase: fetching_media_list { time: "125.45ms", memory: "46.12MB", memoryDelta: "0.89MB" }
📍 Phase: media_list_fetched { time: "1250.23ms", memory: "48.45MB", memoryDelta: "3.22MB", mediaCount: 50, totalSizeMB: 125.5 }
📍 Phase: chunks_prepared { time: "1255.67ms", memory: "48.50MB", memoryDelta: "3.27MB", chunkCount: 3, filesPerChunk: 17 }
📍 Phase: chunk_1_started { time: "1260.12ms", memory: "48.55MB", memoryDelta: "3.32MB" }
📍 Phase: chunk_1_completed { time: "15420.89ms", memory: "65.23MB", memoryDelta: "20.00MB", chunkSize: 44040192, filesInChunk: 17 }

🏁 Performance Monitor - Download Completed: download_1703123456789
⏱️ Total Duration: 45.23s
📁 Files Processed: 50
📦 Total Size: 125.50MB
🗂️ Chunks Created: 3
⚡ Avg Time/File: 904.60ms
🚀 Throughput: 2.77MB/s
💾 Memory Usage: { initial: "45.23MB", final: "52.10MB", peak: "68.45MB", delta: "6.87MB" }
📊 Performance Grade: B (Good)
⏳ Phase Durations: { 
  fetching_media_list: "125.45ms",
  media_list_fetched: "1124.78ms", 
  chunks_prepared: "5.44ms",
  chunk_1_started: "4.45ms",
  chunk_1_completed: "14160.77ms",
  ...
}
💡 Recommendations: ["Consider reducing batch size for better memory usage"]
*/
