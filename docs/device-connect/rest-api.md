# DeviceConnect: REST API

FinBox DeviceConnect REST API enables **"server to server data"** fetching of customers' Android device data. The customer's data can be fetched using the `CUSTOMER_ID`. API accepts JSON-encoded request bodies, returns JSON-encoded responses.

::: warning NOTE
Following will be shared by FinBox team at the time of integration:
- `SERVER_API_KEY`
- `SERVER_HASH`
- `DC_PREDICTORS_VERSION`
:::

## Authentication

FinBox provides a valid and signed certificate for all API methods and endpoints. To access the API methods requester must ensure that their connection library supports HTTPS.

Authentication for the APIs are based on **SERVER_API_KEY** provided by the FinBox. Server to server communication can commence when **IP of requester are whitelisted** on the FinBox servers. This can be easily done upon request.

## API Integration Workflow

### Insights API

Once FinBox DeviceConnect SDK is initialized, data from the device is sent to the FinBox processing engine against an anonymous `CUSTOMER_ID` which will be the primary key from retrieving any information from the server.

Clients need to call the **Insights API** with `CUSTOMER_ID` to get the predictors for a given customer. An overview of the API calling is shown in the [Workflow](/device-connect/rest-api.html#workflow) section. In case Insights API returns with status `"in_progress"` (meaning data is currently being processed), the client should poll the Insights API with a delay of at least **10 seconds**

### Workflow

<img src="/device_connect_back_end_integration.jpg" alt="Device Connect Backed Integration Workflow" />

1. Call FinBox Insights API
2. In case the response status is `"in_progress"`, retry after 10 seconds
3. In case the response status is `"complete"`, receive data as per format mentioned in [Insights API Response](/device-connect/rest-api.html#insights-api-response) section.

## Insights API Endpoints

::: tip Base URL
For all the endpoints, the base URL for different environments are as follows: 
| Environment | Base URL |
| - | - | -| - |
| Production | **https://insights.finbox.in/v2/** |
| Development | **https://insights.finbox.in/staging/** |
:::

| Insights | Endpoint | Request Type | Description |
| - | - | -| - |
| General Predictors | **/risk/predictors** | POST | General features extracted from customer's data |

::: tip Predictors
Other than general predictors, there are also more predictor endpoints which will be shared based on the  requirement by the FinBox team.
:::

## Insights API Request

### Request Header and Body
For all the Insights API request structure is the same, all requests must have `x-api-key` field in **header** having the value as the `SERVER_API_KEY` shared by FinBox team. The following **keys** must be passed in every request body as keys to a JSON document:

**Request Body**
| Key | Type | Description |
| --- | --- | --- |
| customer_id | String | `CUSTOMER_ID` for which feature vector is required |
| version | Integer | Version of the feature set shared by FinBox team as `DC_PREDICTORS_VERSION` |
| salt | String | A salt which is computed basis logic mentioned in the [Salt Generation](/device-connect/rest-api.html#salt-generation) section |
| metadata (`optional`) | Json | A dictionary which can be used to pass additional information for example loan_type, loan_amount or any tags |

**Sample Metadata value**
| Key | Type | Description |
| --- | --- | --- |
| loan_type | String | Can be a string denoting the type of loan e.g. business_loan, msme_loan, personal_loan |
| loan_amount | Integer | Can be an integer value denoting the amount of loan in INR e.g. 3000, 25000, 50000 |

:::danger IMPORTANT
Please note that this `CUSTOMER_ID` is the same used as the unique identifier used in Android SDK while syncing the data.
:::


### Sample Request

**Headers**
```yaml
Content-Type: application/json
x-api-key: XXXX-XXXX-XXXX
```

**Request Body**
```json
{
    "customer_id": "1234ABCD4567",
    "version": 1,
    "salt": "5vVMNofMy5kQXx647sBdYBoMolMb1GGBSYLkzwaa9v8=",
    "metadata": {
        "loan_type": "business_loan",
        "loan_amount": 30000
    }
}
```

## Insights API Response
API will give a JSON Response with the following keys:

### Response Keys

| Key | Description | Type | Nullable |
| --- | --- | --- | --- |
| customer_id | CUSTOMER_ID for which data was requested | STRING [260] | Yes |
| request_id | A unique string for each request | STRING [32] | Yes |
| status | Status of the operation. | STRING [20] | No |
| message | Description of status | STRING [200] | No |
| date_requested | Timestamp of processing request | STRING with `YYYY-MM-DDThh:mm:ss:mil` format | Yes |
| date_processed | Timestamp of processing completion | STRING with `YYYY-MM-DDThh:mm:ss:mil` format | Yes |
| data | An array of objects, each object representing the predictors, having keys `name` indicating the predictor name and `value` indicating the values | JSON | Yes |

::: danger data key
The list of predictors in the `data` key will be different based on the result API endpoint, feature set version and requester. This **list will hence be shared separately** by the FinBox team during the integration.
:::

::: warning NOTE
Some of the keys in response may be missing based on the availability of data and HTTP Status code. Please refer to examples for each of the cases listed [here](/device-connect/rest-api.html#status-values).
:::

### `status` values
Depending on the availability of data, there can be different cases with different `status` values as follows:

| Case | `status` value | HTTP Status Code | Description / Action |
| - | - | - | - |
| [Calculation in progress](/device-connect/rest-api.html#case-1-calculation-in-progress) | `"in_progress"` | 202 | The request input is correct and processing has started. Please retry in 10 seconds |
| [Calculation complete and data is available](/device-connect/rest-api.html#case-2-calculation-complete-and-data-is-available) | `"complete"` | 200 | The request input is correct and processing has completed. Response contains the predictors |
| [Calculation complete and data is unavailable](/device-connect/rest-api.html#case-3-calculation-complete-and-data-is-unavailable) | `"no_data"` | 200 | The request input is correct and processing has completed but response contains no predictors because of lack of data from user's device |
| [Data fetch for request Id before webhook callback or after 24 hours](/device-connect/rest-api.html#case-4-data-fetch-for-request-id-before-webhook-callback-or-after-24-hours) | `"webhook_not_found"` | 200 | The request has no data assosciated with it because the request id was never sent from webhook callback or it is deleted because 24 hours passed from when it was sent |
| [Invalid customer ID](/device-connect/rest-api.html#case-4-invalid-customer-id) | `"not_found"` | 200 | User does not exist in FinBox system |
| [Bad request](/device-connect/rest-api.html#case-5-bad-request) | `"error"` | 400 | The request input is incorrect / malformed. More details available in `message` key |
| [Unauthorized](/device-connect/rest-api.html#case-6-unauthorized) | `"error"` | 403 | This happens in case SERVER_API_KEY is incorrect or IP address in not whitelisted |
| [Internal Server Error](/device-connect/rest-api.html#case-6-unauthorized) | `"error"` | 5xx | The request processing failed because of some internal error. In this case, please retry twice with an exponential backoff i.e. retry after 2 seconds, then retry after 5 seconds. If the issue persists, please contact support |
| [Rate Limit Exceeded](/device-connect/rest-api.html#case-8-rate-limit-exceeded) | `"error"` | 429 | This happens in case the maximum allowed rate limit on API exceeds. In this case, please retry twice with an exponential backoff i.e. retry after 2 seconds, then retry after 5 seconds. Contact FinBox to know your rate limits.|

::: danger IMPORTANT
In case your are running a daily CRON that fetches data using insights API, ensure you are not breaching the rate limit. Please contact FinBox to know your rate limits.
:::

### Case 1 - Calculation in Progress

HTTP Status Code: **202**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-xcds1",
    "date_requested": "2019-01-03T06:37:44:003",
    "status": "in_progress",
    "message": "Featurization in Progress, please try again in 10 Seconds"
}
```

### Case 2 - Calculation complete and data is available

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-jjj1",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed": "2018-12-12T01:01:57:221",
    "status": "complete",
    "message": "data processed successfully",
    "data": [] // will hold the predictor objects
}
```

### Case 3 - Calculation complete and data is unavailable

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-000l",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed": "2018-12-12T01:01:57:221",
    "status": "no_data",
    "message": "No data available for user",
    "data": null
}
```

### Case 4 - Data fetch for request Id before webhook callback or after 24 hours

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-000l",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed": "2018-12-12T01:01:57:221",
    "status": "webhook_not_found",
    "message": "The Webhook response for the given request ID was not found. This can happen if the webhook URL was called before receiving the webhook event or after 24 hours of receiving webhook event"
}
```

### Case 5 - Invalid Customer ID

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482160F9F",
    "request_id": "abcd-def-dfdf-ddd1",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed":null,
    "status": "not_found",
    "message": "User not found",
    "data": null
}
```

### Case 6 - Bad Request

HTTP Status Code: **400**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482160F9F",
    "request_id": "abcd-def-dfdf-ddd1",
    "date_requested": "2019-01-03T06:37:44:003",
    "status": "error",
    "message":"Missing Key version"
}
```

### Case 7 - Unauthorized

HTTP Status Code: **403**

Sample Response Body:

```json
{
    "status": "error",
    "message": "Incorrect API Key"
}
```

### Case 8 - Internal Server Error

HTTP Status Code: **5xx**

Sample Response Body:

```json
{
    "status": "error",
    "message": "Internal Server Error. Please retry. If issue persists, please contact support"
}
```

### Case 9 - Rate Limit Exceeded

HTTP Status Code: **429**

Sample Response Body:

```json
{
    "status": "error",
    "message": "Rate limit exceeded"
}
```

## Predictors Webhook Integration


FinBox fires a webhook when a user's results are updated. Upon receipt of the webhook, you can query the insights API to fetch these results. 


The webhook payload has the following keys:
- **service**: It indicates the service whose results have been updated. Currently, It will be set to `PREDICTORS`.
- **customer_id**: customer_id for which result was updated.
- **salt**: A salt is used to authenticate webhook. It is computed basis logic mentioned in the [Salt Generation](/device-connect/rest-api.html#salt-generation) section.
- **request_id**: A unique string corresponding to each each request.


:::warning IMPORTANT
You have to register your webhook address with FinBox. Please get in touch with us for the same.
:::


```json
{
    "service": "PREDICTORS",
    "customer_id": "89561ea2190946a9",
    "salt": "/+Y459HYwFtWB2656bE5eTvB4NmTSoTmoAyt9SAtwek=",
    "request_id": "aad12-dabmd-ddb-1123d"
}
```

## Querying by webhook

Once you receive a webhook, you can make a POST request of the `insights` API using the param `source` = `webhook` and `request_id` = `{request_id}`. This will return the updated data to you instantly. 

`https://insights.finbox.in/v2/risk/predictors?source=webhook&request_id={request_id}`

:::warning IMPORTANT
- You must only use the `source` param once you have received the webhook.
- Param `request_id` must be the same as the request_id received in the response payload of the webhook.
- Including this param bypasses the calculation of results and returns already existing result.
:::

## Salt Generation

### Calculating salt

Salt is calculated as follows:
1. A = Create MD5 hash of `CUSTOMER_ID`
2. B = Concatenate string of A and `SERVER_HASH` shared by FinBox.
3. C = Create an SHA-256 hash of B
4. Salt = base64 encoded version of C

Sample code for salt generation in different languages:

<CodeSwitcher :languages="{java:'Java',python:'Python',go:'Go',php:'PHP'}">
<template v-slot:java>

```java
import java.security.*;
import java.util.*;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;
​
​
public class SaltGeneration {
    private static final int HEX_255 = 0xFF;
    private static final String UNICODE_TRANSFORMATIONAL_FORMAT_8_BIT = "UTF-8";
    private static String CUSTOMER_ID = "<CUSTOMER_ID>";
    private static String SERVER_HASH = "<SERVER_HASH>";
    
    private static String getSaltForBody() {
        String hashedOutput = getMd5Hash(CUSTOMER_ID);
        String concatString = hashedOutput + SERVER_HASH;
        String shaOutput = get256Encoded(concatString);
        return shaOutput;
    }
​
​
    private static String getMd5Hash(final String s) {
        try {
            // Create MD5 Hash
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(s.getBytes(Charset.forName(UNICODE_TRANSFORMATIONAL_FORMAT_8_BIT)));
            byte[] messageDigest = digest.digest();
    
            // Create Hex String
            StringBuilder hexString = new StringBuilder();
            for (byte mDigest : messageDigest) {
                StringBuilder h = new StringBuilder(Integer.toHexString(HEX_255 & mDigest));
                while (h.length() < 2) {
                    h.insert(0, "0");
                }
                hexString.append(h);
            }
            return hexString.toString().toUpperCase();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
​
    /**
     * Method converts the string into SHA 256 and returns it
     *
     * @param s String to be 256 encoded
     * @return Converted 256 hash
     */
    private static String get256Encoded(final String text) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

</template>
<template v-slot:python>

```python
import hashlib, base64

def create_salt(customer_id, server_hash):
    """
    Takes customer_id (unique identifier of customer)
    and server_hash (shared by FinBox) as input
    and returns salt in response
    """
    customer_hash = hashlib.md5(customer_id.encode('utf-8')).hexdigest().upper()
    intermediate_hash = customer_hash + server_hash
    salt_encoded = hashlib.sha256(intermediate_hash.encode('utf-8')).digest()
    salt = base64.b64encode(salt_encoded).decode()
    return salt
```

</template>

<template v-slot:go>

```go
import (
	"crypto/md5"
	"crypto/sha256"
	"fmt"
	"encoding/base64"
	"encoding/hex"
	"strings"
)
func GetSaltForCustomer(customerId string, serverHash string) string {
    hasher := md5.New()
	hasher.Write([]byte(customerId))
	hexHasher := hex.EncodeToString(hasher.Sum(nil))
	data := strings.ToUpper(hexHasher)+ serverHash
	newSha256 := sha256.New()
	newSha256.Write([]byte(data))
    finalData := base64.StdEncoding.EncodeToString(newSha256.Sum(nil))
	return finalData
}
```

</template>

<template v-slot:php>

```php
function create_salt($customer_id, $server_hash) {
    $customer_hash = strtoupper(md5($customer_id));
    $intermediate_hash = $customer_hash."".$server_hash;
    $salt_encoded = openssl_digest($intermediate_hash, 'sha256', true);
    $salt = base64_encode($sha_hash);
    return $salt;
}
```

</template>

</CodeSwitcher>


### Debugging Salt Generation

You can cross check each individual step of your salt generation logic by using the following parameters

```
customer_id = 82169C6312B50CA8233482169F9F288F812B5C02114A6A74E9A62
server_hash = 5f8cd80c69a34b9785dc66298eabe95b
```


**Step A Result - Hexdigest of MD5Hash** 

`7B85689C14D32209779241F14A09C29B`


**Step B Result -  Intermediate Hash** 

`7B85689C14D32209779241F14A09C29B5f8cd80c69a34b9785dc66298eabe95b`


**Step C Result - Hexdigest Version**

 `2a2e163b66dbcd838bd6d122e17038e90f2ba5c0b6ca295364c84e19746ca8e4`

 Note: The result for Step C shared above is generated by doing a hexdigest rather than a digest. It is shared for comparison purposes only. In the actual code you must use digest rather than haxdigest for Step 3.

**Final Result - Salt**

`Ki4WO2bbzYOL1tEi4XA46Q8rpcC2yilTZMhOGXRsqOQ=`
