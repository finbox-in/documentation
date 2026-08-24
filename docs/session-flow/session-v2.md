---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v2 # version of API
---

**FinBox BankConnect Session API (V2) enables seamless creation of journeys for retrieving financial information (Bank Statements, AA Data, AMC, Stocks, etc.) using customizable consent templates. This version removes earlier limitations and supports flexible FI types and multiple consents with organization-specific overrides.**

## Migration from V1 to V2

This section outlines the key differences between [Session API V1](/session-flow/submit-data.html) and [Session API V2](/session-flow/session-v2.html#session-api-v2-specification), and highlights the improvements introduced in the V2 rollout.

### Migration Summary Table

| **Component**         | **V1**                                                        | **V2**                                                        |
| --------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| **Session API URL**   | `https://apis.bankconnect.finbox.in/bank-connect/v1/session/` | `https://apis.bankconnect.finbox.in/bank-connect/v2/session/` |
| **Headers**           | `{ "X-Api-Key": "XXXXX" }`                                    | `{ "X-Api-Key": "XXXXX" }`                                    |
| **Basic Payload**     | `{ "link_id": "TU-1234" }`                                    | `{ "link_id": "TU-1234" }`                                    |
| **Redirect URL**      | Returns only `session_id`                                     | Returns `session_id` **+ secure hash token**                  |
| **Hash Token**        | ❌ Not present                                                | ✔️ Present (enhanced session security)                        |
| **Consent Templates** | Limited & hardcoded                                           | Fully configurable (FI type + Org Config + User Overrides)    |

### Key Improvements in V2

- **Secure Redirects:** Redirect URL now includes a signed hash token.
- **Backward Compatible:** No frontend changes required; SDK supports new format automatically.
- **Flexible Consents:** Supports FI-type based consents, org-level config, and per-user overrides.
- **Updated Endpoint Structure:** New unified V2 Session API URL.
- **V1 Still Supported:** Existing V1 flows work, but V2 is recommended for improved security and configurability.

### Frontend Compatibility

No frontend changes are required.
The updated redirect format (session_id + secure hash token) is automatically handled by the SDK, ensuring a smooth migration.

## Session API - V2 Specification

To start with the integration, call the following API to create a
session:

::: tip Endpoint
POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session/**
:::

**Request Parameters**

| Name                     | Type    | Description                                                                                                                                                                                                                                   | Required                     | Default                              | Notes                                                                              |
| ------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| link_id                  | string  | Your customer identifier                                                                                                                                                                                                                      | Yes                          | -                                    | -                                                                                  |
| api_key                  | string  | API key provided by FinBox                                                                                                                                                                                                                    | Yes                          | -                                    | -                                                                                  |
| redirect_url             | string  | URL to redirect to in case of success or failure                                                                                                                                                                                              | Yes (Redirect workflow only) | -                                    | -                                                                                  |
| from_date                | string  | Start date to fetch statements (`DD/MM/YYYY`)                                                                                                                                                                                                 | No                           | Last 6-month start date              | -                                                                                  |
| to_date                  | string  | End date to fetch statements (`DD/MM/YYYY`)                                                                                                                                                                                                   | No                           | Today                                | -                                                                                  |
| logo_url                 | string  | URL for optional logo branding                                                                                                                                                                                                                | No                           | -                                    | -                                                                                  |
| bank_name                | string  | Bank identifier to skip bank selection                                                                                                                                                                                                        | No                           | -                                    | -                                                                                  |
| mode                     | string  | Statement fetching mode (`pdf`, `aa`, `online`)                                                                                                                                                                                               | No                           | -                                    | -                                                                                  |
| mobile_number            | string  | Prefill phone number for AA journey                                                                                                                                                                                                           | No                           | -                                    | -                                                                                  |
| session_expiry           | integer | Expiry time for session (in minutes)                                                                                                                                                                                                          | No                           | -                                    | -                                                                                  |
| journey_mode             | string  | Journey type (`multi_pdf`, `multi_banking`)                                                                                                                                                                                                   | No                           | -                                    | -                                                                                  |
| accept_anything          | boolean | Accept data without strict validation                                                                                                                                                                                                         | No                           | false                                | -                                                                                  |
| is_mobile_field_editable | boolean | Allow editing prefilled mobile number in AA journey                                                                                                                                                                                           | No                           | false                                | -                                                                                  |
| aa_journey_code          | string  | AA journey type code                                                                                                                                                                                                                          | No                           | Defaults(Onetime) applied if missing | Required only for AA consent based journey                                         |
| consents                 | object  | User-provided consent config                                                                                                                                                                                                                  | No                           | Defaults(Onetime) applied if missing | User to override generated consents                                                |
| metadata                 | object  | Optional metadata to assist with name matching, employer based salary identification, or self-transfer detection. <br><br>Example:<br><br>`"metadata": { "names": ["AYUSH PATIL"], "employer_names": [], "companies_for_self_transfer": [] }` | No                           | -                                    | Contains optional arrays: `names`, `employer_names`, `companies_for_self_transfer` |

**Consent Generation Logic (V2)**

Consent creation follows a three-layer override model:

1. **Default FinBox Logic** - (Example: for BCAA001 with CT001 template)

```json
{
  "consents": {
    "CC0001": {
      "from_date": "09/10/2024",
      "to_date": "09/12/2025",
      "consent_expiry": "10/12/2025"
    }
  }
}
```

2. **Organization-Specific Overrides** - If an organization defines a shorter or custom window.

3. **User Request Overrides** - User-provided fields take the highest priority.

**Predefined AA Journey Codes & Consent Templates**

| AA Journey Code | Consent Codes          | Template Mapping                    |
| --------------- | ---------------------- | ----------------------------------- |
| **BCAA001**     | CC0001                 | CT001 – One-time                    |
| **BCAA002**     | CC0002                 | CT003 – Periodic                    |
| **BCAA003**     | CC0003, CC0004         | CT001 + CT003                       |
| **BCAA004**     | CC0005, CC0006, CC0007 | CT001 + CT003 + CT035 (Collections) |

### AA Journey Scenarios

### Scenario 1 — No AA Journey Code Provided

```json
{
  "link_id": "UX-2827"
}
```

→ System automatically assigns default:
aa_journey_code = BCAA001
Consent Template = CT001 (Deposits)
Default consent dates auto-generated

### Scenario 2 — AA Journey Code + Bank Provided

```json
{
  "link_id": "TU-1234",
  "from_date": "01/01/2025",
  "to_date": "09/12/2025",
  "aa_journey_code": "BCAA001",
  "bank": "HDFC"
}
```

→ UI auto-skips bank selection and goes directly to AA mobile number page for the provided bank.

### Scenario 3 — AA Journey Code + User Consent Dates

```json
{
  "link_id": "YP-7863",
  "aa_journey_code": "BCAA001",
  "bank": "ICICI",
  "consents": {
    "CC0001": {
      "from_date": "01/10/2025",
      "to_date": "09/12/2025"
    }
  }
}
```

→ User overrides are merged into generated consent structure.

`from_date` and `to_date` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `from_date` will be today's date - 6 months and `to_date` will be today's date. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

<b>Note</b>: If the `to-date` lies in the first week of the month, the respective month is not considered in the journey.

::: warning NOTE

- `redirect_url` in request is a compulsory field in [Redirect Workflow](/bank-connect/javascript.html#redirect-workflow) but is not required with the [Inline Frame workflow](/bank-connect/javascript.html#inline-frame-workflow)
- Please make sure `from_date` is always less than `to_date`
  :::

**Success Response**

On successful API call, it gives a **200 HTTP code** with a response in following format:

```json
{
  "session_id": "b91ffaac-3b4d-478b-90f6-cfa1a612c3d4",
  "redirect_url": "https://bankconnectclient.finbox.in/?session_id=b91ffaac-3b4d-478b-90f6-cfa1a612c3d4&token=<secure_hash>"
}
```

Use `redirect_url` to open up the BankConnect SDK. This URL can be used embedded inside an `<iframe>` or can be opened in a new tab or current window.

To proceed with additional enriched APIs, it is imperative to store the
`session_id` for subsequent calls.

**Error Response**

```json
"error":
{
  "code": "INVALID_DATE_FORMAT",
  "message": "Invalid format for from_date and to_date, 'Supported format: DD/MM/YYYY'"
}
```

### List of API Error Codes

**The following table lists API error codes applicable to this API.**

| Error Code             | Error Message                                                      | HTTP Status Code | Trigger / Condition                       |
| ---------------------- | ------------------------------------------------------------------ | ---------------- | ----------------------------------------- |
| INVALID_BANK_NAME      | Invalid bank identifier.                                           | 400              | bank_name is invalid or not supported     |
| MISSING_BANK_NAME      | `bank_name` is required with `mode`.                               | 400              | mode=pdf / mode=aa but bank_name not sent |
| MODE_NOT_AVAILABLE     | Specified mode not available for this bank.                        | 400              | Bank does not support the requested mode  |
| MODE_NOT_ENABLED       | Specified mode not enabled. Contact FinBox Admin.                  | 403              | Mode disabled for this client             |
| INVALID_DATE_FORMAT    | Invalid `from_date` or `to_date` format. Use `DD/MM/YYYY`.         | 400              | Wrong date format                         |
| INVALID_DATE_RANGE     | `from_date` cannot be greater or equal to `to_date`.               | 400              | Invalid date order                        |
| MISSING_DATE_FIELD     | `from_date` and `to_date` are required.                            | 400              | Required date fields missing              |
| INVALID_DATE_FORMAT    | Invalid `max_from_date` or `max_to_date` format. Use `DD/MM/YYYY`. | 400              | Wrong max date format                     |
| INVALID_DATE_RANGE     | `max_from_date` cannot be greater or equal to `max_to_date`.       | 400              | Invalid max date range                    |
| INVALID_MOBILE_NUMBER  | Invalid mobile number.                                             | 400              | Wrong format/length                       |
| INVALID_SESSION_EXPIRY | Min = 5, Max = 43200                                               | 400              | session_expiry out of allowed range       |
| INVALID_AA_PARAMETER   | Tenure must be between 1 and 84                                    | 400              | Invalid AA recurring tenure               |
| MISSING_AA_PARAMETER   | Frequency unit/value required                                      | 400              | Recurring frequency fields missing        |
| MISSING_AA_PARAMETER   | `bank_name` and `mode` required                                    | 400              | AA journey missing required parameters    |
| INVALID_URL            | Enter a valid URL.                                                 | 400              | Invalid logo_url / redirect_url           |
| INVALID_LENGTH         | Field length exceeds limit                                         | 400              | bank_name / journey_mode / URL too long   |
| METHOD_NOT_ALLOWED     | Method GET not allowed.                                            | 405              | GET used instead of POST                  |
| UNSUPPORTED_MEDIA_TYPE | Unsupported media type `text/plain`                                | 415              | Incorrect or missing Content-Type         |

## Category-Wise Error Matrix

---

### 1. HTTP & Content-Type Errors

| Trigger / Condition                                                 | Error Code             | Error Message          | HTTP Status Code |
| ------------------------------------------------------------------- | ---------------------- | ---------------------- | ---------------- |
| Using an unsupported HTTP method                                    | METHOD_NOT_ALLOWED     | Method not allowed     | 405              |
| Sending request with unsupported content type (wrong upload format) | UNSUPPORTED_MEDIA_TYPE | Unsupported media type | 415              |

---

### 2. Authentication & Authorization Errors

| Trigger / Condition                           | Error Code                              | Error Message                                | HTTP Status Code |
| --------------------------------------------- | --------------------------------------- | -------------------------------------------- | ---------------- |
| Missing or invalid authentication credentials | AUTHENTICATION_CREDENTIALS_NOT_PROVIDED | Authentication credentials were not provided | 401              |
| Client plan expired / payment pending         | PAYMENT_REQUIRED                        | Payment required                             | 402              |

---

### 3. Bank Validation Errors

| Trigger / Condition                    | Error Code        | Error Message         | HTTP Status Code |
| -------------------------------------- | ----------------- | --------------------- | ---------------- |
| bank_name missing when required        | MISSING_BANK_NAME | Bank name is required | 400              |
| Provided bank name not in allowed list | INVALID_BANK_NAME | Invalid bank name     | 400              |

---

### 4. Session & User Input Errors

| Trigger / Condition                                                        | Error Code              | Error Message                                                            | HTTP Status Code |
| -------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------ | ---------------- |
| session_expiry out of allowed range                                        | INVALID_SESSION_EXPIRY  | Session expiry should be int, Min value is 5 and Max is 43200 in minutes | 400              |
| Mobile number fails validation                                             | INVALID_MOBILE_NUMBER   | Invalid mobile number                                                    | 400              |
| Number of parameters mismatched (too many or too few)                      | INVALID_PARAMETER_COUNT | Invalid number of parameters                                             | 400              |
| General malformed or incorrect request for link_id                         | INVALID_REQUEST         | link_id, Ensure this field has no more than 500 characters.              | 400              |
| General malformed or incorrect request for link_id                         | INVALID_REQUEST         | link_id, This field is required.                                         | 400              |
| General malformed or incorrect request for redirect_url                    | INVALID_REQUEST         | redirect_url, Ensure this field has no more than 200 characters.         | 400              |
| General malformed or incorrect request for bank_name                       | INVALID_REQUEST         | bank_name, Ensure this field has no more than 50 characters.             | 400              |
| General malformed or incorrect request for logo_url                        | INVALID_REQUEST         | logo_url, Enter a valid URL.                                             | 400              |
| General malformed or incorrect request for mode                            | INVALID_REQUEST         | mode, \"no\" is not a valid choice.                                      | 400              |
| General malformed or incorrect request for journey_mode                    | INVALID_REQUEST         | journey_mode, Ensure this field has no more than 50 characters.          | 400              |
| General malformed or incorrect request for aa_journey_mode                 | INVALID_REQUEST         | aa_journey_mode, \"hello\" is not a valid choice.                        | 400              |
| General malformed or incorrect request for aa_recurring_tenure_month_count | INVALID_REQUEST         | aa_recurring_tenure_month_count, A valid integer is required.            | 400              |
| General malformed or incorrect request for aa_recurring_frequency_unit     | INVALID_REQUEST         | aa_recurring_frequency_unit, \"1\" is not a valid choice.                | 400              |
| General malformed or incorrect request                                     | INVALID_REQUEST         | Something went wrong                                                     | 400              |
| General malformed or incorrect request for is_mobile_field_editable        | INVALID_REQUEST         | is_mobile_field_editable, Must be a valid boolean.                       | 400              |

---

### 5. Account Aggregator (AA) Parameter Errors

| Trigger / Condition               | Error Code           | Error Message                    | HTTP Status Code |
| --------------------------------- | -------------------- | -------------------------------- | ---------------- |
| Missing required AA parameter     | MISSING_AA_PARAMETER | Required AA parameter is missing | 400              |
| AA parameter format/value invalid | INVALID_AA_PARAMETER | Invalid AA parameter             | 400              |

---

### 6. Date & Range Validation Errors

| Trigger / Condition                      | Error Code          | Error Message       | HTTP Status Code |
| ---------------------------------------- | ------------------- | ------------------- | ---------------- |
| Date format invalid                      | INVALID_DATE_FORMAT | Invalid date format | 400              |
| Invalid from–to date range               | INVALID_DATE_RANGE  | Invalid date range  | 400              |
| Missing one or more required date fields | MISSING_DATE_FIELD  | Missing date field  | 400              |

---

### 7. Mode / Feature Availability Errors

| Trigger / Condition                   | Error Code         | Error Message      | HTTP Status Code |
| ------------------------------------- | ------------------ | ------------------ | ---------------- |
| Requested mode not enabled for client | MODE_NOT_AVAILABLE | Mode not available | 400              |

Now once you have created a session, you can decide which flow would you like to integrate from - Frontend/Backend. Head to [Frontend Integration](/session-flow/submit-data-frontend.html) or [Backend Integration](/session-flow/submit-data-backend.html) to start the integration process.
