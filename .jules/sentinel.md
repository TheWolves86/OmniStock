## 2024-06-27 - Unbounded React State Inputs Leading to DoS
**Vulnerability:** React Native TextInput components missing maxLength limits and unbounded state strings saved to AsyncStorage.
**Learning:** React state (`useState`) can theoretically hold huge strings if pasted by the user. While UI frameworks might truncate rendering, storing multi-megabyte strings into state and later into persistent storage (AsyncStorage/SQLite) without explicit backend/API logic can result in local Denial-of-Service via storage exhaustion or app crashing on load.
**Prevention:** Always explicitly define `maxLength` on `<TextInput>` components, and ALWAYS truncate payloads via `.slice()` before committing them to storage (e.g. `AsyncStorage.setItem`), even if UI validation seems present.
