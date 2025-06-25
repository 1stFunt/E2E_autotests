const { baseURL } = require('../utils/config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#sdo-login');
    this.passwordInput = page.locator('#sdo-password');
    this.loginButton = page.locator('button.custom-btn__active');
    this.errorNotification = page.locator('.custom-error-notification .el-notification__content');
    this.forgotPasswordButton = page.locator('button.custom-btn__link');
    this.cancelButton = page.locator('button.custom-btn__link.auth-link');
  }

  async goto() {
    await this.page.goto(baseURL);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertErrorMessageVisible() {
    await this.errorNotification.waitFor({ state: 'visible' });
  }

  async openRecoveryForm() {
    await this.forgotPasswordButton.click();
  }

  async isCancelButtonVisible() {
    return await this.cancelButton.isVisible();
  }
}

module.exports = { LoginPage };