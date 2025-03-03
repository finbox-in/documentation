# FinBox Lending: IOS

FinBox Lending IOS SDK is a wrapper around the Android SDK which helps add a digital lending journey to any mobile application.

## Requirements

FinBox Lending IOS SDK works on IOS 16.1 and Xcode 14.1.

## Adding Dependency

Add the SDK to the application using Swift Package Manager (Preferred) or Cocopods.

<CodeSwitcher :languages="{spm:'Swift Package Manager',cocopods:'CocoaPods'}">
<template v-slot:spm>

1. In Xcode, select File > Add Packages...

2. Enter the [FinBox Lending URL](https://github.com/finbox-in/lending-middleware-ios-sdk) for this repository

</template>
<template v-slot:cocopods>

1. Edit the `pod` file and add `pod 'FinBoxLending`

</template>
</CodeSwitcher>

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `CLIENT_API_KEY`
:::

## Build Lending

Build the `FinBoxLending` object by passing `environment`, `apiKey`, `customer_id`, `userToken` and others.

```javascript
// Build Lending
let _ = FinBoxLending.Builder()
    .environment(env: "UAT") // UAT or PROD
    .apiKey(key: apiKey)
    .customerID(id: customerID)
    .userToken(token: apiKey)
    .creditLineAmount(amount: AMOUNT)                // Required only for Creditline Flow
    .creditLineTransactionID(transactionID: "ORDER_ID")     // Required only for Creditline Flow
    .utmSource(utmSource: "UTM_SOURCE")                 // Optional: UTM Source
    .utmContent(utmContent: "UTM_CONTENT")               // Optional: UTM Content
    .utmMedium(utmMedium: "UTM_MEDIUM")                 // Optional: UTM Medium
    .utmCampaign(utmCampaign:"UTM_CAMPAIGN")             // Optional: UTM Campaign Name
    .utmPartnerName(utmPartnerName: "UTM_PARTNER_NAME")      // Optional: UTM Partner Name
    .utmPartnerMedium(utmPartnerMedium: "UTM_PARTNER_MEDUIM")  // Optional: UTM Partner Medium
    .build();
```

| Builder Property | Description | Required |
| - | - | - |
| `environment` | specifies the `prod` or `uat` environment | Yes |
| `apiKey` | specifies the unique id shared with the client | Yes |
| `customerId` | specifies the unqiue id for the customer | Yes |
| `userToken` | specifies the unique token generated for the session | Yes |
| `creditLineAmount` | Amount used for Creditline Journey | No |
| `creditLineTransactionId` | Transaction id for the Creditline Journey | No |
| `utmSource` | UTM Source | No |
| `utmContent` | UTM Content | No |
| `utmMedium` | Medium of the UTM campaign | No |
| `utmCampaign` | Name of the UTM campaign | No |
| `utmPartnerName` | Name of the UTM partner | No |
| `utmPartnerMedium` | Medium of the UTM partner | No |

## Show SDK Screen

Start Lending Screen and listen for the result

```swift
LendingView() {
    payload in
    // Success or Failed journey based on the result code
    debugPrint("Result Code", payload.code)
}
```

## Parse Results

Once the user navigates through and completes the lending journey, the sdk automatically closes `LendingView` and returns the results.

Success callback contains `resultCode`.

Possible values for `resultCode` are as follows:
| Result Code | Description |
| - | - | - |
| `MW200` | Journey is completed successfully |
| `MW500` | User exits the journey |
| `MW400` | Some error occurred in the SDK |
| `CL200` | Credit line withdrawal success |
| `CL500` | Credit line withdrawal failed |
