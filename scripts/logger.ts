import fs from 'fs/promises';
import path from 'path';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  details?: any;
  workerId?: string;
  url?: string;
  duration?: number;
}

export interface LogConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  logDir: string;
  maxFileSize: number;
  maxFiles: number;
}

export class Logger {
  private config: LogConfig;
  private logBuffer: LogEntry[] = [];
  private bufferSize = 100;
  private startTime: number;

  constructor(config: Partial<LogConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableFile: true,
      logDir: 'logs',
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      ...config
    };
    this.startTime = Date.now();
    this.ensureLogDir();
  }

  private async ensureLogDir() {
    try {
      await fs.mkdir(this.config.logDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create log directory:', error);
    }
  }

  private getLogFileName(): string {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    return `crawl-${dateStr}.log`;
  }

  private async rotateLogs() {
    try {
      const logFile = path.join(this.config.logDir, this.getLogFileName());
      const stats = await fs.stat(logFile).catch(() => null);
      
      if (stats && stats.size > this.config.maxFileSize) {
        // Archive current log and start new one
        const archiveName = `crawl-${Date.now()}.log`;
        await fs.rename(logFile, path.join(this.config.logDir, archiveName));
        
        // Clean up old logs
        const files = await fs.readdir(this.config.logDir);
        const logFiles = files
          .filter(f => f.startsWith('crawl-') && f.endsWith('.log'))
          .sort()
          .reverse();
        
        if (logFiles.length > this.config.maxFiles) {
          for (const file of logFiles.slice(this.config.maxFiles)) {
            await fs.unlink(path.join(this.config.logDir, file));
          }
        }
      }
    } catch (error) {
      console.error('Log rotation failed:', error);
    }
  }

  private formatLogEntry(entry: LogEntry): string {
    const levelStr = LogLevel[entry.level].padEnd(5);
    const categoryStr = entry.category.padEnd(15);
    const workerStr = entry.workerId ? `[${entry.workerId}]` : '';
    const urlStr = entry.url ? ` | ${entry.url}` : '';
    const durationStr = entry.duration ? ` | ${entry.duration}ms` : '';
    const detailsStr = entry.details ? ` | ${JSON.stringify(entry.details)}` : '';
    
    return `${entry.timestamp} | ${levelStr} | ${categoryStr} | ${entry.message}${workerStr}${urlStr}${durationStr}${detailsStr}`;
  }

  private async writeToFile(entry: LogEntry) {
    try {
      await this.rotateLogs();
      const logFile = path.join(this.config.logDir, this.getLogFileName());
      const logLine = this.formatLogEntry(entry) + '\n';
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private log(level: LogLevel, category: string, message: string, details?: any, workerId?: string, url?: string, duration?: number) {
    if (level < this.config.level) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      details,
      workerId,
      url,
      duration
    };

    this.logBuffer.push(entry);

    // Console output
    if (this.config.enableConsole) {
      const consoleMessage = this.formatLogEntry(entry);
      if (level >= LogLevel.ERROR) {
        console.error(consoleMessage);
      } else if (level >= LogLevel.WARN) {
        console.warn(consoleMessage);
      } else {
        console.log(consoleMessage);
      }
    }

    // File output
    if (this.config.enableFile) {
      this.writeToFile(entry);
    }

    // Flush buffer if full
    if (this.logBuffer.length >= this.bufferSize) {
      this.logBuffer = [];
    }
  }

  debug(category: string, message: string, details?: any, workerId?: string, url?: string) {
    this.log(LogLevel.DEBUG, category, message, details, workerId, url);
  }

  info(category: string, message: string, details?: any, workerId?: string, url?: string, duration?: number) {
    this.log(LogLevel.INFO, category, message, details, workerId, url, duration);
  }

  warn(category: string, message: string, details?: any, workerId?: string, url?: string) {
    this.log(LogLevel.WARN, category, message, details, workerId, url);
  }

  error(category: string, message: string, details?: any, workerId?: string, url?: string) {
    this.log(LogLevel.ERROR, category, message, details, workerId, url);
  }

  critical(category: string, message: string, details?: any, workerId?: string, url?: string) {
    this.log(LogLevel.CRITICAL, category, message, details, workerId, url);
  }

  // Crawl-specific logging methods
  crawlStart(url: string, maxPages: number, concurrency: number) {
    this.info('CRAWL_START', `Starting crawl of ${url}`, {
      maxPages,
      concurrency,
      startTime: new Date().toISOString()
    });
  }

  pageProcessed(workerId: string, url: string, depth: number, duration: number, success: boolean) {
    const category = success ? 'PAGE_SUCCESS' : 'PAGE_ERROR';
    this.info(category, `Page processed`, {
      depth,
      success
    }, workerId, url, duration);
  }

  assetDownloaded(workerId: string, url: string, type: string, filePath: string, duration: number) {
    this.info('ASSET_DOWNLOAD', `Asset downloaded`, {
      type,
      filePath,
      size: 'N/A' // Could be enhanced to include actual file size
    }, workerId, url, duration);
  }

  crawlComplete(stats: {
    totalPages: number;
    totalAssets: number;
    errors: number;
    duration: number;
  }) {
    this.info('CRAWL_COMPLETE', `Crawl completed successfully`, {
      ...stats,
      endTime: new Date().toISOString()
    });
  }

  // Performance tracking
  startTimer(): () => number {
    const start = Date.now();
    return () => Date.now() - start;
  }

  // Get crawl statistics
  async getCrawlStats(): Promise<any> {
    try {
      const logFile = path.join(this.config.logDir, this.getLogFileName());
      const content = await fs.readFile(logFile, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      const stats = {
        totalLogs: lines.length,
        errors: lines.filter(line => line.includes('ERROR')).length,
        warnings: lines.filter(line => line.includes('WARN')).length,
        pagesProcessed: lines.filter(line => line.includes('PAGE_SUCCESS')).length,
        assetsDownloaded: lines.filter(line => line.includes('ASSET_DOWNLOAD')).length,
        crawlStartTime: null as string | null,
        crawlEndTime: null as string | null
      };

      // Extract crawl start/end times
      const startLine = lines.find(line => line.includes('CRAWL_START'));
      const endLine = lines.find(line => line.includes('CRAWL_COMPLETE'));
      
      if (startLine) {
        const match = startLine.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/);
        if (match) stats.crawlStartTime = match[1];
      }
      
      if (endLine) {
        const match = endLine.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/);
        if (match) stats.crawlEndTime = match[1];
      }

      return stats;
    } catch (error) {
      return { error: 'Failed to read log file' };
    }
  }
}

// Export singleton instance
export const logger = new Logger(); 