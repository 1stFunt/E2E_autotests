class DashboardPage {
  constructor(page) {
    this.page = page;
    this.educationCenterMenuHeader = page.locator('[data-cy="submenu-title-ms-education-center"]').locator('..');
    this.companyMenuItem = page.locator('.el-sub-menu.is-opened ul li').first();
    this.userAvatar = page.locator('.el-avatar.cursor-pointer');
    // Добавим локатор для окна с email, которое появляется при клике на аватар
    this.userEmailPopup = page.locator('.font-bold.text-center');
  }

  async openEducationCenterMenu() {
    await this.educationCenterMenuHeader.click();
    await this.companyMenuItem.waitFor({ state: 'visible' });
  }

  async clickCompanyMenu() {
    await this.companyMenuItem.click();
  }

  async isUserAvatarVisible() {
    return await this.userAvatar.isVisible();
  }

  async openUserMenu() {
    await this.userAvatar.click();
    await this.userEmailPopup.waitFor({ state: 'visible' });
  }

  async getEmailFromAvatarPopup() {
    return await this.userEmailPopup.textContent();
  }
}

module.exports = { DashboardPage };