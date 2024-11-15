const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    // 자동으로 테스트 코드 생성
    experimentalStudio: true,

    // 페이지 로드 최대 시간 설정
    pageLoadTimeout: 200000,

    // 화면 크기 설정
    viewportWidth: 1920,
    viewportHeight: 1080,

    // 스크립트 경로 설정
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // 기본 URL 설정
    baseUrl: 'https://www.saucedemo.com/',

    // Chrome 웹 보안 설정
    chromeWebSecurity: false,

    // 도메인 간 요청 무시 설정
    experimentalSkipDomainInjection: [],

    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        saveResponseTimes(responseTimes) {
          const averageResponseTime = (
            responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          ).toFixed(2);
          const logContent =
            `평균 응답시간 : ${averageResponseTime}초\n` +
            responseTimes
              .map(
                (time, index) => `${String(index + 1).padStart(2, '0')}회 : ${time.toFixed(2)}초`
              )
              .join('\n');
          fs.writeFileSync('response_times.log', logContent);
          return null;
        },
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--allow-running-insecure-content');
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process');
          launchOptions.args.push('--start-fullscreen');
          launchOptions.args.push('--user-data-dir=./path/to/your/custom/profile');
        }
        return launchOptions;
      });
    },
  },
});
