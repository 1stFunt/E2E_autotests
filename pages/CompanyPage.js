class CompanyPage {
  constructor(page) {
    this.page = page;
    // Хлебная крошка для проверки, что это страница "Компания"
    this.breadcrumbCompanies = page.locator('span.el-breadcrumb__item > span.el-breadcrumb__inner.is-link').nth(1);
    // Ссылка на имя руководителя (переход на профиль)
    this.managerLink = page.locator('div.description-value > a');
  }

  async isCompanyPageVisible() {
    await this.breadcrumbCompanies.waitFor({ state: 'visible' });
    return await this.breadcrumbCompanies.isVisible();
  }

  async clickManagerName() {
    await this.managerLink.waitFor({ state: 'visible' });
    await this.managerLink.click();
  }
}

module.exports = { CompanyPage };