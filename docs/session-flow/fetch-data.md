---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---



## BankConnect: Fetching Data

BankConnect REST APIs can be used to fetch enriched data for a session.


## Get Session Status

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/session_status/**

:::

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Success Response**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{ 
    "session_id": "136b1aa3-4610-4d0a-89f3-03078a2fce92", 
    "insights_available": true, 
    "accounts": [ 
        { 
            "name": "XXXXXXXX", 
            "account_category": "individual", 
            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5", 
            "account_number": "XXXXXXXXXXX3135", 
            "bank_name": "axis", 
            "error_code": null, 
            "error_message": null, 
            "account_status": "completed", 
            "created_at": "2025-11-13 06:48:44", 
            "last_updated_at": "2025-11-13 06:53:29", 
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
                    "created_at": "2025-11-13T06:48:43.660968Z" 
                } 
            ], 
            "attempt_types": [ 
                "PDF" 
            ], 
            "account_type": "SAVINGS", 
            "full_bank_name": "Axis Bank" 
        } 
    ] 
} 
```

```json
{ 
    "session_id": "c282b2cd-9f87-4ba9-9f73-964bdbd1263b", 
    "insights_available": false, 
    "accounts": [ 
        { 
            "name": "XXXXXXXX", 
            "account_category": "individual", 
            "account_id": "64d79813-d882-4c15-9ced-383e463678f8", 
            "account_number": "XXXXXXXXXXX3135", 
            "bank_name": "iob", 
            "error_code": "UNPARSABLE", 
            "error_message": "Failed to process because of an unparsable statement", 
            "account_status": "failed", 
            "created_at": "2025-11-13 07:35:33", 
            "last_updated_at": "2025-11-13 07:35:47", 
            "statements": [ 
                { 
                    "statement_id": "dd144ba8-0074-4175-b3e1-d4fac903d989", 
                    "statement_status": "completed", 
                    "error_code": null, 
                    "error_message": null, 
                    "source": "pdf", 
                    "upload_file_name": "86d0c187-8d87-48ca-86d7-1e90ed17a748_iob.pdf", 
                    "statement_date_range": { 
                        "from_date": "01/05/2025", 
                        "to_date": "11/11/2025" 
                    }, 
                    "created_at": "2025-11-13T07:35:31.956654Z" 
                } 
            ], 
            "attempt_types": [ 
                "PDF" 
            ], 
            "account_type": "SAVINGS", 
            "full_bank_name": "Indian Overseas Bank" 
        } 
    ] 
} 
```

**Account Status:**

The account_status field indicates the status of the overall account extraction and processing. It can be either "completed" or "failed." In case of successful completion, the message will be null. For failed cases, the following error codes and messages are applicable:

|Code|	Message|
|------------------------------| ----------------------------------|
|MISSING_TRANSACTIONS|One or more transactions are missing in the specified date range|
|INCOMPLETE_MONTHS|Insufficient data to generate report. There are no transactions for Nov 2023, Dec 2023|
|NULL_ACCOUNT_NUMBER|Account number is unavailable or unidentified|
|BALANCE_MISMATCH|Calculated transaction balance does not match|
|INCOMPLETE_MONTHS_UPLOAD|Statement(s) uploaded contain incomplete months. Missing data present for Nov 2023, Dec 2023|
|INCOMPLETE_DATES_UPLOAD|Statement(s) uploaded contain incomplete dates. Missing dates present for {}|

The statement_status field indicates the status of the overall statement extraction and processing. It can be either "completed" or "failed." In case of successful completion, the message will be null.

|Code|Message|
|------------------------------| ----------------------------------|
|PASSWORD_INCORRECT|The provided password is incorrect|
|BANK_NAME_MISMATCH|The bank name in the statement doesn't match the selected bank|
|STATEMENT_UNSUPPORTED_FORMAT|The statement format is not supported|
|STATEMENT_DUPLICATE|A duplicate statement has been detected|
|NULL_ACCOUNT_NUMBER|Account number is unavailable or unidentified|
|STATEMENT_TOO_MANY_PAGES|The statement exceeds the allowed page limit|
|NO_TRANSACTIONS_FROM_AA|Not able to fetch transactions from Account Aggregator|
|UNPARSABLE|Failed to process because of an unparsable statement|


For failed cases, the following error codes and messages are applicable:

|Code|Message|
|------------------------------| ----------------------------------|
|PDF_IS_IMAGE	|Scanned images are not supported|
|EXTRACTION_FAILED	|Failed to extract information from the statement|
|OUT_OF_DATE_RANGE|	The statement uploaded is beyond the specified date range|
|STATEMENT_NO_TRANSACTIONS	|No transactions were identified in the uploaded statement|
|BANK_NAME_UNDETECTED|Bank name could not be identified|


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
|------------------------------| ----------------------------------|------------------------------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|PROCESSING_NOT_REQUESTED|Cannot proceed as the processing has not been requested yet|400|
|SESSION_DELETED|The provided session ID has been deleted|410|
|ACCESS_DENIED|Authentication credentials were not provided|403|
|PROCESSING_NOT_COMPLETED|The processing for this session is currently in progress|400|


## Insights API

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/insights/**

:::

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
    "session_id": "136b1aa3-4610-4d0a-89f3-03078a2fce92",
    "link_id": "test_docs",
    "session_date_range": {
        "from_date": "2025-08-11",
        "to_date": "2025-11-11"
    },
    "accounts": [
        {
            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5",
            "data": {
                "account_details": {
                    "name": "ANANDA P",
                    "address": "S/O: PALANI SWAMY,#86,KANAKAPURA MAIN ROAD BANGALORE SOUTH,CHOWDESHWARI NAGAR BANGALORE SOUTH,BANGALORE,TATAGUNI- BANGALORE KARNATAKA-INDIA 560062",
                    "metadata_analysis": {
                        "name_matches": []
                    },
                    "account_category": "individual",
                    "account_number": "924010040573135",
                    "account_opening_date": null,
                    "bank": "axis",
                    "credit_limit": 0.0,
                    "ifsc": "UTIB0000009",
                    "micr": "560211002",
                    "missing_data": [
                        {
                            "from_date": "2025-11-03",
                            "to_date": "2025-11-11"
                        }
                    ],
                    "od_limit": 0.0,
                    "salary_confidence": 100.0,
                    "statements": [
                        "bc04560a-d06c-4a51-b412-031b692ecf6f"
                    ],
                    "months": [
                        "2025-08",
                        "2025-09",
                        "2025-10",
                        "2025-11"
                    ],
                    "uploaded_months": [
                        "2025-08",
                        "2025-09",
                        "2025-10",
                        "2025-11"
                    ],
                    "country_code": "IN",
                    "currency_code": "INR",
                    "dob": "",
                    "email": "",
                    "pan_number": "CUPPA9744J",
                    "phone_number": "XXXXXX8641",
                    "account_status": "",
                    "holder_type": "",
                    "account_date_range": {
                        "from_date": "2025-08-11",
                        "to_date": "2025-11-10"
                    },
                    "transaction_date_range": {
                        "from_date": "2025-08-11",
                        "to_date": "2025-11-03"
                    }
                },
                "fraud": [],
                "fraud_details": {
                    "statement": [],
                    "account": []
                },
                "transactions": [
                    {
                        "transaction_type": "credit",
                        "transaction_note": "MUTHOOT FINANCE/GOLDEN GROWTH MAY 2025",
                        "chq_num": "",
                        "amount": 1609.0,
                        "balance": 1614.0,
                        "date": "2025-08-11 00:00:00",
                        "hash": "46c183428a4a30cd190d2a5dd5bbccd8",
                        "category": "Loan Disbursed",
                        "metadata": {
                            "unclean_merchant": "MUTHOOT FINANCE",
                            "transaction_channel": "Other",
                            "description": "lender_transaction"
                        }
                    },
                    {
                        "transaction_type": "debit",
                        "transaction_note": "UPI/P2A/268652272235/ANANDA P /UPI/INDIAN OVERSEAS BANK",
                        "chq_num": "",
                        "amount": 1370.0,
                        "balance": 244.0,
                        "date": "2025-08-11 00:00:00",
                        "hash": "39155d99e3c6925007ab626be6d536f5",
                        "category": "Self Transfer",
                        "metadata": {
                            "unclean_merchant": "ANANDA P",
                            "transaction_channel": "upi",
                            "description": "self_transfer"
                        }
                    },
                    ....
                ],
                "salary_transactions": [
                    {
                        "transaction_type": "credit",
                        "transaction_note": "MUTHOOT FINANCE/Q1 BRANCH GROWTH INCENTIVE",
                        "chq_num": "",
                        "amount": 10126.0,
                        "balance": 10454.0,
                        "date": "2025-08-14 00:00:00",
                        "hash": "630ead350c368d10fbc2310f7905d5c3",
                        "category": "Salary",
                        "employer_name": null,
                        "salary_month": "Jul-2025",
                        "metadata": {
                            "unclean_merchant": "MUTHOOT FINANCE",
                            "transaction_channel": "salary",
                            "description": "Transfer from MUTHOOT FINANCE"
                        }
                    },
                    {
                        "transaction_type": "credit",
                        "transaction_note": "MUTHOOT FINANCE/MUTHOOT SALARY AUGUST 2025",
                        "chq_num": "",
                        "amount": 24193.0,
                        "balance": 24203.0,
                        "date": "2025-08-30 00:00:00",
                        "hash": "d131ce6801670d6435d4420b94fcea60",
                        "category": "Salary",
                        "employer_name": null,
                        "salary_month": "Aug-2025",
                        "metadata": {
                            "unclean_merchant": "MUTHOOT FINANCE",
                            "transaction_channel": "salary",
                            "description": "Transfer from MUTHOOT FINANCE"
                        }
                    },
                    ....
                ],
                "recurring_transactions": {
                    "debit_transactions": [
                        {
                            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5",
                            "transaction_channel": "UPI",
                            "clean_transaction_note": "DHARANI SIVAKUMAR STATE INDIA",
                            "median": 5000.0,
                            "start_date": "2025-08-14 00:00:00",
                            "end_date": "2025-08-30 00:00:00",
                            "transactions": [
                                {
                                    "transaction_type": "debit",
                                    "transaction_note": "UPI/P2A/686081232265/DHARANI SIVAKUMAR /UPI/State Bank Of India",
                                    "amount": 10000.0,
                                    "balance": 244.0,
                                    "date": "2025-08-14 00:00:00",
                                    "transaction_channel": "upi",
                                    "hash": "5979a716dac6d357887134b9e1293f09",
                                    "merchant_category": "",
                                    "description": "Transfer to DHARANI SIVAKUMAR",
                                    "category": "Transfer to DHARANI SIVAKUMAR"
                                },
                                {
                                    "transaction_type": "debit",
                                    "transaction_note": "UPI/P2A/389305922385/DHARANI SIVAKUMAR /UPI/State Bank Of India",
                                    "amount": 500.0,
                                    "balance": 200.0,
                                    "date": "2025-08-26 00:00:00",
                                    "transaction_channel": "upi",
                                    "hash": "477ce6b5fb0f24a84bef969358dededa",
                                    "merchant_category": "",
                                    "description": "Transfer to DHARANI SIVAKUMAR",
                                    "category": "Transfer to DHARANI SIVAKUMAR"
                                },
                                ....
                            ]
                        },
                        {
                            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5",
                            "transaction_channel": "UPI",
                            "clean_transaction_note": "ANANDA INDIAN OVERSEAS",
                            "median": 200.0,
                            "start_date": "2025-08-11 00:00:00",
                            "end_date": "2025-11-03 00:00:00",
                            "transactions": [
                                {
                                    "transaction_type": "debit",
                                    "transaction_note": "UPI/P2A/268652272235/ANANDA P /UPI/INDIAN OVERSEAS BANK",
                                    "amount": 1370.0,
                                    "balance": 244.0,
                                    "date": "2025-08-11 00:00:00",
                                    "transaction_channel": "upi",
                                    "hash": "39155d99e3c6925007ab626be6d536f5",
                                    "merchant_category": "",
                                    "description": "self_transfer",
                                    "category": "Self Transfer"
                                },
                                {
                                    "transaction_type": "debit",
                                    "transaction_note": "UPI/P2A/675418412265/ANANDA P /UPI/INDIAN OVERSEAS BANK",
                                    "amount": 210.0,
                                    "balance": 10244.0,
                                    "date": "2025-08-14 00:00:00",
                                    "transaction_channel": "upi",
                                    "hash": "8ea36e4a46556e27cb205cef46c41c9f",
                                    "merchant_category": "",
                                    "description": "self_transfer",
                                    "category": "Self Transfer"
                                },
                                ....
                            ]
                        }
                    ],
                    "credit_transactions": [
                        {
                            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5",
                            "transaction_channel": "OTHER",
                            "clean_transaction_note": "MUTHOOT FINANCE GOLDEN GROWTH",
                            "median": 10126.0,
                            "start_date": "2025-08-11 00:00:00",
                            "end_date": "2025-10-31 00:00:00",
                            "transactions": [
                                {
                                    "transaction_type": "credit",
                                    "transaction_note": "MUTHOOT FINANCE/GOLDEN GROWTH MAY 2025",
                                    "amount": 1609.0,
                                    "balance": 1614.0,
                                    "date": "2025-08-11 00:00:00",
                                    "transaction_channel": "Other",
                                    "hash": "46c183428a4a30cd190d2a5dd5bbccd8",
                                    "merchant_category": "loans",
                                    "description": "lender_transaction",
                                    "category": "Loan Disbursed"
                                },
                                {
                                    "transaction_type": "credit",
                                    "transaction_note": "MUTHOOT FINANCE/Q1 BRANCH GROWTH INCENTIVE",
                                    "amount": 10126.0,
                                    "balance": 10454.0,
                                    "date": "2025-08-14 00:00:00",
                                    "transaction_channel": "salary",
                                    "hash": "630ead350c368d10fbc2310f7905d5c3",
                                    "merchant_category": "",
                                    "description": "Transfer from MUTHOOT FINANCE",
                                    "category": "Salary"
                                },
                                ....
                            ]
                        },
                        {
                            "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5",
                            "transaction_channel": "OTHER",
                            "clean_transaction_note": "MUTHOOT SECURIT INC",
                            "median": 39.0,
                            "start_date": "2025-08-12 00:00:00",
                            "end_date": "2025-08-13 00:00:00",
                            "transactions": [
                                {
                                    "transaction_type": "credit",
                                    "transaction_note": "MUTHOOT SECURIT/VI INC JUN 25",
                                    "amount": 39.0,
                                    "balance": 283.0,
                                    "date": "2025-08-12 00:00:00",
                                    "transaction_channel": "Other",
                                    "hash": "a673e2ad03e9c6c40a3cf26693760f62",
                                    "merchant_category": "",
                                    "description": "Transfer from MUTHOOT SECURIT",
                                    "category": "Transfer from MUTHOOT SECURIT"
                                },
                                {
                                    "transaction_type": "credit",
                                    "transaction_note": "MUTHOOT SECURIT/HP INC JUN 25",
                                    "amount": 37.0,
                                    "balance": 320.0,
                                    "date": "2025-08-13 00:00:00",
                                    "transaction_channel": "Other",
                                    "hash": "e6e4d6a6f239d0fa7766d6722f26f3f8",
                                    "merchant_category": "",
                                    "description": "Transfer from MUTHOOT SECURIT",
                                    "category": "Transfer from MUTHOOT SECURIT"
                                }
                            ]
                        }
                    ]
                },
                "lender_transactions": [
                    {
                        "transaction_type": "credit",
                        "transaction_note": "MUTHOOT FINANCE/GOLDEN GROWTH MAY 2025",
                        "chq_num": "",
                        "amount": 1609.0,
                        "balance": 1614.0,
                        "date": "2025-08-11 00:00:00",
                        "transaction_channel": "Other",
                        "hash": "46c183428a4a30cd190d2a5dd5bbccd8",
                        "merchant_category": "loans",
                        "description": "lender_transaction",
                        "category": "Loan Disbursed"
                    },
                    ....
                ],
                "top_credits_debits": [
                    {
                        "type": "top_5_debit",
                        "data": [
                            {
                                "month": "Aug-25",
                                "data": [
                                    {
                                        "transaction_type": "debit",
                                        "transaction_note": "UPI/P2A/686081232265/DHARANI SIVAKUMAR /UPI/State Bank Of India",
                                        "chq_num": "",
                                        "amount": 10000.0,
                                        "balance": 244.0,
                                        "date": "14-Aug-25",
                                        "hash": "5979a716dac6d357887134b9e1293f09",
                                        "category": "Transfer to DHARANI SIVAKUMAR",
                                        "metadata": {
                                            "unclean_merchant": "DHARANI SIVAKUMAR",
                                            "transaction_channel": "upi",
                                            "description": "Transfer to DHARANI SIVAKUMAR"
                                        }
                                    },
                                    ....
                                ]
                            },
                            ....
                        ]
                    },
                    {
                        "type": "top_5_credit",
                        "data": [
                            {
                                "month": "Aug-25",
                                "data": [
                                    {
                                        "transaction_type": "credit",
                                        "transaction_note": "MUTHOOT FINANCE/MUTHOOT SALARY AUGUST 2025",
                                        "chq_num": "",
                                        "amount": 24193.0,
                                        "balance": 24203.0,
                                        "date": "30-Aug-25",
                                        "hash": "d131ce6801670d6435d4420b94fcea60",
                                        "category": "Salary",
                                        "metadata": {
                                            "unclean_merchant": "MUTHOOT FINANCE",
                                            "transaction_channel": "salary",
                                            "description": ""
                                        }
                                    }, 
                                    ....      
                                        ]
                             }
                                  ],
                                  ....
                    }
                "statement_stats": [
                    {
                        "session_id": "136b1aa3-4610-4d0a-89f3-03078a2fce92",
                        "account_id": "d35b9df1-871d-43d1-b6c1-67ded2c2e8e5",
                        "statement_id": "bc04560a-d06c-4a51-b412-031b692ecf6f",
                        "first_transaction_timestamp": "2025-08-11 00:00:00",
                        "last_transaction_timestamp": "2025-11-03 00:00:00",
                        "bank": "axis",
                        "source": "PDF",
                        "upload_file_name": "168c64e6-3d12-40c0-9ffb-2c02d59fe84c_axis.pdf",
                        "page_count": 3,
                        "transaction_count": 50,
                        "from_date": "2025-08-11 00:00:00",
                        "to_date": "2025-11-10 00:00:00",
                        "is_scanned_pdf": false
                    }
                ],
                "expense_categories": [
                    {
                        "category": "Transfers",
                        "percentage": 66
                    },
                    {
                        "category": "Cash",
                        "percentage": 31
                    },
                    {
                        "category": "Groceries",
                        "percentage": 3
                    }
                ],
                "self_and_sister_transactions": [
                    {
                        "transaction_type": "debit",
                        "transaction_note": "UPI/P2A/268652272235/ANANDA P /UPI/INDIAN OVERSEAS BANK",
                        "chq_num": "",
                        "amount": 1370.0,
                        "balance": 244.0,
                        "date": "2025-08-11 00:00:00",
                        "transaction_channel": "upi",
                        "hash": "39155d99e3c6925007ab626be6d536f5",
                        "merchant_category": "",
                        "description": "self_transfer",
                        "category": "Self Transfer"
                    },
                    ....
                ],
                "bounced_or_penal_transactions": [],
                "monthly_analysis": {
                    "opening_balance": {
                        "Aug-2025": 5.0,
                    },
                    "closing_balance": {
                        "Aug-2025": 3903.0,
                    },
                    "median_balance": {
                        "Aug-2025": 244.0,
                    },
                    "mode_balance": {
                        "Aug-2025": 244.0,
                        
                    },
                    "avg_bal": {
                        "Aug-2025": 513.76,
                        
                    },
                    "cnt_transactions": {
                        "Aug-2025": 26,
                        
                    },
                    "amt_debit": {
                        "Aug-2025": 36016.0,
                       
                    },
                    "cnt_debit": {
                        "Aug-2025": 18,
                        
                    },
                    "amt_credit": {
                        "Aug-2025": 39914.0,
                        
                    },
                    "cnt_credit": {
                        "Aug-2025": 8,
                        
                    },
                    "max_bal": {
                        "Aug-2025": 24203.0,
                       
                    },
                    "min_bal": {
                        "Aug-2025": 5.0,
                        
                    },
                    "max_eod_balance": {
                        "Aug-2025": 3903.0,
                       
                    },
                    "min_eod_balance": {
                        "Aug-2025": 5.0,
                        
                    },
                    "amt_international_transaction_arbitrage_credit": {
                        "Aug-2025": 0.0,
                       
                    },
                    "cnt_international_transaction_arbitrage_credit": {
                        "Aug-2025": 0,
                       
                    },
                    "amt_bank_interest_credit": {
                        "Aug-2025": 0.0,
                        
                    },
                    "cnt_bank_interest_credit": {
                        "Aug-2025": 0,
                        
                    },
                    "amt_refund_credit": {
                        "Aug-2025": 0.0,
                        
                    },
                    "cnt_refund_credit": {
                        "Aug-2025": 0,
                        
                    },
                    "amt_cash_deposit_credit": {
                        "Aug-2025": 0.0,
                       
                    },
                    "cnt_cash_deposit_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_upi_credit": {
                        "Aug-2025": 0.0,
                        
                    },
                    "cnt_upi_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_net_banking_transfer_credit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_net_banking_transfer_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_auto_debit_payment_bounce_credit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_auto_debit_payment_bounce_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_chq_credit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_chq_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_investment_cashin_credit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_investment_cashin_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_inward_cheque_bounce_credit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_inward_cheque_bounce_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_self_transfer_credit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_self_transfer_credit": {
                        "Aug-2025": 0,
                    },
                    "amt_international_transaction_arbitrage_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_international_transaction_arbitrage_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_bill_payment_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_bill_payment_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_cash_withdrawl_debit": {
                        "Aug-2025": 15300.0,
                    },
                    "cnt_cash_withdrawl_debit": {
                        "Aug-2025": 3,
                    },
                    "amt_bank_charge_debit": {
                        "Aug-2025": 236.0,
                    },
                    "cnt_bank_charge_debit": {
                        "Aug-2025": 1,
                    },
                    "amt_debit_card_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_debit_card_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_outward_cheque_bounce_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_outward_cheque_bounce_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_chq_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_chq_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_upi_debit": {
                        "Aug-2025": 20480.0,
                    },
                    "cnt_upi_debit": {
                        "Aug-2025": 14,
                    },
                    "amt_auto_debit_payment_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_auto_debit_payment_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_net_banking_transfer_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_net_banking_transfer_debit": {
                        "Aug-2025": 0,
                    },
                    "amt_payment_gateway_purchase_debit": {
                        "Aug-2025": 0.0,
                    },
                    "cnt_payment_gateway_purchase_debit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_self_transfer_debit": {
                        "Aug-2025": 2980.0,
                        "Sep-2025": 25273.0,
                        "Oct-2025": 16270.0,
                        "Nov-2025": 3330.0
                    },
                    "cnt_self_transfer_debit": {
                        "Aug-2025": 10,
                        "Sep-2025": 9,
                        "Oct-2025": 5,
                        "Nov-2025": 2
                    },
                    "amt_emi_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_emi_debit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "avg_emi": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_investment": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_investment": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_outward_cheque_bounce_insuff_funds_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_outward_cheque_bounce_insuff_funds_debit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_ach_bounce_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_ach_bounce_charge": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_chq_bounce_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_chq_bounce_charge": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_min_bal_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_min_bal_charge": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_bounce_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_bounce_charge": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "cnt_business_credit": {
                        "Aug-2025": 3,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_business_credit": {
                        "Aug-2025": 84.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_income_credit": {
                        "Aug-2025": 34403.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "cnt_income_credit": {
                        "Aug-2025": 5,
                        "Sep-2025": 1,
                        "Oct-2025": 3,
                        "Nov-2025": 0
                    },
                    "cnt_loan_credits": {
                        "Aug-2025": 3,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_loan_credits": {
                        "Aug-2025": 5511.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_emi_bounce_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_emi_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_inward_cheque_bounce_insuff_funds_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_inward_cheque_bounce_insuff_funds_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_credit_card_bill_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_credit_card_bill_debit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "turnover_excluding_loan_and_self_credit": {
                        "Aug-2025": 34403.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "turnover_excluding_loan_self_and_fdrd_credit": {
                        "Aug-2025": 34403.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "net_cash_inflow": {
                        "Aug-2025": 3898.0,
                        "Sep-2025": -1080.0,
                        "Oct-2025": 526.85,
                        "Nov-2025": -3345.0
                    },
                    "avg_credit_transaction_size": {
                        "Aug-2025": 4989.25,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 11485.67,
                        
                    },
                    "avg_debit_transaction_size": {
                        "Aug-2025": 2000.89,
                        "Sep-2025": 2808.11,
                        "Oct-2025": 4241.27,
                        "Nov-2025": 1115.0
                    },
                    "avg_bal_multipleof5": {
                        "Aug-2025": 1159.0,
                        "Sep-2025": 676.0,
                        "Oct-2025": 8.0,
                        "Nov-2025": 50.0
                    },
                    "eod_balance_lt_500_2_months_gte_10": {
                        "Aug-2025": 19.0,
                        "Sep-2025": 21.0,
                        "Oct-2025": 30.0,
                        "Nov-2025": 3.0
                    },
                    "total_amount_of_salary": {
                        "Aug-2025": 24193.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 23406.0,
                        
                    },
                    "number_of_salary_transactions": {
                        "Aug-2025": 1.0,
                        "Sep-2025": 1.0,
                        "Oct-2025": 1.0,
                        
                    },
                    "perc_salary_spend_bill_payment": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_salary_spend_cash_withdrawl": {
                        "Aug-2025": 63.0,
                        
                        "Oct-2025": 64.0,
                        
                    },
                    "perc_salary_spend_debit_card": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_salary_spend_net_banking_transfer": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_salary_spend_upi": {
                        "Aug-2025": 21.0,
                        "Sep-2025": 88.0,
                        "Oct-2025": 22.0,
                        
                    },
                    "sum_salary_spent_within_5_days_of_credit": {
                        "Aug-2025": 20300.0,
                        "Sep-2025": 21370.0,
                        "Oct-2025": 20060.15,
                        
                    },
                    "perc_salary_amt_debit_within5_days": {
                        "Aug-2025": 0.84,
                        "Sep-2025": 0.88,
                        "Oct-2025": 0.86,
                        
                    },
                    "cnt_stop_emi_charge": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_stop_emi_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_days_eod_bal_lt_25000": {
                        "Aug-2025": 21,
                        "Sep-2025": 30,
                        "Oct-2025": 31,
                        "Nov-2025": 3
                    },
                    "cnt_days_eod_bal_lt_1000": {
                        "Aug-2025": 19,
                        "Sep-2025": 25,
                        "Oct-2025": 30,
                        "Nov-2025": 3
                    },
                    "perc_inward_bounce": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_outward_bounce": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_cash_deposit_to_total_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "net_credit_count": {
                        "Aug-2025": 5.0,
                        "Sep-2025": 1.0,
                        "Oct-2025": 3.0,
                        
                    },
                    "net_debit_count": {
                        "Aug-2025": 8.0,
                        
                        "Oct-2025": 3.0,
                        "Nov-2025": 1.0
                    },
                    "net_credit_amount": {
                        "Aug-2025": 34403.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "net_debit_amount": {
                        "Aug-2025": 33036.0,
                        
                        "Oct-2025": 17660.15,
                        "Nov-2025": 15.0
                    },
                    "cnt_days_account_overdrawn": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_overdraft_balance": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_tax_gst_paid": {
                        "Aug-2025": 236.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "loan_emi": {
                        "Aug-2025": {},
                        "Sep-2025": {},
                        "Oct-2025": {},
                        "Nov-2025": {}
                    },
                    "cnt_ccod_interest": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_ccod_interest": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "employer_name": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "eod_bal_on_01": {
                        "Aug-2025": null,
                        "Sep-2025": 1003.0,
                        "Oct-2025": 26.0,
                        "Nov-2025": 49.85
                    },
                    "eod_bal_on_02": {
                        "Aug-2025": null,
                        "Sep-2025": 1003.0,
                        "Oct-2025": 6.0,
                        "Nov-2025": 49.85
                    },
                    "eod_bal_on_04": {
                        "Aug-2025": null,
                        "Sep-2025": 903.0,
                        "Oct-2025": 6.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_05": {
                        "Aug-2025": null,
                        "Sep-2025": 903.0,
                        "Oct-2025": 6.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_06": {
                        "Aug-2025": null,
                        "Sep-2025": 703.0,
                        "Oct-2025": 6.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_10": {
                        "Aug-2025": null,
                        "Sep-2025": 3.0,
                        "Oct-2025": 6.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_11": {
                        "Aug-2025": 5.0,
                        "Sep-2025": 3.0,
                        "Oct-2025": 6.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_15": {
                        "Aug-2025": 244.0,
                        
                        "Oct-2025": 6.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_16": {
                        "Aug-2025": 244.0,
                        
                        "Oct-2025": 54.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_17": {
                        "Aug-2025": 244.0,
                        
                        "Oct-2025": 4.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_20": {
                        "Aug-2025": 244.0,
                        
                        "Oct-2025": 4.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_21": {
                        "Aug-2025": 244.0,
                        
                        "Oct-2025": 4.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_25": {
                        "Aug-2025": 244.0,
                        
                        "Oct-2025": 4.0,
                        "Nov-2025": null
                    },
                    "eod_bal_on_30": {
                        "Aug-2025": 3903.0,
                        "Sep-2025": 2823.0,
                        "Oct-2025": 4.0,
                        "Nov-2025": null
                    },
                    "avg_bal_top_15_days": {
                        "Aug-2025": 716.27,
                        "Sep-2025": 780.13,
                        "Oct-2025": 233.46,
                        "Nov-2025": 34.85
                    },
                    "cnt_emi_bounce_non_tech_reason_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "cnt_emi_bounce_tech_reason_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "highest_salary_date": {
                        "Aug-2025": "2025-08-30",
                        "Sep-2025": "2025-09-29",
                        "Oct-2025": "2025-10-31",
                        "Nov-2025": null
                    },
                    "cnt_inward_cheque_bounce_non_tech_reason_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "start_date": {
                        "Aug-2025": "11-Aug-2025",
                        "Sep-2025": "01-Sep-2025",
                        "Oct-2025": "01-Oct-2025",
                        "Nov-2025": "01-Nov-2025"
                    },
                    "end_date": {
                        "Aug-2025": "31-Aug-2025",
                        "Sep-2025": "30-Sep-2025",
                        "Oct-2025": "31-Oct-2025",
                        "Nov-2025": "03-Nov-2025"
                    },
                    "amt_other_expenses": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_other_credits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_salary_paid": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_perc_cash_deposit_to_total_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_perc_cash_withdrawal_to_total_debits": {
                        "Aug-2025": 42.0,
                        
                        "Oct-2025": 44.0,
                        
                    },
                    "amt_perc_non_technical_inward_bounce_to_total_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_perc_technical_inward_bounce_to_total_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_perc_outward_bounce_to_total_credits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_overdraft_utilization": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_investment_income_credits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_interest_charged": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_pension_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_overdraft_utilization_perc": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_credit_excluding_reversal": {
                        "Aug-2025": 39914.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "cnt_credit_excluding_reversal": {
                        "Aug-2025": 8,
                        "Sep-2025": 1,
                        "Oct-2025": 3,
                        "Nov-2025": 0
                    },
                    "cnt_debit_excluding_reversal": {
                        "Aug-2025": 18,
                        "Sep-2025": 9,
                        "Oct-2025": 8,
                        "Nov-2025": 3
                    },
                    "amt_debit_excluding_reversal": {
                        "Aug-2025": 36016.0,
                        "Sep-2025": 25273.0,
                        "Oct-2025": 33930.15,
                        "Nov-2025": 3345.0
                    },
                    "perc_outward_bounce_transactions_to_total_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_non_tech_inward_bounce_transactions_to_total_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_tech_inward_bounce_transactions_to_total_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_total_amt_cash_deposit_to_total_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_total_amt_cash_withdrawal_to_total_debit": {
                        "Aug-2025": 42.48,
                        
                        "Oct-2025": 44.21,
                        
                    },
                    "sum_of_eod_bal_on_1_10_15_25": {
                        "Aug-2025": 488.0,
                        "Sep-2025": 1006.0,
                        "Oct-2025": 42.0,
                        "Nov-2025": 49.85
                    },
                    "avg_of_eod_bal_on_1_10_15_25": {
                        "Aug-2025": 244.0,
                        "Sep-2025": 503.0,
                        "Oct-2025": 10.5,
                        "Nov-2025": 49.85
                    },
                    "sum_of_eod_bal_on_1_6_11_16_21": {
                        "Aug-2025": 493.0,
                        "Sep-2025": 1709.0,
                        "Oct-2025": 96.0,
                        "Nov-2025": 49.85
                    },
                    "avg_of_eod_bal_on_1_6_11_16_21": {
                        "Aug-2025": 164.33,
                        "Sep-2025": 569.67,
                        "Oct-2025": 19.2,
                        "Nov-2025": 49.85
                    },
                    "perc_non_tech_inward_bounce_transactions_to_debits_excluding_reversal": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "perc_outward_bounce_transactions_to_debits_excluding_reversal": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "sum_of_cnt_credit_debit_excluding_reversal_and_cnt_iw_bounce_non_tech_ow_bounce": {
                        "Aug-2025": 26,
                        "Sep-2025": 10,
                        "Oct-2025": 11,
                        "Nov-2025": 3
                    },
                    "no_of_instances_account_overdrawn": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_days_account_in_overdrawn_state": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_no_of_days_account_overdrawn": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_overdrawn_amount": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "total_overdrawn_amount": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_cheque_deposit_having_chq_num": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "cnt_cheque_issue_having_chq_num": {
                        "Aug-2025": 3,
                        "Sep-2025": 0,
                        "Oct-2025": 2,
                        "Nov-2025": 0
                    },
                    "drawing_power_limit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "sanction_limit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "no_of_days_to_serve_cc_interest": {
                        "Aug-2025": "0",
                        "Sep-2025": "0",
                        "Oct-2025": "0",
                        "Nov-2025": "0"
                    },
                    "amt_cheque_deposit_having_chq_num": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_cheque_issue_having_chq_num": {
                        "Aug-2025": 15300.0,
                        
                        "Oct-2025": 15000.0,
                        
                    },
                    "number_of_days_account_overdrawn": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "number_of_days_cc_limit_breached": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "number_of_days_cc_limit_breached_and_chq_bounced": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "sum_of_eod_bal_on_1_5_15_25": {
                        "Aug-2025": 488.0,
                        "Sep-2025": 1906.0,
                        "Oct-2025": 42.0,
                        "Nov-2025": 49.85
                    },
                    "avg_of_eod_bal_on_1_5_15_25": {
                        "Aug-2025": 244.0,
                        "Sep-2025": 953.0,
                        "Oct-2025": 10.5,
                        "Nov-2025": 49.85
                    },
                    "min_amt_credit": {
                        "Aug-2025": 8.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 3.0,
                        "Nov-2025": null
                    },
                    "max_amt_credit": {
                        "Aug-2025": 24193.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 23406.0,
                        
                    },
                    "transaction_start_date": {
                        "Aug-2025": "11-Aug-25",
                        "Sep-2025": "01-Sep-25",
                        "Oct-2025": "01-Oct-25",
                        "Nov-2025": "01-Nov-25"
                    },
                    "transaction_end_date": {
                        "Aug-2025": "30-Aug-25",
                        "Sep-2025": "30-Sep-25",
                        "Oct-2025": "31-Oct-25",
                        "Nov-2025": "03-Nov-25"
                    },
                    "balance_net_off_on_1st": {
                        "Aug-2025": null,
                        "Sep-2025": -4508.0,
                        "Oct-2025": -5485.0,
                        "Nov-2025": -5461.15
                    },
                    "balance_net_off_on_5th": {
                        "Aug-2025": null,
                        "Sep-2025": -4608.0,
                        "Oct-2025": -5505.0,
                        "Nov-2025": null
                    },
                    "balance_net_off_on_10th": {
                        "Aug-2025": null,
                        "Sep-2025": -5508.0,
                        "Oct-2025": -5505.0,
                        "Nov-2025": null
                    },
                    "balance_net_off_on_15th": {
                        "Aug-2025": -1365.0,
                        "Sep-2025": -5511.0,
                        "Oct-2025": -5505.0,
                        "Nov-2025": null
                    },
                    "balance_net_off_on_20th": {
                        "Aug-2025": -4767.0,
                        "Sep-2025": -5511.0,
                        "Oct-2025": -5507.0,
                        "Nov-2025": null
                    },
                    "balance_net_off_on_25th": {
                        "Aug-2025": -4767.0,
                        "Sep-2025": -5511.0,
                        "Oct-2025": -5507.0,
                        "Nov-2025": null
                    },
                    "balance_net_off_on_30th": {
                        "Aug-2025": -1608.0,
                        "Sep-2025": -2688.0,
                        "Oct-2025": -5507.0,
                        "Nov-2025": null
                    },
                    "max_debit": {
                        "Aug-2025": 10000.0,
                        "Sep-2025": 16200.0,
                        "Oct-2025": 11000.0,
                        "Nov-2025": 3300.0
                    },
                    "min_debit": {
                        "Aug-2025": 10.0,
                        "Sep-2025": 3.0,
                        "Oct-2025": 20.0,
                        "Nov-2025": 15.0
                    },
                    "max_amt_cash_deposit_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_cash_deposit_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_cash_deposit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_net_banking_transfer_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_net_banking_transfer_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_net_banking_transfer_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_upi_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_upi_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_upi_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amount_of_salary": {
                        "Aug-2025": 24193.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 23406.0,
                        
                    },
                    "min_amount_of_salary": {
                        "Aug-2025": 24193.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 23406.0,
                        "Nov-2025": null
                    },
                    "avg_amount_of_salary": {
                        "Aug-2025": 24193.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 23406.0,
                        
                    },
                    "max_amt_chq_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_chq_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_chq_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_international_transaction_arbitrage_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_international_transaction_arbitrage_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_international_transaction_arbitrage_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_investment_cashin_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_investment_cashin_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_investment_cashin_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_refund_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_refund_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_refund_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_bank_interest_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 3.0,
                        
                    },
                    "min_amt_bank_interest_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_bank_interest_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 3.0,
                        
                    },
                    "max_amt_debit_card_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_debit_card_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_debit_card_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_cash_withdrawl_debit": {
                        "Aug-2025": 10000.0,
                        
                        "Oct-2025": 10000.0,
                        
                    },
                    "min_amt_cash_withdrawl_debit": {
                        "Aug-2025": 300.0,
                        "Sep-2025": null,
                        "Oct-2025": 5000.0,
                        "Nov-2025": null
                    },
                    "avg_amt_cash_withdrawl_debit": {
                        "Aug-2025": 5100.0,
                        
                        "Oct-2025": 7500.0,
                        
                    },
                    "max_amt_auto_debit_payment_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_auto_debit_payment_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_auto_debit_payment_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_bill_payment_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_bill_payment_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_bill_payment_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_bank_charge_debit": {
                        "Aug-2025": 236.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_bank_charge_debit": {
                        "Aug-2025": 236.0,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_bank_charge_debit": {
                        "Aug-2025": 236.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_chq_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_chq_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_chq_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_auto_debit_payment_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_auto_debit_payment_bounce_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_auto_debit_payment_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_upi_debit": {
                        "Aug-2025": 10000.0,
                        "Sep-2025": 16200.0,
                        "Oct-2025": 11000.0,
                        "Nov-2025": 3300.0
                    },
                    "min_amt_upi_debit": {
                        "Aug-2025": 10.0,
                        "Sep-2025": 3.0,
                        "Oct-2025": 20.0,
                        "Nov-2025": 15.0
                    },
                    "avg_amt_upi_debit": {
                        "Aug-2025": 1462.86,
                        "Sep-2025": 2808.11,
                        "Oct-2025": 3155.03,
                        "Nov-2025": 1115.0
                    },
                    "max_amt_net_banking_transfer_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_net_banking_transfer_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_net_banking_transfer_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_international_transaction_arbitrage_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_international_transaction_arbitrage_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_international_transaction_arbitrage_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_outward_cheque_bounce_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_outward_cheque_bounce_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_outward_cheque_bounce_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_inward_cheque_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_inward_cheque_bounce_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_inward_cheque_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_outward_cheque_bounce_insuff_funds_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_outward_cheque_bounce_insuff_funds_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_outward_cheque_bounce_insuff_funds_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_inward_cheque_bounce_insuff_funds_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_inward_cheque_bounce_insuff_funds_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_inward_cheque_bounce_insuff_funds_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_payment_gateway_purchase_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_payment_gateway_purchase_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_payment_gateway_purchase_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_emi_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_emi_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_emi_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_emi_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_emi_bounce_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_emi_bounce_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_credit_card_bill_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_credit_card_bill_debit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_credit_card_bill_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_investment": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_investment": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_investment": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_loan_credits": {
                        "Aug-2025": 3402.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_loan_credits": {
                        "Aug-2025": 500.0,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_loan_credits": {
                        "Aug-2025": 1837.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_negative_balance_amt": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_negative_balance_amt": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_of_negative_balance_amt": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_food_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        "Nov-2025": 15.0
                    },
                    "cnt_food_related_debits": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 1
                    },
                    "max_amt_food_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        "Nov-2025": 15.0
                    },
                    "min_amt_food_related_debits": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": 15.0
                    },
                    "avg_amt_food_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        "Nov-2025": 15.0
                    },
                    "amt_travel_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_travel_related_debits": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_amt_travel_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_travel_related_debits": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_travel_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_fuel_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_fuel_related_debits": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "min_amt_fuel_related_debits": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_fuel_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_shopping_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_shopping_related_debits": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_amt_shopping_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_shopping_related_debits": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_shopping_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_upi_and_net_banking_debits": {
                        "Aug-2025": 20480.0,
                        "Sep-2025": 25273.0,
                        "Oct-2025": 18930.15,
                        "Nov-2025": 3345.0
                    },
                    "cnt_upi_and_net_banking_debits": {
                        "Aug-2025": 14,
                        "Sep-2025": 9,
                        "Oct-2025": 6,
                        "Nov-2025": 3
                    },
                    "max_amt_upi_and_net_banking_debits": {
                        "Aug-2025": 10000.0,
                        "Sep-2025": 16200.0,
                        "Oct-2025": 11000.0,
                        "Nov-2025": 3300.0
                    },
                    "min_amt_upi_and_net_banking_debits": {
                        "Aug-2025": 10.0,
                        "Sep-2025": 3.0,
                        "Oct-2025": 20.0,
                        "Nov-2025": 15.0
                    },
                    "avg_amt_upi_and_net_banking_debits": {
                        "Aug-2025": 1462.86,
                        "Sep-2025": 2808.11,
                        "Oct-2025": 3155.03,
                        "Nov-2025": 1115.0
                    },
                    "amt_discretionary_spends": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_discretionary_spends": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_amt_discretionary_spends": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_discretionary_spends": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_discretionary_spends": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "total_of_negative_balances_amt": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_negative_balance": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "bounce_penal": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_bounce_penal": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_bounce_penal": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_bounce_penal": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_bounce_penal": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "abb_isto_emi": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_tax_gst_paid": {
                        "Aug-2025": 1,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_amt_tax_gst_paid": {
                        "Aug-2025": 236.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_tax_gst_paid": {
                        "Aug-2025": 236.0,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_tax_gst_paid": {
                        "Aug-2025": 236.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_bill_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_bill_related_debits": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_amt_bill_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_bill_related_debits": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_bill_related_debits": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "max_amt_self_transfer_debit": {
                        "Aug-2025": 1370.0,
                        "Sep-2025": 16200.0,
                        "Oct-2025": 11000.0,
                        "Nov-2025": 3300.0
                    },
                    "min_amt_self_transfer_debit": {
                        "Aug-2025": 10.0,
                        "Sep-2025": 3.0,
                        "Oct-2025": 20.0,
                        "Nov-2025": 30.0
                    },
                    "avg_amt_self_transfer_debit": {
                        "Aug-2025": 298.0,
                        "Sep-2025": 2808.11,
                        "Oct-2025": 3254.0,
                        "Nov-2025": 1665.0
                    },
                    "max_amt_min_bal_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_min_bal_charge": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "avg_amt_min_bal_charge": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "sum_of_eod_balance": {
                        "Aug-2025": 10789.0,
                        "Sep-2025": 11702.0,
                        "Oct-2025": 3569.85,
                        "Nov-2025": 104.55
                    },
                    "cnt_of_eod_balance": {
                        "Aug-2025": 21,
                        "Sep-2025": 30,
                        "Oct-2025": 31,
                        "Nov-2025": 3
                    },
                    "amt_dividend_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_spent_on_entertainment": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_spent_on_medical": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_spent_on_groceries": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 2660.15,
                        
                    },
                    "amt_investment_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_rent_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_netting_credits": {
                        "Aug-2025": 34403.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34454.0,
                        
                    },
                    "cnt_netting_credits": {
                        "Aug-2025": 5,
                        "Sep-2025": 1,
                        "Oct-2025": 2,
                        "Nov-2025": 0
                    },
                    "amt_netting_debits": {
                        "Aug-2025": 36016.0,
                        "Sep-2025": 25273.0,
                        "Oct-2025": 33930.15,
                        "Nov-2025": 3345.0
                    },
                    "cnt_netting_debits": {
                        "Aug-2025": 18,
                        "Sep-2025": 9,
                        "Oct-2025": 8,
                        "Nov-2025": 3
                    },
                    "amt_reversal_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_reversal_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "max_amt_reversal_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "min_amt_reversal_credit": {
                        "Aug-2025": null,
                        "Sep-2025": null,
                        "Oct-2025": null,
                        "Nov-2025": null
                    },
                    "no_of_days_eod_lt_5k": {
                        "Aug-2025": 21.0,
                        "Sep-2025": 30.0,
                        "Oct-2025": 31.0,
                        "Nov-2025": 3.0
                    },
                    "no_of_days_eod_lt_20k": {
                        "Aug-2025": 21.0,
                        "Sep-2025": 30.0,
                        "Oct-2025": 31.0,
                        "Nov-2025": 3.0
                    },
                    "no_of_days_eod_lt_1lk": {
                        "Aug-2025": 21.0,
                        "Sep-2025": 30.0,
                        "Oct-2025": 31.0,
                        "Nov-2025": 3.0
                    },
                    "cnt_inward_bounces_non_tech_credit_v5": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_inward_bounces_non_tech_credit_v5": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_inward_bounces_non_tech_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_inward_bounces_non_tech_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_inward_bounces_tech_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_inward_bounces_tech_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_gambling_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_gambling_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_emi_bounce_credit_current_month": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_business_credit_current_month": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_business_credit_current_month": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "is_current_month": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        "Nov-2025": 1.0
                    },
                    "is_complete_month": {
                        "Aug-2025": 0.0,
                        "Sep-2025": 1.0,
                        "Oct-2025": 1.0,
                        
                    },
                    "is_salary_imps": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_group_transfer_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_group_transfer_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_group_transfer_debit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_group_transfer_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_chq_deposit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_chq_deposit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_cross_account_transfer_credit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "cnt_cross_account_transfer_debit": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_cross_account_transfer_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_cross_account_transfer_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_group_transfer_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_cross_account_transfer_credit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_group_transfer_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_cross_account_transfer_debit": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_inward_bounces": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "avg_amt_business_credit": {
                        "Aug-2025": 28.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "amt_business_debit": {
                        "Aug-2025": 32000.0,
                        
                        "Oct-2025": 17660.15,
                        
                    },
                    "avg_amt_business_debit": {
                        "Aug-2025": 6400.0,
                        
                        "Oct-2025": 5886.72,
                        
                    },
                    "amt_inward_bounces": {
                        "Aug-2025": 0.0,
                        
                        "Oct-2025": 0.0,
                        
                    },
                    "cnt_inward_bounces": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    },
                    "amt_credit_wo_self_transfer": {
                        "Aug-2025": 39914.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "amt_debit_wo_self_transfer": {
                        "Aug-2025": 33036.0,
                        
                        "Oct-2025": 17660.15,
                        "Nov-2025": 15.0
                    },
                    "amt_credit_wo_business_credit": {
                        "Aug-2025": 39830.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "amt_credits_wo_reversal": {
                        "Aug-2025": 39914.0,
                        "Sep-2025": 24193.0,
                        "Oct-2025": 34457.0,
                        
                    },
                    "cnt_credits_wo_reversal": {
                        "Aug-2025": 8,
                        "Sep-2025": 1,
                        "Oct-2025": 3,
                        "Nov-2025": 0
                    },
                    "amt_debits_wo_reversal": {
                        "Aug-2025": 36016.0,
                        "Sep-2025": 25273.0,
                        "Oct-2025": 33930.15,
                        "Nov-2025": 3345.0
                    },
                    "cnt_debits_wo_reversal": {
                        "Aug-2025": 18,
                        "Sep-2025": 9,
                        "Oct-2025": 8,
                        "Nov-2025": 3
                    },
                    "cnt_days_negative_od_eod_balance": {
                        "Aug-2025": 0,
                        "Sep-2025": 0,
                        "Oct-2025": 0,
                        "Nov-2025": 0
                    }
                },
                "predictors": {
                    "accountnumber": "924010040573135",
                    "bank_name": "axis",
                    "ifsc_code": "UTIB0000009",
                    "customer_name": "ANANDA P",
                    "account_type": "individual",
                    "ccod_limit": 0.0,
                    "month_0": "Nov-25",
                    "month_1": "Oct-25",
                    "month_2": "Sep-25",
                    "month_3": "Aug-25",
                    "month_4": null,
                    "month_5": null,
                    "month_6": null,
                    "month_7": null,
                    "month_8": null,
                    "month_9": null,
                    "month_10": null,
                    "month_11": null,
                    "expense_0": 3345.0,
                    "expense_1": 33930.15,
                    "expense_2": 25273.0,
                    "expense_3": 36016.0,
                    "expense_4": null,
                    "expense_5": null,
                    "expense_6": null,
                    "expense_7": null,
                    "expense_8": null,
                    "expense_9": null,
                    "expense_10": null,
                    "expense_11": null,
                    "total_inward_chq_bounces_insuff_fund_0": 0,
                    "total_inward_chq_bounces_insuff_fund_1": 0,
                    "total_inward_chq_bounces_insuff_fund_2": 0,
                    "total_inward_chq_bounces_insuff_fund_3": 0,
                    "total_inward_chq_bounces_insuff_fund_4": null,
                    "total_inward_chq_bounces_insuff_fund_5": null,
                    "total_inward_chq_bounces_insuff_fund_6": null,
                    "total_inward_chq_bounces_insuff_fund_7": null,
                    "total_inward_chq_bounces_insuff_fund_8": null,
                    "total_inward_chq_bounces_insuff_fund_9": null,
                    "total_inward_chq_bounces_insuff_fund_10": null,
                    "total_inward_chq_bounces_insuff_fund_11": null,
                    "debitless_charges_0": 0.0,
                    "debitless_charges_1": 0.0,
                    "debitless_charges_2": 0.0,
                    "debitless_charges_3": 236.0,
                    "debitless_charges_4": null,
                    "debitless_charges_5": null,
                    "debitless_charges_6": null,
                    "debitless_charges_7": null,
                    "debitless_charges_8": null,
                    "debitless_charges_9": null,
                    "debitless_charges_10": null,
                    "debitless_charges_11": null,
                    "debits_0": 3345.0,
                    "debits_1": 33930.15,
                    "debits_2": 25273.0,
                    "debits_3": 36016.0,
                    "debits_4": null,
                    "debits_5": null,
                    "debits_6": null,
                    "debits_7": null,
                    "debits_8": null,
                    "debits_9": null,
                    "debits_10": null,
                    "debits_11": null,
                    "bal_last_0": 4.85,
                    "bal_last_1": 3349.85,
                    "bal_last_2": 2823.0,
                    "bal_last_3": 3903.0,
                    "bal_last_4": null,
                    "bal_last_5": null,
                    "bal_last_6": null,
                    "bal_last_7": null,
                    "bal_last_8": null,
                    "bal_last_9": null,
                    "bal_last_10": null,
                    "bal_last_11": null,
                    "expense_to_income_ratio_0": null,
                    "expense_to_income_ratio_1": 0.98,
                    "expense_to_income_ratio_2": 1.04,
                    "expense_to_income_ratio_3": 1.05,
                    "expense_to_income_ratio_4": null,
                    "expense_to_income_ratio_5": null,
                    "expense_to_income_ratio_6": null,
                    "expense_to_income_ratio_7": null,
                    "expense_to_income_ratio_8": null,
                    "expense_to_income_ratio_9": null,
                    "expense_to_income_ratio_10": null,
                    "expense_to_income_ratio_11": null,
                    "income_0": 0.0,
                    "income_1": 34457.0,
                    "income_2": 24193.0,
                    "income_3": 34403.0,
                    "income_4": null,
                    "income_5": null,
                    "income_6": null,
                    "income_7": null,
                    "income_8": null,
                    "income_9": null,
                    "income_10": null,
                    "income_11": null,
                    "balance_on_1st_0": 49.85,
                    "balance_on_1st_1": 26.0,
                    "balance_on_1st_2": 1003.0,
                    "balance_on_1st_3": null,
                    "balance_on_1st_4": null,
                    "balance_on_1st_5": null,
                    "balance_on_1st_6": null,
                    "balance_on_1st_7": null,
                    "balance_on_1st_8": null,
                    "balance_on_1st_9": null,
                    "balance_on_1st_10": null,
                    "balance_on_1st_11": null,
                    "balance_on_5th_0": null,
                    "balance_on_5th_1": 6.0,
                    "balance_on_5th_2": 903.0,
                    "balance_on_5th_3": null,
                    "balance_on_5th_4": null,
                    "balance_on_5th_5": null,
                    "balance_on_5th_6": null,
                    "balance_on_5th_7": null,
                    "balance_on_5th_8": null,
                    "balance_on_5th_9": null,
                    "balance_on_5th_10": null,
                    "balance_on_5th_11": null,
                    "balance_on_10th_0": null,
                    "balance_on_10th_1": 6.0,
                    "balance_on_10th_2": 3.0,
                    "balance_on_10th_3": null,
                    "balance_on_10th_4": null,
                    "balance_on_10th_5": null,
                    "balance_on_10th_6": null,
                    "balance_on_10th_7": null,
                    "balance_on_10th_8": null,
                    "balance_on_10th_9": null,
                    "balance_on_10th_10": null,
                    "balance_on_10th_11": null,
                    "balance_on_15th_0": null,
                    "balance_on_15th_1": 6.0,
                    "balance_on_15th_2": 0.0,
                    "balance_on_15th_3": 244.0,
                    "balance_on_15th_4": null,
                    "balance_on_15th_5": null,
                    "balance_on_15th_6": null,
                    "balance_on_15th_7": null,
                    "balance_on_15th_8": null,
                    "balance_on_15th_9": null,
                    "balance_on_15th_10": null,
                    "balance_on_15th_11": null,
                    "balance_on_20th_0": null,
                    "balance_on_20th_1": 4.0,
                    "balance_on_20th_2": 0.0,
                    "balance_on_20th_3": 244.0,
                    "balance_on_20th_4": null,
                    "balance_on_20th_5": null,
                    "balance_on_20th_6": null,
                    "balance_on_20th_7": null,
                    "balance_on_20th_8": null,
                    "balance_on_20th_9": null,
                    "balance_on_20th_10": null,
                    "balance_on_20th_11": null,
                    "balance_on_25th_0": null,
                    "balance_on_25th_1": 4.0,
                    "balance_on_25th_2": 0.0,
                    "balance_on_25th_3": 244.0,
                    "balance_on_25th_4": null,
                    "balance_on_25th_5": null,
                    "balance_on_25th_6": null,
                    "balance_on_25th_7": null,
                    "balance_on_25th_8": null,
                    "balance_on_25th_9": null,
                    "balance_on_25th_10": null,
                    "balance_on_25th_11": null,
                    "balance_on_30th_0": null,
                    "balance_on_30th_1": 4.0,
                    "balance_on_30th_2": 2823.0,
                    "balance_on_30th_3": 3903.0,
                    "balance_on_30th_4": null,
                    "balance_on_30th_5": null,
                    "balance_on_30th_6": null,
                    "balance_on_30th_7": null,
                    "balance_on_30th_8": null,
                    "balance_on_30th_9": null,
                    "balance_on_30th_10": null,
                    "balance_on_30th_11": null,
                    "balance_net_off_on_1st_0": -5461.15,
                    "balance_net_off_on_1st_1": -5485.0,
                    "balance_net_off_on_1st_2": -4508.0,
                    "balance_net_off_on_1st_3": null,
                    "balance_net_off_on_1st_4": null,
                    "balance_net_off_on_1st_5": null,
                    "balance_net_off_on_1st_6": null,
                    "balance_net_off_on_1st_7": null,
                    "balance_net_off_on_1st_8": null,
                    "balance_net_off_on_1st_9": null,
                    "balance_net_off_on_1st_10": null,
                    "balance_net_off_on_1st_11": null,
                    "balance_net_off_on_5th_0": null,
                    "balance_net_off_on_5th_1": -5505.0,
                    "balance_net_off_on_5th_2": -4608.0,
                    "balance_net_off_on_5th_3": null,
                    "balance_net_off_on_5th_4": null,
                    "balance_net_off_on_5th_5": null,
                    "balance_net_off_on_5th_6": null,
                    "balance_net_off_on_5th_7": null,
                    "balance_net_off_on_5th_8": null,
                    "balance_net_off_on_5th_9": null,
                    "balance_net_off_on_5th_10": null,
                    "balance_net_off_on_5th_11": null,
                    "balance_net_off_on_10th_0": null,
                    "balance_net_off_on_10th_1": -5505.0,
                    "balance_net_off_on_10th_2": -5508.0,
                    "balance_net_off_on_10th_3": null,
                    "balance_net_off_on_10th_4": null,
                    "balance_net_off_on_10th_5": null,
                    "balance_net_off_on_10th_6": null,
                    "balance_net_off_on_10th_7": null,
                    "balance_net_off_on_10th_8": null,
                    "balance_net_off_on_10th_9": null,
                    "balance_net_off_on_10th_10": null,
                    "balance_net_off_on_10th_11": null,
                    "balance_net_off_on_15th_0": null,
                    "balance_net_off_on_15th_1": -5505.0,
                    "balance_net_off_on_15th_2": -5511.0,
                    "balance_net_off_on_15th_3": -1365.0,
                    "balance_net_off_on_15th_4": null,
                    "balance_net_off_on_15th_5": null,
                    "balance_net_off_on_15th_6": null,
                    "balance_net_off_on_15th_7": null,
                    "balance_net_off_on_15th_8": null,
                    "balance_net_off_on_15th_9": null,
                    "balance_net_off_on_15th_10": null,
                    "balance_net_off_on_15th_11": null,
                    "balance_net_off_on_20th_0": null,
                    "balance_net_off_on_20th_1": -5507.0,
                    "balance_net_off_on_20th_2": -5511.0,
                    "balance_net_off_on_20th_3": -4767.0,
                    "balance_net_off_on_20th_4": null,
                    "balance_net_off_on_20th_5": null,
                    "balance_net_off_on_20th_6": null,
                    "balance_net_off_on_20th_7": null,
                    "balance_net_off_on_20th_8": null,
                    "balance_net_off_on_20th_9": null,
                    "balance_net_off_on_20th_10": null,
                    "balance_net_off_on_20th_11": null,
                    "balance_net_off_on_25th_0": null,
                    "balance_net_off_on_25th_1": -5507.0,
                    "balance_net_off_on_25th_2": -5511.0,
                    "balance_net_off_on_25th_3": -4767.0,
                    "balance_net_off_on_25th_4": null,
                    "balance_net_off_on_25th_5": null,
                    "balance_net_off_on_25th_6": null,
                    "balance_net_off_on_25th_7": null,
                    "balance_net_off_on_25th_8": null,
                    "balance_net_off_on_25th_9": null,
                    "balance_net_off_on_25th_10": null,
                    "balance_net_off_on_25th_11": null,
                    "balance_net_off_on_30th_0": null,
                    "balance_net_off_on_30th_1": -5507.0,
                    "balance_net_off_on_30th_2": -2688.0,
                    "balance_net_off_on_30th_3": -1608.0,
                    "balance_net_off_on_30th_4": null,
                    "balance_net_off_on_30th_5": null,
                    "balance_net_off_on_30th_6": null,
                    "balance_net_off_on_30th_7": null,
                    "balance_net_off_on_30th_8": null,
                    "balance_net_off_on_30th_9": null,
                    "balance_net_off_on_30th_10": null,
                    "balance_net_off_on_30th_11": null,
                    "avg_balance_without_loan_credit_multipleof5_0": 50,
                    "avg_balance_without_loan_credit_multipleof5_1": 8,
                    "avg_balance_without_loan_credit_multipleof5_2": 676,
                    "avg_balance_without_loan_credit_multipleof5_3": 1159,
                    "avg_balance_without_loan_credit_multipleof5_4": null,
                    "avg_balance_without_loan_credit_multipleof5_5": null,
                    "avg_balance_without_loan_credit_multipleof5_6": null,
                    "avg_balance_without_loan_credit_multipleof5_7": null,
                    "avg_balance_without_loan_credit_multipleof5_8": null,
                    "avg_balance_without_loan_credit_multipleof5_9": null,
                    "avg_balance_without_loan_credit_multipleof5_10": null,
                    "avg_balance_without_loan_credit_multipleof5_11": null,
                    "total_salary_0": 0,
                    "total_salary_1": 23406.0,
                    "total_salary_2": 24193.0,
                    "total_salary_3": 24193.0,
                    "total_salary_4": 10126.0,
                    "total_salary_5": null,
                    "total_salary_6": null,
                    "total_salary_7": null,
                    "total_salary_8": null,
                    "total_salary_9": null,
                    "total_salary_10": null,
                    "total_salary_11": null,
                    "max_balance_0": 3349.85,
                    "max_balance_1": 23410.0,
                    "max_balance_2": 24193.0,
                    "max_balance_3": 24203.0,
                    "max_balance_4": null,
                    "max_balance_5": null,
                    "max_balance_6": null,
                    "max_balance_7": null,
                    "max_balance_8": null,
                    "max_balance_9": null,
                    "max_balance_10": null,
                    "max_balance_11": null,
                    "min_balance_0": 4.85,
                    "min_balance_1": 4.0,
                    "min_balance_2": 0.0,
                    "min_balance_3": 5.0,
                    "min_balance_4": null,
                    "min_balance_5": null,
                    "min_balance_6": null,
                    "min_balance_7": null,
                    "min_balance_8": null,
                    "min_balance_9": null,
                    "min_balance_10": null,
                    "min_balance_11": null,
                    "total_inward_payment_bounce_0": 0.0,
                    "total_inward_payment_bounce_1": 0.0,
                    "total_inward_payment_bounce_2": 0.0,
                    "total_inward_payment_bounce_3": 0.0,
                    "total_inward_payment_bounce_4": null,
                    "total_inward_payment_bounce_5": null,
                    "total_inward_payment_bounce_6": null,
                    "total_inward_payment_bounce_7": null,
                    "total_inward_payment_bounce_8": null,
                    "total_inward_payment_bounce_9": null,
                    "total_inward_payment_bounce_10": null,
                    "total_inward_payment_bounce_11": null,
                    "total_outward_chq_bounces_insuff_fund_0": 0,
                    "total_outward_chq_bounces_insuff_fund_1": 0,
                    "total_outward_chq_bounces_insuff_fund_2": 0,
                    "total_outward_chq_bounces_insuff_fund_3": 0,
                    "total_outward_chq_bounces_insuff_fund_4": null,
                    "total_outward_chq_bounces_insuff_fund_5": null,
                    "total_outward_chq_bounces_insuff_fund_6": null,
                    "total_outward_chq_bounces_insuff_fund_7": null,
                    "total_outward_chq_bounces_insuff_fund_8": null,
                    "total_outward_chq_bounces_insuff_fund_9": null,
                    "total_outward_chq_bounces_insuff_fund_10": null,
                    "total_outward_chq_bounces_insuff_fund_11": null,
                    "credits_0": 0.0,
                    "credits_1": 34457.0,
                    "credits_2": 24193.0,
                    "credits_3": 39914.0,
                    "credits_4": null,
                    "credits_5": null,
                    "credits_6": null,
                    "credits_7": null,
                    "credits_8": null,
                    "credits_9": null,
                    "credits_10": null,
                    "credits_11": null,
                    "cnt_income_0": 0,
                    "cnt_income_1": 3,
                    "cnt_income_2": 1,
                    "cnt_income_3": 5,
                    "cnt_income_4": null,
                    "cnt_income_5": null,
                    "cnt_income_6": null,
                    "cnt_income_7": null,
                    "cnt_income_8": null,
                    "cnt_income_9": null,
                    "cnt_income_10": null,
                    "cnt_income_11": null,
                    "total_emi_bounce_0": 0,
                    "total_emi_bounce_1": 0,
                    "total_emi_bounce_2": 0,
                    "total_emi_bounce_3": 0,
                    "total_emi_bounce_4": null,
                    "total_emi_bounce_5": null,
                    "total_emi_bounce_6": null,
                    "total_emi_bounce_7": null,
                    "total_emi_bounce_8": null,
                    "total_emi_bounce_9": null,
                    "total_emi_bounce_10": null,
                    "total_emi_bounce_11": null,
                    "number_of_transactions_0": 3,
                    "number_of_transactions_1": 11,
                    "number_of_transactions_2": 10,
                    "number_of_transactions_3": 26,
                    "number_of_transactions_4": null,
                    "number_of_transactions_5": null,
                    "number_of_transactions_6": null,
                    "number_of_transactions_7": null,
                    "number_of_transactions_8": null,
                    "number_of_transactions_9": null,
                    "number_of_transactions_10": null,
                    "number_of_transactions_11": null,
                    "avg_balance_0": 34.85,
                    "avg_balance_1": 115.16,
                    "avg_balance_2": 390.07,
                    "avg_balance_3": 513.76,
                    "avg_balance_4": null,
                    "avg_balance_5": null,
                    "avg_balance_6": null,
                    "avg_balance_7": null,
                    "avg_balance_8": null,
                    "avg_balance_9": null,
                    "avg_balance_10": null,
                    "avg_balance_11": null,
                    "inward_chq_bounces_insuff_fund_0": 0,
                    "inward_chq_bounces_insuff_fund_1": 0,
                    "inward_chq_bounces_insuff_fund_2": 0,
                    "inward_chq_bounces_insuff_fund_3": 0,
                    "inward_chq_bounces_insuff_fund_4": null,
                    "inward_chq_bounces_insuff_fund_5": null,
                    "inward_chq_bounces_insuff_fund_6": null,
                    "inward_chq_bounces_insuff_fund_7": null,
                    "inward_chq_bounces_insuff_fund_8": null,
                    "inward_chq_bounces_insuff_fund_9": null,
                    "inward_chq_bounces_insuff_fund_10": null,
                    "inward_chq_bounces_insuff_fund_11": null,
                    "outward_chq_bounces_insuff_fund_0": 0,
                    "outward_chq_bounces_insuff_fund_1": 0,
                    "outward_chq_bounces_insuff_fund_2": 0,
                    "outward_chq_bounces_insuff_fund_3": 0,
                    "outward_chq_bounces_insuff_fund_4": null,
                    "outward_chq_bounces_insuff_fund_5": null,
                    "outward_chq_bounces_insuff_fund_6": null,
                    "outward_chq_bounces_insuff_fund_7": null,
                    "outward_chq_bounces_insuff_fund_8": null,
                    "outward_chq_bounces_insuff_fund_9": null,
                    "outward_chq_bounces_insuff_fund_10": null,
                    "outward_chq_bounces_insuff_fund_11": null,
                    "amt_loan_credits_0": 0.0,
                    "amt_loan_credits_1": 0.0,
                    "amt_loan_credits_2": 0.0,
                    "amt_loan_credits_3": 5511.0,
                    "amt_loan_credits_4": null,
                    "amt_loan_credits_5": null,
                    "amt_loan_credits_6": null,
                    "amt_loan_credits_7": null,
                    "amt_loan_credits_8": null,
                    "amt_loan_credits_9": null,
                    "amt_loan_credits_10": null,
                    "amt_loan_credits_11": null,
                    "chq_dep_isto_chq_issues_0": null,
                    "chq_dep_isto_chq_issues_1": null,
                    "chq_dep_isto_chq_issues_2": null,
                    "chq_dep_isto_chq_issues_3": null,
                    "chq_dep_isto_chq_issues_4": null,
                    "chq_dep_isto_chq_issues_5": null,
                    "chq_dep_isto_chq_issues_6": null,
                    "chq_dep_isto_chq_issues_7": null,
                    "chq_dep_isto_chq_issues_8": null,
                    "chq_dep_isto_chq_issues_9": null,
                    "chq_dep_isto_chq_issues_10": null,
                    "chq_dep_isto_chq_issues_11": null,
                    "avg_balance_without_loan_credit_adjusted_0": 34.85,
                    "avg_balance_without_loan_credit_adjusted_1": 115.16,
                    "avg_balance_without_loan_credit_adjusted_2": 390.07,
                    "avg_balance_without_loan_credit_adjusted_3": 513.76,
                    "avg_balance_without_loan_credit_adjusted_4": null,
                    "avg_balance_without_loan_credit_adjusted_5": null,
                    "avg_balance_without_loan_credit_adjusted_6": null,
                    "avg_balance_without_loan_credit_adjusted_7": null,
                    "avg_balance_without_loan_credit_adjusted_8": null,
                    "avg_balance_without_loan_credit_adjusted_9": null,
                    "avg_balance_without_loan_credit_adjusted_10": null,
                    "avg_balance_without_loan_credit_adjusted_11": null,
                    "emi_bounce_0": 0,
                    "emi_bounce_1": 0,
                    "emi_bounce_2": 0,
                    "emi_bounce_3": 0,
                    "emi_bounce_4": null,
                    "emi_bounce_5": null,
                    "emi_bounce_6": null,
                    "emi_bounce_7": null,
                    "emi_bounce_8": null,
                    "emi_bounce_9": null,
                    "emi_bounce_10": null,
                    "emi_bounce_11": null,
                    "total_creditcard_payment_0": 0,
                    "total_creditcard_payment_1": 0,
                    "total_creditcard_payment_2": 0,
                    "total_creditcard_payment_3": 0,
                    "total_creditcard_payment_4": null,
                    "total_creditcard_payment_5": null,
                    "total_creditcard_payment_6": null,
                    "total_creditcard_payment_7": null,
                    "total_creditcard_payment_8": null,
                    "total_creditcard_payment_9": null,
                    "total_creditcard_payment_10": null,
                    "total_creditcard_payment_11": null,
                    "amt_credits_wo_bounce_0": 0.0,
                    "amt_credits_wo_bounce_1": 34457.0,
                    "amt_credits_wo_bounce_2": 24193.0,
                    "amt_credits_wo_bounce_3": 39914.0,
                    "amt_credits_wo_bounce_4": null,
                    "amt_credits_wo_bounce_5": null,
                    "amt_credits_wo_bounce_6": null,
                    "amt_credits_wo_bounce_7": null,
                    "amt_credits_wo_bounce_8": null,
                    "amt_credits_wo_bounce_9": null,
                    "amt_credits_wo_bounce_10": null,
                    "amt_credits_wo_bounce_11": null,
                    "cnt_credits_wo_bounce_0": 0,
                    "cnt_credits_wo_bounce_1": 3,
                    "cnt_credits_wo_bounce_2": 1,
                    "cnt_credits_wo_bounce_3": 8,
                    "cnt_credits_wo_bounce_4": null,
                    "cnt_credits_wo_bounce_5": null,
                    "cnt_credits_wo_bounce_6": null,
                    "cnt_credits_wo_bounce_7": null,
                    "cnt_credits_wo_bounce_8": null,
                    "cnt_credits_wo_bounce_9": null,
                    "cnt_credits_wo_bounce_10": null,
                    "cnt_credits_wo_bounce_11": null,
                    "amt_debits_wo_bounce_0": 3345.0,
                    "amt_debits_wo_bounce_1": 33930.15,
                    "amt_debits_wo_bounce_2": 25273.0,
                    "amt_debits_wo_bounce_3": 36016.0,
                    "amt_debits_wo_bounce_4": null,
                    "amt_debits_wo_bounce_5": null,
                    "amt_debits_wo_bounce_6": null,
                    "amt_debits_wo_bounce_7": null,
                    "amt_debits_wo_bounce_8": null,
                    "amt_debits_wo_bounce_9": null,
                    "amt_debits_wo_bounce_10": null,
                    "amt_debits_wo_bounce_11": null,
                    "cnt_debits_wo_bounce_0": 3,
                    "cnt_debits_wo_bounce_1": 8,
                    "cnt_debits_wo_bounce_2": 9,
                    "cnt_debits_wo_bounce_3": 18,
                    "cnt_debits_wo_bounce_4": null,
                    "cnt_debits_wo_bounce_5": null,
                    "cnt_debits_wo_bounce_6": null,
                    "cnt_debits_wo_bounce_7": null,
                    "cnt_debits_wo_bounce_8": null,
                    "cnt_debits_wo_bounce_9": null,
                    "cnt_debits_wo_bounce_10": null,
                    "cnt_debits_wo_bounce_11": null,
                    "amt_upi_credits_0": 0.0,
                    "amt_upi_credits_1": 0.0,
                    "amt_upi_credits_2": 0.0,
                    "amt_upi_credits_3": 0.0,
                    "amt_upi_credits_4": null,
                    "amt_upi_credits_5": null,
                    "amt_upi_credits_6": null,
                    "amt_upi_credits_7": null,
                    "amt_upi_credits_8": null,
                    "amt_upi_credits_9": null,
                    "amt_upi_credits_10": null,
                    "amt_upi_credits_11": null,
                    "amt_upi_debits_0": 3345.0,
                    "amt_upi_debits_1": 18930.15,
                    "amt_upi_debits_2": 25273.0,
                    "amt_upi_debits_3": 20480.0,
                    "amt_upi_debits_4": null,
                    "amt_upi_debits_5": null,
                    "amt_upi_debits_6": null,
                    "amt_upi_debits_7": null,
                    "amt_upi_debits_8": null,
                    "amt_upi_debits_9": null,
                    "amt_upi_debits_10": null,
                    "amt_upi_debits_11": null,
                    "cnt_upi_credits_0": 0,
                    "cnt_upi_credits_1": 0,
                    "cnt_upi_credits_2": 0,
                    "cnt_upi_credits_3": 0,
                    "cnt_upi_credits_4": null,
                    "cnt_upi_credits_5": null,
                    "cnt_upi_credits_6": null,
                    "cnt_upi_credits_7": null,
                    "cnt_upi_credits_8": null,
                    "cnt_upi_credits_9": null,
                    "cnt_upi_credits_10": null,
                    "cnt_upi_credits_11": null,
                    "cnt_upi_debits_0": 3,
                    "cnt_upi_debits_1": 6,
                    "cnt_upi_debits_2": 9,
                    "cnt_upi_debits_3": 14,
                    "cnt_upi_debits_4": null,
                    "cnt_upi_debits_5": null,
                    "cnt_upi_debits_6": null,
                    "cnt_upi_debits_7": null,
                    "cnt_upi_debits_8": null,
                    "cnt_upi_debits_9": null,
                    "cnt_upi_debits_10": null,
                    "cnt_upi_debits_11": null,
                    "amt_minimum_balance_chrg_0": 0.0,
                    "amt_minimum_balance_chrg_1": 0.0,
                    "amt_minimum_balance_chrg_2": 0.0,
                    "amt_minimum_balance_chrg_3": 0.0,
                    "amt_minimum_balance_chrg_4": null,
                    "amt_minimum_balance_chrg_5": null,
                    "amt_minimum_balance_chrg_6": null,
                    "amt_minimum_balance_chrg_7": null,
                    "amt_minimum_balance_chrg_8": null,
                    "amt_minimum_balance_chrg_9": null,
                    "amt_minimum_balance_chrg_10": null,
                    "amt_minimum_balance_chrg_11": null,
                    "cnt_minimum_balance_chrg_0": 0,
                    "cnt_minimum_balance_chrg_1": 0,
                    "cnt_minimum_balance_chrg_2": 0,
                    "cnt_minimum_balance_chrg_3": 0,
                    "cnt_minimum_balance_chrg_4": null,
                    "cnt_minimum_balance_chrg_5": null,
                    "cnt_minimum_balance_chrg_6": null,
                    "cnt_minimum_balance_chrg_7": null,
                    "cnt_minimum_balance_chrg_8": null,
                    "cnt_minimum_balance_chrg_9": null,
                    "cnt_minimum_balance_chrg_10": null,
                    "cnt_minimum_balance_chrg_11": null,
                    "amt_cash_deposit_0": 0.0,
                    "amt_cash_deposit_1": 0.0,
                    "amt_cash_deposit_2": 0.0,
                    "amt_cash_deposit_3": 0.0,
                    "amt_cash_deposit_4": null,
                    "amt_cash_deposit_5": null,
                    "amt_cash_deposit_6": null,
                    "amt_cash_deposit_7": null,
                    "amt_cash_deposit_8": null,
                    "amt_cash_deposit_9": null,
                    "amt_cash_deposit_10": null,
                    "amt_cash_deposit_11": null,
                    "cnt_cash_deposit_0": 0,
                    "cnt_cash_deposit_1": 0,
                    "cnt_cash_deposit_2": 0,
                    "cnt_cash_deposit_3": 0,
                    "cnt_cash_deposit_4": null,
                    "cnt_cash_deposit_5": null,
                    "cnt_cash_deposit_6": null,
                    "cnt_cash_deposit_7": null,
                    "cnt_cash_deposit_8": null,
                    "cnt_cash_deposit_9": null,
                    "cnt_cash_deposit_10": null,
                    "cnt_cash_deposit_11": null,
                    "amt_business_credit_0": 0.0,
                    "amt_business_credit_1": 0.0,
                    "amt_business_credit_2": 0.0,
                    "amt_business_credit_3": 84.0,
                    "amt_business_credit_4": null,
                    "amt_business_credit_5": null,
                    "amt_business_credit_6": null,
                    "amt_business_credit_7": null,
                    "amt_business_credit_8": null,
                    "amt_business_credit_9": null,
                    "amt_business_credit_10": null,
                    "amt_business_credit_11": null,
                    "perc_salary_amt_debit_within5_days_0": 0.0,
                    "perc_salary_amt_debit_within5_days_1": 0.86,
                    "perc_salary_amt_debit_within5_days_2": 0.88,
                    "perc_salary_amt_debit_within5_days_3": 0.84,
                    "perc_salary_amt_debit_within5_days_4": null,
                    "perc_salary_amt_debit_within5_days_5": null,
                    "perc_salary_amt_debit_within5_days_6": null,
                    "perc_salary_amt_debit_within5_days_7": null,
                    "perc_salary_amt_debit_within5_days_8": null,
                    "perc_salary_amt_debit_within5_days_9": null,
                    "perc_salary_amt_debit_within5_days_10": null,
                    "perc_salary_amt_debit_within5_days_11": null,
                    "cnt_eod_bal_lt_500_0": 3,
                    "cnt_eod_bal_lt_500_1": 30,
                    "cnt_eod_bal_lt_500_2": 21,
                    "cnt_eod_bal_lt_500_3": 19,
                    "cnt_eod_bal_lt_500_4": null,
                    "cnt_eod_bal_lt_500_5": null,
                    "cnt_eod_bal_lt_500_6": null,
                    "cnt_eod_bal_lt_500_7": null,
                    "cnt_eod_bal_lt_500_8": null,
                    "cnt_eod_bal_lt_500_9": null,
                    "cnt_eod_bal_lt_500_10": null,
                    "cnt_eod_bal_lt_500_11": null,
                    "cnt_debit_transaction_0": 3,
                    "cnt_debit_transaction_1": 8,
                    "cnt_debit_transaction_2": 9,
                    "cnt_debit_transaction_3": 18,
                    "cnt_debit_transaction_4": null,
                    "cnt_debit_transaction_5": null,
                    "cnt_debit_transaction_6": null,
                    "cnt_debit_transaction_7": null,
                    "cnt_debit_transaction_8": null,
                    "cnt_debit_transaction_9": null,
                    "cnt_debit_transaction_10": null,
                    "cnt_debit_transaction_11": null,
                    "min_eod_bal_2_10_15_24_28th_day_0": 0.0,
                    "min_eod_bal_2_10_15_24_28th_day_1": 0.0,
                    "min_eod_bal_2_10_15_24_28th_day_2": 0.0,
                    "min_eod_bal_2_10_15_24_28th_day_3": 10.0,
                    "min_eod_bal_2_10_15_24_28th_day_4": null,
                    "min_eod_bal_2_10_15_24_28th_day_5": null,
                    "min_eod_bal_2_10_15_24_28th_day_6": null,
                    "min_eod_bal_2_10_15_24_28th_day_7": null,
                    "min_eod_bal_2_10_15_24_28th_day_8": null,
                    "min_eod_bal_2_10_15_24_28th_day_9": null,
                    "min_eod_bal_2_10_15_24_28th_day_10": null,
                    "min_eod_bal_2_10_15_24_28th_day_11": null,
                    "cnt_cash_withdrawl_debit_0": 0,
                    "cnt_cash_withdrawl_debit_1": 2,
                    "cnt_cash_withdrawl_debit_2": 0,
                    "cnt_cash_withdrawl_debit_3": 3,
                    "cnt_cash_withdrawl_debit_4": null,
                    "cnt_cash_withdrawl_debit_5": null,
                    "cnt_cash_withdrawl_debit_6": null,
                    "cnt_cash_withdrawl_debit_7": null,
                    "cnt_cash_withdrawl_debit_8": null,
                    "cnt_cash_withdrawl_debit_9": null,
                    "cnt_cash_withdrawl_debit_10": null,
                    "cnt_cash_withdrawl_debit_11": null,
                    "cnt_times_account_overdrawn_0": 0,
                    "cnt_times_account_overdrawn_1": 0,
                    "cnt_times_account_overdrawn_2": 0,
                    "cnt_times_account_overdrawn_3": 0,
                    "cnt_times_account_overdrawn_4": null,
                    "cnt_times_account_overdrawn_5": null,
                    "cnt_times_account_overdrawn_6": null,
                    "cnt_times_account_overdrawn_7": null,
                    "cnt_times_account_overdrawn_8": null,
                    "cnt_times_account_overdrawn_9": null,
                    "cnt_times_account_overdrawn_10": null,
                    "cnt_times_account_overdrawn_11": null,
                    "cnt_credit_transaction_0": 0,
                    "cnt_credit_transaction_1": 3,
                    "cnt_credit_transaction_2": 1,
                    "cnt_credit_transaction_3": 8,
                    "cnt_credit_transaction_4": null,
                    "cnt_credit_transaction_5": null,
                    "cnt_credit_transaction_6": null,
                    "cnt_credit_transaction_7": null,
                    "cnt_credit_transaction_8": null,
                    "cnt_credit_transaction_9": null,
                    "cnt_credit_transaction_10": null,
                    "cnt_credit_transaction_11": null,
                    "cnt_revolving_transaction_0": 0,
                    "cnt_revolving_transaction_1": 0,
                    "cnt_revolving_transaction_2": 0,
                    "cnt_revolving_transaction_3": 0,
                    "cnt_revolving_transaction_4": null,
                    "cnt_revolving_transaction_5": null,
                    "cnt_revolving_transaction_6": null,
                    "cnt_revolving_transaction_7": null,
                    "cnt_revolving_transaction_8": null,
                    "cnt_revolving_transaction_9": null,
                    "cnt_revolving_transaction_10": null,
                    "cnt_revolving_transaction_11": null,
                    "amt_revolving_transaction_0": 0.0,
                    "amt_revolving_transaction_1": 0.0,
                    "amt_revolving_transaction_2": 0.0,
                    "amt_revolving_transaction_3": 0.0,
                    "amt_revolving_transaction_4": null,
                    "amt_revolving_transaction_5": null,
                    "amt_revolving_transaction_6": null,
                    "amt_revolving_transaction_7": null,
                    "amt_revolving_transaction_8": null,
                    "amt_revolving_transaction_9": null,
                    "amt_revolving_transaction_10": null,
                    "amt_revolving_transaction_11": null,
                    "cnt_emi_bounce_tech_reason_credit_0": 0,
                    "cnt_emi_bounce_tech_reason_credit_1": 0,
                    "cnt_emi_bounce_tech_reason_credit_2": 0,
                    "cnt_emi_bounce_tech_reason_credit_3": 0,
                    "cnt_emi_bounce_tech_reason_credit_4": null,
                    "cnt_emi_bounce_tech_reason_credit_5": null,
                    "cnt_emi_bounce_tech_reason_credit_6": null,
                    "cnt_emi_bounce_tech_reason_credit_7": null,
                    "cnt_emi_bounce_tech_reason_credit_8": null,
                    "cnt_emi_bounce_tech_reason_credit_9": null,
                    "cnt_emi_bounce_tech_reason_credit_10": null,
                    "cnt_emi_bounce_tech_reason_credit_11": null,
                    "amt_emi_bounce_tech_reason_credit_0": 0.0,
                    "amt_emi_bounce_tech_reason_credit_1": 0.0,
                    "amt_emi_bounce_tech_reason_credit_2": 0.0,
                    "amt_emi_bounce_tech_reason_credit_3": 0.0,
                    "amt_emi_bounce_tech_reason_credit_4": null,
                    "amt_emi_bounce_tech_reason_credit_5": null,
                    "amt_emi_bounce_tech_reason_credit_6": null,
                    "amt_emi_bounce_tech_reason_credit_7": null,
                    "amt_emi_bounce_tech_reason_credit_8": null,
                    "amt_emi_bounce_tech_reason_credit_9": null,
                    "amt_emi_bounce_tech_reason_credit_10": null,
                    "amt_emi_bounce_tech_reason_credit_11": null,
                    "cnt_emi_bounce_non_tech_reason_credit_0": 0,
                    "cnt_emi_bounce_non_tech_reason_credit_1": 0,
                    "cnt_emi_bounce_non_tech_reason_credit_2": 0,
                    "cnt_emi_bounce_non_tech_reason_credit_3": 0,
                    "cnt_emi_bounce_non_tech_reason_credit_4": null,
                    "cnt_emi_bounce_non_tech_reason_credit_5": null,
                    "cnt_emi_bounce_non_tech_reason_credit_6": null,
                    "cnt_emi_bounce_non_tech_reason_credit_7": null,
                    "cnt_emi_bounce_non_tech_reason_credit_8": null,
                    "cnt_emi_bounce_non_tech_reason_credit_9": null,
                    "cnt_emi_bounce_non_tech_reason_credit_10": null,
                    "cnt_emi_bounce_non_tech_reason_credit_11": null,
                    "amt_emi_bounce_non_tech_reason_credit_0": 0.0,
                    "amt_emi_bounce_non_tech_reason_credit_1": 0.0,
                    "amt_emi_bounce_non_tech_reason_credit_2": 0.0,
                    "amt_emi_bounce_non_tech_reason_credit_3": 0.0,
                    "amt_emi_bounce_non_tech_reason_credit_4": null,
                    "amt_emi_bounce_non_tech_reason_credit_5": null,
                    "amt_emi_bounce_non_tech_reason_credit_6": null,
                    "amt_emi_bounce_non_tech_reason_credit_7": null,
                    "amt_emi_bounce_non_tech_reason_credit_8": null,
                    "amt_emi_bounce_non_tech_reason_credit_9": null,
                    "amt_emi_bounce_non_tech_reason_credit_10": null,
                    "amt_emi_bounce_non_tech_reason_credit_11": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_0": 0.0,
                    "amt_inward_cheque_bounce_tech_reason_credit_1": 0.0,
                    "amt_inward_cheque_bounce_tech_reason_credit_2": 0.0,
                    "amt_inward_cheque_bounce_tech_reason_credit_3": 0.0,
                    "amt_inward_cheque_bounce_tech_reason_credit_4": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_5": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_6": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_7": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_8": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_9": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_10": null,
                    "amt_inward_cheque_bounce_tech_reason_credit_11": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_0": 0,
                    "cnt_inward_cheque_bounce_tech_reason_credit_1": 0,
                    "cnt_inward_cheque_bounce_tech_reason_credit_2": 0,
                    "cnt_inward_cheque_bounce_tech_reason_credit_3": 0,
                    "cnt_inward_cheque_bounce_tech_reason_credit_4": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_5": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_6": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_7": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_8": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_9": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_10": null,
                    "cnt_inward_cheque_bounce_tech_reason_credit_11": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_0": 0.0,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_1": 0.0,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_2": 0.0,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_3": 0.0,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_4": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_5": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_6": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_7": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_8": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_9": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_10": null,
                    "amt_inward_cheque_bounce_non_tech_reason_credit_11": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_0": 0,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_1": 0,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_2": 0,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_3": 0,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_4": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_5": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_6": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_7": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_8": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_9": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_10": null,
                    "cnt_inward_cheque_bounce_non_tech_reason_credit_11": null,
                    "max_overdraft_utilization_0": null,
                    "max_overdraft_utilization_1": null,
                    "max_overdraft_utilization_2": null,
                    "max_overdraft_utilization_3": null,
                    "max_overdraft_utilization_4": null,
                    "max_overdraft_utilization_5": null,
                    "max_overdraft_utilization_6": null,
                    "max_overdraft_utilization_7": null,
                    "max_overdraft_utilization_8": null,
                    "max_overdraft_utilization_9": null,
                    "max_overdraft_utilization_10": null,
                    "max_overdraft_utilization_11": null,
                    "avg_amt_overdraft_utilization_0": null,
                    "avg_amt_overdraft_utilization_1": null,
                    "avg_amt_overdraft_utilization_2": null,
                    "avg_amt_overdraft_utilization_3": null,
                    "avg_amt_overdraft_utilization_4": null,
                    "avg_amt_overdraft_utilization_5": null,
                    "avg_amt_overdraft_utilization_6": null,
                    "avg_amt_overdraft_utilization_7": null,
                    "avg_amt_overdraft_utilization_8": null,
                    "avg_amt_overdraft_utilization_9": null,
                    "avg_amt_overdraft_utilization_10": null,
                    "avg_amt_overdraft_utilization_11": null,
                    "bal_avgof_6dates_0": 49.85,
                    "bal_avgof_6dates_1": 8.0,
                    "bal_avgof_6dates_2": 1183.0,
                    "bal_avgof_6dates_3": 1158.75,
                    "bal_avgof_6dates_4": null,
                    "bal_avgof_6dates_5": null,
                    "bal_avgof_6dates_6": null,
                    "bal_avgof_6dates_7": null,
                    "bal_avgof_6dates_8": null,
                    "bal_avgof_6dates_9": null,
                    "bal_avgof_6dates_10": null,
                    "bal_avgof_6dates_11": null,
                    "cnt_emi_debit_0": 0,
                    "cnt_emi_debit_1": 0,
                    "cnt_emi_debit_2": 0,
                    "cnt_emi_debit_3": 0,
                    "cnt_emi_debit_4": null,
                    "cnt_emi_debit_5": null,
                    "cnt_emi_debit_6": null,
                    "cnt_emi_debit_7": null,
                    "cnt_emi_debit_8": null,
                    "cnt_emi_debit_9": null,
                    "cnt_emi_debit_10": null,
                    "cnt_emi_debit_11": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_0": 0.0,
                    "amt_credit_excluding_loan_credit_and_self_credit_1": 34457.0,
                    "amt_credit_excluding_loan_credit_and_self_credit_2": 24193.0,
                    "amt_credit_excluding_loan_credit_and_self_credit_3": 34403.0,
                    "amt_credit_excluding_loan_credit_and_self_credit_4": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_5": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_6": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_7": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_8": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_9": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_10": null,
                    "amt_credit_excluding_loan_credit_and_self_credit_11": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_0": 0,
                    "cnt_credit_excluding_loan_credit_and_self_credit_1": 3,
                    "cnt_credit_excluding_loan_credit_and_self_credit_2": 1,
                    "cnt_credit_excluding_loan_credit_and_self_credit_3": 5,
                    "cnt_credit_excluding_loan_credit_and_self_credit_4": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_5": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_6": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_7": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_8": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_9": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_10": null,
                    "cnt_credit_excluding_loan_credit_and_self_credit_11": null,
                    "cnt_days_account_overdrawn_0": 0,
                    "cnt_days_account_overdrawn_1": 0,
                    "cnt_days_account_overdrawn_2": 0,
                    "cnt_days_account_overdrawn_3": 0,
                    "cnt_days_account_overdrawn_4": null,
                    "cnt_days_account_overdrawn_5": null,
                    "cnt_days_account_overdrawn_6": null,
                    "cnt_days_account_overdrawn_7": null,
                    "cnt_days_account_overdrawn_8": null,
                    "cnt_days_account_overdrawn_9": null,
                    "cnt_days_account_overdrawn_10": null,
                    "cnt_days_account_overdrawn_11": null,
                    "employer_name_0": null,
                    "employer_name_1": null,
                    "employer_name_2": null,
                    "employer_name_3": null,
                    "employer_name_4": null,
                    "employer_name_5": null,
                    "employer_name_6": null,
                    "employer_name_7": null,
                    "employer_name_8": null,
                    "employer_name_9": null,
                    "employer_name_10": null,
                    "employer_name_11": null,
                    "cnt_business_credit_0": 0,
                    "cnt_business_credit_1": 0,
                    "cnt_business_credit_2": 0,
                    "cnt_business_credit_3": 3,
                    "cnt_business_credit_4": null,
                    "cnt_business_credit_5": null,
                    "cnt_business_credit_6": null,
                    "cnt_business_credit_7": null,
                    "cnt_business_credit_8": null,
                    "cnt_business_credit_9": null,
                    "cnt_business_credit_10": null,
                    "cnt_business_credit_11": null,
                    "cnt_salary_0": 0,
                    "cnt_salary_1": 1,
                    "cnt_salary_2": 1,
                    "cnt_salary_3": 1,
                    "cnt_salary_4": 1,
                    "cnt_salary_5": null,
                    "cnt_salary_6": null,
                    "cnt_salary_7": null,
                    "cnt_salary_8": null,
                    "cnt_salary_9": null,
                    "cnt_salary_10": null,
                    "cnt_salary_11": null,
                    "obligation_0": 0,
                    "obligation_1": 0,
                    "obligation_2": 0,
                    "obligation_3": 0,
                    "obligation_4": null,
                    "obligation_5": null,
                    "obligation_6": null,
                    "obligation_7": null,
                    "obligation_8": null,
                    "obligation_9": null,
                    "obligation_10": null,
                    "obligation_11": null,
                    "avg_amt_overdraft_utilization_perc_0": null,
                    "avg_amt_overdraft_utilization_perc_1": null,
                    "avg_amt_overdraft_utilization_perc_2": null,
                    "avg_amt_overdraft_utilization_perc_3": null,
                    "avg_amt_overdraft_utilization_perc_4": null,
                    "avg_amt_overdraft_utilization_perc_5": null,
                    "avg_amt_overdraft_utilization_perc_6": null,
                    "avg_amt_overdraft_utilization_perc_7": null,
                    "avg_amt_overdraft_utilization_perc_8": null,
                    "avg_amt_overdraft_utilization_perc_9": null,
                    "avg_amt_overdraft_utilization_perc_10": null,
                    "avg_amt_overdraft_utilization_perc_11": null,
                    "number_of_days_account_overdrawn_0": 0,
                    "number_of_days_account_overdrawn_1": 0,
                    "number_of_days_account_overdrawn_2": 0,
                    "number_of_days_account_overdrawn_3": 0,
                    "number_of_days_account_overdrawn_4": null,
                    "number_of_days_account_overdrawn_5": null,
                    "number_of_days_account_overdrawn_6": null,
                    "number_of_days_account_overdrawn_7": null,
                    "number_of_days_account_overdrawn_8": null,
                    "number_of_days_account_overdrawn_9": null,
                    "number_of_days_account_overdrawn_10": null,
                    "number_of_days_account_overdrawn_11": null,
                    "number_of_days_cc_limit_breached_0": 0,
                    "number_of_days_cc_limit_breached_1": 0,
                    "number_of_days_cc_limit_breached_2": 0,
                    "number_of_days_cc_limit_breached_3": 0,
                    "number_of_days_cc_limit_breached_4": null,
                    "number_of_days_cc_limit_breached_5": null,
                    "number_of_days_cc_limit_breached_6": null,
                    "number_of_days_cc_limit_breached_7": null,
                    "number_of_days_cc_limit_breached_8": null,
                    "number_of_days_cc_limit_breached_9": null,
                    "number_of_days_cc_limit_breached_10": null,
                    "number_of_days_cc_limit_breached_11": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_0": 0,
                    "number_of_days_cc_limit_breached_and_chq_bounced_1": 0,
                    "number_of_days_cc_limit_breached_and_chq_bounced_2": 0,
                    "number_of_days_cc_limit_breached_and_chq_bounced_3": 0,
                    "number_of_days_cc_limit_breached_and_chq_bounced_4": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_5": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_6": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_7": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_8": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_9": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_10": null,
                    "number_of_days_cc_limit_breached_and_chq_bounced_11": null,
                    "amt_netting_credits_0": 0.0,
                    "amt_netting_credits_1": 34454.0,
                    "amt_netting_credits_2": 24193.0,
                    "amt_netting_credits_3": 34403.0,
                    "amt_netting_credits_4": null,
                    "amt_netting_credits_5": null,
                    "amt_netting_credits_6": null,
                    "amt_netting_credits_7": null,
                    "amt_netting_credits_8": null,
                    "amt_netting_credits_9": null,
                    "amt_netting_credits_10": null,
                    "amt_netting_credits_11": null,
                    "cnt_netting_credits_0": 0,
                    "cnt_netting_credits_1": 2,
                    "cnt_netting_credits_2": 1,
                    "cnt_netting_credits_3": 5,
                    "cnt_netting_credits_4": null,
                    "cnt_netting_credits_5": null,
                    "cnt_netting_credits_6": null,
                    "cnt_netting_credits_7": null,
                    "cnt_netting_credits_8": null,
                    "cnt_netting_credits_9": null,
                    "cnt_netting_credits_10": null,
                    "cnt_netting_credits_11": null,
                    "amt_netting_debits_0": 3345.0,
                    "amt_netting_debits_1": 33930.15,
                    "amt_netting_debits_2": 25273.0,
                    "amt_netting_debits_3": 36016.0,
                    "amt_netting_debits_4": null,
                    "amt_netting_debits_5": null,
                    "amt_netting_debits_6": null,
                    "amt_netting_debits_7": null,
                    "amt_netting_debits_8": null,
                    "amt_netting_debits_9": null,
                    "amt_netting_debits_10": null,
                    "amt_netting_debits_11": null,
                    "cnt_netting_debits_0": 3,
                    "cnt_netting_debits_1": 8,
                    "cnt_netting_debits_2": 9,
                    "cnt_netting_debits_3": 18,
                    "cnt_netting_debits_4": null,
                    "cnt_netting_debits_5": null,
                    "cnt_netting_debits_6": null,
                    "cnt_netting_debits_7": null,
                    "cnt_netting_debits_8": null,
                    "cnt_netting_debits_9": null,
                    "cnt_netting_debits_10": null,
                    "cnt_netting_debits_11": null,
                    "cnt_loan_credits_0": 0,
                    "cnt_loan_credits_1": 0,
                    "cnt_loan_credits_2": 0,
                    "cnt_loan_credits_3": 3,
                    "cnt_loan_credits_4": null,
                    "cnt_loan_credits_5": null,
                    "cnt_loan_credits_6": null,
                    "cnt_loan_credits_7": null,
                    "cnt_loan_credits_8": null,
                    "cnt_loan_credits_9": null,
                    "cnt_loan_credits_10": null,
                    "cnt_loan_credits_11": null,
                    "max_amount_loan_credits_0": 0.0,
                    "max_amount_loan_credits_1": 0.0,
                    "max_amount_loan_credits_2": 0.0,
                    "max_amount_loan_credits_3": 3402.0,
                    "max_amount_loan_credits_4": null,
                    "max_amount_loan_credits_5": null,
                    "max_amount_loan_credits_6": null,
                    "max_amount_loan_credits_7": null,
                    "max_amount_loan_credits_8": null,
                    "max_amount_loan_credits_9": null,
                    "max_amount_loan_credits_10": null,
                    "max_amount_loan_credits_11": null,
                    "cnt_loan_credits_lt_100k_0": 0,
                    "cnt_loan_credits_lt_100k_1": 0,
                    "cnt_loan_credits_lt_100k_2": 0,
                    "cnt_loan_credits_lt_100k_3": 3,
                    "cnt_loan_credits_lt_100k_4": null,
                    "cnt_loan_credits_lt_100k_5": null,
                    "cnt_loan_credits_lt_100k_6": null,
                    "cnt_loan_credits_lt_100k_7": null,
                    "cnt_loan_credits_lt_100k_8": null,
                    "cnt_loan_credits_lt_100k_9": null,
                    "cnt_loan_credits_lt_100k_10": null,
                    "cnt_loan_credits_lt_100k_11": null,
                    "salary_date_0": null,
                    "salary_date_1": "2025-10-31",
                    "salary_date_2": "2025-09-29",
                    "salary_date_3": "2025-08-30",
                    "salary_date_4": "2025-08-14",
                    "salary_date_5": null,
                    "salary_date_6": null,
                    "salary_date_7": null,
                    "salary_date_8": null,
                    "salary_date_9": null,
                    "salary_date_10": null,
                    "salary_date_11": null,
                    "amt_self_transfer_credit_0": 0.0,
                    "amt_self_transfer_credit_1": 0.0,
                    "amt_self_transfer_credit_2": 0.0,
                    "amt_self_transfer_credit_3": 0.0,
                    "amt_self_transfer_credit_4": null,
                    "amt_self_transfer_credit_5": null,
                    "amt_self_transfer_credit_6": null,
                    "amt_self_transfer_credit_7": null,
                    "amt_self_transfer_credit_8": null,
                    "amt_self_transfer_credit_9": null,
                    "amt_self_transfer_credit_10": null,
                    "amt_self_transfer_credit_11": null,
                    "cnt_self_transfer_credit_0": 0,
                    "cnt_self_transfer_credit_1": 0,
                    "cnt_self_transfer_credit_2": 0,
                    "cnt_self_transfer_credit_3": 0,
                    "cnt_self_transfer_credit_4": null,
                    "cnt_self_transfer_credit_5": null,
                    "cnt_self_transfer_credit_6": null,
                    "cnt_self_transfer_credit_7": null,
                    "cnt_self_transfer_credit_8": null,
                    "cnt_self_transfer_credit_9": null,
                    "cnt_self_transfer_credit_10": null,
                    "cnt_self_transfer_credit_11": null,
                    "cnt_loan_credits_above_5k_0": 0,
                    "cnt_loan_credits_above_5k_1": 0,
                    "cnt_loan_credits_above_5k_2": 0,
                    "cnt_loan_credits_above_5k_3": 0,
                    "cnt_loan_credits_above_5k_4": null,
                    "cnt_loan_credits_above_5k_5": null,
                    "cnt_loan_credits_above_5k_6": null,
                    "cnt_loan_credits_above_5k_7": null,
                    "cnt_loan_credits_above_5k_8": null,
                    "cnt_loan_credits_above_5k_9": null,
                    "cnt_loan_credits_above_5k_10": null,
                    "cnt_loan_credits_above_5k_11": null,
                    "cnt_loan_credits_above_10k_0": 0,
                    "cnt_loan_credits_above_10k_1": 0,
                    "cnt_loan_credits_above_10k_2": 0,
                    "cnt_loan_credits_above_10k_3": 0,
                    "cnt_loan_credits_above_10k_4": null,
                    "cnt_loan_credits_above_10k_5": null,
                    "cnt_loan_credits_above_10k_6": null,
                    "cnt_loan_credits_above_10k_7": null,
                    "cnt_loan_credits_above_10k_8": null,
                    "cnt_loan_credits_above_10k_9": null,
                    "cnt_loan_credits_above_10k_10": null,
                    "cnt_loan_credits_above_10k_11": null,
                    "amt_business_debit_0": 0.0,
                    "amt_business_debit_1": 17660.15,
                    "amt_business_debit_2": 0.0,
                    "amt_business_debit_3": 32000.0,
                    "amt_business_debit_4": null,
                    "amt_business_debit_5": null,
                    "amt_business_debit_6": null,
                    "amt_business_debit_7": null,
                    "amt_business_debit_8": null,
                    "amt_business_debit_9": null,
                    "amt_business_debit_10": null,
                    "amt_business_debit_11": null,
                    "cnt_business_debit_0": 0,
                    "cnt_business_debit_1": 3,
                    "cnt_business_debit_2": 0,
                    "cnt_business_debit_3": 5,
                    "cnt_business_debit_4": null,
                    "cnt_business_debit_5": null,
                    "cnt_business_debit_6": null,
                    "cnt_business_debit_7": null,
                    "cnt_business_debit_8": null,
                    "cnt_business_debit_9": null,
                    "cnt_business_debit_10": null,
                    "cnt_business_debit_11": null,
                    "amt_self_transfer_debit_0": 3330.0,
                    "amt_self_transfer_debit_1": 16270.0,
                    "amt_self_transfer_debit_2": 25273.0,
                    "amt_self_transfer_debit_3": 2980.0,
                    "amt_self_transfer_debit_4": null,
                    "amt_self_transfer_debit_5": null,
                    "amt_self_transfer_debit_6": null,
                    "amt_self_transfer_debit_7": null,
                    "amt_self_transfer_debit_8": null,
                    "amt_self_transfer_debit_9": null,
                    "amt_self_transfer_debit_10": null,
                    "amt_self_transfer_debit_11": null,
                    "cnt_self_transfer_debit_0": 2,
                    "cnt_self_transfer_debit_1": 5,
                    "cnt_self_transfer_debit_2": 9,
                    "cnt_self_transfer_debit_3": 10,
                    "cnt_self_transfer_debit_4": null,
                    "cnt_self_transfer_debit_5": null,
                    "cnt_self_transfer_debit_6": null,
                    "cnt_self_transfer_debit_7": null,
                    "cnt_self_transfer_debit_8": null,
                    "cnt_self_transfer_debit_9": null,
                    "cnt_self_transfer_debit_10": null,
                    "cnt_self_transfer_debit_11": null,
                    "amt_cash_withdrawl_debit_0": 0.0,
                    "amt_cash_withdrawl_debit_1": 15000.0,
                    "amt_cash_withdrawl_debit_2": 0.0,
                    "amt_cash_withdrawl_debit_3": 15300.0,
                    "amt_cash_withdrawl_debit_4": null,
                    "amt_cash_withdrawl_debit_5": null,
                    "amt_cash_withdrawl_debit_6": null,
                    "amt_cash_withdrawl_debit_7": null,
                    "amt_cash_withdrawl_debit_8": null,
                    "amt_cash_withdrawl_debit_9": null,
                    "amt_cash_withdrawl_debit_10": null,
                    "amt_cash_withdrawl_debit_11": null,
                    "amt_emi_debit_0": 0.0,
                    "amt_emi_debit_1": 0.0,
                    "amt_emi_debit_2": 0.0,
                    "amt_emi_debit_3": 0.0,
                    "amt_emi_debit_4": null,
                    "amt_emi_debit_5": null,
                    "amt_emi_debit_6": null,
                    "amt_emi_debit_7": null,
                    "amt_emi_debit_8": null,
                    "amt_emi_debit_9": null,
                    "amt_emi_debit_10": null,
                    "amt_emi_debit_11": null,
                    "amt_debit_entertainment_0": 0.0,
                    "amt_debit_entertainment_1": 0.0,
                    "amt_debit_entertainment_2": 0.0,
                    "amt_debit_entertainment_3": 0.0,
                    "amt_debit_entertainment_4": null,
                    "amt_debit_entertainment_5": null,
                    "amt_debit_entertainment_6": null,
                    "amt_debit_entertainment_7": null,
                    "amt_debit_entertainment_8": null,
                    "amt_debit_entertainment_9": null,
                    "amt_debit_entertainment_10": null,
                    "amt_debit_entertainment_11": null,
                    "amt_debit_fuel_0": 0.0,
                    "amt_debit_fuel_1": 0.0,
                    "amt_debit_fuel_2": 0.0,
                    "amt_debit_fuel_3": 0.0,
                    "amt_debit_fuel_4": null,
                    "amt_debit_fuel_5": null,
                    "amt_debit_fuel_6": null,
                    "amt_debit_fuel_7": null,
                    "amt_debit_fuel_8": null,
                    "amt_debit_fuel_9": null,
                    "amt_debit_fuel_10": null,
                    "amt_debit_fuel_11": null,
                    "amt_debit_medical_0": 0.0,
                    "amt_debit_medical_1": 0.0,
                    "amt_debit_medical_2": 0.0,
                    "amt_debit_medical_3": 0.0,
                    "amt_debit_medical_4": null,
                    "amt_debit_medical_5": null,
                    "amt_debit_medical_6": null,
                    "amt_debit_medical_7": null,
                    "amt_debit_medical_8": null,
                    "amt_debit_medical_9": null,
                    "amt_debit_medical_10": null,
                    "amt_debit_medical_11": null,
                    "amt_debit_online_shopping_0": 0.0,
                    "amt_debit_online_shopping_1": 0.0,
                    "amt_debit_online_shopping_2": 0.0,
                    "amt_debit_online_shopping_3": 0.0,
                    "amt_debit_online_shopping_4": null,
                    "amt_debit_online_shopping_5": null,
                    "amt_debit_online_shopping_6": null,
                    "amt_debit_online_shopping_7": null,
                    "amt_debit_online_shopping_8": null,
                    "amt_debit_online_shopping_9": null,
                    "amt_debit_online_shopping_10": null,
                    "amt_debit_online_shopping_11": null,
                    "amt_debit_alcohol_0": 0.0,
                    "amt_debit_alcohol_1": 0.0,
                    "amt_debit_alcohol_2": 0.0,
                    "amt_debit_alcohol_3": 0.0,
                    "amt_debit_alcohol_4": null,
                    "amt_debit_alcohol_5": null,
                    "amt_debit_alcohol_6": null,
                    "amt_debit_alcohol_7": null,
                    "amt_debit_alcohol_8": null,
                    "amt_debit_alcohol_9": null,
                    "amt_debit_alcohol_10": null,
                    "amt_debit_alcohol_11": null,
                    "amt_debit_mobile_bill_0": 0.0,
                    "amt_debit_mobile_bill_1": 0.0,
                    "amt_debit_mobile_bill_2": 0.0,
                    "amt_debit_mobile_bill_3": 0.0,
                    "amt_debit_mobile_bill_4": null,
                    "amt_debit_mobile_bill_5": null,
                    "amt_debit_mobile_bill_6": null,
                    "amt_debit_mobile_bill_7": null,
                    "amt_debit_mobile_bill_8": null,
                    "amt_debit_mobile_bill_9": null,
                    "amt_debit_mobile_bill_10": null,
                    "amt_debit_mobile_bill_11": null,
                    "amt_credits_lt_10k_0": 0.0,
                    "amt_credits_lt_10k_1": 3.0,
                    "amt_credits_lt_10k_2": 0.0,
                    "amt_credits_lt_10k_3": 5595.0,
                    "amt_credits_lt_10k_4": null,
                    "amt_credits_lt_10k_5": null,
                    "amt_credits_lt_10k_6": null,
                    "amt_credits_lt_10k_7": null,
                    "amt_credits_lt_10k_8": null,
                    "amt_credits_lt_10k_9": null,
                    "amt_credits_lt_10k_10": null,
                    "amt_credits_lt_10k_11": null,
                    "cnt_days_credits_0": 0,
                    "cnt_days_credits_1": 3,
                    "cnt_days_credits_2": 1,
                    "cnt_days_credits_3": 7,
                    "cnt_days_credits_4": null,
                    "cnt_days_credits_5": null,
                    "cnt_days_credits_6": null,
                    "cnt_days_credits_7": null,
                    "cnt_days_credits_8": null,
                    "cnt_days_credits_9": null,
                    "cnt_days_credits_10": null,
                    "cnt_days_credits_11": null,
                    "cnt_emi_ach_bounce_charge_0": 0,
                    "cnt_emi_ach_bounce_charge_1": 0,
                    "cnt_emi_ach_bounce_charge_2": 0,
                    "cnt_emi_ach_bounce_charge_3": 0,
                    "cnt_emi_ach_bounce_charge_4": null,
                    "cnt_emi_ach_bounce_charge_5": null,
                    "cnt_emi_ach_bounce_charge_6": null,
                    "cnt_emi_ach_bounce_charge_7": null,
                    "cnt_emi_ach_bounce_charge_8": null,
                    "cnt_emi_ach_bounce_charge_9": null,
                    "cnt_emi_ach_bounce_charge_10": null,
                    "cnt_emi_ach_bounce_charge_11": null,
                    "amt_emi_ach_bounce_charge_0": 0.0,
                    "amt_emi_ach_bounce_charge_1": 0.0,
                    "amt_emi_ach_bounce_charge_2": 0.0,
                    "amt_emi_ach_bounce_charge_3": 0.0,
                    "amt_emi_ach_bounce_charge_4": null,
                    "amt_emi_ach_bounce_charge_5": null,
                    "amt_emi_ach_bounce_charge_6": null,
                    "amt_emi_ach_bounce_charge_7": null,
                    "amt_emi_ach_bounce_charge_8": null,
                    "amt_emi_ach_bounce_charge_9": null,
                    "amt_emi_ach_bounce_charge_10": null,
                    "amt_emi_ach_bounce_charge_11": null,
                    "avg_debit_transaction_0": 1115.0,
                    "avg_debit_transaction_1": 4241.27,
                    "avg_debit_transaction_2": 2808.11,
                    "avg_debit_transaction_3": 2000.89,
                    "avg_debit_transaction_4": null,
                    "avg_debit_transaction_5": null,
                    "avg_debit_transaction_6": null,
                    "avg_debit_transaction_7": null,
                    "avg_debit_transaction_8": null,
                    "avg_debit_transaction_9": null,
                    "avg_debit_transaction_10": null,
                    "avg_debit_transaction_11": null,
                    "avg_credit_transaction_0": 0,
                    "avg_credit_transaction_1": 11485.67,
                    "avg_credit_transaction_2": 24193.0,
                    "avg_credit_transaction_3": 4989.25,
                    "avg_credit_transaction_4": null,
                    "avg_credit_transaction_5": null,
                    "avg_credit_transaction_6": null,
                    "avg_credit_transaction_7": null,
                    "avg_credit_transaction_8": null,
                    "avg_credit_transaction_9": null,
                    "avg_credit_transaction_10": null,
                    "avg_credit_transaction_11": null,
                    "avg_credit_excluding_loan_credit_and_bounce_0": 0,
                    "avg_credit_excluding_loan_credit_and_bounce_1": 11485.67,
                    "avg_credit_excluding_loan_credit_and_bounce_2": 24193.0,
                    "avg_credit_excluding_loan_credit_and_bounce_3": 6880.6,
                    "avg_credit_excluding_loan_credit_and_bounce_4": null,
                    "avg_credit_excluding_loan_credit_and_bounce_5": null,
                    "avg_credit_excluding_loan_credit_and_bounce_6": null,
                    "avg_credit_excluding_loan_credit_and_bounce_7": null,
                    "avg_credit_excluding_loan_credit_and_bounce_8": null,
                    "avg_credit_excluding_loan_credit_and_bounce_9": null,
                    "avg_credit_excluding_loan_credit_and_bounce_10": null,
                    "avg_credit_excluding_loan_credit_and_bounce_11": null,
                    "amt_rent_credit_0": 0.0,
                    "amt_rent_credit_1": 0.0,
                    "amt_rent_credit_2": 0.0,
                    "amt_rent_credit_3": 0.0,
                    "amt_rent_credit_4": null,
                    "amt_rent_credit_5": null,
                    "amt_rent_credit_6": null,
                    "amt_rent_credit_7": null,
                    "amt_rent_credit_8": null,
                    "amt_rent_credit_9": null,
                    "amt_rent_credit_10": null,
                    "amt_rent_credit_11": null,
                    "author_fraud": false,
                    "date_fraud": false,
                    "transaction_fraud": false,
                    "transaction_fraud_v2": false,
                    "inconsistent_transaction": false,
                    "more_cash_deposits_than_salary": false,
                    "salary_remains_unchanged": false,
                    "salary_1000_multiple": false,
                    "mostly_cash_transactions": false,
                    "equal_credit_debit": false,
                    "negative_balance": false,
                    "tax_100_multiple": false,
                    "min_rtgs_amount": false,
                    "cash_deposit_bank_holiday_transaction": false,
                    "chq_bank_holiday_transaction": false,
                    "outward_cheque_bounce_bank_holiday_transaction": false,
                    "inward_cheque_bounce_bank_holiday_transaction": false,
                    "more_than_15_days_credit": false,
                    "latest_salary_in_last_35days_from_application_date": true,
                    "bank_connect_status": "Verified",
                    "start_date": "11-Aug-25",
                    "end_date": "03-Nov-25",
                    "month_duration": 4,
                    "transaction_gap_latest_date": 10,
                    "statement_from_date": "11-Aug-25",
                    "statement_to_date": "10-Nov-25",
                    "credits": 98564.0,
                    "debits": 98564.15,
                    "total_expense": 98564.15,
                    "avg_daily_closing_balance": 307.83,
                    "avg_balance_of_5th_15th_20th_25th_30th_of_last_6_months": 589.3,
                    "avg_balance_of_1st_last_6_months": 359.62,
                    "avg_balance_of_1st": 359.62,
                    "avg_balance_of_5th_last_6_months": 454.5,
                    "avg_balance_of_5th": 454.5,
                    "avg_balance_of_10th_last_6_months": 4.5,
                    "avg_balance_of_10th": 4.5,
                    "avg_balance_of_15th_last_6_months": 83.33,
                    "avg_balance_of_15th": 83.33,
                    "avg_balance_of_20th_last_6_months": 82.67,
                    "avg_balance_of_20th": 82.67,
                    "avg_balance_of_25th_last_6_months": 82.67,
                    "avg_balance_of_25th": 82.67,
                    "avg_balance_of_30th_last_6_months": 2243.33,
                    "avg_balance_of_30th": 2243.33,
                    "total_cash_withdrawal": 30300.0,
                    "cash_withdrawals": 5,
                    "total_chq_deposit": 0.0,
                    "total_chq_issue": 0.0,
                    "inward_chq_bounces": 0.0,
                    "outward_chq_bounces": 0.0,
                    "debitless_charges": 236.0,
                    "chq_deposits": 0,
                    "chq_issues": 0,
                    "cnt_total_debit_transactions": 38,
                    "cnt_total_credit_transactions": 12,
                    "avg_bank_balance": 263.46,
                    "avg_business_credit_per_month": 21.0,
                    "total_emi_ecs_loan": 0,
                    "net_banking_credits": 0.0,
                    "net_banking_debits": 0.0,
                    "amt_inward_cheque_bounce_credit": 0.0,
                    "cnt_inward_cheque_bounce_credit": 0,
                    "cnt_outward_cheque_bounce_debit": 0,
                    "amt_outward_cheque_bounce_debit": 0.0,
                    "pos_expenses": 0.0,
                    "total_income": 93053.0,
                    "cnt_total_income": 4,
                    "total_creditcard_payment": 0,
                    "reversals": 0.0,
                    "total_bounce_or_penal_charge": 0,
                    "total_cnt_bounce_or_penal_charge": 0,
                    "min_credit_cnt_per_month_last12months": 0,
                    "obligation": 0,
                    "cnt_min_eod_bal_lt_500_each_month": 3,
                    "min_od_amount_utilized_last_12_month": null,
                    "max_od_amount_utilized_last_12_month": null,
                    "avg_od_amount_utilized_last_12_month": null,
                    "min_od_perc_utilized_last_12_month": null,
                    "max_od_perc_utilized_last_12_month": null,
                    "avg_od_perc_utilized_last_12_month": null,
                    "adjusted_abb_od_last_12_month": null,
                    "cnt_stop_emi_charge": 0,
                    "amt_stop_emi_charge": 0.0,
                    "min_od_amount_utilized_last_6_month": null,
                    "max_od_amount_utilized_last_6_month": null,
                    "avg_od_amount_utilized_last_6_month": null,
                    "min_od_perc_utilized_last_6_month": null,
                    "max_od_perc_utilized_last_6_month": null,
                    "avg_od_perc_utilized_last_6_month": null,
                    "adjusted_abb_od_last_6_month": null,
                    "banking_vintage_in_months": 3,
                    "banking_vintage_in_days": 94,
                    "banking_recency_in_days": 10,
                    "cnt_total_latest_consecutive_months": 4,
                    "latest_consecutive_month": "Nov-2025",
                    "amt_credit_m6_to_m11": 0.0,
                    "amt_business_credits_m6_to_m11": 0.0,
                    "amt_self_transfer_credit": 0.0,
                    "amt_group_transfer_credit": 0.0,
                    "amt_cross_account_transfer_credit": 0.0,
                    "cnt_month_lt_5_txn": 1,
                    "cnt_salary_through_upi": 0,
                    "amt_gambling_credit": 0.0,
                    "amt_gambling_debit": 0.0,
                    "amt_investment_credit": 0.0,
                    "amt_interest_credit": 3.0,
                    "amt_total_bounce_credit": 0.0,
                    "cnt_total_bounce_credit": 0,
                    "amt_loan_credit": 5511.0,
                    "amt_insurance_credit": 0.0,
                    "max_credit_amt_last_12_months": 11056.0,
                    "amt_total_credit_transactions": 98564.0,
                    "amt_total_debit_transactions": 98564.15,
                    "cnt_upi_debit_less_than_500": 17,
                    "cnt_upi_credit_less_than_500": 0,
                    "cnt_upi_debit_greater_than_5000": 4,
                    "cnt_upi_credit_greater_than_5000": 0,
                    "amt_upi_spent_on_investments": 0.0,
                    "amt_upi_spent_on_medical": 0.0,
                    "amt_upi_spent_on_entertainment": 0.0,
                    "amt_upi_spent_on_groceries": 2660.15,
                    "amt_upi_spent_on_fuel": 0.0,
                    "amt_upi_spent_on_investments_in_first_10_days": 0.0,
                    "amt_upi_spent_on_medical_in_first_10_days": 0.0,
                    "amt_upi_spent_on_entertainment_in_first_10_days": 0.0,
                    "amt_upi_spent_on_groceries_in_first_10_days": 0.0,
                    "amt_upi_spent_on_fuel_in_first_10_days": 0.0,
                    "amt_credit_wo_bounce": 98564.0,
                    "cnt_credit_wo_bounce": 12,
                    "amt_debit_wo_bounce": 98564.15,
                    "cnt_debit_wo_bounce": 38,
                    "amt_refund_credit": 0.0,
                    "cnt_refund_credit": 0,
                    "cnt_reversals": 0,
                    "cnt_of_months_with_credits": 3,
                    "cnt_credits_wo_reversal": 12,
                    "amt_credits_wo_reversal": 98564.0,
                    "cnt_debits_wo_reversal": 38,
                    "amt_debits_wo_reversal": 98564.15,
                    "cnt_emi_bounce_insuff_fund_6_month": 0,
                    "cnt_month_business_credits_except_intrest_eq_0": 3,
                    "cnt_of_months_with_salary_credits": 3,
                    "latest_salary_month": "Oct-2025",
                    "amt_penalty_charge_debit": 0.0,
                    "cnt_transactions_last_12_months": 50,
                    "cnt_upi_credit_transactions": 0,
                    "amt_upi_credit_transactions": 0.0,
                    "cnt_imps_credit_transactions": 0,
                    "amt_imps_credit_transactions": 0.0,
                    "cnt_upi_debit_transactions": 32,
                    "amt_upi_debit_transactions": 68028.15,
                    "cnt_upi_transactions": 32,
                    "amt_upi_transactions": 68028.15,
                    "amt_upi_spent_in_first_10_days": 10065.0,
                    "amt_upi_spent_in_last_10_days": 33130.15,
                    "cnt_upi_spent_in_first_10_days": 10,
                    "cnt_upi_spent_in_last_10_days": 14,
                    "amt_emi_debit_via_upi": 0.0,
                    "cnt_emi_debit_via_upi": 0,
                    "missing_months": 0,
                    "total_of_eod_bal_on_01": 1078.85,
                    "total_of_eod_bal_on_02": 1058.85,
                    "total_of_eod_bal_on_04": 909.0,
                    "total_of_eod_bal_on_05": 909.0,
                    "total_of_eod_bal_on_10": 9.0,
                    "total_of_eod_bal_on_15": 250.0,
                    "total_of_eod_bal_on_17": 248.0,
                    "total_of_eod_bal_on_20": 248.0,
                    "total_of_eod_bal_on_25": 248.0,
                    "total_of_eod_bal_on_30": 6730.0,
                    "avg_of_eod_bal_on_01": 269.71,
                    "avg_of_eod_bal_on_02": 264.71,
                    "avg_of_eod_bal_on_04": 227.25,
                    "avg_of_eod_bal_on_05": 227.25,
                    "avg_of_eod_bal_on_10": 2.25,
                    "avg_of_eod_bal_on_15": 62.5,
                    "avg_of_eod_bal_on_17": 62.0,
                    "avg_of_eod_bal_on_20": 62.0,
                    "avg_of_eod_bal_on_25": 62.0,
                    "avg_of_eod_bal_on_30": 1682.5,
                    "total_of_monthly_avg_amt_overdraft_utilization_perc": 0.0,
                    "avg_of_monthly_avg_amt_overdraft_utilization_perc": 0.0,
                    "total_of_avg_monthly_bal": 1053.84,
                    "avg_of_avg_monthly_bal": 263.46,
                    "sum_of_closing_balance": 10080.7,
                    "avg_of_closing_balance": 2520.18,
                    "sum_of_max_eod_balance": 10145.7,
                    "avg_of_max_eod_balance": 2536.43,
                    "sum_of_min_eod_balance": 13.85,
                    "avg_of_min_eod_balance": 3.46,
                    "sum_of_avg_bal_top_15_days": 1764.71,
                    "avg_of_avg_bal_top_15_days": 441.18,
                    "total_cnt_cash_deposit_credit": 0,
                    "avg_cnt_cash_deposit_credit": 0,
                    "avg_cnt_cash_withdrawl_debit": 1,
                    "total_number_of_chq_deposits_having_chq_num": 0,
                    "total_number_of_chq_issue_having_chq_num": 5.0,
                    "total_credit_cnt_excluding_reversal": 12,
                    "total_drawing_limit": 0.0,
                    "avg_drawing_limit": 0,
                    "avg_number_of_chq_deposits_having_chq_num": 0,
                    "avg_number_of_chq_issues_having_chq_num": 1,
                    "avg_of_credits_excluding_reversal": 3,
                    "total_debit_cnt_excluding_reversal": 38,
                    "total_number_of_self_credits": 0,
                    "total_number_of_cross_account_transfer_credits": 0,
                    "total_number_of_group_transfer_credits": 0,
                    "avg_number_of_self_credits": 0,
                    "total_number_of_self_debits": 26,
                    "total_number_of_cross_account_transfer_debits": 0,
                    "total_number_of_group_transfer_debits": 0,
                    "avg_number_of_self_debits": 6,
                    "total_number_of_emi_debits": 0,
                    "sum_of_no_of_days_to_serve_cc_interest": 0,
                    "max_no_of_days_to_serve_cc_interest": 0,
                    "avg_number_of_emi_debits": 0,
                    "avg_of_no_of_days_to_serve_cc_interest": 0,
                    "total_cnt_of_emi_bounce_non_tech_reason_credit": 0,
                    "avg_cnt_of_emi_bounce_non_tech_reason_credit": 0,
                    "total_cnt_of_emi_bounce_tech_reason_credit": 0,
                    "avg_cnt_of_emi_bounce_tech_reason_credit": 0,
                    "total_cnt_of_emi_bounce_credit": 0,
                    "avg_cnt_of_emi_bounce_credit": 0,
                    "total_cnt_inward_cheque_bounce_non_tech_reason_credit": 0,
                    "avg_cnt_inward_cheque_bounce_non_tech_reason_credit": 0,
                    "total_cnt_of_loan_credits": 3,
                    "total_of_cnt_outward_cheque_bounce_debit": 0,
                    "sum_of_total_overdrawn_amount": 0.0,
                    "sum_of_number_of_days_account_overdrawn": 0.0,
                    "total_of_max_days_account_in_overdrawn_state": 0,
                    "total_of_no_of_instances_account_overdrawn": 0,
                    "sum_of_saction_limit": 0.0,
                    "total_of_amt_cheque_deposit_having_chq_num": 0.0,
                    "total_of_amt_cheque_issue_having_chq_num": 30300.0,
                    "total_of_amt_credit_excluding_reversal": 98564.0,
                    "total_of_amt_debit_excluding_reversal": 98564.15,
                    "avg_cnt_of_loan_credits": 1,
                    "avg_cnt_of_outward_cheque_bounce_debit": 0,
                    "avg_of_total_overdrawn_amount": 0,
                    "avg_of_number_of_days_account_overdrawn": 0,
                    "avg_of_max_days_account_in_overdrawn_state": 0,
                    "avg_of_no_of_instances_account_overdrawn": 0,
                    "avg_of_saction_limit": 0,
                    "avg_of_amt_credit_excluding_reversal": 24641.0,
                    "avg_of_amt_debits_excluding_reversal": 24641.0,
                    "total_number_of_salary_credits": 3,
                    "avg_number_of_salary_credits": 1,
                    "avg_monthly_amt_of_bank_charge_debit": 59.0,
                    "total_amt_cash_deposit": 0.0,
                    "avg_monthly_amt_cash_deposit": 0.0,
                    "avg_monthly_amt_cash_withdrawal": 7575.0,
                    "avg_monthly_amt_cheque_issue": 0.0,
                    "avg_monthly_amt_cheque_deposited": 0.0,
                    "avg_monthly_amt_credit_card_payment": 0.0,
                    "avg_monthly_amt_self_credit": 0.0,
                    "total_amt_self_transfer_debit": 47853.0,
                    "amt_group_transfer_debit": 0.0,
                    "amt_cross_account_transfer_debit": 0.0,
                    "avg_monthly_amt_self_transfer_debit": 11963.25,
                    "avg_monthly_amt_of_emi_debit": 0.0,
                    "avg_monthly_amt_of_interest_credit": 0.75,
                    "total_amt_of_investment_expense": 0.0,
                    "avg_monthly_amt_of_investment_expense": 0.0,
                    "avg_monthly_amt_of_loan_credits": 1377.75,
                    "total_amt_of_other_expenses": 0.0,
                    "avg_monthly_amt_of_other_expenses": 0.0,
                    "total_amt_of_other_income_credits": 0.0,
                    "avg_monthly_amt_of_other_income_credits": 0.0,
                    "total_salary_paid": 0.0,
                    "avg_monthly_amt_of_salary_paid": 0.0,
                    "total_salary_credits": 71792.0,
                    "avg_monthly_amt_of_salary_credits": 17948.0,
                    "total_utility_payment_amt": 0.0,
                    "avg_monthly_utility_payment_amt": 0.0,
                    "total_amt_of_investment_income": 0.0,
                    "avg_monthly_amt_of_investment_income": 0.0,
                    "total_amt_of_interest_charged": 0.0,
                    "avg_monthly_amt_of_interest_charged": 0.0,
                    "total_amt_of_pension_credited": 0.0,
                    "avg_monthly_amt_of_pension_credited": 0.0,
                    "amt_netting_credits": 93050.0,
                    "amt_netting_debits": 98564.15,
                    "cnt_netting_credits": 8,
                    "cnt_netting_debits": 38,
                    "cnt_salary_last_90days_and_application_date_minus_2": 3,
                    "max_sal_val_txn": 0,
                    "min_amt_emi_debit_txn": 0.0,
                    "max_cnt_credit_txn": 8,
                    "max_cnt_debit_txn": 18,
                    "max_cnt_cash_withdrawal": 3,
                    "min_penal_charges": 0.0,
                    "max_penal_charges": 0,
                    "total_cnt_penal_charge": 0,
                    "min_of_total_reversal_amount": 0.0,
                    "avg_cnt_credit_txn": 4,
                    "avg_emi_txn": 0.0,
                    "avg_penal_charges": 0.0,
                    "max_of_total_reversal_amount": 0,
                    "avg_bounce_or_penal_charge": 0.0,
                    "total_amt_business_credit": 84.0,
                    "total_cnt_business_credit": 3,
                    "sum_of_no_of_days_to_serve_cc_interest_v2": 0,
                    "max_of_no_of_days_to_serve_cc_interest_v2": 0,
                    "avg_of_no_of_days_to_serve_cc_interest_v2": 0,
                    "total_amt_business_debit": 49660.15,
                    "total_cnt_business_debit": 8,
                    "has_negative_balance": false,
                    "has_min_3_credits_each_month": false,
                    "is_salary_present": true,
                    "total_cnt_inward_bounces_non_tech_credit_v5": 0,
                    "total_cnt_inward_bounces_tech_credit": 0,
                    "total_amt_inward_bounces_non_tech_credit_v5": 0.0,
                    "total_amt_inward_bounces_tech_credit": 0.0,
                    "avg_cnt_of_inward_bounces_non_tech_credit_v5": 0,
                    "avg_cnt_of_inward_bounces_tech_credit": 0,
                    "has_salary_in_last_3_months": true,
                    "min_od_amount_utilized_last_3_month": null,
                    "max_od_amount_utilized_last_3_month": null,
                    "avg_od_amount_utilized_last_3_month": null,
                    "min_od_perc_utilized_last_3_month": null,
                    "max_od_perc_utilized_last_3_month": null,
                    "avg_od_perc_utilized_last_3_month": null,
                    "adjusted_abb_od_last_3_month": null,
                    "more_cash_deposited_than_salary_amt": false,
                    "salary_days_variance_last_3months_considering_bank_holidays": 0,
                    "max_amt_credit": 24193.0,
                    "cnt_days_eod_bal_lt_1000": 77,
                    "cnt_loan_credit_c15": 0,
                    "amt_loan_credit_c15": 0.0,
                    "cnt_business_credit_c30": 0,
                    "amt_business_credit_c30": 0.0,
                    "cnt_business_credit_c60": 0,
                    "amt_business_credit_c60": 0.0,
                    "cnt_business_credit_c90": 3,
                    "amt_business_credit_c90": 84.0,
                    "cnt_business_credit_c180": 3,
                    "amt_business_credit_c180": 84.0,
                    "cnt_emi_bounce_credit_c180": 0,
                    "amt_emi_bounce_credit_c180": 0.0,
                    "cnt_emi_bounce_credit_c120": 0,
                    "amt_median_salary_c120": 24193.0,
                    "amt_median_salary_c180": 24193.0,
                    "cnt_loan_credits_lt_100k_c30": 0,
                    "cnt_loan_credits_gt_50k_c30": 0,
                    "adjusted_abb_c90": 242.99,
                    "amt_loan_credits_c30": 0.0,
                    "amt_loan_credits_gt_50k_c30": 0.0,
                    "cnt_loan_credits_gt_50k_c60": 0,
                    "amt_loan_credits_gt_50k_c60": 0.0,
                    "cnt_loan_credits_gt_50k_c90": 0,
                    "amt_loan_credits_gt_50k_c90": 0.0,
                    "cnt_loan_credits_gte_50k_c30": 0,
                    "salary_txn_frequency": 3,
                    "cnt_ecs_bounce_c90": 0,
                    "amt_ecs_bounce_c90": 0.0,
                    "net_salary_last_3months_basis_10_perc_variance": 23406.0,
                    "cnt_loan_credits_last_3_month": 0,
                    "salary_confidence_v1": 100,
                    "salary_confidence_v2": "Very High",
                    "salary_v2": 24193.0,
                    "imps_daily_limit_breach": false,
                    "upi_daily_limit_breach": false,
                    "upi_txn_limit_breach": false,
                    "imps_txn_limit_breach": false,
                    "phone_number": "XXXXXX8641",
                    "more_cash_deposit_than_average_bank_balance": false,
                    "salary_delay_45days_flag": false,
                    "salary_days_consistent_within_10days_of_median_flag": true,
                    "estimated_emi_amount_for_latest_loan_credit": 0.0,
                    "cnt_salary_through_upi_and_imps_c120": 0,
                    "cnt_salary_through_upi_and_imps_c180": 0,
                    "days_since_latest_salary_from_application_date": 13,
                    "salary_present_in_recent_month": true,
                    "cnt_of_months_with_salary_credits_6months": 3,
                    "cnt_of_months_with_salary_credits_4months": 3,
                    "salary_days_variance_last_4months_considering_bank_holidays": 1,
                    "cnt_of_months_with_no_salary_credits_4months": 1,
                    "salary_days_variance_last_6months_considering_bank_holidays": 1,
                    "cnt_of_months_with_no_salary_credits_6months": 3,
                    "avg_monthly_income": 23263.25,
                    "cash_withdrawals_percentage_out_of_total_withdrawals": 0.31,
                    "avg_monthly_closing_balance": 2520.18,
                    "avg_monthly_debits": 24641.04,
                    "avg_number_of_chq_issues": 0.0,
                    "avg_number_of_chq_deposits": 0.0,
                    "avg_chq_issues": 0.0,
                    "avg_chq_deposits": 0.0,
                    "avg_monthly_credits": 24641.0,
                    "avg_monthly_credits_last_3_months": 19550.0,
                    "avg_monthly_credits_last_6_months": 16427.33,
                    "avg_monthly_debits_last_3_months": 20849.38,
                    "avg_monthly_debits_last_6_months": 16427.36,
                    "total_debit_amount_last_3_months": 62548.15,
                    "total_credit_amount_last_9_months": 98564.0,
                    "avg_monthly_expense": 24641.04,
                    "avg_expense_to_income_perc": 105.92,
                    "avg_monthly_business_credits": 21.0,
                    "annualized_turn_over": 252.0,
                    "sum_of_net_business_credits_annualised": 252.0,
                    "total_number_of_months_with_data": 4,
                    "avg_banking_salary_credits_3months": 23799.5,
                    "avg_banking_salary_credits_6months": 23930.67,
                    "cnt_emi_ach_bounce_charge_in_3_months": 0,
                    "cnt_emi_ach_bounce_charge_in_6_months": 0,
                    "cnt_emi_ach_bounce_charge_in_12_months": 0,
                    "amt_emi_ach_bounce_charge_in_3_months": 0.0,
                    "amt_emi_ach_bounce_charge_in_6_months": 0.0,
                    "amt_emi_ach_bounce_charge_in_12_months": 0.0,
                    "avg_debit_transaction_in_3_months": 8164.38,
                    "avg_debit_transaction_in_6_months": 10165.27,
                    "avg_debit_transaction_in_12_months": 10165.27,
                    "cnt_ach_bounce_charge_in_3_months": 0,
                    "cnt_ach_bounce_charge_in_6_months": 0,
                    "cnt_ach_bounce_charge_in_12_months": 0,
                    "amt_ach_bounce_charge_in_3_months": 0.0,
                    "amt_ach_bounce_charge_in_6_months": 0.0,
                    "amt_ach_bounce_charge_in_12_months": 0.0,
                    "cnt_inward_cheque_bounce_credit_3_months": 0,
                    "cnt_inward_cheque_bounce_credit_6_months": 0,
                    "cnt_inward_cheque_bounce_credit_12_months": 0,
                    "amt_inward_cheque_bounce_credit_3_months": 0.0,
                    "amt_inward_cheque_bounce_credit_6_months": 0.0,
                    "amt_inward_cheque_bounce_credit_9_months": 0.0,
                    "amt_inward_cheque_bounce_credit_12_months": 0.0,
                    "cnt_ecs_bounce_last_6_months": 0,
                    "cnt_debit_transactions_last_6_months": 38,
                    "cnt_debit_transactions_last_9_months": 38,
                    "cnt_credit_transactions_last_6_months": 12,
                    "cnt_credit_transactions_last_9_months": 12,
                    "cnt_transactions_last_6_months": 50,
                    "total_debit_amount_last_6_months": 98564.15,
                    "total_debit_amount_last_9_months": 98564.15,
                    "total_credit_amount_last_6_months": 98564.0,
                    "banking_debits_and_credits_total_of_last_6_mths__avg": -0.04,
                    "avg_daily_closing_balance_3months": 240.26,
                    "avg_daily_closing_balance_12months": 307.83,
                    "avg_daily_closing_balance_6months": 307.83,
                    "avg_daily_closing_balance_9months": 307.83,
                    "cnt_min_chrg_last_12_months": 0,
                    "cnt_min_chrg_last_6_months": 0,
                    "max_days_eod_bal_lt_100_last_6m": 30,
                    "emi_check_returns_last_3_months": 0,
                    "emi_check_returns_last_6_months": 0,
                    "loan_credit_amt_last_3months": 0.0,
                    "outward_cheque_returns_last_6_months": 0.0,
                    "inward_cheque_returns_last_6_months": 0,
                    "min_eod_bal_2_10_15_24_28th_day_ever": 0.0,
                    "sum_loan_disbursement_last_6month": 5511.0,
                    "chq_issues_6_months": 0,
                    "total_amt_chq_issues_6_months": 0.0,
                    "cnt_inward_chq_bounce_6_months": 0,
                    "cnt_minimum_balance_chrg_last12m": 0,
                    "cnt_chq_bounce_charge_in_3_months": 0,
                    "cnt_chq_bounce_charge_in_6_months": 0,
                    "cnt_chq_bounce_charge_in_12_months": 0,
                    "amt_chq_bounce_charge_in_3_months": 0.0,
                    "amt_chq_bounce_charge_in_6_months": 0.0,
                    "amt_chq_bounce_charge_in_12_months": 0.0,
                    "cnt_refund_credit_last_3months": 0,
                    "amt_refund_credit_last_3months": 0.0,
                    "cnt_refund_credit_last_6months": 0,
                    "amt_refund_credit_last_6months": 0.0,
                    "cnt_refund_credit_last_9months": 0,
                    "amt_refund_credit_last_9months": 0.0,
                    "cnt_refund_credit_last_12months": 0,
                    "amt_refund_credit_last_12months": 0.0,
                    "cnt_reversal_credit_last_3months": 0,
                    "amt_reversal_credit_last_3months": 0.0,
                    "cnt_reversal_credit_last_6months": 0,
                    "amt_reversal_credit_last_6months": 0.0,
                    "cnt_reversal_credit_last_9months": 0,
                    "amt_reversal_credit_last_9months": 0.0,
                    "cnt_reversal_credit_last_12months": 0,
                    "amt_reversal_credit_last_12months": 0.0,
                    "ratio_cnt_chq_credit_to_total_credit_6_months": 0.0,
                    "avg_cnt_cash_withdrawals_3_months": 0.66666667,
                    "avg_cnt_debit_txn_2_months": 5.5,
                    "ratio_cnt_chq_credit_to_total_credit_wo_bounce_6_months": 0.0,
                    "min_eod_balance": 0.0,
                    "non_business_and_loan_credits_last_12_months": 98480.0,
                    "turnover_excluding_non_business_and_loan_credits_12_months": 84.0,
                    "non_business_and_loan_debits_last_12_months": 48089.0,
                    "turnover_excluding_non_business_and_loan_debits_12_months": 50475.15,
                    "non_business_and_loan_credits_last_6_months": 98480.0,
                    "turnover_excluding_non_business_and_loan_credits_last_6_months": 84.0,
                    "non_business_and_loan_credits_last_3_months": 58650.0,
                    "turnover_excluding_non_business_and_loan_credits_last_3_months": 0.0,
                    "non_business_and_loan_credits_m6_to_m11": 0.0,
                    "turnover_excluding_non_business_and_loan_credits_m6_to_m11": 0.0,
                    "max_debit_amt_last_12_months": 16200.0,
                    "cnt_days_eod_bal_gt_25000": 0,
                    "cnt_days_eod_bal_gt_5000": 0,
                    "cnt_days_cc_od_eod_bal_gt_25000": 0,
                    "cnt_business_credit_3_months": 0,
                    "cnt_business_credit_in_month_m1_to_m6": 3,
                    "cnt_business_credit_m3_to_m5": 3,
                    "cnt_business_credit_m6_to_m8": 0,
                    "cnt_business_credit_m9_to_m11": 0,
                    "avg_cc_od_balance_last12months": 0.0,
                    "cnt_days_bal_present": 85,
                    "loan_credit_amt_last_3months_non_masfin": 0.0,
                    "cnt_of_months_with_no_salary_credits": 1,
                    "avg_daily_closing_balance_1month": 34.85,
                    "avg_daily_closing_balance_2months": 108.07,
                    "outward_cheque_return_cnt_last6months": 0,
                    "avg_upi_txn": 2125.88,
                    "avg_cnt_upi_credit_txn_in_a_day": 0,
                    "avg_amt_upi_credit_txn_in_a_day": 0.0,
                    "avg_cnt_upi_debit_txn_in_a_day": 0,
                    "avg_amt_upi_debit_txn_in_a_day": 800.33,
                    "ratio_amt_upi_spend_on_groceries_to_total_upi_debits": 0.04,
                    "ratio_amt_upi_spend_on_entertainment_to_total_upi_debits": 0.0,
                    "ratio_amt_upi_spend_on_investments_to_total_upi_debits": 0.0,
                    "ratio_upi_amt_spent_in_first_10_days_to_total_upi_debits": 0.15,
                    "ratio_upi_amt_spent_in_last_10_days_to_total_upi_debits": 0.49,
                    "ratio_upi_amt_spent_in_first_10_days_to_amt_spent_in_last_10_days": 0.3,
                    "ratio_amt_upi_spent_on_loan_emi_to_total_upi_debits": 0.0,
                    "ach_return_cnt_last3months": 0,
                    "ach_return_cnt_last6months": 0,
                    "ach_return_cnt_last12months": 0,
                    "amt_self_transfer_last_3month": 0.0,
                    "cnt_self_transfer_last_3month": 0,
                    "amt_self_transfer_last_6month": 0.0,
                    "cnt_self_transfer_last_6month": 0,
                    "avg_balance_last12months": 5114.86,
                    "avg_balance_last3months": 5739.3,
                    "avg_balance_on_5_15_25_last_6months": 206.83,
                    "business_related_credit_amt_last6months": 84.0,
                    "annual_turnover_v2": 168.0,
                    "business_related_credit_cnt_last6months": 3,
                    "cnt_auto_debit_bounce_6m": 0,
                    "cnt_auto_debit_bounce_3m": 0,
                    "cnt_auto_debit_bounce_12m": 0,
                    "cnt_auto_debit_bounce_excluding_investment_3m": 0,
                    "cnt_auto_debit_bounce_excluding_investment_6m": 0,
                    "cnt_auto_debit_bounce_excluding_investment_12m": 0,
                    "cnt_inward_cheque_bounce_2m": 0,
                    "cnt_inward_cheque_bounce_6m": 0,
                    "min_credit_cnt_last6months": 8,
                    "debit_cnt_last6months": 38,
                    "income_last6months": 93053.0,
                    "min_balance_last3months": 0.0,
                    "min_credit_cnt_per_month_last3months": 0,
                    "min_credit_cnt_per_month_last6months": 0,
                    "min_debit_cnt_per_month_last6months": 3,
                    "min_debit_cnt_last6months": 37,
                    "net_credit_last3months": 58650.0,
                    "net_credit_txn_amount": 98564.0,
                    "persistent_negative_balance_last6months": false,
                    "salaried_transactions_count_6m": 3,
                    "total_salary_latest_6m": 71792.0,
                    "turnover_excluding_loan_and_self_credits": 93053.0,
                    "cnt_turnover_txn_excluding_loan_and_self_credits": 3,
                    "turnover_excluding_loan_self_and_fdrd_credits": 93053.0,
                    "cnt_turnover_txn_excluding_loan_self_and_fdrd_credits": 3,
                    "cnt_outward_cheque_bounce_debit_6_months": 0,
                    "adjusted_abb": 263.91,
                    "inward_cheque_emi_return_cnt_last3months": 0,
                    "inward_cheque_emi_return_cnt_last6months": 0,
                    "total_credit_last3months_excluding_reversal": 58650.0,
                    "cnt_credit_transactions_3_months_excluding_reversal": 4,
                    "cnt_debit_transactions_3_months_excluding_reversal": 20,
                    "total_debit_amount_last_3_months_excluding_reversal": 62548.15,
                    "total_credit_amount_last_6_months_excluding_reversal": 98564.0,
                    "cnt_credit_transactions_last_6_months_excluding_reversal": 12,
                    "total_debit_amount_last_6_months_excluding_reversal": 98564.15,
                    "cnt_debit_transactions_last_6_months_excluding_reversal": 38,
                    "total_credit_amount_last_9_months_excluding_reversal": 98564.0,
                    "cnt_credit_transactions_last_9_months_excluding_reversal": 12,
                    "total_debit_amount_last_9_months_excluding_reversal": 98564.15,
                    "cnt_debit_transactions_last_9_months_excluding_reversal": 38,
                    "cnt_inward_chq_bounce_credit_12_months_isto_chq_issues": 0.0,
                    "credit_cnt_last6months": 12,
                    "debit_cheques_cnt_last6months": 0,
                    "year_month_count": 4,
                    "inward_cheque_return_cnt_last6months": 0,
                    "total_emi_amount_debit_last_3months": 0.0,
                    "total_emi_amount_debit_last_6months": 0.0,
                    "amt_credit_last_30_days": 34454.0,
                    "cnt_credit_last_30_days": 2,
                    "max_amt_credit_last_30_days": 23406.0,
                    "min_amt_credit_last_30_days": 11048.0,
                    "avg_amt_credit_last_30_days": 17227.0,
                    "amt_credit_last_30_days_lt_10k": 0.0,
                    "cnt_credit_last_30_days_lt_10k": 0,
                    "max_amt_credit_last_30_days_lt_10k": 0.0,
                    "min_amt_credit_last_30_days_lt_10k": 0.0,
                    "avg_amt_credit_last_30_days_lt_10k": 0.0,
                    "amt_credit_last_31_60_days": 24193.0,
                    "cnt_credit_last_31_60_days": 1,
                    "max_amt_credit_last_31_60_days": 24193.0,
                    "min_amt_credit_last_31_60_days": 24193.0,
                    "avg_amt_credit_last_31_60_days": 24193.0,
                    "amt_credit_last_31_60_days_lt_10k": 0.0,
                    "cnt_credit_last_31_60_days_lt_10k": 0,
                    "max_amt_credit_last_31_60_days_lt_10k": 0.0,
                    "min_amt_credit_last_31_60_days_lt_10k": 0.0,
                    "avg_amt_credit_last_31_60_days_lt_10k": 0.0,
                    "amt_credit_last_61_90_days": 34403.0,
                    "cnt_credit_last_61_90_days": 5,
                    "max_amt_credit_last_61_90_days": 24193.0,
                    "min_amt_credit_last_61_90_days": 8.0,
                    "avg_amt_credit_last_61_90_days": 6880.6,
                    "amt_credit_last_61_90_days_lt_10k": 84.0,
                    "cnt_credit_last_61_90_days_lt_10k": 3,
                    "max_amt_credit_last_61_90_days_lt_10k": 39.0,
                    "min_amt_credit_last_61_90_days_lt_10k": 8.0,
                    "avg_amt_credit_last_61_90_days_lt_10k": 28.0,
                    "avg_credit_amt_last_6months": 8213.67,
                    "avg_credit_amt_last_3months": 14662.5,
                    "ratio_of_avg_daily_bank_balance_last_3month_to_emi_amt_debit_last_3_month": 0.0,
                    "ratio_of_avg_credit_amt_last_3month_to_emi_amt_debit_last_3_month": 0.0,
                    "ratio_of_avg_daily_bank_balance_last_6month_to_emi_amt_debit_last_6_month": 0.0,
                    "ratio_of_avg_credit_amt_last_6month_to_emi_amt_debit_last_6_month": 0.0,
                    "total_avg_debit_transactions": 2593.79,
                    "total_avg_credit_transactions": 8213.67,
                    "avg_eod_bal_c180": 307.83,
                    "avg_eod_bal_c90": 307.83,
                    "avg_eod_bal_c60": 191.07,
                    "avg_eod_bal_c30": 121.01,
                    "median_eod_balance_c30": 5.42,
                    "median_eod_balance_c60": 4.0,
                    "median_eod_balance_c90": 6.0,
                    "median_eod_balance_c180": 6.0,
                    "cnt_eod_bal_less_than_500_c30": 29,
                    "cnt_eod_bal_less_than_500_c60": 54,
                    "cnt_eod_bal_less_than_500_c90": 73,
                    "cnt_eod_bal_less_than_500_c180": 73,
                    "cnt_eod_bal_less_than_1000_c30": 29,
                    "cnt_eod_bal_less_than_1000_c60": 57,
                    "cnt_eod_bal_less_than_1000_c90": 77,
                    "cnt_eod_bal_less_than_1000_c180": 77,
                    "cnt_credit_transactions_3_months": 4,
                    "cnt_debit_transactions_3_months": 20,
                    "cnt_outward_cheque_bounce_debit_3_months": 0,
                    "days_diff_statement_end_date_and_last_tranc": 7,
                    "annualised_credit": 428284.05,
                    "max_days_balance_lt_100": 30,
                    "cnt_eom_balance_lt_1000": 2,
                    "high_variance_month_count": 2,
                    "cnt_negative_balance_last_6_month": 0,
                    "perc_self_credit_to_total_credit": 0.0,
                    "cnt_matching_salary_txn_note": 0,
                    "avg_amt_credit_transaction": 8213.67,
                    "median_eod_bal_3_month": 4.0,
                    "median_eod_bal_6_month": 6.0,
                    "median_eod_bal_3month_6month": 244.0,
                    "min_monthly_credit_amt_6_months": 0.0,
                    "cnt_chq_deposit_6_months": 0,
                    "min_monthly_credit_amt_wo_bounce_6_months": 0.0,
                    "account_opening_date": null,
                    "dob": null,
                    "email": null,
                    "holder_type": null,
                    "account_status": null,
                    "pan_number": "CUPPA9744J",
                    "max_debit_amt_of_eb_bill_inlast_30days": 0.0,
                    "max_debit_amt_of_eb_bill_inlast_31_60days": 0.0,
                    "max_debit_amt_of_eb_bill_inlast_61_90days": 0.0,
                    "max_debit_amt_of_eb_bill_inlast_91_120days": 0.0,
                    "max_debit_amt_of_eb_bill_inlast_121_150days": 0.0,
                    "max_debit_amt_of_eb_bill_inlast_151_180days": 0.0,
                    "max_debit_amt_of_bb_payment_inlast_30days": 0.0,
                    "max_debit_amt_of_bb_payment_inlast_31_60days": 0.0,
                    "max_debit_amt_of_bb_payment_inlast_61_90days": 0.0,
                    "max_debit_amt_of_bb_payment_inlast_91_120days": 0.0,
                    "max_debit_amt_of_bb_payment_inlast_121_150days": 0.0,
                    "max_debit_amt_of_bb_payment_inlast_151_180days": 0.0,
                    "max_debit_amt_of_big_shop_payment_inlast_30days": 0.0,
                    "max_debit_amt_of_big_shop_payment_inlast_31_60days": 0.0,
                    "max_debit_amt_of_big_shop_payment_inlast_61_90days": 0.0,
                    "max_debit_amt_of_big_shop_payment_inlast_91_120days": 0.0,
                    "max_debit_amt_of_big_shop_payment_inlast_121_150days": 0.0,
                    "max_debit_amt_of_big_shop_payment_inlast_151_180days": 0.0,
                    "max_debit_amt_of_gambling_inlast_30days": 0.0,
                    "max_debit_amt_of_gambling_inlast_31_60days": 0.0,
                    "max_debit_amt_of_gambling_inlast_61_90days": 0.0,
                    "max_debit_amt_of_gambling_inlast_91_120days": 0.0,
                    "max_debit_amt_of_gambling_inlast_121_150days": 0.0,
                    "max_debit_amt_of_gambling_inlast_151_180days": 0.0,
                    "amt_credit_last_91_120_days_lt_10k": 0.0,
                    "amt_credit_last_121_150_days_lt_10k": 0.0,
                    "amt_credit_last_151_180_days_lt_10k": 0.0,
                    "amt_credit_last_30_days_lt_5k": 0.0,
                    "amt_credit_last_31_60_days_lt_5k": 3.0,
                    "amt_credit_last_61_90_days_lt_5k": 5595.0,
                    "amt_credit_last_91_120_days_lt_5k": 0.0,
                    "amt_credit_last_121_150_days_lt_5k": 0.0,
                    "amt_credit_last_151_180_days_lt_5k": 0.0,
                    "avg_top_3_credits_excluding_self_credit_last_6months": 23930.67,
                    "number_of_cash_transaction_more_than_50_perc": false,
                    "negative_eod_balance_for_non_business_account": false,
                    "business_account_with_no_credit_in_15_days": false,
                    "atleast_12_business_credit_6month": false,
                    "avg_transaction_cnt_per_month_for_latest_consecutive_months": 12,
                    "salary_credit_days_difference_last_3months": 2,
                    "salary_credit_difference_last_3months": 0,
                    "recent_company_stability_months": 4,
                    "majority_round_figure_transactions": 0,
                    "obligation_gt25k": 0,
                    "fixed_obligation_to_income_ratio": 0.0,
                    "percentile10_6months_gt100_debit": 198.0,
                    "percentile20_6months_gt100_debit": 206.0,
                    "percentile30_6months_gt100_debit": 380.0,
                    "percentile40_6months_gt100_debit": 754.0,
                    "percentile50_6months_gt100_debit": 2400.0,
                    "percentile60_6months_gt100_debit": 2880.0,
                    "percentile70_6months_gt100_debit": 5000.0,
                    "percentile80_6months_gt100_debit": 7090.0,
                    "percentile90_6months_gt100_debit": 10200.0,
                    "percentile100_6months_gt100_debit": 19944.0,
                    "percentile10_6months_gt100_credit": 389.1,
                    "percentile20_6months_gt100_credit": 1387.2,
                    "percentile30_6months_gt100_credit": 2864.1,
                    "percentile40_6months_gt100_credit": 7436.4,
                    "percentile50_6months_gt100_credit": 10587.0,
                    "percentile60_6months_gt100_credit": 15991.2,
                    "percentile70_6months_gt100_credit": 23642.1,
                    "percentile80_6months_gt100_credit": 24193.0,
                    "percentile90_6months_gt100_credit": 24193.0,
                    "percentile100_6months_gt100_credit": 24193.0,
                    "avg_abb_3fullmonths": 317.82,
                    "avg_abb_6fullmonths": 317.82,
                    "avg_abb_12fullmonths": 317.82,
                    "median_abb_5_10_15_20_25_6months": 6.0,
                    "median_abb_6months": 6.0,
                    "median_median_abb_6months": 6.0,
                    "median_abb_5_10_15_20_25_lastday_6months": 6.0,
                    "median_business_credit_6months": 0.0,
                    "gambling_percentage_to_business_credit": 0.0,
                    "avg_business_credit_6months": 28.0,
                    "abb_vs_busines_credit_6months": 0.21,
                    "inward_bounce_neg_penal_chanrges_1months": 0.0,
                    "inward_bounce_ratio_3months": 0.0,
                    "penal_neg_trxns_charges_3months": 0.0,
                    "mbc_trend_3months": 0,
                    "cnt_emi_bounce_3months": 0,
                    "total_loan_credit_3months": 5511.0,
                    "emi_debit_vs_business_credit": 0,
                    "avg_credit_transaction_count_6months": 4,
                    "emi_bounce_recency": 0,
                    "drop_business_credit_1month": 0,
                    "number_of_month_od_overutilized2days_6month": 0,
                    "total_outward_bounce_6months": 0.0,
                    "debit_cnt_6month_gte5": 1,
                    "debit_cnt_6month_gte10": 0,
                    "min_bal_lt1000_twice_each_6months": false,
                    "min_bal_lt5000_twice_each_6months": false,
                    "avg_of_avg_monthly_bal_12months": 339.66
                },
                "eod_balances": {
                    "Months_order": [
                        "Aug-25",
                        "Sep-25",
                        "Oct-25",
                        "Nov-25"
                    ],
                    "start_date": [
                        "11-Aug-25",
                        "01-Sep-25",
                        "01-Oct-25",
                        "01-Nov-25"
                    ],
                    "Aug-25": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5.0,
                        5.0,
                        5.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        244.0,
                        10.0,
                        10.0,
                        10.0,
                        10.0,
                        3903.0,
                        3903.0
                    ],
                    "Sep-25": [
                        1003.0,
                        1003.0,
                        1003.0,
                        903.0,
                        903.0,
                        703.0,
                        503.0,
                        3.0,
                        3.0,
                        3.0,
                        3.0,
                        3.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        0.0,
                        2843.0,
                        2823.0
                    ],
                    "Oct-25": [
                        26.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        6.0,
                        54.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        4.0,
                        3349.85
                    ],
                    "Nov-25": [
                        49.85,
                        49.85,
                        4.85,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                    ],
                    "starting_balance": 5.0
                },
                "score": 496.0,
                "xlsx_report_url": "https://bank-connect-reports-prod.s3.amazonaws.com/account_report_d35b9df1-871d-43d1-b6c1-67ded2c2e8e5.xlsx?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5FOA3EKY32WPE5ET%2F20251201%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20251201T072844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCmFwLXNvdXRoLTEiRzBFAiEA%2Bt%2BM3XeLKiAt%2BaOdQgCRDFmSnEsf7DjmpLYDENTmgcgCICX2uEGIn04jF0C2XIcRWmEq5mrS8HyDV7fCaV0ZCuAsKsYFCPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA1MDMxOTE4MjU3IgwYkfYNnmzaraKX5toqmgUh4lv7k%2FmukhGQOoYwYPsP4nLD0wcnh%2FYWg4x7gjGUDgKF3drgF%2Bok5gvbNq5JW2qqG1%2FXmx%2F9Qom6b5Tn5CLJaDZwyMgm6qDKnlHbWz99MCmjRJbQQmIbtJJQuCCUUnkjQmTUwTgcX35ewBUm6SE4nd3e%2BLt%2Fn6iL8UTT0w38P7i%2FxJgL2nzdtdI5vxJjFTSxkOc5GgewCSYUu%2FfIjaeA8nY2r13R1BDz9VKk8lBUKK51C5Bp9eZWWnioNXJFh759YhZKLPjYoR%2FKvzRTdoIZu0udEqRnaXfmpB%2ByQZNpvGDOVr%2FkTSl0oKrSkxkVkQiWMCnkRDZCByH1WVFZP3pygHo9ifMXDRJZhD967DICMp6RLglbTshPlkEDMaPAEScrBKxmwaGEwUxv5NTKeF2cxhiFsRmGuuQe2NM2480S7bxi%2B9yKE0s6xbDzuRsFEUnkrLrR%2FXI6SQQNa1mzwjlDwSnNEmx5WxJqV%2FQ%2FX%2FHbwdLY2aJwm4bW7kxltQjKpEOQcD4LFDB5HXCWK9QP1GAi8AL8x0FnwNRVqiz3ERvTOYnMqY3V42i%2BWGiDFDW%2BUMW084tTnaB7R9tZI3xdkFl989guAhowThaIT5WigscInMhm5dSt9A1%2BVJ9aQv6JFWHmOAn10uK5cjhWreiVU2PJfkD1958ic6uUw6gpFRABsqrHd5sBe313rJl1Sey08UsijcBpd3agvNol57%2BRbDTiPUwawgIrZ6VrQ1Xp0xR6fWQXKXBwRGEXxn9d8A1f8SVh66rWFB0T4T%2F7D8KCRq3zzsRL2a0ew5UMlqvm%2FnUE2T0cRgEJM0G00PhsF2eiAWCCWYITcZS9U0ChFRTysTsp51aSsBqlgLiTaAmAwKaVv1h1xLAG4RsL5ckw4vq0yQY6sQHWVfTeZJJr9XzNEeNr3XLujjTsn%2BLRkoPGk1HU6FYckAswG1%2F5Ch8G29diJEpRE23yIHx722ZQtJFM1vsy10TZPe29TWnjrOHduut8zOAstaeNeUFDGNj99dqIAxELFEVc94KsI1sq43wXGQwuvhsSCbaLa%2BJtvZRtvL11VPJsWjsQakgcn5leCzPZrRzaxcZl060DhDgkZIMDdV%2BNngmMJjADELwKEtpgveOQDRbFR5s%3D&X-Amz-Signature=484c914742abfedfc088718fcaa4a3798c452d5a6d07df7eb506d89b883a1590"
            }
        }
    ],
    "aggregate_monthly_analysis": {
        "opening_balance": {
            "Aug-2025": 5.0,
        },
        "closing_balance": {
            "Aug-2025": 3903.0,
        },
        "median_balance": {
            "Aug-2025": 244.0,
        },
        "mode_balance": {
            "Aug-2025": 244.0,
        },
        "avg_bal": {
            "Aug-2025": 513.76,
        },
        "cnt_transactions": {
            "Aug-2025": 26,
        },
        "amt_debit": {
            "Aug-2025": 36016.0,
        },
        "cnt_debit": {
            "Aug-2025": 18,
        },
        "amt_credit": {
            "Aug-2025": 39914.0,
        },
        "cnt_credit": {
            "Aug-2025": 8,
        },
        "max_bal": {
            "Aug-2025": 24203.0,
        },
        "min_bal": {
            "Aug-2025": 5.0,
        },
        "max_eod_balance": {
            "Aug-2025": 3903.0,
        },
        "min_eod_balance": {
            "Aug-2025": 5.0,
        },
        "amt_international_transaction_arbitrage_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_international_transaction_arbitrage_credit": {
            "Aug-2025": 0,
           
        },
        "amt_bank_interest_credit": {
            "Aug-2025": 0.0,
        },
        "cnt_bank_interest_credit": {
            "Aug-2025": 0,
        },
        "amt_refund_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_refund_credit": {
            "Aug-2025": 0,
           
        },
        "amt_cash_deposit_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_cash_deposit_credit": {
            "Aug-2025": 0,
           
        },
        "amt_upi_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_upi_credit": {
            "Aug-2025": 0,
           
        },
        "amt_net_banking_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_net_banking_transfer_credit": {
            "Aug-2025": 0,
           
        },
        "amt_auto_debit_payment_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_auto_debit_payment_bounce_credit": {
            "Aug-2025": 0,
           
        },
        "amt_chq_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_chq_credit": {
            "Aug-2025": 0,
           
        },
        "amt_investment_cashin_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_investment_cashin_credit": {
            "Aug-2025": 0,
           
        },
        "amt_inward_cheque_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_inward_cheque_bounce_credit": {
            "Aug-2025": 0,
           
        },
        "amt_self_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_self_transfer_credit": {
            "Aug-2025": 0,
           
        },
        "amt_international_transaction_arbitrage_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_international_transaction_arbitrage_debit": {
            "Aug-2025": 0,
           
        },
        "amt_bill_payment_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_bill_payment_debit": {
            "Aug-2025": 0,
           
        },
        "amt_cash_withdrawl_debit": {
            "Aug-2025": 15300.0,
        },
        "cnt_cash_withdrawl_debit": {
            "Aug-2025": 3,
        },
        "amt_bank_charge_debit": {
            "Aug-2025": 236.0,
           
        },
        "cnt_bank_charge_debit": {
            "Aug-2025": 1,
           
        },
        "amt_debit_card_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_debit_card_debit": {
            "Aug-2025": 0,
           
        },
        "amt_outward_cheque_bounce_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_outward_cheque_bounce_debit": {
            "Aug-2025": 0,
           
        },
        "amt_chq_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_chq_debit": {
            "Aug-2025": 0,
           
        },
        "amt_upi_debit": {
            "Aug-2025": 20480.0,
        },
        "cnt_upi_debit": {
            "Aug-2025": 14,
        },
        "amt_auto_debit_payment_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_auto_debit_payment_debit": {
            "Aug-2025": 0,
           
        },
        "amt_net_banking_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_net_banking_transfer_debit": {
            "Aug-2025": 0,
           
        },
        "amt_payment_gateway_purchase_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_payment_gateway_purchase_debit": {
            "Aug-2025": 0,
           
        },
        "amt_self_transfer_debit": {
            "Aug-2025": 2980.0,
        },
        "cnt_self_transfer_debit": {
            "Aug-2025": 10,
        },
        "amt_emi_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_emi_debit": {
            "Aug-2025": 0,
           
        },
        "avg_emi": {
            "Aug-2025": 0.0,
           
        },
        "amt_investment": {
            "Aug-2025": 0.0,
           
        },
        "cnt_investment": {
            "Aug-2025": 0,
           
        },
        "amt_outward_cheque_bounce_insuff_funds_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_outward_cheque_bounce_insuff_funds_debit": {
            "Aug-2025": 0,
           
        },
        "amt_ach_bounce_charge": {
            "Aug-2025": 0.0,
           
        },
        "cnt_ach_bounce_charge": {
            "Aug-2025": 0,
           
        },
        "amt_chq_bounce_charge": {
            "Aug-2025": 0.0,
           
        },
        "cnt_chq_bounce_charge": {
            "Aug-2025": 0,
           
        },
        "amt_min_bal_charge": {
            "Aug-2025": 0.0,
           
        },
        "cnt_min_bal_charge": {
            "Aug-2025": 0,
           
        },
        "amt_bounce_charge": {
            "Aug-2025": 0.0,
           
        },
        "cnt_bounce_charge": {
            "Aug-2025": 0,
           
        },
        "cnt_business_credit": {
            "Aug-2025": 3,
           
        },
        "amt_business_credit": {
            "Aug-2025": 84.0,
           
        },
        "amt_income_credit": {
            "Aug-2025": 34403.0,
        },
        "cnt_income_credit": {
            "Aug-2025": 5,
        },
        "cnt_loan_credits": {
            "Aug-2025": 3,
           
        },
        "amt_loan_credits": {
            "Aug-2025": 5511.0,
        },
        "cnt_emi_bounce_credit": {
            "Aug-2025": 0,
        },
        "amt_emi_bounce_credit": {
            "Aug-2025": 0.0,
        },
        "amt_inward_cheque_bounce_insuff_funds_credit": {
            "Aug-2025": 0.0,
        },
        "cnt_inward_cheque_bounce_insuff_funds_credit": {
            "Aug-2025": 0,
        },
        "amt_credit_card_bill_debit": {
            "Aug-2025": 0.0,
        },
        "cnt_credit_card_bill_debit": {
            "Aug-2025": 0,
        },
        "turnover_excluding_loan_and_self_credit": {
            "Aug-2025": 34403.0,
        },
        "turnover_excluding_loan_self_and_fdrd_credit": {
            "Aug-2025": 34403.0,
        },
        "net_cash_inflow": {
            "Aug-2025": 3898.0,
        },
        "avg_credit_transaction_size": {
            "Aug-2025": 4989.25,
        },
        "avg_debit_transaction_size": {
            "Aug-2025": 2000.89,
        },
        "avg_bal_multipleof5": {
            "Aug-2025": 1159.0,
        },
        "eod_balance_lt_500_2_months_gte_10": {
            "Aug-2025": 19.0,
        },
        "total_amount_of_salary": {
            "Aug-2025": 24193.0,
        },
        "number_of_salary_transactions": {
            "Aug-2025": 1.0,
        },
        "perc_salary_spend_bill_payment": {
            "Aug-2025": 0.0,
           
        },
        "perc_salary_spend_cash_withdrawl": {
            "Aug-2025": 63.0,
            
            "Oct-2025": 64.0,
            
        },
        "perc_salary_spend_debit_card": {
            "Aug-2025": 0.0,
           
        },
        "perc_salary_spend_net_banking_transfer": {
            "Aug-2025": 0.0,
           
        },
        "perc_salary_spend_upi": {
            "Aug-2025": 21.0,
        },
        "sum_salary_spent_within_5_days_of_credit": {
            "Aug-2025": 20300.0,
        },
        "perc_salary_amt_debit_within5_days": {
            "Aug-2025": 0.84,
        },
        "cnt_stop_emi_charge": {
            "Aug-2025": 0,
           
        },
        "amt_stop_emi_charge": {
            "Aug-2025": 0.0,
           
        },
        "cnt_days_eod_bal_lt_25000": {
            "Aug-2025": 21,
        },
        "cnt_days_eod_bal_lt_1000": {
            "Aug-2025": 19,
        },
        "perc_inward_bounce": {
            "Aug-2025": 0.0,
           
        },
        "perc_outward_bounce": {
            "Aug-2025": 0.0,
           
        },
        "perc_cash_deposit_to_total_credit": {
            "Aug-2025": 0.0,
           
        },
        "net_credit_count": {
            "Aug-2025": 5.0,
        },
        "net_debit_count": {
            "Aug-2025": 8.0,
        },
        "net_credit_amount": {
            "Aug-2025": 34403.0,
        },
        "net_debit_amount": {
            "Aug-2025": 33036.0,
        },
        "cnt_days_account_overdrawn": {
            "Aug-2025": 0,
           
        },
        "max_overdraft_balance": {
            "Aug-2025": 0.0,
           
        },
        "amt_tax_gst_paid": {
            "Aug-2025": 236.0,
           
        },
        "loan_emi": {
            "Aug-2025": null,
            
        },
        "cnt_ccod_interest": {
            "Aug-2025": 0,
           
        },
        "amt_ccod_interest": {
            "Aug-2025": 0.0,
           
        },
        "employer_name": {
            "Aug-2025": null,
            
        },
        "eod_bal_on_01": {
            "Aug-2025": null,
        },
        "eod_bal_on_02": {
            "Aug-2025": null,
        },
        "eod_bal_on_04": {
            "Aug-2025": null,
        },
        "eod_bal_on_05": {
            "Aug-2025": null,
        },
        "eod_bal_on_06": {
            "Aug-2025": null,
        },
        "eod_bal_on_10": {
            "Aug-2025": null,
        },
        "eod_bal_on_11": {
            "Aug-2025": 5.0,
        },
        "eod_bal_on_15": {
            "Aug-2025": 244.0,
        },
        "eod_bal_on_16": {
            "Aug-2025": 244.0,
        },
        "eod_bal_on_17": {
            "Aug-2025": 244.0,
        },
        "eod_bal_on_20": {
            "Aug-2025": 244.0,
        },
        "eod_bal_on_21": {
            "Aug-2025": 244.0,
        },
        "eod_bal_on_25": {
            "Aug-2025": 244.0,
        },
        "eod_bal_on_30": {
            "Aug-2025": 3903.0,
        },
        "avg_bal_top_15_days": {
            "Aug-2025": 716.27,
        },
        "cnt_emi_bounce_non_tech_reason_credit": {
            "Aug-2025": 0,
           
        },
        "cnt_emi_bounce_tech_reason_credit": {
            "Aug-2025": 0,
           
        },
        "highest_salary_date": {
            "Aug-2025": "2025-08-30",
        },
        "cnt_inward_cheque_bounce_non_tech_reason_credit": {
            "Aug-2025": 0,
           
        },
        "start_date": {
            "Aug-2025": "11-Aug-2025",
        },
        "end_date": {
            "Aug-2025": "31-Aug-2025",
        },
        "amt_other_expenses": {
            "Aug-2025": 0.0,
           
        },
        "amt_other_credits": {
            "Aug-2025": 0.0,
           
        },
        "amt_salary_paid": {
            "Aug-2025": 0.0,
           
        },
        "amt_perc_cash_deposit_to_total_credit": {
            "Aug-2025": 0.0,
           
        },
        "amt_perc_cash_withdrawal_to_total_debits": {
            "Aug-2025": 42.0,
            
            "Oct-2025": 44.0,
            
        },
        "amt_perc_non_technical_inward_bounce_to_total_debits": {
            "Aug-2025": 0.0,
           
        },
        "amt_perc_technical_inward_bounce_to_total_debits": {
            "Aug-2025": 0.0,
           
        },
        "amt_perc_outward_bounce_to_total_credits": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_overdraft_utilization": {
            "Aug-2025": 0.0,
           
        },
        "amt_investment_income_credits": {
            "Aug-2025": 0.0,
           
        },
        "amt_interest_charged": {
            "Aug-2025": 0.0,
           
        },
        "amt_pension_credit": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_overdraft_utilization_perc": {
            "Aug-2025": 0.0,
           
        },
        "amt_credit_excluding_reversal": {
            "Aug-2025": 39914.0,
        },
        "cnt_credit_excluding_reversal": {
            "Aug-2025": 8,
        },
        "cnt_debit_excluding_reversal": {
            "Aug-2025": 18,
        },
        "amt_debit_excluding_reversal": {
            "Aug-2025": 36016.0,
        },
        "perc_outward_bounce_transactions_to_total_debits": {
            "Aug-2025": 0.0,
           
        },
        "perc_non_tech_inward_bounce_transactions_to_total_debits": {
            "Aug-2025": 0.0,
           
        },
        "perc_tech_inward_bounce_transactions_to_total_debits": {
            "Aug-2025": 0.0,
           
        },
        "perc_total_amt_cash_deposit_to_total_credit": {
            "Aug-2025": 0.0,
           
        },
        "perc_total_amt_cash_withdrawal_to_total_debit": {
            "Aug-2025": 42.48,
        },
        "sum_of_eod_bal_on_1_10_15_25": {
            "Aug-2025": 488.0,
        },
        "avg_of_eod_bal_on_1_10_15_25": {
            "Aug-2025": 244.0,
        },
        "sum_of_eod_bal_on_1_6_11_16_21": {
            "Aug-2025": 493.0,
        },
        "avg_of_eod_bal_on_1_6_11_16_21": {
            "Aug-2025": 164.33,
        },
        "perc_non_tech_inward_bounce_transactions_to_debits_excluding_reversal": {
            "Aug-2025": 0.0,
           
        },
        "perc_outward_bounce_transactions_to_debits_excluding_reversal": {
            "Aug-2025": 0.0,
           
        },
        "sum_of_cnt_credit_debit_excluding_reversal_and_cnt_iw_bounce_non_tech_ow_bounce": {
            "Aug-2025": 26,
        },
        "no_of_instances_account_overdrawn": {
            "Aug-2025": 0.0,
           
        },
        "max_days_account_in_overdrawn_state": {
            "Aug-2025": 0.0,
           
        },
        "avg_no_of_days_account_overdrawn": {
            "Aug-2025": 0.0,
           
        },
        "max_overdrawn_amount": {
            "Aug-2025": 0.0,
           
        },
        "total_overdrawn_amount": {
            "Aug-2025": 0.0,
           
        },
        "cnt_cheque_deposit_having_chq_num": {
            "Aug-2025": 0,
           
        },
        "cnt_cheque_issue_having_chq_num": {
            "Aug-2025": 3,
        },
        "drawing_power_limit": {
            "Aug-2025": 0.0,
           
        },
        "sanction_limit": {
            "Aug-2025": 0.0,
           
        },
        "no_of_days_to_serve_cc_interest": {
            "Aug-2025": "0",
        },
        "amt_cheque_deposit_having_chq_num": {
            "Aug-2025": 0.0,
           
        },
        "amt_cheque_issue_having_chq_num": {
            "Aug-2025": 15300.0,
            
            "Oct-2025": 15000.0,
            
        },
        "number_of_days_account_overdrawn": {
            "Aug-2025": 0.0,
           
        },
        "number_of_days_cc_limit_breached": {
            "Aug-2025": 0.0,
           
        },
        "number_of_days_cc_limit_breached_and_chq_bounced": {
            "Aug-2025": 0.0,
           
        },
        "sum_of_eod_bal_on_1_5_15_25": {
            "Aug-2025": 488.0,
        },
        "avg_of_eod_bal_on_1_5_15_25": {
            "Aug-2025": 244.0,
        },
        "min_amt_credit": {
            "Aug-2025": 8.0,
        },
        "max_amt_credit": {
            "Aug-2025": 24193.0,
        },
        "transaction_start_date": {
            "Aug-2025": "11-Aug-25",
        },
        "transaction_end_date": {
            "Aug-2025": "30-Aug-25",
        },
        "balance_net_off_on_1st": {
            "Aug-2025": null,
        },
        "balance_net_off_on_5th": {
            "Aug-2025": null,
        },
        "balance_net_off_on_10th": {
            "Aug-2025": null,
        },
        "balance_net_off_on_15th": {
            "Aug-2025": -1365.0,
        },
        "balance_net_off_on_20th": {
            "Aug-2025": -4767.0,
        },
        "balance_net_off_on_25th": {
            "Aug-2025": -4767.0,
        },
        "balance_net_off_on_30th": {
            "Aug-2025": -1608.0,
        },
        "max_debit": {
            "Aug-2025": 10000.0,
        },
        "min_debit": {
            "Aug-2025": 10.0,
        },
        "max_amt_cash_deposit_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_cash_deposit_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_cash_deposit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_net_banking_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_net_banking_transfer_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_net_banking_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_upi_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_upi_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_upi_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amount_of_salary": {
            "Aug-2025": 24193.0,
        },
        "min_amount_of_salary": {
            "Aug-2025": 24193.0,
        },
        "avg_amount_of_salary": {
            "Aug-2025": 24193.0,
        },
        "max_amt_chq_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_chq_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_chq_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_international_transaction_arbitrage_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_international_transaction_arbitrage_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_international_transaction_arbitrage_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_investment_cashin_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_investment_cashin_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_investment_cashin_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_refund_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_refund_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_refund_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_bank_interest_credit": {
            "Aug-2025": 0.0,
            
            "Oct-2025": 3.0,
            
        },
        "min_amt_bank_interest_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_bank_interest_credit": {
            "Aug-2025": 0.0,
            
            "Oct-2025": 3.0,
            
        },
        "max_amt_debit_card_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_debit_card_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_debit_card_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_cash_withdrawl_debit": {
            "Aug-2025": 10000.0,
        },
        "min_amt_cash_withdrawl_debit": {
            "Aug-2025": 300.0,
        },
        "avg_amt_cash_withdrawl_debit": {
            "Aug-2025": 5100.0,
        },
        "max_amt_auto_debit_payment_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_auto_debit_payment_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_auto_debit_payment_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_bill_payment_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_bill_payment_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_bill_payment_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_bank_charge_debit": {
            "Aug-2025": 236.0,
           
        },
        "min_amt_bank_charge_debit": {
            "Aug-2025": 236.0,
            
        },
        "avg_amt_bank_charge_debit": {
            "Aug-2025": 236.0,
           
        },
        "max_amt_chq_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_chq_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_chq_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_auto_debit_payment_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_auto_debit_payment_bounce_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_auto_debit_payment_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_upi_debit": {
            "Aug-2025": 10000.0,
        },
        "min_amt_upi_debit": {
            "Aug-2025": 10.0,
        },
        "avg_amt_upi_debit": {
            "Aug-2025": 1462.86,
        },
        "max_amt_net_banking_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_net_banking_transfer_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_net_banking_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_international_transaction_arbitrage_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_international_transaction_arbitrage_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_international_transaction_arbitrage_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_outward_cheque_bounce_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_outward_cheque_bounce_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_outward_cheque_bounce_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_inward_cheque_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_inward_cheque_bounce_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_inward_cheque_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_outward_cheque_bounce_insuff_funds_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_outward_cheque_bounce_insuff_funds_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_outward_cheque_bounce_insuff_funds_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_inward_cheque_bounce_insuff_funds_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_inward_cheque_bounce_insuff_funds_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_inward_cheque_bounce_insuff_funds_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_payment_gateway_purchase_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_payment_gateway_purchase_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_payment_gateway_purchase_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_emi_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_emi_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_emi_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_emi_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_emi_bounce_credit": {
            "Aug-2025": null,
            
        },
        "avg_amt_emi_bounce_credit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_credit_card_bill_debit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_credit_card_bill_debit": {
            "Aug-2025": null,
            
        },
        "avg_amt_credit_card_bill_debit": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_investment": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_investment": {
            "Aug-2025": null,
            
        },
        "avg_amt_investment": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_loan_credits": {
            "Aug-2025": 3402.0,
           
        },
        "min_amt_loan_credits": {
            "Aug-2025": 500.0,
            
        },
        "avg_amt_loan_credits": {
            "Aug-2025": 1837.0,
           
        },
        "max_negative_balance_amt": {
            "Aug-2025": 0.0,
           
        },
        "min_negative_balance_amt": {
            "Aug-2025": 0.0,
           
        },
        "avg_of_negative_balance_amt": {
            "Aug-2025": 0.0,
           
        },
        "amt_food_related_debits": {
            "Aug-2025": 0.0,
        },
        "cnt_food_related_debits": {
            "Aug-2025": 0,
        },
        "max_amt_food_related_debits": {
            "Aug-2025": 0.0,
        },
        "min_amt_food_related_debits": {
            "Aug-2025": null,
        },
        "avg_amt_food_related_debits": {
            "Aug-2025": 0.0,
            
            "Oct-2025": 0.0,
            "Nov-2025": 15.0
        },
        "amt_travel_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "cnt_travel_related_debits": {
            "Aug-2025": 0,
           
        },
        "max_amt_travel_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_travel_related_debits": {
            "Aug-2025": null,
            
        },
        "avg_amt_travel_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "amt_fuel_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "cnt_fuel_related_debits": {
            "Aug-2025": 0,
           
        },
        "min_amt_fuel_related_debits": {
            "Aug-2025": null,
            
        },
        "avg_amt_fuel_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "amt_shopping_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "cnt_shopping_related_debits": {
            "Aug-2025": 0,
           
        },
        "max_amt_shopping_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_shopping_related_debits": {
            "Aug-2025": null,
            
        },
        "avg_amt_shopping_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "amt_upi_and_net_banking_debits": {
            "Aug-2025": 20480.0,
        },
        "cnt_upi_and_net_banking_debits": {
            "Aug-2025": 14,
        },
        "max_amt_upi_and_net_banking_debits": {
            "Aug-2025": 10000.0,
        },
        "min_amt_upi_and_net_banking_debits": {
            "Aug-2025": 10.0,
        },
        "avg_amt_upi_and_net_banking_debits": {
            "Aug-2025": 1462.86,
        },
        "amt_discretionary_spends": {
            "Aug-2025": 0.0,
           
        },
        "cnt_discretionary_spends": {
            "Aug-2025": 0,
           
        },
        "max_amt_discretionary_spends": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_discretionary_spends": {
            "Aug-2025": null,
            
        },
        "avg_amt_discretionary_spends": {
            "Aug-2025": 0.0,
           
        },
        "total_of_negative_balances_amt": {
            "Aug-2025": 0.0,
           
        },
        "cnt_negative_balance": {
            "Aug-2025": 0,
           
        },
        "bounce_penal": {
            "Aug-2025": 0.0,
           
        },
        "cnt_bounce_penal": {
            "Aug-2025": 0,
           
        },
        "max_bounce_penal": {
            "Aug-2025": 0.0,
           
        },
        "min_bounce_penal": {
            "Aug-2025": null,
            
        },
        "avg_bounce_penal": {
            "Aug-2025": 0.0,
           
        },
        "abb_isto_emi": {
            "Aug-2025": 0.0,
           
        },
        "cnt_tax_gst_paid": {
            "Aug-2025": 1,
           
        },
        "max_amt_tax_gst_paid": {
            "Aug-2025": 236.0,
           
        },
        "min_amt_tax_gst_paid": {
            "Aug-2025": 236.0,
            
        },
        "avg_amt_tax_gst_paid": {
            "Aug-2025": 236.0,
           
        },
        "amt_bill_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "cnt_bill_related_debits": {
            "Aug-2025": 0,
           
        },
        "max_amt_bill_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_bill_related_debits": {
            "Aug-2025": null,
            
        },
        "avg_amt_bill_related_debits": {
            "Aug-2025": 0.0,
           
        },
        "max_amt_self_transfer_debit": {
            "Aug-2025": 1370.0,
        },
        "min_amt_self_transfer_debit": {
            "Aug-2025": 10.0,
        },
        "avg_amt_self_transfer_debit": {
            "Aug-2025": 298.0,
        },
        "max_amt_min_bal_charge": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_min_bal_charge": {
            "Aug-2025": null,
            
        },
        "avg_amt_min_bal_charge": {
            "Aug-2025": 0.0,
           
        },
        "sum_of_eod_balance": {
            "Aug-2025": 10789.0,
        },
        "cnt_of_eod_balance": {
            "Aug-2025": 21,
        },
        "amt_dividend_credit": {
            "Aug-2025": 0.0,
           
        },
        "amt_spent_on_entertainment": {
            "Aug-2025": 0.0,
           
        },
        "amt_spent_on_medical": {
            "Aug-2025": 0.0,
           
        },
        "amt_spent_on_groceries": {
            "Aug-2025": 0.0,
            
            "Oct-2025": 2660.15,
            
        },
        "amt_investment_credit": {
            "Aug-2025": 0.0,
           
        },
        "amt_rent_credit": {
            "Aug-2025": 0.0,
        },
        "amt_netting_credits": {
            "Aug-2025": 34403.0,
        },
        "cnt_netting_credits": {
            "Aug-2025": 5,
        },
        "amt_netting_debits": {
            "Aug-2025": 36016.0,
        },
        "cnt_netting_debits": {
            "Aug-2025": 18,
        },
        "amt_reversal_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_reversal_credit": {
            "Aug-2025": 0,
           
        },
        "max_amt_reversal_credit": {
            "Aug-2025": 0.0,
           
        },
        "min_amt_reversal_credit": {
            "Aug-2025": null,
        },
        "no_of_days_eod_lt_5k": {
            "Aug-2025": 21.0,
        },
        "no_of_days_eod_lt_20k": {
            "Aug-2025": 21.0,
        },
        "no_of_days_eod_lt_1lk": {
            "Aug-2025": 21.0,
        },
        "cnt_inward_bounces_non_tech_credit_v5": {
            "Aug-2025": 0,
           
        },
        "amt_inward_bounces_non_tech_credit_v5": {
            "Aug-2025": 0.0,
           
        },
        "cnt_inward_bounces_non_tech_credit": {
            "Aug-2025": 0,
           
        },
        "amt_inward_bounces_non_tech_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_inward_bounces_tech_credit": {
            "Aug-2025": 0,
           
        },
        "amt_inward_bounces_tech_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_gambling_credit": {
            "Aug-2025": 0,
           
        },
        "amt_gambling_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_emi_bounce_credit_current_month": {
            "Aug-2025": 0,
           
        },
        "amt_business_credit_current_month": {
            "Aug-2025": 0.0,
           
        },
        "cnt_business_credit_current_month": {
            "Aug-2025": 0,
           
        },
        "is_current_month": {
            "Aug-2025": 0.0,
        },
        "is_complete_month": {
            "Aug-2025": 0.0,
        },
        "is_salary_imps": {
            "Aug-2025": 0.0,
           
        },
        "cnt_group_transfer_credit": {
            "Aug-2025": 0,
           
        },
        "amt_group_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_group_transfer_debit": {
            "Aug-2025": 0,
           
        },
        "amt_group_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_chq_deposit": {
            "Aug-2025": 0,
           
        },
        "amt_chq_deposit": {
            "Aug-2025": 0.0,
           
        },
        "cnt_cross_account_transfer_credit": {
            "Aug-2025": 0,
           
        },
        "cnt_cross_account_transfer_debit": {
            "Aug-2025": 0,
           
        },
        "amt_cross_account_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "amt_cross_account_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_group_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_cross_account_transfer_credit": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_group_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_cross_account_transfer_debit": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_inward_bounces": {
            "Aug-2025": 0.0,
           
        },
        "avg_amt_business_credit": {
            "Aug-2025": 28.0,
        },
        "amt_business_debit": {
            "Aug-2025": 32000.0,
        },
        "avg_amt_business_debit": {
            "Aug-2025": 6400.0,
        },
        "amt_inward_bounces": {
            "Aug-2025": 0.0,
        },
        "cnt_inward_bounces": {
            "Aug-2025": 0,
        },
        "amt_credit_wo_self_transfer": {
            "Aug-2025": 39914.0,
        },
        "amt_debit_wo_self_transfer": {
            "Aug-2025": 33036.0,
        },
        "amt_credit_wo_business_credit": {
            "Aug-2025": 39830.0,
        },
        "amt_credits_wo_reversal": {
            "Aug-2025": 39914.0,
            
        },
        "cnt_credits_wo_reversal": {
            "Aug-2025": 8,
        },
        "amt_debits_wo_reversal": {
            "Aug-2025": 36016.0,
        },
        "cnt_debits_wo_reversal": {
            "Aug-2025": 18,
        },
        "cnt_days_negative_od_eod_balance": {
            "Aug-2025": 0,
           
        }
    },
    "aggregate_xlsx_report_url": "https://bank-connect-reports-prod.s3.amazonaws.com/entity_report_136b1aa3-4610-4d0a-89f3-03078a2fce92.xlsx?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5FOA3EKY32WPE5ET%2F20251201%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20251201T072844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCmFwLXNvdXRoLTEiRzBFAiEA%2Bt%2BM3XeLKiAt%2BaOdQgCRDFmSnEsf7DjmpLYDENTmgcgCICX2uEGIn04jF0C2XIcRWmEq5mrS8HyDV7fCaV0ZCuAsKsYFCPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA1MDMxOTE4MjU3IgwYkfYNnmzaraKX5toqmgUh4lv7k%2FmukhGQOoYwYPsP4nLD0wcnh%2FYWg4x7gjGUDgKF3drgF%2Bok5gvbNq5JW2qqG1%2FXmx%2F9Qom6b5Tn5CLJaDZwyMgm6qDKnlHbWz99MCmjRJbQQmIbtJJQuCCUUnkjQmTUwTgcX35ewBUm6SE4nd3e%2BLt%2Fn6iL8UTT0w38P7i%2FxJgL2nzdtdI5vxJjFTSxkOc5GgewCSYUu%2FfIjaeA8nY2r13R1BDz9VKk8lBUKK51C5Bp9eZWWnioNXJFh759YhZKLPjYoR%2FKvzRTdoIZu0udEqRnaXfmpB%2ByQZNpvGDOVr%2FkTSl0oKrSkxkVkQiWMCnkRDZCByH1WVFZP3pygHo9ifMXDRJZhD967DICMp6RLglbTshPlkEDMaPAEScrBKxmwaGEwUxv5NTKeF2cxhiFsRmGuuQe2NM2480S7bxi%2B9yKE0s6xbDzuRsFEUnkrLrR%2FXI6SQQNa1mzwjlDwSnNEmx5WxJqV%2FQ%2FX%2FHbwdLY2aJwm4bW7kxltQjKpEOQcD4LFDB5HXCWK9QP1GAi8AL8x0FnwNRVqiz3ERvTOYnMqY3V42i%2BWGiDFDW%2BUMW084tTnaB7R9tZI3xdkFl989guAhowThaIT5WigscInMhm5dSt9A1%2BVJ9aQv6JFWHmOAn10uK5cjhWreiVU2PJfkD1958ic6uUw6gpFRABsqrHd5sBe313rJl1Sey08UsijcBpd3agvNol57%2BRbDTiPUwawgIrZ6VrQ1Xp0xR6fWQXKXBwRGEXxn9d8A1f8SVh66rWFB0T4T%2F7D8KCRq3zzsRL2a0ew5UMlqvm%2FnUE2T0cRgEJM0G00PhsF2eiAWCCWYITcZS9U0ChFRTysTsp51aSsBqlgLiTaAmAwKaVv1h1xLAG4RsL5ckw4vq0yQY6sQHWVfTeZJJr9XzNEeNr3XLujjTsn%2BLRkoPGk1HU6FYckAswG1%2F5Ch8G29diJEpRE23yIHx722ZQtJFM1vsy10TZPe29TWnjrOHduut8zOAstaeNeUFDGNj99dqIAxELFEVc94KsI1sq43wXGQwuvhsSCbaLa%2BJtvZRtvL11VPJsWjsQakgcn5leCzPZrRzaxcZl060DhDgkZIMDdV%2BNngmMJjADELwKEtpgveOQDRbFR5s%3D&X-Amz-Signature=cc661d079788d6348e0d4f5371dd0e26a4e6dc21638bda98240834e4dac19b0d",
    "aggregate_xml_report_url": "https://bank-connect-reports-prod.s3.amazonaws.com/xml_report/entity_report_136b1aa3-4610-4d0a-89f3-03078a2fce92.xml?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5FOA3EKY32WPE5ET%2F20251201%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20251201T072844Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCmFwLXNvdXRoLTEiRzBFAiEA%2Bt%2BM3XeLKiAt%2BaOdQgCRDFmSnEsf7DjmpLYDENTmgcgCICX2uEGIn04jF0C2XIcRWmEq5mrS8HyDV7fCaV0ZCuAsKsYFCPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTA1MDMxOTE4MjU3IgwYkfYNnmzaraKX5toqmgUh4lv7k%2FmukhGQOoYwYPsP4nLD0wcnh%2FYWg4x7gjGUDgKF3drgF%2Bok5gvbNq5JW2qqG1%2FXmx%2F9Qom6b5Tn5CLJaDZwyMgm6qDKnlHbWz99MCmjRJbQQmIbtJJQuCCUUnkjQmTUwTgcX35ewBUm6SE4nd3e%2BLt%2Fn6iL8UTT0w38P7i%2FxJgL2nzdtdI5vxJjFTSxkOc5GgewCSYUu%2FfIjaeA8nY2r13R1BDz9VKk8lBUKK51C5Bp9eZWWnioNXJFh759YhZKLPjYoR%2FKvzRTdoIZu0udEqRnaXfmpB%2ByQZNpvGDOVr%2FkTSl0oKrSkxkVkQiWMCnkRDZCByH1WVFZP3pygHo9ifMXDRJZhD967DICMp6RLglbTshPlkEDMaPAEScrBKxmwaGEwUxv5NTKeF2cxhiFsRmGuuQe2NM2480S7bxi%2B9yKE0s6xbDzuRsFEUnkrLrR%2FXI6SQQNa1mzwjlDwSnNEmx5WxJqV%2FQ%2FX%2FHbwdLY2aJwm4bW7kxltQjKpEOQcD4LFDB5HXCWK9QP1GAi8AL8x0FnwNRVqiz3ERvTOYnMqY3V42i%2BWGiDFDW%2BUMW084tTnaB7R9tZI3xdkFl989guAhowThaIT5WigscInMhm5dSt9A1%2BVJ9aQv6JFWHmOAn10uK5cjhWreiVU2PJfkD1958ic6uUw6gpFRABsqrHd5sBe313rJl1Sey08UsijcBpd3agvNol57%2BRbDTiPUwawgIrZ6VrQ1Xp0xR6fWQXKXBwRGEXxn9d8A1f8SVh66rWFB0T4T%2F7D8KCRq3zzsRL2a0ew5UMlqvm%2FnUE2T0cRgEJM0G00PhsF2eiAWCCWYITcZS9U0ChFRTysTsp51aSsBqlgLiTaAmAwKaVv1h1xLAG4RsL5ckw4vq0yQY6sQHWVfTeZJJr9XzNEeNr3XLujjTsn%2BLRkoPGk1HU6FYckAswG1%2F5Ch8G29diJEpRE23yIHx722ZQtJFM1vsy10TZPe29TWnjrOHduut8zOAstaeNeUFDGNj99dqIAxELFEVc94KsI1sq43wXGQwuvhsSCbaLa%2BJtvZRtvL11VPJsWjsQakgcn5leCzPZrRzaxcZl060DhDgkZIMDdV%2BNngmMJjADELwKEtpgveOQDRbFR5s%3D&X-Amz-Signature=b36d62e49e978b66548c036a066432d63e9f0074e861eb02b9e5839c70e8ed3a"
}
```

**Error Response:**

```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "The provided session ID is invalid"
  }
}
```

### List of API Error Codes**

**The following table lists API error codes applicable to this API:**

|Code|Message|HTTP status code|
|------------------------------| ----------------------------------| ---------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|PROCESSING_NOT_REQUESTED|Cannot proceed as the processing has not been requested yet|400|
|SESSION_DELETED|The provided session ID has been deleted|410|
|PROCESSING_NOT_COMPLETED|The processing for this session is currently in progress|400|
|ACCESS_DENIED|Authentication credentials were not provided|403|
  

