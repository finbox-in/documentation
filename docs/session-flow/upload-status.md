---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---

## BankConnect: Check Session Upload Status

### 1. Webhooks

Utilize Webhooks for real-time notification on completion of upload in the session. Webhooks need to be configured once and then both the webhooks for Completion and [Enrichment](processing-status.html) would be triggered on the configured URL.

Ensure your webhook endpoint is consistently available; if not, consider the polling approach or fetching all payloads for a given `session_id`

**Important Note:** The webhook will only be triggered once the upload has been completed by the user.

**Configuration:** Share a valid endpoint that receives a POST request, accepts a request body with content-type application/json and returns a 200 status code on successful reception.

**Update the endpoint using the API:**

::: tip Endpoint

POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/update_webhook/**

:::

**Request:**

```json
{
    "webhook_url": "https://postman-echo.com/post",
    "webhook_mode": 1
}
```

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Receiving Success Payload:**

```json
{
  "message": "success"
}
```

**Receiving Webhook Success Payload:**

```json
{ 

  "session_id": "136b1aa3-4610-4d0a-89f3-03078a2fce92", 
  "event_name": "SESSION_REQUIREMENT_COMPLETION_NOTIFICATION/SESSION_EXPIRY_NOTIFICATION", 
  "message": "Upload Completed", 
  "accounts": [ 
    { 
      "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5", 
      "account_number": "XXXXXXXXXXXX3135", 
      "bank_name": "axis", 
      "created_at": "2025-11-13 06:48:44", 
      "last_updated_at": "2025-11-13 06:48:44", 
      "statements": [ 
        { 
          "statement_id": "bc04560a-d06c-4a51-b412-031b692ecf6f", 
          "statement_status": "completed", 
          "error_code": null, 
          "error_message": null, 
          "source": "pdf", 
          "upload_file_name": "168c64e6-3d12-40c0-9ffb-2c02d59fe84c_axis.pdf", 
          "statement_date_range": { 
            "from_date": "11/08/2025", 
            "to_date": "10/11/2025" 
          }, 
          "created_at": "2025-11-13 06:48:43.660968+00:00" 
        } 
      ], 
      "account_status": "PARTIAL", 
      "months": [ 
        "2025-08", 
        "2025-09", 
        "2025-10", 
        "2025-11" 
      ], 
      "missing_data": [] 
    } 
  ], 
  "session_date_range": { 
    "from_date": "11/08/2025", 
    "to_date": "11/11/2025" 
  } 
} 

```

### 2. Polling:

Use Polling as a backup if the webhook endpoint is down or a webhook call fails.

For cases when the COMPLETION webhook is not triggered, the Upload Status API can be polled to check the status. Polling requires the `session_id`.

**Note:** To review the status at the account/statement level, refer to the statuses within the corresponding block.

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/session_upload_status/**

:::

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
    "session_id": "136b1aa3-4610-4d0a-89f3-03078a2fce92", 
    "session_date_range": { 
        "from_date": "11/08/2025", 
        "to_date": "11/11/2025" 
    }, 
    "upload_status": "COMPLETED", 
    "session_expiry_timestamp": "2025-11-13 07:48:34", 
    "accounts": [ 
        { 
            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5", 
            "account_number": "924010040573135", 
            "bank_name": "axis", 
            "created_at": "2025-11-13 06:48:44", 
            "last_updated_at": "2025-11-13 06:49:04", 
            "statements": [ 
                { 
                    "statement_id": "bc04560a-d06c-4a51-b412-031b692ecf6f", 
                    "statement_status": "completed", 
                    "error_code": null, 
                    "error_message": null, 
                    "source": "pdf", 
                    "upload_file_name": "168c64e6-3d12-40c0-9ffb-2c02d59fe84c_axis.pdf", 
                    "statement_date_range": { 
                        "from_date": "11/08/2025", 
                        "to_date": "10/11/2025" 
                    }, 
                    "created_at": "2025-11-13 06:48:43.660968+00:00" 
                } 
            ], 
            "account_status": "PARTIAL", 
            "months": [ 
                "2025-08", 
                "2025-09", 
                "2025-10", 
                "2025-11" 
            ], 
            "missing_data": [ 
                { 
                    "from_date": "2025-11-03", 
                    "to_date": "2025-11-11" 
                } 
            ], 
            "name": "", 
            "account_type": "", 
            "full_bank_name": "Axis Bank" 
        } 
    ], 
    "error": {} 
} 
```

## Upload Status Evaluation Logic (Based on the API Response)

For the provided API response, the `upload_status` has been returned as **"COMPLETED"**.  
The following logic is applied to determine the correct upload status.

---

### 1. Status Determination Logic

#### **If the session/entity exists:**

##### **a. COMPLETED (or Processing Requested)**
The status is marked as **COMPLETED** if:
- The completion webhook has already been sent, **or**
- Processing for the entity/session has been explicitly requested.

##### **b. EXPIRED**
The status is marked **EXPIRED** if:
- The session/entity has passed its expiry timestamp **without completing processing**.

##### **c. NO UPLOADS**
The status is **NO UPLOADS** if:
- The entity/session is valid (not expired), **but**  
- No account data or statement uploads exist yet.

##### **d. IN PROGRESS**
Status becomes **IN PROGRESS** if:
- Statement uploads have started, **but**
- Acceptance criteria are not yet fulfilled, **and**
- The entity/session has not expired.

---

#### **If the session/entity cannot be retrieved**
The status defaults to **NO UPLOADS**.

---

### 2. How This Logic Applies to the Given Response

Based on the sample API response:

- The session object is present (`session_id` is valid).  
- Account-level and statement-level data are available.  
- The system has already received a processing/completion trigger, which results in:  
  **`upload_status: "COMPLETED"`**

Even though:
- The account is marked as **PARTIAL**, and  
- Some `missing_data` ranges are present,  

…the overall status is still **COMPLETED** because, as per the ordering rules, once the completion webhook/trigger is registered, it overrides partial or incomplete data conditions.

---



**Error Response:**

```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "The provided session ID is invalid"
  }
}
```

### List of API Error Codes

**The following table lists API error codes applicable to this API.**

|Code|Message|HTTP status code|
|------------------------------| ----------------------------------| ---------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|SESSION_DELETED|The provided session ID has been deleted|410|
|ACCESS_DENIED|Authentication credentials were not provided|403|
|KEY_REQUIRED|valid session_id is required|400|

