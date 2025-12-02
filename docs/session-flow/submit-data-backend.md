---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


### Backend integration

**Uploading via REST APIs**

1.  Create a session using the Session API.

2.  Obtain the session_id from the API and pass it in the upload API request.


**Upload API:**

::: tip Endpoint

POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/statement/upload_session/**

:::

**Authentication**

Request header `x-api-key` with API Key as value must be present in request.

## Request Parameters

| Name         | Type   | Required | Default | Description |
|--------------|--------|----------|---------|-------------|
| file         | file   | Conditional | — | The bank statement file (PDF) uploaded as a form-data file. **Required if `file_url` is not provided.** |
| file_url     | string | Conditional | — | Publicly accessible URL of the file to be downloaded by the system. **Required if `file` is not provided.** |
| bank_name    | string | No        | — | A valid [bank identifier](/session-flow/appendix.html#bank-identifiers). Optional for **bankless uploads**. If provided, it must match the detected bank in the uploaded statement. |
| session_id   | string | Yes       | — | Session identifier used to group multiple uploads under a single analysis session. |
| upload_type  | string | Yes       | — | Format of the uploaded file. Allowed values: **PDF**, **BASE64**. Determines whether the system expects a file blob or a Base64 string. |
| pdf_password | string | No        | — | Password for password-protected PDFs. If required and missing/empty/incorrect, the request fails with `PASSWORD_INCORRECT`. |


**Query Parameters:** Optional parameters appended to the URL like
_upload_session/?identity=true_

_progress (optional, string):_ Provides progress of uploaded statements.

_identity (optional, string):_ Provides identity details for uploaded
statements.


**Successful upload response (HTTP 200):**

```json
{
    "bank_name": "hdfc",
    "statement_id": "601f775d-0bee-4817-8469-2f87c02a32e7",
    "page_count": 17,
    "identity": {
        "account_number": "45678090383737",
        "name": "XXXXXXXXXX XXXXXX",
        "address": "94 LEBRUA . . hgsdgsdfasyt, HP",
        "ifsc": "HDFC000XXX",
        "micr": "1102400XX",
        "account_category": "individual",
        "credit_limit": 0,
        "od_limit": 0,
        "account_id": "f4f41ec9-af9a-4c4d-8bb6-eaa07f7b49c5",
        "bank_name": "hdfc"
    },
    "date_range": {
        "from_date": "2023-12-01",
        "to_date": "2024-03-05"
    },
    "opening_date": null,
    "opening_bal": null,
    "closing_bal": null,
    "is_fraud": false,
    "fraud_type": null,
    "metadata_analysis": {
        "name_matches": []
    },
    "country_code": "IN",
    "currency_code": "INR",
    "extracted_date_range": {
        "from_date": "2023-12-01",
        "to_date": "2024-03-05"
    },
    "account_id": "f4f41ec9-af9a-4c4d-8bb6-eaa07f7b49c5",
    "masked_account_number": "XXXXXXXXXXXXXX",
    "months": [
        "2023-12",
        "2024-01",
        "2024-02",
        "2024-03"
    ],
    "missing_months": [
        "2023-11",
        "2024-04"
    ],
    "status": 1,
    "session_id": "0d10ab33-1c36-471a-9aba-2885c0c103ae"
}
```

**Error Response:**

```json
{
  "session_id":"",
  "statement_id":"",
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "The provided Session ID is invalid"
  }
}

```

## Error Scenario Validation Matrix


### 1. Session & Authentication Errors

| Scenario | Validation | Error Code | Error Message | HTTP Status Code |
|---------|------------|------------|---------------|------------------|
| Expired/Invalid session | session expired/invalid | SESSION_EXPIRED | This session has expired | 400 |
| Trial period expired | user trial expired | TRIAL_PERIOD_EXPIRED | Your trial period has expired. Please request FinBox to upgrade your plan | 402 |
| Invalid API key / missing auth | invalid x-api-key / unauthorized route | INVALID_API_KEY / Auth error | Authentication credentials were not provided. / Route not allowed | 403 |


### 2. File & Upload Errors

| Scenario | Validation | Error Code | Error Message | HTTP Status Code |
|---------|------------|------------|---------------|------------------|
| Missing file object | no file field present | MISSING_FILE_OBJECT | This file object is required | 400 |
| File not sent as proper form field | not in form-data/x-www-form-urlencoded | INVALID_FILE_OBJECT | This field must be present as a form field. Send request with correct content type | 400 |
| Invalid file object | corrupted/unreadable file | INVALID_FILE_OBJECT | File object is invalid | 400 |
| Empty file | file exists but size = 0 | EMPTY_FILE | File object is empty | 400 |
| Invalid file URL | invalid/unreachable URL | INVALID_FILE_URL | This file url is invalid | 400 |
| Invalid BASE64 string | malformed base64 string | INVALID_BASE_64 | Invalid Base 64 string | 400 |


### 3. PDF-Specific Errors

| Scenario | Validation | Error Code | Error Message | HTTP Status Code |
|---------|------------|------------|---------------|------------------|
| Incorrect PDF password | wrong password | PASSWORD_INCORRECT | The provided password is incorrect | 400 |
| Empty PDF password | password = "" | PASSWORD_INCORRECT | The provided password is incorrect | 400 |
| Missing PDF password | password required but not provided | PASSWORD_INCORRECT | The provided password is incorrect | 400 |
| PDF is scanned / image-only | no text layer present | PDF_IS_IMAGE | Scanned images are not supported | 400 |


### 4. Statement Parsing Errors

| Scenario | Validation | Error Code | Error Message | HTTP Status Code |
|---------|------------|------------|---------------|------------------|
| Unsupported statement format | parser cannot detect structure | STATEMENT_UNSUPPORTED_FORMAT | The statement format is not supported | 400 |
| Duplicate statement | previously uploaded | STATEMENT_DUPLICATE | A duplicate statement has been detected | 400 |
| Out of date range | from_date / to_date outside allowed span | OUT_OF_DATE_RANGE | No transactions in expected date range | 400 |


### 5. Rule Validation Errors

| Scenario | Validation | Error Code | Error Message | HTTP Status Code |
|---------|------------|------------|---------------|------------------|
| Bank name undetected | system unable to detect bank | BANK_NAME_UNDETECTED | Unable to detect bank. Please provide BANK NAME. | 400 |
| Bank name mismatch | selected ≠ detected | BANK_NAME_MISMATCH | Not {selected_bank_name} bank statement | 400 |
| Invalid account category | account_category not in allowed list | INVALID_ACCOUNT_CATEGORY | Account category is invalid | 400 |
| Session flow not enabled |This route is not available for the organisation as per configuration | (validation error in response body) | Route not allowed | 403 |
| Invalid/unsupported bank_name (not in allowed list) | bank_name not in allowed strings | (validation error in response body) | Please use following bank strings: [...] | 400 |



