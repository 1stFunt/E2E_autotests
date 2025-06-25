## Инструкция по запуску тестов

1. Установите [Node.js](https://nodejs.org/) (версия 18 или выше).

2. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/1stFunt/E2E_autotests.git
   cd E2E_autotests
   ```

3. Установите зависимости:

   ```bash
   npm install
   ```

4. Установите браузеры Playwright:

   ```bash
   npx playwright install
   ```

5. Запустите тесты:

   - В headless режиме (по умолчанию):

     ```bash
     npm test
     ```

   - В режиме с открытым браузером:

     ```bash
     npx playwright test --headed
     ```