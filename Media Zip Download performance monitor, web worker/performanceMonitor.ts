// Performance monitoring utility for download operations
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, any> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Monitor long tasks that block the main thread
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.duration > 50) {
              // Tasks longer than 50ms
              console.warn(
                `🐌 Long task detected: ${entry.duration.toFixed(2)}ms`,
                {
                  name: entry.name,
                  startTime: entry.startTime.toFixed(2),
                  duration: entry.duration.toFixed(2),
                },
              );
              this.recordMetric('longTasks', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name,
                timestamp: Date.now(),
              });
            }
          });
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      } catch (e) {
        console.warn('Long task observer not supported');
      }

      // Monitor memory usage periodically
      try {
        setInterval(() => {
          if ((performance as any).memory) {
            const memoryInfo = {
              usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
              totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
              usedJSHeapSizeMB:
                (performance as any).memory.usedJSHeapSize / 1024 / 1024,
              totalJSHeapSizeMB:
                (performance as any).memory.totalJSHeapSize / 1024 / 1024,
              usagePercentage:
                ((performance as any).memory.usedJSHeapSize /
                  (performance as any).memory.totalJSHeapSize) *
                100,
              timestamp: Date.now(),
            };

            this.recordMetric('memory', memoryInfo);

            // Log memory warnings
            if (memoryInfo.usagePercentage > 90) {
              console.warn(
                `���� Critical memory usage: ${memoryInfo.usagePercentage.toFixed(1)}%`,
              );
            } else if (memoryInfo.usagePercentage > 70) {
              console.warn(
                `⚠️ High memory usage: ${memoryInfo.usagePercentage.toFixed(1)}%`,
              );
            }
          }
        }, 5000);
      } catch (e) {
        console.warn('Memory monitoring not supported');
      }
    }
  }

  startDownloadMetrics(downloadId: string) {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    this.metrics.set(`download_${downloadId}`, {
      downloadId,
      startTime,
      startMemory,
      phases: {},
      fileCount: 0,
      totalSize: 0,
      chunkCount: 0,
      errors: [],
    });

    // Log detailed start metrics
    console.group(`📊 Performance Monitor - Download Started: ${downloadId}`);
    console.log(`⏰ Start Time: ${new Date().toISOString()}`);
    console.log(
      `💾 Initial Memory: ${(startMemory / 1024 / 1024).toFixed(2)}MB`,
    );
    console.log(
      `🔧 Browser: ${navigator.userAgent.split(' ').slice(-2).join(' ')}`,
    );
    console.log(`⚡ CPU Cores: ${navigator.hardwareConcurrency || 'Unknown'}`);
    console.log(
      `🌐 Connection: ${(navigator as any).connection?.effectiveType || 'Unknown'}`,
    );
    console.groupEnd();
  }

  recordPhase(downloadId: string, phase: string, additionalData?: any) {
    const downloadMetrics = this.metrics.get(`download_${downloadId}`);
    if (downloadMetrics) {
      const currentTime = performance.now();
      const currentMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const timeSinceStart = currentTime - downloadMetrics.startTime;
      const memoryDelta = currentMemory - downloadMetrics.startMemory;

      const phaseData = {
        timestamp: currentTime,
        timeSinceStart: timeSinceStart,
        memory: currentMemory,
        memoryDelta: memoryDelta,
        memoryDeltaMB: memoryDelta / 1024 / 1024,
        ...additionalData,
      };

      downloadMetrics.phases[phase] = phaseData;

      // Log phase with detailed information
      console.log(`📍 Phase: ${phase}`, {
        time: `${timeSinceStart.toFixed(2)}ms`,
        memory: `${(currentMemory / 1024 / 1024).toFixed(2)}MB`,
        memoryDelta: `${(memoryDelta / 1024 / 1024).toFixed(2)}MB`,
        ...additionalData,
      });

      // Check for performance issues
      if (memoryDelta > 100 * 1024 * 1024) {
        // 100MB increase
        console.warn(
          `⚠️ High memory usage detected in phase ${phase}: +${(memoryDelta / 1024 / 1024).toFixed(2)}MB`,
        );
      }

      if (timeSinceStart > 30000) {
        // 30 seconds
        console.warn(
          `⚠️ Long running download detected: ${(timeSinceStart / 1000).toFixed(2)}s`,
        );
      }
    }
  }

  recordDownloadStats(
    downloadId: string,
    stats: {
      fileCount?: number;
      totalSize?: number;
      chunkCount?: number;
      error?: string;
    },
  ) {
    const downloadMetrics = this.metrics.get(`download_${downloadId}`);
    if (downloadMetrics) {
      if (stats.fileCount) downloadMetrics.fileCount = stats.fileCount;
      if (stats.totalSize) downloadMetrics.totalSize = stats.totalSize;
      if (stats.chunkCount) downloadMetrics.chunkCount = stats.chunkCount;
      if (stats.error)
        downloadMetrics.errors.push({
          error: stats.error,
          timestamp: performance.now(),
        });
    }
  }

  endDownloadMetrics(downloadId: string) {
    const downloadMetrics = this.metrics.get(`download_${downloadId}`);
    if (downloadMetrics) {
      const endTime = performance.now();
      const totalDuration = endTime - downloadMetrics.startTime;
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryDelta = endMemory - downloadMetrics.startMemory;
      const peakMemory = Math.max(
        ...Object.values(downloadMetrics.phases).map((p: any) => p.memory),
      );

      // Calculate phase durations
      const phaseNames = Object.keys(downloadMetrics.phases);
      const phaseDurations = {};

      for (let i = 0; i < phaseNames.length; i++) {
        const currentPhase = phaseNames[i];
        const nextPhase = phaseNames[i + 1];
        const currentTime = downloadMetrics.phases[currentPhase].timestamp;
        const nextTime = nextPhase
          ? downloadMetrics.phases[nextPhase].timestamp
          : endTime;
        phaseDurations[currentPhase] = nextTime - currentTime;
      }

      // Comprehensive performance summary
      const performanceSummary = {
        downloadId,
        totalDuration: `${totalDuration.toFixed(2)}ms`,
        totalDurationSeconds: `${(totalDuration / 1000).toFixed(2)}s`,
        fileCount: downloadMetrics.fileCount,
        totalSizeMB: downloadMetrics.totalSize
          ? `${(downloadMetrics.totalSize / 1024 / 1024).toFixed(2)}MB`
          : 'Unknown',
        chunkCount: downloadMetrics.chunkCount,
        averageTimePerFile: downloadMetrics.fileCount
          ? `${(totalDuration / downloadMetrics.fileCount).toFixed(2)}ms`
          : 'N/A',
        throughputMBps: downloadMetrics.totalSize
          ? `${(downloadMetrics.totalSize / 1024 / 1024 / (totalDuration / 1000)).toFixed(2)}MB/s`
          : 'N/A',
        memoryStats: {
          initial: `${(downloadMetrics.startMemory / 1024 / 1024).toFixed(2)}MB`,
          final: `${(endMemory / 1024 / 1024).toFixed(2)}MB`,
          peak: `${(peakMemory / 1024 / 1024).toFixed(2)}MB`,
          delta: `${(memoryDelta / 1024 / 1024).toFixed(2)}MB`,
        },
        phaseDurations: Object.fromEntries(
          Object.entries(phaseDurations).map(([phase, duration]) => [
            phase,
            `${(duration as number).toFixed(2)}ms`,
          ]),
        ),
        phases: downloadMetrics.phases,
        errors: downloadMetrics.errors,
        performanceGrade: this.calculatePerformanceGrade(
          totalDuration,
          memoryDelta,
          downloadMetrics.fileCount,
        ),
        recommendations: this.generateRecommendations(
          totalDuration,
          memoryDelta,
          downloadMetrics.fileCount,
          downloadMetrics.errors.length,
        ),
      };

      // Log comprehensive summary
      console.group(
        `🏁 Performance Monitor - Download Completed: ${downloadId}`,
      );
      console.log(
        `⏱️ Total Duration: ${performanceSummary.totalDurationSeconds}`,
      );
      console.log(`📁 Files Processed: ${performanceSummary.fileCount}`);
      console.log(`📦 Total Size: ${performanceSummary.totalSizeMB}`);
      console.log(`🗂️ Chunks Created: ${performanceSummary.chunkCount}`);
      console.log(`⚡ Avg Time/File: ${performanceSummary.averageTimePerFile}`);
      console.log(`🚀 Throughput: ${performanceSummary.throughputMBps}`);
      console.log(`💾 Memory Usage:`, performanceSummary.memoryStats);
      console.log(
        `📊 Performance Grade: ${performanceSummary.performanceGrade}`,
      );

      if (downloadMetrics.errors.length > 0) {
        console.warn(
          `❌ Errors Encountered (${downloadMetrics.errors.length}):`,
          downloadMetrics.errors,
        );
      }

      console.log(`⏳ Phase Durations:`, performanceSummary.phaseDurations);

      if (performanceSummary.recommendations.length > 0) {
        console.log(`💡 Recommendations:`, performanceSummary.recommendations);
      }

      console.groupEnd();

      // Store summary for later retrieval
      this.recordMetric('downloadSummaries', performanceSummary);

      // Clean up detailed metrics
      this.metrics.delete(`download_${downloadId}`);

      return performanceSummary;
    }
    return null;
  }

  private calculatePerformanceGrade(
    duration: number,
    memoryDelta: number,
    fileCount: number,
  ): string {
    const durationScore =
      duration < 10000
        ? 'A'
        : duration < 30000
          ? 'B'
          : duration < 60000
            ? 'C'
            : 'D';
    const memoryScore =
      memoryDelta < 50 * 1024 * 1024
        ? 'A'
        : memoryDelta < 100 * 1024 * 1024
          ? 'B'
          : memoryDelta < 200 * 1024 * 1024
            ? 'C'
            : 'D';
    const efficiencyScore =
      fileCount && duration / fileCount < 1000
        ? 'A'
        : fileCount && duration / fileCount < 2000
          ? 'B'
          : 'C';

    const scores = [durationScore, memoryScore, efficiencyScore];
    const avgScore =
      scores.reduce(
        (sum, score) =>
          sum + (score === 'A' ? 4 : score === 'B' ? 3 : score === 'C' ? 2 : 1),
        0,
      ) / scores.length;

    return avgScore >= 3.5
      ? 'A (Excellent)'
      : avgScore >= 2.5
        ? 'B (Good)'
        : avgScore >= 1.5
          ? 'C (Fair)'
          : 'D (Poor)';
  }

  private generateRecommendations(
    duration: number,
    memoryDelta: number,
    fileCount: number,
    errorCount: number,
  ): string[] {
    const recommendations = [];

    if (duration > 60000) {
      recommendations.push(
        'Consider reducing batch size or implementing streaming for large downloads',
      );
    }

    if (memoryDelta > 200 * 1024 * 1024) {
      recommendations.push(
        'High memory usage detected - consider processing files in smaller chunks',
      );
    }

    if (fileCount && duration / fileCount > 2000) {
      recommendations.push(
        'Slow per-file processing - check network conditions or file sizes',
      );
    }

    if (errorCount > 0) {
      recommendations.push(
        'Errors detected - implement retry logic and better error handling',
      );
    }

    if (duration > 30000 && fileCount < 10) {
      recommendations.push(
        'Slow download for few files - check network latency and file sizes',
      );
    }

    return recommendations;
  }

  private recordMetric(type: string, data: any) {
    if (!this.metrics.has(type)) {
      this.metrics.set(type, []);
    }
    const metrics = this.metrics.get(type);
    metrics.push(data);

    // Keep only last 100 entries to prevent memory leaks
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }
  }

  getMetrics(type?: string) {
    if (type) {
      return this.metrics.get(type) || [];
    }
    return Object.fromEntries(this.metrics);
  }

  // Check if the main thread is being blocked
  isMainThreadBlocked(): boolean {
    const longTasks = this.metrics.get('longTasks') || [];
    const recentTasks = longTasks.filter(
      (task: any) => Date.now() - task.timestamp < 5000, // Last 5 seconds
    );
    return recentTasks.length > 0;
  }

  // Get memory pressure indicator
  getMemoryPressure(): 'low' | 'medium' | 'high' {
    if (!(performance as any).memory) return 'low';

    const memory = (performance as any).memory;
    const usageRatio = memory.usedJSHeapSize / memory.totalJSHeapSize;

    if (usageRatio > 0.9) return 'high';
    if (usageRatio > 0.7) return 'medium';
    return 'low';
  }

  // Get recent download summaries
  getRecentDownloadSummaries(limit: number = 10) {
    const summaries = this.metrics.get('downloadSummaries') || [];
    return summaries.slice(-limit);
  }

  // Get performance trends
  getPerformanceTrends() {
    const summaries = this.getRecentDownloadSummaries(20);
    if (summaries.length === 0) return null;

    const avgDuration =
      summaries.reduce(
        (sum: number, s: any) => sum + parseFloat(s.totalDuration),
        0,
      ) / summaries.length;
    const avgMemoryDelta =
      summaries.reduce(
        (sum: number, s: any) => sum + parseFloat(s.memoryStats.delta),
        0,
      ) / summaries.length;
    const errorRate =
      summaries.reduce((sum: number, s: any) => sum + s.errors.length, 0) /
      summaries.length;

    return {
      averageDuration: `${avgDuration.toFixed(2)}ms`,
      averageMemoryDelta: `${avgMemoryDelta.toFixed(2)}MB`,
      errorRate: errorRate.toFixed(2),
      totalDownloads: summaries.length,
    };
  }

  cleanup() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();
