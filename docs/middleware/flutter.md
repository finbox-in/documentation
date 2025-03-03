# FinBox Lending: Flutter

FinBox Lending Flutter SDK is a wrapper around the Android SDK which helps add a digital lending journey to any mobile application.

## Requirements

Lending SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
android {
    ...
    defaultConfig {
        ...
        // Minimum 5.0+ devices
        minSdkVersion(21)
        ...
    }
    ...
    compileOptions {
        // Flag to enable support for the new language APIs
        coreLibraryDesugaringEnabled = true
        // Sets Java compatibility to Java 8
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:1.1.5")
}
```

</template>
<template v-slot:groovy>

```groovy
android {
    ...
    defaultConfig {
        ...
        // Minimum 5.0+ devices
        minSdkVersion 21
        ...
    }
    ...
    compileOptions {
        // Flag to enable support for the new language APIs
        coreLibraryDesugaringEnabled true
        // Sets Java compatibility to Java 8
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```

</template>
</CodeSwitcher>

## Add Plugin

Specify the following in `local.properties` file:

  ```
  ACCESS_KEY=<ACCESS_KEY>
  SECRET_KEY=<SECRET_KEY>
  LENDING_SDK_VERSION=<LENDING_SDK_VERSION>
  ```

Add plugin dependency in `pubspec.yaml` file:

  ```yml
  finbox_lending_plugin: any
  ```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `ACCESS_KEY`
- `SECRET_KEY`
- `LENDING_SDK_VERSION`
:::

## Build Lending

Build the FinBoxLendingPlugin object by passing `environment`, `apiKey`, `customer_id`, `user_token` and others.

```dart
 FinBoxLendingPlugin.initSdk(
    "ENVIRONMENT", 
    "CLIENT_API_KEY", 
    "CUSTOMER_ID", 
    "USER_TOKEN", 
    AMOUNT,                 // Required only for Creditline Flow
    "ORDER_ID",             // Required only for Creditline Flow
    "UTM_SOURCE",           // Optional: UTM Source
    "UTM_CONTENT",          // Optional: UTM Content
    "UTM_MEDIUM",           // Optional: UTM Medium
    "UTM_CAMPAIGN",         // Optional: UTM Campaign Name
    "UTM_PARTNER_NAME",     // Optional: UTM Partner Name
    "UTM_PARTNER_MEDUIM",   // Optional: UTM Partner Medium
);
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

```dart
 FinBoxLendingPlugin.startLending();
```

## Parse Results

Once the user navigates through and completes the lending journey, the sdk automatically closes FinBoxLendingPlugin and returns the results inside `_getJourneyResult`.

Set method handler inside `build` method of your home page to receive the results

```dart
FinBoxLendingPlugin.platform.setMethodCallHandler(_getJourneyResult);
```

`call.arguments` contains `code`, `screen` and `message`.

- `code`: Status code for the journey.
- `screen`: Name of the last screen in the journey
- `message`: Any additional message to describe the resultCode

```dart
static Future<void> _getJourneyResult(MethodCall call) async {
    if (call.method == 'getJourneyResult') {
        var json=call.arguments
    }
}
```

Following json will be received

```json
{
    "code":"code",
    "screen":"screen",
    "message":"message"
}
```

Possible values for `code` are as follows:
| Result Code | Description |
| - | - | - |
| `MW200` | Journey is completed successfully |
| `MW500` | User exits the journey |
| `MW400` | Some error occurred in the SDK |
| `CL200` | Credit line withdrawal success |
| `CL500` | Credit line withdrawal failed |
