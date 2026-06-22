## 2025-02-14 - Add Input Length Limits
**Vulnerability:** Missing input length limits on TextInput fields for customerName, customerPhone, and customerAddress in app/addnewbill.tsx, which poses a potential DoS risk and data integrity issue. The customerAddress field was also hardcoded to an empty string on save.
**Learning:** React Native TextInput components require explicit maxLength definitions to prevent excessively large string payloads from being pasted or typed. Also, inputs should be properly sanitized or truncated before interacting with the database.
**Prevention:** Always use maxLength property on TextInput elements matching backend schema constraints and apply truncation on submit payloads as an extra layer of defense.
