## 2026-06-20 - Missing Global Error Boundary for AsyncStorage/SQLite Ops
**Vulnerability:** Core configuration flows (Store Setup) and critical data entry (Add Product) lack global error handling, logging sensitive internal variables and stack traces natively via `String(error)`.
**Learning:** Native device exceptions from `expo-sqlite` and `AsyncStorage` can expose unexpected filesystem paths and database internals when generic stringification is passed directly to `Alert.alert`.
**Prevention:** Implement global structured error logging mechanisms, replacing raw error output to UI components with generic "Failed to complete operation" messages while dumping context explicitly via `console.error`.
