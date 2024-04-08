---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---
# BankConnect: JavaScript
The JavaScript SDK helps user submit their bank statements via upload or net banking credentials in your Web applications. The SDK will be opened via a web URL.

The first step in integration involves calling the [Session API](/bank-connect/javascript.html#session-api)
Then the workflow can be implemented in one of the following ways:
- [Load in a new page with redirect URL](/bank-connect/javascript.html#redirect-workflow)
- [Embedding inside an Inline Frame (`<iframe>`)](/bank-connect/javascript.html#inline-frame-workflow)

## Session API
To start with the integration, call the following API to create a session:

::: tip Endpoint
POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session/**
:::

### Parameters
| Name | Type | Description | Required  | Default |
| - | - | - | - | - |
| link_id | string  | link_id value | Yes | - |
| api_key | string | API key provided by FinBox | Yes | - |
| redirect_url | string | URL to redirect to incase of success or failure | Yes for **Redirect Workflow** | - |
| from_date | string | Start date range to fetch statements. Should be of format `DD/MM/YYYY`| No | Last 6 month start date |
| to_date | string | End date range to fetch statements. Should be of format `DD/MM/YYYY` | No | Yesterday |
| logo_url | string | An optional parameter to show logo branding in bankconnect SDK. Should be a URL.| No | - |
| bank_name | string | pass the [bank identifier](/bank-connect/appendix.html#bank-identifiers) to skip the bank selection screen and directly open a that bank's screen instead | No | - |
| mode | string | optional parameter to set the mode(i.e. pdf, aa, and online) | No | - |
| mobile_number | string | Prefills phone number in Account Aggregator mode | No | - |
| journey_mode | string | Optional parameter to set the journey (i.e.multi_pdf or multi_banking) | No | - |
| aa_journey_mode | string | set the journey mode for AA (i.e only_once or only_recurring) | No | - |
| aa_recurring_tenure_month_count | integer | set the recurring consent duration (min: 1 and max: 24) | No | - |
| aa_recurring_frequecy_unit | string | set the frequency unit to pull the data during the recurring consent duration (year, month, day, hour) | No | - |
| aa_recurring_frequency_value | integer | set the frequency value to pull the data during the recurring consent duration (min: 1 and max: 3) | No | - |

`from_date` and `to_date` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `from_date` will be today's date - 6 months and `to_date` will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

<b>Note</b>: If the `to-date` lies in the first week of the month, the respective month is not considered in the journey.

::: warning NOTE
- `redirect_url` in request is a compulsory field in [Redirect Workflow](/bank-connect/javascript.html#redirect-workflow) but is not required with the [Inline Frame workflow](/bank-connect/javascript.html#inline-frame-workflow)
- Please make sure `from_date` is always less than `to_date`
- Make sure `to_date` is never today's date, the maximum possible value for it is today's date - 1 day
:::

### Response
On successful API call, it gives a **200 HTTP code** with a response in following format:
```json
{
  "redirect_url": "https://bankconnectclient.finbox.in/?session_id=127d12db1d71bd182b"
}
```
Use `redirect_url` to open up the BankConnect SDK. This URL can be used embedded inside an `<iframe>` or can be opened in a new tab or current window.

## Redirect Workflow

<img src="/javascript_redirect.jpg" alt="JavaScript SDK Redirect Workflow" />

The flow for this involves following steps:
- Create a session using [Session API](/bank-connect/javascript.html#session-api)
- Get the URL received from above API and open it in a new tab
- On success / exit, SDK will redirect to the specified redirect URL with parameters as follows:
  - Exit: `{url}?success=false`
  - Success: `{url}?success=true&entity_id=<some-entity-id>`

:::warning NOTE
Since there is no callback received on this flow, it is recommended to configure [Webhook](/bank-connect/webhook.html)
:::

## Inline Frame Workflow

<img src="/javascript_iframe.jpg" alt="JavaScript SDK iframe Workflow" />

The flow for this involves the following steps:
- Create a session using [Session API](/bank-connect/javascript.html#session-api)
- Get the URL received from above API and embed it in an `<iframe>`
- You'll [receive callbacks](/bank-connect/javascript.html#receive-callbacks) by implementing an event listener. Based on the event you can close / hide the inline frame.

## Receive callbacks
1. To receive callbacks in `<iframe>` workflow, you need to implement an event listener. It can be implemented as follows:

```html
<!DOCTYPE html>
<html lang="en">
<body>
  <script>
    window.addEventListener('message', function (event) {
      console.log("Event -> ", event)
    });
  </script>
  <iframe src="<url-from-create-session>" width="500px" height="700px"></iframe>
</body>Ï
</html>
```

2. To receive callbacks in `Android WebView`, a [Javascript Interface](https://developer.android.com/guide/webapps/webview#UsingJavaScript) can be used to get the events.
- Interface Name: `BankConnectAndroid`
- Callback Functions
    - All Events: `onResult`
    - Error: `onError`
    - Exit: `onExit`
    - Success: `onSuccess`
    - Extra Info: `onInfo`

### Event Object
The `event` object received by the listener can be one of the following:
#### Success
This is received when user completes the upload process.

1. Iframe
```js
{
  type: "finbox-bankconnect",
  status: "success",
  payload: {
      "entityId": "1d1f-sfdrf-17hf-asda", //Unique ID that will used to fetch statement data
      "linkId": "<USER_ID_PASSED>" //Link ID is the identifier that was passed while initializing the SDK
  }
}
```

2. WebView

`BankConnectAndroid.onSuccess`
```js
  {
      "entityId": "1d1f-sfdrf-17hf-asda", //Unique ID that will used to fetch statement data
      "linkId": "<USER_ID_PASSED>" //Link ID is the identifier that was passed while initializing the SDK
  }
```

#### Exit
This is received when user exits the SDK.

1. Iframe
```js
{
  type: "finbox-bankconnect",
  status: "exit",
  payload: {
      "linkId": "<USER_ID_PASSED>", //Link ID is the identifier that was passed while initializing the SDK
      "message": "<exit message>"
  }
}
```

2. WebView
`BankConnectAndroid.onExit`

```js
{
    "linkId": "<USER_ID_PASSED>", //Link ID is the identifier that was passed while initializing the SDK
    "message": "<exit message>"
}
```

#### Error
This is received whenever any error occurs in the user flow.

1. Iframe
```js
{
  type: "finbox-bankconnect",
  status: "error",
  payload: {
      "reason": "Reason for failure",
      "linkId": "<USER_ID_PASSED>", //Link ID is the identifier that was passed while initializing the SDK
      "error_type": "MUXXX",//MUXXX for Manual Upload and NBXXX for Net Banking
  }
}
```

2. WebView
`BankConnectAndroid.onError`

```js
{
  "reason": "Reason for failure",
  "linkId": "<USER_ID_PASSED>", //Link ID is the identifier that was passed while initializing the SDK
  "error_type": "MUXXX",//MUXXX for Manual Upload and NBXXX for Net Banking
}
```

:::warning Two Events
In case an error occurs, you'll receive `OnError` event payload, and then if the user exits the SDK, you'll receive another event payload, this time for `OnExit`.
:::

##### Error types
In case of Error, error_type of  ```MUXXX``` implies an error in Manual PDF Upload and ```NBXXX``` implies its from Netbanking.

| Case | error_type | Sample payload|
| - |  - | - |
| Trial Expired for Dev Credentials  | MU002 | ```{"reason:"Trial Expired for Dev Credentials",linkID:"<USER_ID_PASSED>","error_type":"MU002"}```| 
| PDF Password Incorrect | MU003 | ```{"reason:"Password Incorrect",linkID:"<USER_ID_PASSED>","error_type":"MU003"}```|
| Specified bank doesn't match with detected bank | MU004 | ```{"reason:"Not axis statement",linkID:"<USER_ID_PASSED>","error_type":"MU004"}```|
| Non Parsable PDF - PDF file is corrupted or has no selectable text (only scanned images)| MU006 | ```{"reason:"",linkID:"<USER_ID_PASSED>","error_type":"MU006"}```|
| Not a valid statement or bank is not supported | MU020 | ```{"reason:"Not a valid statement or bank is not supported",linkID:"<USER_ID_PASSED>","error_type":"MU020"}```|
| Invalid Date Range | MU021 | ```{"reason:"Please upload statements within the date range fromDate to toDate",linkID:"<USER_ID_PASSED>","error_type":"MU021"}```|
| NetBanking Failed| NB000 | ```{"reason:"failure_message",linkID:"<USER_ID_PASSED>","error_type":"NB000"}```|
| Netbanking Login Error | NB003 | ```{"reason:"failure_message",linkID:"<USER_ID_PASSED>","error_type":"NB003"}```|
| Captcha Error | NB004 | ```{"reason:"Invalid Captcha",linkID:"<USER_ID_PASSED>","error_type":"NB004"}```|
| Security Error | NB005 | ```{"reason:"failure_message",linkID:"<USER_ID_PASSED>","error_type":"NB005"}```|


#### Info Events
Android and JS events are passed which can used for purposes such as analytics.The object passed is of the following format.

1. Iframe
```js
{
  type: "finbox-bankconnect",
  status: "info",
  payload: {
      "linkId": "<USER_ID_PASSED>", //Link ID is the identifier that was passed while initializing the SDK
      "event_name": "bank_selected", // Name of the EVENT
      "message": "HDFC BANK",//extra data passed in certain events
  }
}
```

2. WebView
`BankConnectAndroid.onInfo`

```js
{
  "linkId": "<USER_ID_PASSED>", //Link ID is the identifier that was passed while initializing the SDK
  "event_name": "manual_upload_back", // Name of the EVENT
  "message": "",//extra data passed in certain events
}
```

| Event | event_name | message|
| - |  - | - |
|Bank selected|bank_selected|`<BANK NAME>`|
|Manual upload screen opened|manual|-|
|Clicked back in Manual Upload|manual_upload_back|-|
|Clicked back in Netbanking|net_banking_back|-|
