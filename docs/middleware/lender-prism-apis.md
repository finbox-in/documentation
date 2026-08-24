# Lender Prism APIs

## Headers
All server-to-server APIs will contain the below headers.

| Header | Value | Description |
|---|---|---|
| x-api-key | SERVER_API_KEY | This will be shared with the partner when integration is kicked-off. |
| content-type | application/json |  |

## Create User API
This API creates a lending user at FinBox for a given customer ID.

::: tip Note
The partner needs to keep track of this ID, as providing an existing customer ID will allow the user to continue their journey from the same stage.
:::

- **Method:** POST
- **URL:** `<baseurl>/v2/user/create`

**Sample Request**
```json
{
  "customerID": "some_customer_id",
  "mobile": "9999999999"
}
```

**Sample Response**
```json
{
    "data": {
        "message": "user created!"
    },
    "error": "",
    "statusCode": "CUR-S-000"
}
```

**Request Payload**
| Field | Type | Description | Mandatory |
|---|---|---|---|
| customer_id | String | Unique identifier of a customer created by the partner. This identifier is used in all subsequent API. | Yes |
| mobile | String | User's mobile number for verification | Yes |

**Status Codes**
| Case | Status Codes |
|---|---|
| Create User Success | CUR-S-000 |
| Invalid Mobile No | CUR-E-001 |
| User Exists | CUR-E-002 |

## Update User Details API
This API will enable a partner to share all data about the customer with FinBox. This data will be used in various places in downstream actions like pre-qualification, BRE, KYC checks etc.

- **Method:** POST
- **URL:** `<baseurl>/v2/user/details/update`

::: tip Note
This call is made right before triggering pre-qualification.
:::

**Sample Request**
```json
{
  "customerID": "some_customer_id",
  "program": "PERSONAL_LOAN",
  "basicDetails": {
    "personalDetails": {
      "pan": "XYZPA1234A",
      "email": "testuser@gmail.com",
      "name": "Test User",
      "dob": "1997-11-18",
      "gender": "MALE",
      "currentAddress": {
        "pincode": "560095",
        "currentAddressLine1": "some_address_L1",
        "currentAddressLine2": "some_address_L2",
        "currentAddressCity": "some_city",
        "currentAddressState": "some_state"
      }
    },
    "employmentDetails": {
      "employmentType": "Salaried",
      "monthlyIncome": "0-25000",
      "email": "testuser@organization.com",
      "employmentOrganization": "some_org",
      "address": {
        "line1": "some_address_L1",
        "line2": "some_address_L2",
        "city": "some_city",
        "state": "some_state",
        "pincode": "560095"
      }
    }
  },
  "consents": [
    {
      "type": "HYBRID_CONSENT",
      "timestamp": "someTimestamp",
      "body": "some_consent_content",
      "ipAddress": "192.0.2.1",
      "url": "some_url"
    },
    {
     "type": "BUREAU",
     "timestamp": "someTimestamp",
     "body": "some_consent_content",
     "ipAddress": "192.0.2.1",
     "url": "some_url"
    },
    {
    "type": "TNC",
    "timestamp": "someTimestamp",
    "body": "some_consent_content",
    "ipAddress": "192.0.2.1",
    "url": "some_url"
    }
  ]
}
```

**Invocation 2 - For NACH**
```json
{
    "customerID": "{{customerID}}",
    "program": "EDI",
    "mandateDetails": {
        "accountNumber": "111111111",
        "accountType": "savings",
        "bankName": "ICICI",
        "mandateType": "",
        "accountHolderName": "someName",
        "ifsc": "ICIC0003903",
        "mandateAmount": 94000,
        "vendor": "vendorName",
        "vendorDocID": "mandateID",
        "npciTxnID": "some_npci_txn_id"
    },
    "basicDetails": {
        "businessDetails": {
            "name": "",
            "category": "",
            "subCategory": "",
            "address": {
                "businessAddressType": "",
                "line1": "someAddressLine1",
                "line2": "someAddressLine2",
                "city": "city",
                "state": "state",
                "pincode": "",
                "landmark": "",
                "location": {
                    "latitude": "",
                    "longitude": ""
                }
            },
            "uanDetails": {
                "uan": "UDYAM123456"
            }                
        }
    },
    "loanDetails": {
        "insuranceDetails": {
            "premium": 1000,
            "gstApplicable": false,
            "gstRate": 0,
            "vendor": "Acko"
        }
    },
    "consents": [
        {
            "type": "INSURANCE",
            "timestamp": "1704392919504",
            "body": "",
            "ipAddress": "0.0.0.0",
            "url": "someUrl"
        }
    ]
}
```

