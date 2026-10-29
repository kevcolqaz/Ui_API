type UiTest = typeof import('../fixtures/test-fixtures').test;

export function registerUiHooks(test: UiTest): void {
  test.beforeEach(async ({ page, phoneTestData }) => {
    page.setDefaultNavigationTimeout(phoneTestData.flipkart.navigationTimeoutMs);
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      console.error(`Test failed: ${testInfo.title} (${testInfo.status})`);
    }
  });
}
