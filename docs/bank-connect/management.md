---
base_url: https://portal.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


# BankConnect: Management

BankConnect REST APIs also provide additional APIs for management purposes. This article lists them.

## Authentication

FinBox BankConnect REST API uses API keys to authenticate requests. All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

To make a successful request, required **headers mentioned with each API** must be present in the request.

In case wrong/incomplete/no keys were passed in headers, response will have **401** HTTP Code and payload as follows:
```json
{
    "detail": "Authentication credentials were not provided."
}
```

## Net Banking Health
This API can be used to check Health status for banks in Net Banking mode.

::: tip Endpoint
GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/net_banking_health/**
:::

### Authentication
Request header `x-api-key` with API Key as value must be present in request.

### Response
On successful fetching, the API gives a **200 HTTP code** with following response:
```json
[
    {
        "bank": "AXIS",
        "updated_at": "2020-06-02 13:28:59",
        "health_up": true,
        "issue_details": null
    },
    {
        "bank": "HDFC",
        "updated_at": "2020-06-02 13:28:59",
        "health_up": false,
        "issue_details": "Some cases are failing, when users are entering wrong captcha"
    },
    ...
]
```

| Key | Type | Description |
| - | - | - | - | - |
| bank | string  | indicates the bank identifier in upper case, refer [here](/bank-connect/appendix.html#bank-identifiers) for complete list |
| updated_at | string | last check date time (in UTC) for bank in `YYYY-MM-DD HH:MM:SS` format |
| health_up | boolean | indicates whether the bank status is up, `true` indicates bank status is up |
| issue_details | string | present if `health_up` is `false`, otherwise `null` |

## Get PDFs
This API can be used to fetch statement PDF files for a given entity.

::: tip Endpoint
GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/entity/`<entity_id>`/get_pdfs/**
:::

### Authentication
Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

### Response
On fetching information successfully, the response would be of the following format with **200 HTTP code**:

```json
{
    "statements": [
        {
            "statement_id": "statement_uuid4_here",
            "bank_name": "axis",
            "pdf_password": null,
            "pdf_url": "https://long_url_here",
            "account_id": "account_uuid4_here"
        }
    ]
}
```

Here, `statements` key will contain a list of statements for the given entity. Each of this list item is an object with following keys:

- `statement_id`: a unique identifier for this statement
- `bank_name`: a valid bank identifier
- `pdf_password`: Password for the PDF file. Will be `null` if no password.
- `pdf_url`: Contains a URL for the PDF file.
- `account_id`: a unique identifier for a customer bank account

:::danger IMPORTANT
- Statement files on our system get automatically deleted after 30 days of upload date has passed. Post this, the "pdf_url" key will be a blank string. `""`.
- `pdf_url` if present is valid for 1 hour since the time of link generation
- In case the `entity_id` doesn't exists the API will return a **404 HTTP Code**.
:::

## List Entities
Lists all entities (paginated) created under your account.

::: tip Endpoint
GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/entity/**
:::

### Authentication
Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

### Parameters
| Name | Type | Description | Required  | Default |
| - | - | - | - | - |
| page | integer  | page number | No | 1 |
| link_id | string | to filter based on link_id | No | - |

### Response
On successful fetching, the API gives a **200 HTTP code** with following response:
```json
{
    "count": 123,
    "next": "some_url",
    "previous": null,
    "results": [
        {
            "entity_id": "some_uuid4_1",
            "link_id": null,
            "meta_data": null
        },
        {
            "entity_id": "some_uuid4_2",
            "link_id": null,
            "meta_data": null
        }
    ]
}
```
`count` here indicates the total number of entities, `next` and `previous` have URLs for next and previous pages respectively. If no page exists, they store `null` as value.

::: warning NOTE
- There are **10 records** per page at max
- This API can also be used to fetch Entity ID for a given Link ID
:::

## Getting Link ID from Entity ID
If required you can fetch `link_id` from an `entity_id` using the API below:

::: tip Endpoint
GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/entity/`<entity_id>`/**
:::

### Authentication
Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

### Response
On successful fetching, the API gives a **200 HTTP code** with following response:
```json
{
    "entity_id": "uuid4_you_sent",
    "link_id": "the_link_id",
    "meta_data": "meta_data_value"
}
```
In case no `link_id` exists for the given entity, the value of `link_id` comes as `null` in response.

::: danger Not Found
In case no entity with the provided `entity_id` exists, the API will return a response with **404 (Not Found) error code**.
:::