**Sample Response**
```json
{
    "data": {
        "message": "success"
    },
    "error": "",
    "statusCode": "UUD-S-000"
}
```

**Request Payload**
| Field | Type | Description | Mandatory |
|---|---|---|---|
| customerID | String | Unique identifier of a customer created by the partner. This identifier is used in all subsequent API. | Yes |
| program | String | Fixed Value: PERSONAL_LOAN | Yes |
| basicDetails | Array |  | Yes |
| consents | Array | Consent details collected by the partner | Yes |
| riskVariables | Array | This includes any additional parameters to be included in the BRE for a partner specific policy | No |
| additionalData | Array | This includes any extra data intended for partner supplemental purposes. | No |

**Status Codes**
| Case | Status Codes |
|---|---|
| Update User Details Success | UUD-S-000 |
| Invalid Payload | UUD-E-000 |
| Error Processing Request | UUD-E-001 |
| Validation Error | UUD-E-002 |

## Trigger BRE API
- **Method:** POST
- **URL:** `<baseurl>/v2/user/offers`

This API will trigger the BRE on FinBox side.
1. FinBox will handle fetching bureau data.
2. FinBox will run all other checks required (Pincode Serviceability, Dedupe, Hunter, Posidex etc)

**Sample Request**
```json
{
   "customerID":"some_id",
  "riskVariables":{}
}
```

**Sample Response**
```json
{
    "data": {
        "referenceID": "some_reference_id"
    },
    "error": "",
    "statusCode": "GNO-S-000"
}
```

**Request Payload**
| Field | Type | Description | Mandatory | Validations |
|---|---|---|---|---|
| customerID | String | Unique identifier of a customer created by the partner. This identifier is used in all subsequent API. | Yes |  |
| riskVariables | String | Will remain empty unless there is a partner specific use case. | Yes |  |

**Status Codes**
| Case | Status Codes |
|---|---|
| Generate Offers Success | GNO-S-000 |
| Invalid Policy ID | GNO-E-002 |

## Get BRE API
- **Method:** GET
- **URL:** `<baseurl>/v2/user/offers?referenceID=some_reference_id`

This API returns the offers generated by the BRE. It can return 4 cases:
- **SUCCESS:** Offer is generated.
- **REJECTED:** User is rejected potentially because of Pre BRE checks or Lender BRE checks.
- **PROCESSING:** In case of this status, partner should keep polling in intervals of 5-10 second.
- **FAILED:** This could be due to a technical issue or timeout. It is recommended to call the set of Trigger BRE and Get BRE APIs 2-3 times at 30 second intervals. If the issue persists, the case should be held and problem must be reported to the Finbox team.

**Sample Response**

**Processing**
```json
{
    "data": {
        "dataRequired": null,
        "offers": null,
        "outputVariables": null,
        "rejectionReason": null,
        "referenceID": "c3a709e0-8bcb-47aa-86cd-b8d6581f4782",
        "status": "PROCESSING"
    },
    "error": "",
    "statusCode": "GEO-S-001"
}
```

**Failed**
```json
{
    "data": {
        "dataRequired": null,
        "offers": null,
        "outputVariables": null,
        "rejectionReason": null,
        "referenceID": "c3a709e0-8bcb-47aa-86cd-b8d6581f4782",
        "status": "FAILED"
    },
    "error": "",
    "statusCode": "GEO-S-003"
}
```

**Rejected**
Rejection Reasons: PRE_BRE_REJECT and LENDER_BRE_REJECT
```json
{
    "data": {
        "dataRequired": null,
        "offers": null,
        "referenceID": "c3a709e0-8bcb-47aa-86cd-b8d6581f4782",
        "outputVariables": {
            "rejectionReason": "Detailed rejection reason"
        },
        "rejectionReason": "PRE_BRE_REJECT",
        "status": "REJECTED"
    },
    "error": "",
    "statusCode": "GEO-S-002"
}
```

