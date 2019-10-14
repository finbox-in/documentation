# Basics
One must be familiar with following terms to use the Bank Connect library:

## Entity
An entity represents your customer. It could be an individual or a company applying financial product in your system.
The `entity_id` is the identifier for the entity in the FinBox system, the `link_id` is an optional field that you can use to map your id to the Entity in the FinBox system.

::: warning NOTE
There can be multiple entities associated with same `link_id`.
:::

## Statement
A statement corresponds to a single file uploaded for an entity. There can be multiple statements corresponding to the same or different bank accounts belonging to the same entity (customer). Each statement object has a unique `statement_id` and it also has a `entity_id` mapping with it.

## Account
An account represents a bank account. One entity can have multiple accounts, as one company / individual can have multiple bank accounts. Each account information stores the information pertaining to the bank like account number, bank name, also the month and year for which data is available and a unique `account_id` that can be used to segregate things like transactions, if required.

::: warning NOTE
If multiple statements are uploaded against an entity, Bank Connect will automatically pick and store unique bank accounts information.
:::

## Identity
Identity refers to identity information (name, address, etc.) for the given entity.
::: warning NOTE
While using client libraries, you get the latest identity information for the given entity, however while using the REST APIs you have identity in form of an array of objects, each object corresponding to identity information of unique bank account for the entity.
:::

## Transactions
Transactions is an array that encapsulates transactions (objects) across multiple accounts of the entity. Transactions are extracted from uploaded statements and associated with accounts. In most cases, FinBox enriches each transaction to provide clean merchants, transaction types etc. Transactions can be segregated based on account by the `account_id` field.

## Fraud

There are some frauds which are detected at the first level when the statement file is successfully uploaded, while there are some which are detected at a later stage when transactions are extracted and analysed successfully.

There is usually a field `fraud_type` that indicates the fraud type. The list of possible `fraud_type` values can be acquired on request from the FinBox team.

A general rule of thumb would be that the fraud_type is usually in a string format with all lower case and words separated by underscore (\_). So a fraud type term can be formed by simple string manipulation of replacing underscore with spaces and capitalising each word then. Example: `some_fraud_type` can become `Some Fraud Type`.

In case of transaction level fraud, `transaction_hash` (unique identifier for a transaction) is usually present along with `fraud_type` to know the transaction that has fraud.

Also since fraud is identified for a statement, so `statement_id` is also present in most of the cases to know the fraud came for which statement.