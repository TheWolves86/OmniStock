## 2024-05-15 - Data Remanence on App Reset
**Vulnerability:** Data Remanence in `app/(tabs)/settings.tsx`. The reset actions (`resetApp` and `deleteEverything`) only cleared `AsyncStorage`, leaving sensitive business data in the `expo-sqlite` database (`omnistock.db`) completely intact.
**Learning:** Clearing one storage mechanism (like `AsyncStorage` for simple key-value pairs) does not automatically cascade to other local storage like SQLite databases. This leaves seemingly deleted sensitive data accessible on the device.
**Prevention:** Always identify and comprehensively wipe all persistent data stores (AsyncStorage, SQLite, file system caches, secure store, etc.) when building app reset or secure wipe functionality.
