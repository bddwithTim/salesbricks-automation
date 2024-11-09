# Salesbricks Automation

This repository showcases automated testing capabilities as part of a take-home coding challenge, focusing on functional testing scenarios.

## 🛠 Tech Stack

- Playwright
- TypeScript
- ESLint + Prettier
- Husky (Git Hooks)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bddwithTim/salesbricks-automation.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install Playwright browsers
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### 🎯 Default Behavior: Run Tests on All Browsers
By default, when you execute tests, Playwright will run them across all configured browsers (Chrome, Edge, Firefox, WebKit). This provides comprehensive cross-browser coverage.

```bash
npx playwright test --grep @smoke
```

### Run tests in specific browsers
```bash
npm run test:chrome    # Run in Chrome
npm run test:firefox   # Run in Firefox
npm run test:webkit    # Run in Safari
npm run test:edge      # Run in Edge
```

### Run specific test file
```bash
npx playwright test tests/checkOutFlow.test.ts
```

### Run tests with UI Mode
```bash
npx playwright test --ui
```

### Run tests with specific tag
### 🏷 Test Tags

- `@smoke`: Critical path tests
- `@functional`: Functional validation tests
- `@regression`: Regression tests

```bash
# Single tag
npm run test:smoke       # Run smoke tests
npm run test:functional  # Run functional tests
npm run test:regression  # Run regression tests

# Or using npx directly
npx playwright test --grep @smoke

# Multiple tags
npx playwright test --grep "@smoke|@functional"     # Run tests with either @smoke OR @functional
npx playwright test --grep "@smoke&@functional"     # Run tests with both @smoke AND @functional
```
   
### Run tests with tag and specific browser
```bash
npm run test:chrome -- --grep @smoke           # Run smoke tests in Chrome
npm run test:firefox -- --grep @functional     # Run functional tests in Firefox
npm run test:webkit -- --grep "@smoke|@functional"  # Run smoke OR functional tests in Safari
```

### Run tests with single worker
```bash
npm run test:chrome -- --workers=1 --grep @smoke    # Run smoke tests in Chrome with single worker
npm run test:firefox -- --workers=1                 # Run all tests in Firefox with single worker
```

## ⚠️ Automation Limitations

The current automation repository primarily supports functional testing for web applications on desktop browsers. However, it is important to note that mobile automation is not supported at this time.