**Success**
This is the final offer generated which is shown to the user.
```json
{
    "data": {
        "dataRequired": {},
        "offers": [
            {
                "createdAt": "2024-02-29T12:17:52.414026Z",
                "expiresAt": "2024-03-30T00:00:00Z",
                "lenderID": "c1a55e53-4701-49a1-923c-3cf32a66b5ec",
                "lenderLogoURL": "https://finbox-cdn.s3.ap-south-1.amazonaws.com/assets/abfl_logo.jpeg",
                "lenderName": "Aditya Birla Finance Limited",
                "offerID": "3a6112e6-61de-437a-a84b-5c6f8b655722",
                "offerType": "final",
                "slabs": [
                    {
                        "maxAmount": 200000,
                        "minAmount": 100000,
                        "tenure": 12,
                        "interest": 25,
                        "method": "rb",
                        "processingFee": 2.75,
                        "processingFeeType": "PERC",
                        "gst": 18
                    }
                ],
                "status": "ACTIVE"
            }
        ],
        "outputVariables": {},
        "rejectionReason": null,
        "status": "SUCCESS"
    },
    "error": "",
    "statusCode": "GEO-S-000"
}
```

**Status Codes**
| Case | Status Codes |
|---|---|
| Get Offers Success Status | GEO-S-000 |
| Get Offers Processing Status | GEO-S-001 |
| Get Offers Rejected Status | GEO-S-002 |
| Get Offers Failed Status | GEO-S-003 |

## Accept Offer API
This API informs FinBox about the final accepted offer in the system. The selected offer should fall within the offer slabs generated in the GetBRE response. It will also subsequently create a loan application in the system.

- **Method:** POST
- **URL:** `<base_url>/user/acceptOffer`

**Sample Request**
```json
{
   "customerID":"someCustomerID",
   "offerDetails":{
      "offerID":"d89b2b1b-98ff-4378-af0c-235cfc00b71a",
      "amount":80000,
      "tenure":8,
      "interest": 25
   }
}
```

**Request Payload**
| Field | Type | Description | Mandatory | Validations |
|---|---|---|---|---|
| customerID | String | Unique identifier of a customer used in create user API | Yes |  |
| offerDetails | Array | Offer Details block | Yes |  |

**Sample Response**
```json
{
    "data": {
        "message": "ok"
    },
    "error": "",
    "statusCode": "AOP-S-000"
}
```

**Status Codes**
| Case | Status Codes |
|---|---|
| Success | AOP-S-000 |
| Invalid Offer ID | AOP-E-002 |
| Invalid Input | AOP-E-003 |

## Trigger Banking API
- **Method:** POST
- **URL:** `<baseurl>/v2/user/bank/analyse`

This API consumes the necessary banking details and initiates the flow at FinBox.

::: warning Bank Statement Range
Bank Statements Uploaded should be within the specific range from the last completed month.

**Example:**
- Today's Date: 05/09/2024 
- Last Completed Month: 08/2024
- Accepted Range: 01/03/2024- 31/08/2024
:::

**Sample Request (Form Request)**
```
"customerID":"some_customer_id",    
"files":"",
"bankName":"HDFC",
"uploadType": "PDF/BASE64",
"pdfPassword":""    //Optional
```

**Sample Response**

**Success**
```json
{
   "data":{
      "referenceID":"some_ref_id"
   },
   "error":"",
   "statusCode": "BANK-TBN-S-000"
}
```

**Failed**
```json
{
   "data":{},
   "error":"user not found",
   "statusCode": "FBX-E-006"
}
```

**Request Payload**
| Field | Type | Description | Mandatory | Validations |
|---|---|---|---|---|
| customer_id | String | Unique identifier of a customer created by the partner. This identifier is used in all subsequent API. | Yes |  |
| files | File | Bank Statement File to be upload. (Supports multiple files within the accepted range) | Yes | Size limit is 5MB. |
| bankName | String | Bank Name to be fetched from Bank List API (banks.name) | Yes |  |
| uploadType | String | File type being uploaded | Yes | Accepted Values: PDF/ BASE64 |
| pdfPassword | String | To be passed if the file is password protected. | No |  |

**Status Codes**
| Case | HTTP Code | Status Codes |
|---|---|---|
| Success | 200 | BANK-TBN-S-000 |

## Get Banking Result API
- **Method:** GET
- **URL:** `<baseurl>/v2/user/bank/analyse?referenceID=some_reference_id`

This API returns can return 3 possible scenario:
- **SUCCESS:** Banking flow is completed.
- **PROCESSING:** Banking flow is not completed; partner should keep polling in intervals of 5-10 second.
- **FAILED:** Banking flow failed due to incorrect details or a technical error. The partner should restart the banking process by invoking the Trigger Banking API with the correct details.

**Sample Response**

