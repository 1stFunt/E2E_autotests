const { baseURL } = require('../utils/config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#sdo-login');
    this.passwordInput = page.locator('#sdo-password');
    this.loginButton = page.locator('button.custom-btn__active');
    this.errorNotification = page.locator('text=Bad credentials.');
    this.forgotPasswordButton = page.locator('button.custom-btn__link');
    this.recoverySubmitButton = page.locator('button.custom-btn__active');
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

  async isRecoveryButtonVisible() {
    return await this.recoverySubmitButton.isVisible();
  }
}

module.exports = { LoginPage };