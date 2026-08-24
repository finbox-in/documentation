---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---

The data can be submitted / uploaded to FinBox backend in two ways:

1.  Frontend (using FinBox UI i.e Javascript SDK)

2.  Backend (using FinBox REST APIs)

**To begin uploading, we first need to initiate a session. In both the methods, a session needs to be initialized using Session API.**

## Session API

To start with the integration, call the following API to create a
session:

::: tip Endpoint
POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session/**
:::

**Request Parameters**

| Name                         | Type    | Description                                                                                                                                                                                                                                   | Required                     | Default                 | Notes                                                                              |
| ---------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| link_id                      | string  | Your customer identifier                                                                                                                                                                                                                      | Yes                          | -                       | -                                                                                  |
| api_key                      | string  | API key provided by FinBox                                                                                                                                                                                                                    | Yes                          | -                       | -                                                                                  |
| redirect_url                 | string  | URL to redirect to in case of success or failure                                                                                                                                                                                              | Yes (Redirect workflow only) | -                       | -                                                                                  |
| from_date                    | string  | Start date to fetch statements (`DD/MM/YYYY`)                                                                                                                                                                                                 | No                           | Last 6-month start date | -                                                                                  |
| to_date                      | string  | End date to fetch statements (`DD/MM/YYYY`)                                                                                                                                                                                                   | No                           | Today                   | -                                                                                  |
| logo_url                     | string  | URL for optional logo branding                                                                                                                                                                                                                | No                           | -                       | -                                                                                  |
| bank_name                    | string  | Bank identifier to skip bank selection                                                                                                                                                                                                        | No                           | -                       | -                                                                                  |
| mode                         | string  | Statement fetching mode (`pdf`, `aa`, `online`)                                                                                                                                                                                               | No                           | -                       | -                                                                                  |
| mobile_number                | string  | Prefill phone number for AA journey                                                                                                                                                                                                           | No                           | -                       | -                                                                                  |
| session_expiry               | integer | Expiry time for session (in minutes)                                                                                                                                                                                                          | No                           | -                       | -                                                                                  |
| journey_mode                 | string  | Journey type (`multi_pdf`, `multi_banking`)                                                                                                                                                                                                   | No                           | -                       | -                                                                                  |
| accept_anything              | boolean | Accept data without strict validation                                                                                                                                                                                                         | No                           | false                   | -                                                                                  |
| is_mobile_field_editable     | boolean | Allow editing prefilled mobile number in AA journey                                                                                                                                                                                           | No                           | false                   | -                                                                                  |
| aa_journey_mode              | string  | AA-specific journey mode (`only_recurring`, `once_with_recurring`)                                                                                                                                                                            | No                           | -                       | Required only for AA recurring/periodic consent                                    |
| aa_recurring_tenure_month    | number  | Tenure for recurring consent (months)                                                                                                                                                                                                         | No                           | Range 1–60              | Required only for periodic consent                                                 |
| aa_recurring_frequency_unit  | string  | Frequency unit                                                                                                                                                                                                                                | No                           |                         | Required only for periodic consent e.g., month                                     |
| aa_recurring_frequency_value | number  | Frequency value                                                                                                                                                                                                                               | No                           | Range 1–5               | Required only for periodic consent                                                 |
| metadata                     | object  | Optional metadata to assist with name matching, employer based salary identification, or self-transfer detection. <br><br>Example:<br><br>`"metadata": { "names": ["AYUSH PATIL"], "employer_names": [], "companies_for_self_transfer": [] }` | No                           | -                       | Contains optional arrays: `names`, `employer_names`, `companies_for_self_transfer` |

`from_date` and `to_date` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `from_date` will be today's date - 6 months and `to_date` will be today's date. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

<b>Note</b>: If the `to-date` lies in the first week of the month, the respective month is not considered in the journey.

::: warning NOTE

- `redirect_url` in request is a compulsory field in [Redirect Workflow](/bank-connect/javascript.html#redirect-workflow) but is not required with the [Inline Frame workflow](/bank-connect/javascript.html#inline-frame-workflow)
- Please make sure `from_date` is always less than `to_date`
- The `from_date` for Account Aggregator flows is restricted to a maximum of 14 months. Any value older than this is auto-corrected to the allowed 14-month window. To check the permissible duration for each consent template, see the [Sahamati fair use template library](https://sahamati.org.in/aa-fair-use-template-library/)
- The `aa_recurring_tenure_month_count` for Account Aggregator flows is restricted to a maximum of 60 months(5 years) for Loan Monitoring usecase. Any value greater than this is auto-corrected to the allowed 60-month window. To check the permissible limit for each consent template, see the [Sahamati fair use template library](https://sahamati.org.in/aa-fair-use-template-library/)
  :::

**Success Response**

On successful API call, it gives a **200 HTTP code** with a response in following format:

```json
{
  "session_id": "8d5ea22b-216a-4fe2-90da-65d1c67c8964",
  "redirect_url": "https://bankconnectclient.finbox.in/?session_id=8d5ea22b-216a-4fe2-90da-65d1c67c8964"
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