**Success**
```json
{
  "data": {
    "errorCode": "",
    "errorMessage": "",
    "referenceID": "c3a709e0-8bcb-47aa-86cd-b8d6581f4782",
    "status": "SUCCESS"
  },
  "error": "",
  "statusCode": "BANK-GBR-S-000"
}
```

**Processing**
```json
{
  "data": {
   "bankingDetails":{
    "errorCode": "",
    "errorMessage": ""
    },    
    "referenceID": "c3a709e0-8bcb-47aa-86cd-b8d6581f4782",
    "status": "PROCESSING"
  },
  "error": "",
  "statusCode": "BANK-GBR-S-001"
}
```

**Failed**
```json
{
  "data": {
   "bankingDetails":{
    "errorCode": "PDF_IS_IMAGE",
    "errorMessage": "Scanned images are not supported"
    },    
    "referenceID": "c3a709e0-8bcb-47aa-86cd-b8d6581f4782",
    "status": "FAILED"
  },
  "error": "",
  "statusCode": "BANK-GBR-S-002"
}
```

**List of Error Codes in FAILED Response**
| errorCode | errorMessage |
|---|---|
| INVALID_DATE_FORMAT | Invalid 'from_date' or 'to_date' format. Use 'DD/MM/YYYY'. |
| INVALID_DATE_RANGE | from_date' can't be greater or equal to 'to_date'. |
| MISSING_DATE_FIELD | from_date' and 'to_date' are required. |
| INVALID_BANK_NAME | Invalid bank identifier. |
| MISSING_BANK_NAME | bank_name' is required with 'mode'. |
| MODE_NOT_AVAILABLE | Specified mode not available for this bank. |
| MODE_NOT_ENABLED | Specified mode not enabled. Contact FinBox Admin. |
| TRIAL_PERIOD_EXPIRED | Your trial period has expired. Please request FinBox to upgrade your plan |
| INVALID_FILE_OBJECT | This field must be present as a form field. Send request with content type x-www-form-urlencoded or form-data |
| PDF_IS_IMAGE | Scanned images are not supported |
| BANK_NAME_MISMATCH | Not {selected_bank_name} bank statement |
| OUT_OF_DATE_RANGE | No transactions in expected date range |
| STATEMENT_DUPLICATE | A duplicate statement has been detected |
| EXTERNAL_API_FAILURE | External API failure, please try again later |
| VALIDATION_ERROR | Savings account statement not used |
| FRAUD | We have detected an issue with your bank statement. Please try again with RBI regulated Account Aggregator or Netbanking. |

**Status Codes**
| Case | HTTP Code | Status Codes |
|---|---|---|
| Success | 200 | BANK-GBR-S-000 |
| Processing | 200 | BANK-GBR-S-001 |
| Failed | 200 | BANK-GBR-S-002 |

## Get Bank List API
- **Method:** GET
- **URL:** `<baseurl>/v2/bank/list?customerID=some_cust_id`

This API fetches the list of accepted banks in the Banking API flow.

**Sample Response**
```json
{
    "count": 435,
    "banks": [
        {
            "name": "SBI",
            "fullName": "State Bank of India",
            "npciCode": "SBIN",
            "logoUrl": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/sbi_light.png",
            "isPdfUpload_available": true,
            "isNetBanking_available": true,
            "isAaAvailable": false
        },
        {
            "name": "ICICI",
            "fullName": "ICICI",
            "npciCode": "ICIC",
            "logoUrl": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/sbi_light.png",
            "isPdfUpload_available": true,
            "isNetBanking_available": true,
            "isAaAvailable": true
        }
    ]
}
```

**Status Codes**
| Case | HTTP Code | Status Codes |
|---|---|---|
| Success | 200 | BANK-GBL-S-000 |

## Document Upload API
- **Method:** POST
- **URL:** `<baseurl>/v2/document/upload`

**Headers**
- Content-Type: multipart/form-data
- Accept-Encoding: gzip, deflate, br
- Connection: keep-alive

**Request Types**

**Aadhar XML Upload**
```json
{
  "program": "EDI",
  "digilocker_aadhaar_xml": "<file>",
  "documentType": "AADHAAR_XML",
  "customerID": "some_customerID"
}
```

**Selfie Upload**
```json
{
  "program": "EDI",
  "selfie": "<file>",
  "documentType": "SELFIE",
  "customerID": "some_customerID"
}
```

