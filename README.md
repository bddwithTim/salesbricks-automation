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
   git clone [your-repo-url]
   cd salesbrick-automation
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

### Run all tests
   ```bash
   npx playwright test
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
   ```bash
   npx playwright test --grep @smoke
   ```

## 🏷 Test Tags

- `@smoke`: Critical path tests
- `@functional`: Functional validation tests
- `@regression`: Regression tests
