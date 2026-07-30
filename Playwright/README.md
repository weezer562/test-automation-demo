# Playwright - Demo

## How to Run
```
npx playwright test
````

### Options

See the browser window: add 
```
--headed
```
Run a single project/browser: 
```
--project=chromium
```
Run one file: 
```
npx playwright test tests/example.spec.ts
```
Run specific Tags:
```
npx playwright --grep @current
```
```
npx playwright --grep "@current|@smoke"
```

Open testing UI: 
```
--ui
```

## Report
```
npx playwright show-report
```
## UI 
```
npx playwright test --ui
```

## Codegen
```
npx playwright codegen WEBSITE
```

Easy to setup test using actual actions

# Debugging with Inspector
```
npx playwright test --debug
```

# Running with trace
Same info in UI mainly for CI 
```
npx playwright test --trace on
```

## Notes
* Easy to setup
* UI has a locator
* Codegen
* Calls have built it waits for loads
* Can use Tags for smoke, or designating what each test does