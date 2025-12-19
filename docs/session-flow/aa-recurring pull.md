---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


# Account Aggregator Recurring Pull

This guide describes how to implement the AA Recurring Pull flow using BankConnect.
The flow is divided into Frontend and Backend components and uses a series of APIs to manage consents and retrieve recurring data.


## 1. Implementation Overview

The AA Recurring flow consists of the following steps:

<img src="/aa-recurring-pull.png" alt="Recurring Pull Workflow" />


## 2. Frontend Flow

1. ***Take Recurring Consent***

- A separate recurring consent must be collected from the user.
- Trigger the BankConnect SDK via the Session API including the additional recurring-consent parameters.

2. ***User Approval***

- The SDK opens using the redirect_url.
- User approves the recurring consent.
- After successful approval, user is redirected back to your frontend.

## 3. Backend Flow

1. ***Handle Consent***
- Use the session_id received from the Session API after the user completes the AA flow.

2. ***Get Recurring Consent Details***
- Call the Get Recurring Consent Details API using the session_id.
- Store the consent_id for future periodic data pulls.

3. ***Store Consent ID***
- Persist the consent_id and its metadata for automated recurring pulls.

4. ***Fetch Recurring AA Data***
- Use the Fetch Recurring AA Data API
- Pass consent_id, date_time_range_from, and date_time_range_to.

5. ***Check Status***
- Monitor the status of the fetch job via Webhook events, or Polling APIs

6. ***Retrieve Enriched Data***
- Once processing is completed, call the Insights API


### Get Recurring Consent Details API

::: tip Endpoint
POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/account_aggregator/get_recurring_consent_details/?session_id=<session_id>/**
:::

**Success Response**

On successful API call, it gives a **200 HTTP code** with a response in following format:

```json
{
  "consent_details": [
    {
      "consent_id": "8d5fa22b-216a-54e2-90da-65d1c67c8964",
      "bank_name": "hdfc",
      "masked_account_number": "XXXXXXXXXXX2304",
      "tenure_month_count": 24,
      "frequency_unit": "day",
      "frequency_value": 3
    }
  ]
}
```


### Fetch AA Recurring Data API

::: tip Endpoint
POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/account_aggregator/fetch_recurring_aa_data/**
:::

**Sample Request**

```json
{
  "consent_id": "xxxx",
  "date_time_range_from": "10/10/2025",
  "date_time_range_to": "10/11/2025"
}
```

**Success Response**
```json
{
  "session_id": "new-session-id"
}
```

### Status Check & Enriched APIs

You can now:
- Poll using the new session_id
- Or wait for webhook

Then call:
- [Transactions API]() (For Collections Usecase)
- [Insights API](/session-flow/fetch-data.html#insights-api) (For Monitoring Usecase)

### Error Codes

| Error Code         | Meaning                               |
|--------------------|----------------------------------------|
| INVALID_SESSION_ID | Session is invalid, expired, or closed |
| INVALID_CONSENT_ID | Consent not found or not linked to session |
| CONSENT_REVOKED    | User has revoked the recurring consent |
| CONSENT_OVERUSED   | Consent usage limit exhausted per Sahamati rules |
| INVALID_DATE_RANGE | Date range invalid for recurring pull |
