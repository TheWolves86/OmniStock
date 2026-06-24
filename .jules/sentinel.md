## 2026-06-24 - Replace execSync with runSync for safe database initialization
**Vulnerability:** Use of `execSync` instead of `runSync` for database initialization. While static, `execSync` is often flagged by static analysis as a potential vector if refactored to include user input, because it does not support parameterization.
**Learning:** `expo-sqlite` allows `execSync` for running multiple statements at once but its lack of parameter bindings is a security risk. Single statements should use `runSync` or `runAsync`.
**Prevention:** Strictly enforce using `runSync` instead of `execSync` for single SQL statements in `expo-sqlite`.
