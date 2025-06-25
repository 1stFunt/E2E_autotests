class UserProfilePage {
  constructor(page) {
    this.page = page;
    this.userHeader = page.locator('h1');
  }

  // Ожидание появления заголовка — без проверки содержания
  async waitForUserHeader() {
    await this.userHeader.waitFor({ state: 'visible' });
  }

  // Возвращаем текст заголовка как есть
  async getUserHeaderText() {
    return await this.userHeader.textContent();
  }
}

module.exports = { UserProfilePage };