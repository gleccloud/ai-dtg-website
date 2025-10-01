import { logger } from './logger';
import fs from 'fs/promises';
import path from 'path';

interface LogStats {
  totalLogs: number;
  errors: number;
  warnings: number;
  pagesProcessed: number;
  assetsDownloaded: number;
  crawlStartTime: string | null;
  crawlEndTime: string | null;
  averagePageProcessingTime: number;
  totalCrawlDuration: number;
  errorDetails: string[];
  performanceMetrics: {
    fastestPage: { url: string; duration: number };
    slowestPage: { url: string; duration: number };
    averageAssetDownloadTime: number;
  };
}

async function analyzeLogs(): Promise<LogStats> {
  try {
    const stats = await logger.getCrawlStats();
    
    // Enhanced analysis
    const logFile = path.join('logs', logger['getLogFileName']());
    const content = await fs.readFile(logFile, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    // Parse performance data
    const pageTimes: { url: string; duration: number }[] = [];
    const assetTimes: number[] = [];
    const errorDetails: string[] = [];
    
    lines.forEach(line => {
      // Extract page processing times
      const pageMatch = line.match(/PAGE_SUCCESS.*\| (\d+)ms/);
      if (pageMatch) {
        const urlMatch = line.match(/\| ([^|]+)$/);
        if (urlMatch) {
          pageTimes.push({
            url: urlMatch[1].trim(),
            duration: parseInt(pageMatch[1])
          });
        }
      }
      
      // Extract asset download times
      const assetMatch = line.match(/ASSET_DOWNLOAD.*\| (\d+)ms/);
      if (assetMatch) {
        assetTimes.push(parseInt(assetMatch[1]));
      }
      
      // Extract error details
      if (line.includes('ERROR')) {
        const errorMatch = line.match(/\| ([^|]+)$/);
        if (errorMatch) {
          errorDetails.push(errorMatch[1].trim());
        }
      }
    });
    
    // Calculate performance metrics
    const fastestPage = pageTimes.length > 0 
      ? pageTimes.reduce((min, current) => current.duration < min.duration ? current : min)
      : { url: 'N/A', duration: 0 };
      
    const slowestPage = pageTimes.length > 0
      ? pageTimes.reduce((max, current) => current.duration > max.duration ? current : max)
      : { url: 'N/A', duration: 0 };
      
    const averagePageTime = pageTimes.length > 0
      ? pageTimes.reduce((sum, page) => sum + page.duration, 0) / pageTimes.length
      : 0;
      
    const averageAssetTime = assetTimes.length > 0
      ? assetTimes.reduce((sum, time) => sum + time, 0) / assetTimes.length
      : 0;
    
    // Calculate total crawl duration
    let totalDuration = 0;
    if (stats.crawlStartTime && stats.crawlEndTime) {
      const start = new Date(stats.crawlStartTime).getTime();
      const end = new Date(stats.crawlEndTime).getTime();
      totalDuration = end - start;
    }
    
    return {
      ...stats,
      averagePageProcessingTime: Math.round(averagePageTime),
      totalCrawlDuration: totalDuration,
      errorDetails,
      performanceMetrics: {
        fastestPage,
        slowestPage,
        averageAssetDownloadTime: Math.round(averageAssetTime)
      }
    };
  } catch (error) {
    console.error('Failed to analyze logs:', error);
    return {
      totalLogs: 0,
      errors: 0,
      warnings: 0,
      pagesProcessed: 0,
      assetsDownloaded: 0,
      crawlStartTime: null,
      crawlEndTime: null,
      averagePageProcessingTime: 0,
      totalCrawlDuration: 0,
      errorDetails: [],
      performanceMetrics: {
        fastestPage: { url: 'N/A', duration: 0 },
        slowestPage: { url: 'N/A', duration: 0 },
        averageAssetDownloadTime: 0
      }
    };
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}m ${seconds}s`;
}

function printStats(stats: LogStats) {
  console.log('\n=== CRAWL LOG ANALYSIS ===\n');
  
  console.log('📊 OVERVIEW:');
  console.log(`  Total Logs: ${stats.totalLogs}`);
  console.log(`  Pages Processed: ${stats.pagesProcessed}`);
  console.log(`  Assets Downloaded: ${stats.assetsDownloaded}`);
  console.log(`  Errors: ${stats.errors}`);
  console.log(`  Warnings: ${stats.warnings}`);
  
  if (stats.crawlStartTime && stats.crawlEndTime) {
    console.log(`\n⏱️  TIMING:`);
    console.log(`  Start: ${new Date(stats.crawlStartTime).toLocaleString()}`);
    console.log(`  End: ${new Date(stats.crawlEndTime).toLocaleString()}`);
    console.log(`  Total Duration: ${formatDuration(stats.totalCrawlDuration)}`);
  }
  
  console.log(`\n🚀 PERFORMANCE:`);
  console.log(`  Average Page Processing: ${formatDuration(stats.averagePageProcessingTime)}`);
  console.log(`  Fastest Page: ${stats.performanceMetrics.fastestPage.url} (${formatDuration(stats.performanceMetrics.fastestPage.duration)})`);
  console.log(`  Slowest Page: ${stats.performanceMetrics.slowestPage.url} (${formatDuration(stats.performanceMetrics.slowestPage.duration)})`);
  console.log(`  Average Asset Download: ${formatDuration(stats.performanceMetrics.averageAssetDownloadTime)}`);
  
  if (stats.errorDetails.length > 0) {
    console.log(`\n❌ ERRORS (${stats.errorDetails.length}):`);
    stats.errorDetails.slice(0, 10).forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
    if (stats.errorDetails.length > 10) {
      console.log(`  ... and ${stats.errorDetails.length - 10} more errors`);
    }
  }
  
  console.log('\n=== END ANALYSIS ===\n');
}

async function main() {
  try {
    const stats = await analyzeLogs();
    printStats(stats);
  } catch (error) {
    console.error('Analysis failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 