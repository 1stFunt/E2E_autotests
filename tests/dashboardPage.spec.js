const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { CompanyPage } = require('../pages/CompanyPage');
const config = require('../utils/config');

test.describe('Тесты с дашбордом после авторизации', () => {
  let loginPage;
  let dashboardPage;
  let companyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    companyPage = new CompanyPage(page);
    await loginPage.goto(config.baseUrl);
    await loginPage.login(config.validUser.email, config.validUser.password);
  });

  test('Доступность страницы Компания после авторизации', async ({ page }) => {
    await dashboardPage.openEducationCenterMenu();
    await dashboardPage.clickCompanyMenu();
    const visible = await companyPage.isCompanyPageVisible();
    expect(visible).toBe(true);
  });
});