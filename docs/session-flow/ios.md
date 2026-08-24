# BankConnect: IOS

BankConnect IOS SDK helps user submits their bank statements via upload or net banking credentials in your Android application.

## Requirements

Bank Connect IOS SDK works on IOS 16.1 and Xcode 14.1.

## Adding Dependency

Add the SDK to the application using Swift Package Manager (Preferred) or Cocopods.

<CodeSwitcher :languages="{spm:'Swift Package Manager',cocopods:'CocoaPods'}">
<template v-slot:spm>

1. In Xcode, select File > Add Packages...

2. Enter the [Bank Connect URL](https://github.com/finbox-in/bank-connect-ios-sdk) for this repository

</template>
<template v-slot:cocopods>

1. Edit the `pod` file and add `pod 'BankConnect`

</template>
</CodeSwitcher>

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `CLIENT_API_KEY`
:::

## Integration Workflow

The diagram below illustrates the integration workflow in a nutshell:
<img src="/client_sdk.jpg" alt="Client SDK Workflow" />

## Sample Project

We have hosted a sample project on GitHub, you can check it out here:
<div class="button_holder">
<a class="download_button" target="_blank" href="https://github.com/finbox-in/bank-connect-sample-ios">Open GitHub Repository</a>
</div>

## Build Bank Connect

Build the `FinBoxBankConnect` object by passing `apiKey`, `linkId`, `fromDate`, `toDate`, `bank`, `mode` and others.

```swift
let _ = FinBoxBankConnect.Builder()
    .apiKey("CLIENT_API_KEY")
    .linkId("LINK_ID")
    .fromDate("01/01/2021")                     // Optional: Default 6 months old date
    .toDate("01/04/2021")                       // Optional: Default value 1 day less than current date
    .bank("sbi")                                // Optional: Short code of the bank
    .mode(PDF)                                  // Optional: PDF Mode
    .mobileNumber("9876543210")                 // Optional: Mobile number
    .journeyMode(MULTI_PDF)                     // Optional: Multi PDF journey
    .aaJourneyMode(ONLY_RECURRING)              // Optional: Recurring AA pulls
    .aaRecurringTenureMonthCount(3)             // Optional: Consent duration is valid for 3 months
    .aaRecurringFrequencyUnit(TimeUnit.DAYS)    // Optional: Frequency value is in Days
    .aaRecurringFrequencyValue(2)               // Optional: Number of times to pull the data
    .build();
```

| Builder Property | Description | Required |
| - | - | - |
| `apiKey` | specifies the `api_key` | Yes |
| `linkId` | specifies the `link_id` | Yes |
| `fromDate` | specifies the starting period of the statement in `DD/MM/YYYY`format | No |
| `toDate` | specifies the end period of the statement in `DD/MM/YYYY` format | No |
| `bank` | pass the [bank identifier](/bank-connect/appendix.html#bank-identifiers) to skip the bank selection screen and directly open a that bank's screen instead | No |
| `mode` | set the mode as pdf (manual upload) or aa (Account Aggregator) or online (Net Banking) | No |
| `mobile_number` | Prefills phone number in Account Aggregator mode | No |
| `journey_mode` | Optional parameter to set the journey (i.e.multi_pdf or multi_banking) | No |
| `aa_journey_mode` | set the journey mode for AA (i.e only_once or only_recurring) | No |
| `aa_recurring_tenure_month_count` | set the recurring consent duration (min: 1 and max: 24) | No |
| `aa_recurring_frequency_unit` | set the frequency unit to pull the data during the recurring consent duration (year, month, day, hour) | No |
| `aa_recurring_frequency_value` | set the frequency value to pull the data during the recurring consent duration (min: 1 and max: 3) | No |

`fromDate` and `toDate` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `fromDate` will be today's date - 6 months and `toDate` will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

Once the above statement is added, a series of checks are done to make sure the SDK is implemented correctly. A `RunTimeException` will be thrown while trying to build the project in case any of the checks are not completed.

::: warning Minimal Requirements for SDK to work:

1. `apiKey` is is mandatory
2. `linkId` is mandatory, and should be at least 8 characters long
3. In case `fromDate` / `toDate` is provided, make sure they are of correct date format: `DD/MM/YYYY`.
4. Make sure `fromDate` is always less than `toDate`
5. Make sure `toDate` is never today's date, the maximum possible value for it is today's date - 1 day
Once all these conditions are met, the BankConnect object will build.
:::

## Show SDK Screen

Start Bank Screen and listen for the result

```swift
BankView() {
    payload in
    // Success Response - Valid Entity Id
    debugPrint("Entity Id", payload.entityId)
}
```

## Parse Results

Once the user navigates through the banks and uploads the bank statement, the sdk automatically closes `BankView` and returns the results.

Success callback contains `entityId` (or `sessionId`). A successful upload contains a unique `entityId` (or `sessionId`).

- entityId - Unique id of a successful statement upload during Entity flow
- sessionId - Session id of a successful statement upload during Session flow
