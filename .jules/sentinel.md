## 2025-02-27 - Implement Explicit Input Length Bounds
**Vulnerability:** Denial of Service (DoS) / App Crash risk due to unbounded inputs in React Native.
**Learning:** React Native `TextInput` components do not have inherent length limits. Attackers or erroneous operations could paste excessively large strings (e.g., megabytes of text), causing severe memory pressure, UI thread freezing, and app crashes, particularly when states are updated on every keystroke.
**Prevention:** Always enforce input length limits by using the `maxLength` property on React Native `TextInput` components and explicitly truncating submission payloads (e.g., using `.slice()`) to prevent DoS risks and ensure data integrity.