**Agreement Upload**
```json
{
    "program": "EDI",
    "agreement": "<file>",
    "documentType": "LOAN_AGREEMENT",
    "customerID": "some_customerID"
}
```

**Business Proof Upload**
```json
{
    "program": "EDI",
    "business_proof_doc": "<file>",
    "documentType": "BUSINESS_PROOF_DOC",
    "customerID": "some_customerID"    
}
```

## Trigger KYC API
- **Method:** POST
- **URL:** `<baseurl>/v2/kyc/ckyc`

**Request:**
```json
{
    "customerID": "some_customerID",
    "program": "PERSONAL_LOAN"
}
```

**Success Response:**
```json
{
    "data": {
        "referenceID": "some_reference_id"
    },
    "error": "",
    "statusCode": "TCK-S-000"
}
```

## Get KYC Details API
This API is used to fetch KYC status, and the relevant details.

- **Method:** GET
- **URL:** `<baseurl>/v2/kyc/details?referenceID=some_reference_id`

**Response Statuses**
- APPROVED
- PROCESSING
- ACTION_PENDING
- CONTIONAL_SUCCESS
- REJECTED
- FAILED
- SOFT_REJECTED

**Some Response Examples**

**CKYC OTP Triggered**
```json
{
    "data": {
        "action": "SUBMIT_CKYC_OTP",
        "customerID": "FB_7wkDTScOpf9wCnrIjhEh",
        "referenceID": "e58cf4f5-648d-46f2-adc6-dc9e4dde300f",
        "results": null,
        "status": "ACTION_PENDING"
    },
    "error": "",
    "statusCode": "GKD-S-001"
}
```

**Invalid CKYC OTP**
```json
{
    "data": {
        "action": "INVALID_CKYC_OTP",
        "customerID": "FB_7wkDTScOpf9wCnrIjhEh",
        "referenceID": "e58cf4f5-648d-46f2-adc6-dc9e4dde300f",
        "results": null,
        "status": "ACTION_PENDING"
    },
    "error": "",
    "statusCode": "GKD-S-001"
}
```

**CKYC Failed**
```json
{
    "data": {
        "action": "",
        "results": null,
        "status": "FAILED"
    },
    "error": "CKYC_FAILED",
    "statusCode": "GKD-E-000"
}
```

**OKYC Extraction and Name Checks Complete**
```json
{
    "data": {
        "action": "",
        "personalKYC": [
            {
                "address": {
                    "city": "Khamgaon",
                    "country": "INDIA",
                    "district": "Buldana",
                    "landmark": "Shakuntal Nursing Home",
                    "line1": "some line 1",
                    "line2": "some line 2",
                    "locality": "Shriram Chowk, Farshi",
                    "pincode": "pincode",
                    "state": "Maharashtra"
                },
                "dob": "YYYY-MM-DD",
                "gender": "MALE",
                "name": "First Last Name",
                "type": "OKYC_DIGILOCKER"
            }
        ],
        "results": {
            "dobMatch": true,
            "faceLiveliness": true,
            "faceMatch": true,
            "nameMatch": true
        },
        "outputVariables":{
            "manualReviewRequired": false,
            "udyamStatus": "Y"
        },
        "status": "APPROVED"
    },
    "error": "",
    "statusCode": "GKD-S-000"
}
```

**CKYC Extraction/ OKYC Extraction / Selfie Verification Ongoing**
```json
{
    "data": {
        "action": "WAIT",
        "personalKYC": null,
        "status": "PROCESSING"
    },
    "error": "",
    "statusCode": "GKD-S-001"
}
```

**OKYC Failure**
```json
{
    "data": {
        "action": "",
        "results": null,
        "status": "FAILED"
    },
    "error": "",
    "statusCode": "GKD-E-000"
}
```

**Possible Message Values**
| Message | Description |
|---|---|
| PAN_DATA_MISMATCH | DOB mismatch between Aadhaar and PAN |
| NAME_MISMATCH | Name mismatch between Aadhaar and Loan Application Name |
| DIGITAL_SIGNATURE_REJECTED | Invalid Digital Signature in the Aadhaar XML file |
| FACE_MISMATCH | Aadhaar selfie does not match with uploaded selfie |
| LIVENESS_REJECT | Selfie not live |
| MANUAL_REVIEW_REQUIRED | Application is in manual qc |
| MANUAL_KYC_REJECT | Application is rejected from manual qc due to kyc name mis match |
| MANUAL_PENNYDROP_REJECT | Application is rejected from manual qc due to peny drop name (account holder name) mis match |

