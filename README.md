# 🎭 TurnGreen – End-to-End Automated Tests

Automated test project using **Playwright** and **TypeScript** for the TurnGreen platform, featuring **FusionAuth** authentication, **Allure Reports**, CI/CD integration with Bitbucket Pipelines, and cross-browser testing.

---

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Allure Reports](#-allure-reports)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Environment Variables](#-environment-variables)
- [Project Patterns](#-project-patterns)
- [Contributing](#-contributing)

---

## 📁 Project Structure
```
.
├── tests/                    # Test specs organized by feature
│   ├── oportunidades.test.ts # Opportunities test suite
│   ├── home.test.ts          # Home page tests
│   └── signup.test.ts        # Sign up flow tests
├── pages/                    # Page Object Model (POM)
│   ├── EnergiaSolarPage.ts   # Energia Solar page object
│   └── FusionAuthLoginPage.ts # FusionAuth login page object
├── utils/                    # Helper utilities
│   └── env.ts                # Environment variable helpers
├── test-results/             # Playwright test results and traces
├── allure-results/           # Raw Allure result files (JSON)
├── allure-report/            # Generated Allure HTML report
├── .github/workflows/        # GitHub Actions CI configuration (legacy)
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies and scripts
├── .env                      # Local environment variables (NOT in version control)
├── .env.example              # Template for environment variables
└── README.md                 # Project documentation
```

---

## 🛠 Technologies

- **[Playwright](https://playwright.dev/)** `^1.54.1` - Modern end-to-end testing framework
- **[TypeScript](https://www.typescriptlang.org/)** `^5.8.3` - Type-safe JavaScript
- **[Allure Report](https://docs.qameta.io/allure/)** `^2.36.0` - Beautiful test reporting
- **[Dotenv](https://github.com/motdotla/dotenv)** `^17.2.1` - Environment variable management
- **[FusionAuth](https://fusionauth.io/)** - Authentication and user management
- **Bitbucket Pipelines** - CI/CD automation

---

## ✅ Prerequisites

Before running this project, ensure you have:

- **Node.js** `v24.11.0` or higher ([Download](https://nodejs.org/))
- **npm** `v10.x` or higher
- **Java JDK** `21+` (required for Allure reports) ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Git** for version control

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://bitbucket.org/craftablesoftware/e2e-turngreen.git
cd e2e-turngreen
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

### 4. Set up environment variables

**Create a `.env` file from the template:**
```bash
cp .env.example .env
```

**Edit the `.env` file with your credentials:**
```env
# FusionAuth Credentials
FUSION_EMAIL=your_fusion_email_here
FUSION_PASSWORD=your_fusion_password_here

# CMS Login Credentials
CMS_LOGIN_EMAIL=your_cms_email_here
CMS_LOGIN_PASSWORD=your_cms_password_here
```

⚠️ **Important:** 
- **Never commit the `.env` file** - it contains sensitive credentials
- The `.env` file is already in `.gitignore`
- Ask your team lead for the actual credentials if you don't have them

---

## 🧪 Running Tests

### Run all tests (headless)
```bash
npm test
```

### Run tests with browser visible (headed mode)
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/oportunidades.test.ts
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug tests
```bash
npx playwright test --debug
```

---

## 📊 Allure Reports

### Generate and open Allure report locally

**Option 1: Generate + Open (Recommended)**
```bash
npm run allure:serve
```

This command generates the report and opens it automatically in your browser.

**Option 2: Generate then Open manually**
```bash
# Generate report
npm run allure:generate

# Open report
npm run allure:open
```

### Run tests and view report automatically
```bash
npm run test:allure
```

This runs all tests, generates the Allure report, and opens it in your browser.

### View report structure

The Allure report includes:
- ✅ Test execution summary with pass/fail statistics
- 📊 Graphs and charts (test trends, duration, retries)
- 📸 **Screenshots** attached to failed tests
- 🎥 **Video recordings** of test execution
- 📋 **Traces** for debugging (Playwright trace viewer)
- 🗂️ **Categories** (Product defects, Test defects, Ignored tests)
- 🌍 **Environment information** (Framework, Node version, Browser)

### View Allure Reports Online

The latest Allure report is automatically published to GitHub Pages after each pipeline run:

🔗 **[View Latest Report](https://craftablesoftware.github.io/turngreen-e2e-test-reports/)**

---

## 🚀 CI/CD Pipeline

### Bitbucket Pipelines

This project uses **Bitbucket Pipelines** for automated testing on every push/PR.

**Pipeline workflow:**
1. Install dependencies (`npm ci`)
2. Install Playwright browsers (`npx playwright install --with-deps`)
3. Export environment variables from Bitbucket Repository Variables
4. Run Playwright tests (`npm test`)
5. **Send Slack notification (only on test failures)** 🔔
6. Generate Allure report (`allure generate`)
7. Upload artifacts (traces, screenshots, videos)
8. Deploy Allure report to GitHub Pages

**Pipeline configuration:** `bitbucket-pipelines.yml`

### Slack Notifications

The pipeline is configured to send notifications to Slack **only when tests fail**.

**Notification includes:**
- ❌ Build status (FAILED)
- 🔢 Build number
- 🌿 Branch name
- 📝 Commit hash
- 🔗 Links to pipeline and Allure report

**When notifications are sent:**
- ✅ Tests fail → Slack notification is sent
- ✅ Tests pass → No notification (silent success)

---

## 🔐 Environment Variables

### Local Development

Environment variables are loaded from the `.env` file in the project root.

| Variable              | Description                          | Required |
|-----------------------|--------------------------------------|----------|
| `FUSION_EMAIL`        | FusionAuth login email/username      | Yes      |
| `FUSION_PASSWORD`     | FusionAuth login password            | Yes      |
| `CMS_LOGIN_EMAIL`     | CMS admin login email                | Yes      |
| `CMS_LOGIN_PASSWORD`  | CMS admin login password             | Yes      |

### CI/CD Pipeline (Bitbucket)

For the CI/CD pipeline, environment variables are stored securely in **Bitbucket Repository Variables**.

**To configure Bitbucket variables:**
1. Go to: **Repository Settings** → **Pipelines** → **Repository variables**
2. Add the following variables (mark as "Secured"):
   - `FUSION_EMAIL`
   - `FUSION_PASSWORD`
   - `CMS_LOGIN_EMAIL`
   - `CMS_LOGIN_PASSWORD`
   - `SLACK_WEBHOOK_URL` (for notifications)
   - `GITHUB_TOKEN` (for deploying reports)
   - `GITHUB_REPO` (for deploying reports)

**Important Notes:**
- ⚠️ **Never commit the `.env` file** to version control
- ⚠️ The `.env` file is already in `.gitignore`
- ✅ Use `.env.example` as a template for new team members
- ✅ Bitbucket variables are encrypted and hidden in pipeline logs

### How Environment Variables Work

**Local Development:**
```
npm test → Playwright loads .env → Tests use credentials
```

**CI/CD Pipeline:**
```
Pipeline triggered → Exports Bitbucket variables → Tests use credentials
```

### Troubleshooting

**Problem:** Tests fail with "undefined" credentials

**Solution:**
```bash
# Verify .env exists
ls -la | grep .env

# Check .env content
cat .env

# Recreate from template if needed
cp .env.example .env
# Then edit .env with your credentials
```

---

## 🎯 Project Patterns

### Page Object Model (POM)

All pages follow the Page Object Model pattern:
```typescript
// pages/FusionAuthLoginPage.ts
export class FusionAuthLoginPage {
  constructor(private readonly page: Page) {}

  // Locators
  readonly loginIdField: Locator = this.page.locator('input[name="loginId"]');
  readonly passwordField: Locator = this.page.locator('input[name="password"]');
  readonly submitButton: Locator = this.page.getByRole('button', { name: 'Submit' });

  // Actions
  async login(email: string, password: string) {
    await this.loginIdField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}
```

### Test Structure
```typescript
test.describe('Feature Name', () => {
  test('Test case description', async ({ page }) => {
    const fusionAuthPage = new FusionAuthLoginPage(page);
    
    // Arrange
    const email = getEnvOrThrow('FUSION_EMAIL');
    const password = getEnvOrThrow('FUSION_PASSWORD');
    
    // Act
    await fusionAuthPage.login(email, password);
    
    // Assert
    await expect(page).toHaveURL(/.*energia-solar.*/);
  });
});
```

### Environment Variable Helper

```typescript
// utils/env.ts
export function getEnvOrThrow(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} não definido no .env`);
  }
  return value;
}
```

---

## 📝 Available Scripts

| Script              | Description                                      |
|---------------------|--------------------------------------------------|
| `npm test`          | Run all tests (headless)                         |
| `npm run test:headed` | Run tests with browser visible                 |
| `npm run test:ui`   | Run tests in Playwright UI mode                  |
| `npm run allure:generate` | Generate Allure report from results        |
| `npm run allure:open` | Open generated Allure report                   |
| `npm run allure:serve` | Generate and serve Allure report              |
| `npm run test:allure` | Run tests + generate + open report             |

---

## 🤝 Contributing

1. Create a new branch from `master`
```bash
   git checkout -b feature/my-new-feature
```

2. Make your changes and commit
```bash
   git add .
   git commit -m "feat: add new test for X feature"
```

3. Push to Bitbucket
```bash
   git push origin feature/my-new-feature
```

4. Create a Pull Request in Bitbucket

---

## 📧 Contact

**QA Team Lead:** Rodrigo Silva  
**Repository:** [Bitbucket - e2e-turngreen](https://bitbucket.org/craftablesoftware/e2e-turngreen)

---

## 📜 License

ISC License

---

