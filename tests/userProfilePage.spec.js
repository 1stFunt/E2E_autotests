const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { CompanyPage } = require('../pages/CompanyPage');
const { UserProfilePage } = require('../pages/UserProfilePage');
const config = require('../utils/config');

test.describe('Тесты со страницей пользователя после авторизации', () => {
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

  test('Совпадает ли текущий авторизованный пользователь с пользователем, который указан Руководителем в компании', async ({ page }) => {
    // Кликаем на аватар, получаем email из всплывающего окна
    await dashboardPage.userAvatar.click();
    const emailFromAvatar = await dashboardPage.getEmailFromAvatarPopup();

    // Переходим в раздел Компания
    await dashboardPage.openEducationCenterMenu();
    await dashboardPage.clickCompanyMenu();

    // Кликаем на имя руководителя и одновременно ждём открытия новой вкладки
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      companyPage.clickManagerName(),
    ]);
    await newPage.waitForLoadState();

    // Создаём UserProfilePage на основе новой вкладки
    const userProfilePage = new UserProfilePage(newPage);

    // Ждем появления заголовка профиля
    await userProfilePage.waitForUserHeader();

    // Динамически ждем, пока в заголовке не появится email (символ '@')
    await expect.poll(async () => {
      const headerText = await userProfilePage.getUserHeaderText();
      return headerText.includes('@');
    }, { timeout: 5000 }).toBeTruthy();

    // Получаем заголовок и проверяем, что он содержит email из аватара
    const headerText = await userProfilePage.getUserHeaderText();
    expect(headerText).toContain(emailFromAvatar);
  });
});