const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const config = require('../utils/config');

test.describe('Тесты авторизации', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto(config.baseUrl);
  });

  test('Успешный вход', async () => {
    await loginPage.login(config.validUser.email, config.validUser.password);
    await expect(dashboardPage.userAvatar).toBeVisible();
  });

  test('Ошибка при вводе неверного логина или пароля', async () => {
    await loginPage.login(config.invalidUser.email, config.invalidUser.password);
    await loginPage.errorNotification.waitFor({ state: 'visible' });
    await expect(loginPage.errorNotification).toHaveText('Bad credentials.');
  });

  test('Наличие формы восстановления пароля', async () => {
    await loginPage.openRecoveryForm();
    const isVisible = await loginPage.isRecoveryButtonVisible();
    expect(isVisible).toBeTruthy();
  });
});