## Trigger Agreement Signing API
- **Method:** POST
- **URL:** `<baseurl>/v2/loan/agreement`

**Sample Request**
```json
{
    "customerID":"some_customerID",
    "program":"EDI"
}
```

**Success Response**
```json
{
    "data": {
        "referenceID": "some_reference_id"
    },
    "error": "",
    "statusCode": "TAS-S-000"
}
```

**Failure Response (Agreement Not Uploaded)**
```json
{
    "data": {},
    "error": "agreement document not found",
    "statusCode": "TAS-E-001"
}
```

## Get Agreement Signing Results API
- **Method:** GET
- **URL:** `<baseurl>/v2/loan/agreement?referenceID=some_reference_id`

This API returns the status of the agreement signing. Possible statuses:
- PROCESSING
- SUCCESS
- REJECTED
- FAILED

**Successful Response**
```json
{
  "data": {
    "status": "SUCCESS",
    "agreementURL": "some_s3_url"
  },
  "error": "",
  "statusCode": "GAS-S-000"
}
```

**Processing Response**
```json
{
  "data": {
    "status": "PROCESSING",
    "agreementURL": null
  },
  "error": "",
  "statusCode": "GAS-S-000"
}
```

**Failed Response**
```json
{
  "data": {
    "status": "FAILED",
    "agreementURL": null
  },
  "error": "",
  "statusCode": "GAS-S-000"
}
```

**Rejected Response**
```json
{
  "data": {
    "status": "REJECTED",
    "agreementURL": null
  },
  "error": "",
  "statusCode": "GAS-S-000"
}
```

## Trigger Disbursal API
- **Method:** POST
- **URL:** `<baseurl>/v2/loan/disburse`

**Request**
```json
{
  "customerID": "some_customerID",
  "program": "EDI"
}
```

**Response**
```json
{
  "data": {
    "referenceID": "some_reference_id"
  },
  "error": "",
  "statusCode": "TDB-S-200"
}
```

## Get Disbursal Status API
- **Method:** GET
- **URL:** `<baseurl>/v2/loan/disburse?referenceID=some_reference_id`

**Successful Response**
```json
{
  "data": {
    "utrNumber": "someUTR",
    "disbursedAt": "2024-01-25T23:00:54.963518+05:30",
    "disbursedAmount": 5000,
    "loanAccountNumber": "someLoanAccountNumber",
    "status": "SUCCESS",
    "message": "SUCCESS"
  },
  "error": "",
  "statusCode": "GDB-S-200"
}
```

**Processing Response**
```json
{
  "data": {
    "customerID": "someCustomerId",
    "message": "",
    "referenceID": "someReferenceId",
    "status": "PROCESSING"
  },
  "error": "",
  "statusCode": "GDB-S-200"
}
```

## Session API
Session API will return the URL for the part of the journey that happens on ABFL UI.
It will include steps such as KYC, Pennydrop, NACH, Agreement etc.

- **Method:** POST
- **URL:** `<baseurl>/v2/user/session`

**Sample Request**
```json
{
    "customerID": "somecustomerid",
    "redirectURL": "https://yoururl/redirect/to/after/user/exits"
}
```

| Field | Type | Description | Mandatory | Validations |
|---|---|---|---|---|
| customerID | String | Unique identifier of a customer used in create user API | Yes |  |
| redirectURL | String | Partner return URL where the user will be redirected after completing journey on Finbox UI. | Yes |  |

**Sample Response**
```json
{
    "data": {
        "url": "https://lendingwebuat.finbox.in/session/167af08b-b33f-47f3"
    },
    "error": "",
    "status": "PSS-S-000"
}
```

## Generic Status Codes
| Case | Codes |
|---|---|
| Generic Failure | FBX-E-000 |
| Request Validation Failed | FBX-E-001 |
| Internal Issues | FBX-E-002 |
| Timed Out | FBX-E-003 |
| Too Many Requests | FBX-E-004 |
| Unauthorised Request | FBX-E-005 |
| User Not Found | FBX-E-006 |
| Invalid Program | FBX-E-007 |
| Invalid Reference ID | FBX-E-008 |
| Missing Required Key | FBX-E-009 |
| Invalid User State | FBX-E-010 |
| User Disqualified | FBX-E-011 |
| Lender API Failure | FBX-E-012 |
| Invalid File | FBX-E-013 |
| Customer ID Required | FBX-E-014 |
| Request Already Reported | FBX-S-208 | 