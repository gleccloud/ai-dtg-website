import { logger } from './logger';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

interface DashboardData {
  lastUpdate: string;
  crawlStatus: 'idle' | 'running' | 'completed' | 'error';
  currentProgress: {
    pagesProcessed: number;
    totalPages: number;
    assetsDownloaded: number;
    errors: number;
    warnings: number;
  };
  performance: {
    averagePageTime: number;
    totalDuration: number;
    startTime: string | null;
  };
  recentActivity: string[];
}

class Dashboard {
  private rl: readline.Interface;
  private isRunning = false;
  private refreshInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    this.isRunning = true;
    console.clear();
    console.log('🚀 AI-DTG Website Crawler Dashboard');
    console.log('Press Ctrl+C to exit\n');

    this.setupEventHandlers();
    await this.startRefreshLoop();
  }

  private setupEventHandlers() {
    this.rl.on('SIGINT', () => {
      this.stop();
    });

    this.rl.on('line', (input) => {
      this.handleInput(input.trim());
    });
  }

  private handleInput(input: string) {
    switch (input.toLowerCase()) {
      case 'q':
      case 'quit':
      case 'exit':
        this.stop();
        break;
      case 'r':
      case 'refresh':
        this.refresh();
        break;
      case 'h':
      case 'help':
        this.showHelp();
        break;
      case 'l':
      case 'logs':
        this.showRecentLogs();
        break;
      case 's':
      case 'stats':
        this.showDetailedStats();
        break;
      default:
        if (input) {
          console.log(`Unknown command: ${input}. Type 'h' for help.`);
        }
    }
  }

  private showHelp() {
    console.log('\n📋 Available Commands:');
    console.log('  h, help     - Show this help');
    console.log('  r, refresh  - Refresh dashboard');
    console.log('  l, logs     - Show recent logs');
    console.log('  s, stats    - Show detailed statistics');
    console.log('  q, quit     - Exit dashboard');
    console.log('');
  }

  private async startRefreshLoop() {
    this.refreshInterval = setInterval(() => {
      if (this.isRunning) {
        this.refresh();
      }
    }, 5000); // Refresh every 5 seconds
  }

  private async refresh() {
    try {
      const data = await this.getDashboardData();
      this.displayDashboard(data);
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
    }
  }

  private async getDashboardData(): Promise<DashboardData> {
    try {
      const stats = await logger.getCrawlStats();
      
      // Determine crawl status
      let crawlStatus: DashboardData['crawlStatus'] = 'idle';
      if (stats.crawlStartTime && !stats.crawlEndTime) {
        crawlStatus = 'running';
      } else if (stats.crawlStartTime && stats.crawlEndTime) {
        crawlStatus = stats.errors > 0 ? 'error' : 'completed';
      }

      // Get recent activity
      const recentActivity = await this.getRecentActivity();

      // Calculate progress
      const totalPages = stats.pagesProcessed + (stats.errors || 0);
      const progress = {
        pagesProcessed: stats.pagesProcessed,
        totalPages: totalPages || 1,
        assetsDownloaded: stats.assetsDownloaded,
        errors: stats.errors,
        warnings: stats.warnings
      };

      // Calculate performance
      const performance = {
        averagePageTime: 0, // Will be calculated from logs
        totalDuration: 0,
        startTime: stats.crawlStartTime
      };

      if (stats.crawlStartTime && stats.crawlEndTime) {
        const start = new Date(stats.crawlStartTime).getTime();
        const end = new Date(stats.crawlEndTime).getTime();
        performance.totalDuration = end - start;
      }

      return {
        lastUpdate: new Date().toISOString(),
        crawlStatus,
        currentProgress: progress,
        performance,
        recentActivity
      };
    } catch (error) {
      return {
        lastUpdate: new Date().toISOString(),
        crawlStatus: 'error',
        currentProgress: { pagesProcessed: 0, totalPages: 0, assetsDownloaded: 0, errors: 1, warnings: 0 },
        performance: { averagePageTime: 0, totalDuration: 0, startTime: null },
        recentActivity: ['Failed to load dashboard data']
      };
    }
  }

  private async getRecentActivity(): Promise<string[]> {
    try {
      const logFile = path.join('logs', logger['getLogFileName']());
      const content = await fs.readFile(logFile, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      return lines.slice(-10).map(line => {
        const parts = line.split(' | ');
        if (parts.length >= 4) {
          const timestamp = parts[0];
          const level = parts[1];
          const category = parts[2];
          const message = parts[3];
          return `${timestamp} | ${level} | ${category} | ${message}`;
        }
        return line;
      });
    } catch (error) {
      return ['No log data available'];
    }
  }

  private displayDashboard(data: DashboardData) {
    console.clear();
    console.log('🚀 AI-DTG Website Crawler Dashboard');
    console.log(`Last Update: ${new Date(data.lastUpdate).toLocaleString()}\n`);

    // Status
    const statusEmoji = {
      idle: '⏸️',
      running: '🔄',
      completed: '✅',
      error: '❌'
    };
    console.log(`${statusEmoji[data.crawlStatus]} Status: ${data.crawlStatus.toUpperCase()}\n`);

    // Progress
    if (data.crawlStatus === 'running' || data.crawlStatus === 'completed') {
      const progressPercent = Math.round((data.currentProgress.pagesProcessed / data.currentProgress.totalPages) * 100);
      console.log('📊 Progress:');
      console.log(`  Pages: ${data.currentProgress.pagesProcessed}/${data.currentProgress.totalPages} (${progressPercent}%)`);
      console.log(`  Assets: ${data.currentProgress.assetsDownloaded}`);
      console.log(`  Errors: ${data.currentProgress.errors}`);
      console.log(`  Warnings: ${data.currentProgress.warnings}\n`);
    }

    // Performance
    if (data.performance.startTime) {
      console.log('⏱️  Performance:');
      if (data.performance.totalDuration > 0) {
        console.log(`  Total Duration: ${this.formatDuration(data.performance.totalDuration)}`);
      }
      if (data.performance.averagePageTime > 0) {
        console.log(`  Average Page Time: ${this.formatDuration(data.performance.averagePageTime)}`);
      }
      console.log(`  Started: ${data.performance.startTime ? new Date(data.performance.startTime).toLocaleString() : 'N/A'}\n`);
    }

    // Recent Activity
    console.log('📝 Recent Activity:');
    data.recentActivity.slice(-5).forEach(activity => {
      console.log(`  ${activity}`);
    });

    console.log('\n💡 Commands: h(help) | r(refresh) | l(logs) | s(stats) | q(quit)');
  }

  private formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}m ${seconds}s`;
  }

  private async showRecentLogs() {
    try {
      const logFile = path.join('logs', logger['getLogFileName']());
      const content = await fs.readFile(logFile, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      console.log('\n📋 Recent Logs (Last 20):\n');
      lines.slice(-20).forEach(line => {
        console.log(line);
      });
      console.log('\nPress Enter to return to dashboard...');
    } catch (error) {
      console.log('No logs available');
    }
  }

  private async showDetailedStats() {
    try {
      const stats = await logger.getCrawlStats();
      console.log('\n📊 Detailed Statistics:\n');
      console.log(`Total Logs: ${stats.totalLogs}`);
      console.log(`Pages Processed: ${stats.pagesProcessed}`);
      console.log(`Assets Downloaded: ${stats.assetsDownloaded}`);
      console.log(`Errors: ${stats.errors}`);
      console.log(`Warnings: ${stats.warnings}`);
      
      if (stats.crawlStartTime) {
        console.log(`Crawl Start: ${new Date(stats.crawlStartTime).toLocaleString()}`);
      }
      if (stats.crawlEndTime) {
        console.log(`Crawl End: ${new Date(stats.crawlEndTime).toLocaleString()}`);
      }
      
      console.log('\nPress Enter to return to dashboard...');
    } catch (error) {
      console.log('Failed to load statistics');
    }
  }

  private stop() {
    this.isRunning = false;
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.rl.close();
    console.log('\n👋 Dashboard stopped. Goodbye!');
    process.exit(0);
  }
}

async function main() {
  const dashboard = new Dashboard();
  await dashboard.start();
}

if (require.main === module) {
  main().catch(console.error);
} 