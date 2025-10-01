# AI-DTG Website Crawler

웹사이트 크롤링 및 오프라인 저장을 위한 고성능 도구입니다.

## 🚀 주요 기능

- **고성능 크롤링**: Playwright 기반 멀티스레드 크롤링
- **완전한 오프라인 저장**: HTML, CSS, JS, 이미지, 폰트 등 모든 자산 저장
- **체계적인 로깅**: 상세한 진행 상황 추적 및 성능 모니터링
- **재개 기능**: 중단된 크롤링 작업 재개 지원
- **스마트 자산 처리**: CSS 내부 URL 자동 처리

## 📊 로깅 시스템

### 로그 레벨
- `DEBUG`: 상세한 디버깅 정보
- `INFO`: 일반적인 진행 상황
- `WARN`: 경고 메시지
- `ERROR`: 오류 발생
- `CRITICAL`: 심각한 오류

### 로그 카테고리
- `CRAWL_START`: 크롤링 시작
- `PAGE_SUCCESS`: 페이지 처리 성공
- `PAGE_ERROR`: 페이지 처리 실패
- `ASSET_DOWNLOAD`: 자산 다운로드
- `CRAWL_COMPLETE`: 크롤링 완료

## 🛠️ 사용법

### 기본 크롤링
```bash
npm run crawl [URL] [--max PAGES] [--concurrency WORKERS] [--prefix PATH_PREFIX]
```

### 사이트 크롤링 (기본 설정)
```bash
npm run crawl:site
```

### 로그 분석
```bash
npm run logs
```

### 실시간 로그 모니터링
```bash
npm run logs:watch
```

### 결과 미리보기
```bash
npm run preview
```

## 📁 프로젝트 구조

```
AI-DTG Website/
├── scripts/
│   ├── crawl.ts          # 메인 크롤링 엔진
│   ├── logger.ts         # 로깅 시스템
│   ├── log-analyzer.ts   # 로그 분석 도구
│   └── util.ts           # 유틸리티 함수
├── output/               # 크롤링 결과물
├── logs/                 # 로그 파일들
├── types/                # TypeScript 타입 정의
└── package.json
```

## 📈 성능 모니터링

### 추적 가능한 메트릭
- 페이지 처리 시간 (평균/최소/최대)
- 자산 다운로드 성공률
- 에러 발생 빈도
- 전체 크롤링 소요 시간
- 워커별 성능 분석

### 로그 분석 예시
```bash
npm run logs
```

출력 예시:
```
=== CRAWL LOG ANALYSIS ===

📊 OVERVIEW:
  Total Logs: 1,247
  Pages Processed: 45
  Assets Downloaded: 1,202
  Errors: 3
  Warnings: 12

⏱️  TIMING:
  Start: 2024-01-07 10:30:15
  End: 2024-01-07 10:45:32
  Total Duration: 15m 17s

🚀 PERFORMANCE:
  Average Page Processing: 2.3s
  Fastest Page: /beetle_x31/ (800ms)
  Slowest Page: /beetle_x31/specs (8.5s)
  Average Asset Download: 150ms
```

## 🔧 설정

### 로그 설정
`scripts/logger.ts`에서 다음 설정을 조정할 수 있습니다:

```typescript
const config: LogConfig = {
  level: LogLevel.INFO,        // 로그 레벨
  enableConsole: true,         // 콘솔 출력 활성화
  enableFile: true,            // 파일 출력 활성화
  logDir: 'logs',              // 로그 디렉토리
  maxFileSize: 10 * 1024 * 1024, // 최대 파일 크기 (10MB)
  maxFiles: 5                  // 보관할 로그 파일 수
};
```

### 크롤링 설정
- `--max`: 최대 페이지 수 (기본값: 200)
- `--concurrency`: 동시 워커 수 (기본값: 4)
- `--prefix`: 크롤링할 경로 접두사
- `--no-resume`: 재개 기능 비활성화

## 📝 로그 파일 형식

```
2024-01-07T10:30:15.123Z | INFO  | CRAWL_START     | Starting crawl of https://ssd.skhynix.com/beetle_x31/ |  |  | {"maxPages":1000,"concurrency":6,"startTime":"2024-01-07T10:30:15.123Z"}
2024-01-07T10:30:16.456Z | INFO  | PAGE_SUCCESS     | Page processed | [1] | https://ssd.skhynix.com/beetle_x31/ | 1333ms | {"depth":0,"success":true}
2024-01-07T10:30:17.789Z | INFO  | ASSET_DOWNLOAD   | Asset downloaded | [1] | https://ssd.skhynix.com/beetle_x31/style.css | 45ms | {"type":"css","filePath":"style.css","size":"N/A"}
```

## 🚨 문제 해결

### 일반적인 문제들
1. **메모리 부족**: `--concurrency` 값을 줄여보세요
2. **타임아웃**: 네트워크 상태를 확인하고 `TIMEOUT_MS` 값을 조정하세요
3. **로그 파일 크기**: `maxFileSize`와 `maxFiles` 설정을 조정하세요

### 디버깅
```bash
# 상세 로그 활성화
npm run crawl -- --debug

# 로그 실시간 모니터링
npm run logs:watch
```

## 📊 프로젝트 진행 상황

### 완료된 작업
- ✅ 기본 크롤링 엔진 구현
- ✅ 로깅 시스템 구축
- ✅ 성능 모니터링 도구
- ✅ 로그 분석 및 통계
- ✅ 에러 추적 및 보고

### 진행 중인 작업
- 🔄 로그 시각화 대시보드
- 🔄 실시간 성능 알림
- 🔄 크롤링 작업 스케줄링

### 계획된 작업
- 📋 웹 기반 로그 뷰어
- 📋 성능 메트릭 API
- 📋 자동 크롤링 최적화
- 📋 클라우드 로그 저장

## 🤝 기여하기

1. 이슈를 등록하거나 기존 이슈를 확인하세요
2. 기능 브랜치를 생성하세요
3. 변경사항을 커밋하고 테스트하세요
4. Pull Request를 생성하세요

## 📄 라이선스

ISC License 