# FinBox Lending: Android

FinBox Lending Android SDK is a wrapper around the Web SDK which helps add a digital lending journey to any mobile application.

## Requirements

FinBox Lending SDK works on Android 5.0+ (API level 21+), Java 8+ and AndroidX. In addition to the changes, enable desugaring to support older versions.

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

## Add Dependency

In the project level `build.gradle` file or `settings.gradle`, add the repository URLs to all `allprojects` block or `repositories` block inside `dependencyResolutionManagement`.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
maven {
    setUrl("s3://risk-manager-android-sdk/artifacts")
    credentials(AwsCredentials::class) {
        accessKey = <ACCESS_KEY>
        secretKey = <SECRET_KEY>
    }
    content {
        includeGroup("in.finbox.lending")
    }
}
```

</template>
<template v-slot:groovy>

```groovy
maven {
    url "s3://risk-manager-android-sdk/artifacts"
    credentials(AwsCredentials) {
        accessKey = <ACCESS_KEY>
        secretKey = <SECRET_KEY>
    }
    content {
        includeGroup("in.finbox.lending")
    }
}
```

</template>
</CodeSwitcher>

Add the Lending SDK dependency to the module `build.gradle` file

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
implementation ("in.finbox.lending:hybrid:<LENDING_SDK_VERSION>:release@aar") {
    isTransitive = true
}
```

</template>
<template v-slot:groovy>

```groovy
implementation ("in.finbox.lending:hybrid:<LENDING_SDK_VERSION>:release@aar") {
    transitive = true
}
```

</template>
</CodeSwitcher>

::: warning Note
The following keys will be shared over an email

- `ACCESS_KEY`
- `SECRET_KEY`
- `LENDING_SDK_VERSION`
  :::

## Build Lending

Build the FinBoxLending object by passing `environment`, `apiKey`, `customer_id`, `user_token` and others.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val builder = FinBoxLending.Builder(context)
    .setLendingEnvironment("ENVIRONMENT")
    .setFinBoxApiKey("CLIENT_API_KEY")
    .setCustomerId("CUSTOMER_ID")
    .setUserToken("USER_TOKEN")
    .setCreditLineAmount(AMOUNT)                // Required only for Creditline Flow
    .setCreditLineTransactionId("ORDER_ID")     // Required only for Creditline Flow
    .setUtmSource("UTM_SOURCE")                 // Optional: UTM Source
    .setUtmContent("UTM_CONTENT")               // Optional: UTM Content
    .setUtmMedium("UTM_MEDIUM")                 // Optional: UTM Medium
    .setUtmCampaign("UTM_CAMPAIGN")             // Optional: UTM Campaign Name
    .setUtmPartnerName("UTM_PARTNER_NAME")      // Optional: UTM Partner Name
    .setUtmPartnerMedium("UTM_PARTNER_MEDUIM")  // Optional: UTM Partner Medium
    .build()
```

</template>
<template v-slot:java>

```java
FinBoxLending builder = FinBoxLending.Builder(context)
    .setLendingEnvironment("ENVIRONMENT")
    .setFinBoxApiKey("CLIENT_API_KEY")
    .setCustomerId("CUSTOMER_ID")
    .setUserToken("USER_TOKEN")
    .setCreditLineAmount(AMOUNT)                // Required only for Creditline Flow
    .setCreditLineTransactionId("ORDER_ID")     // Required only for Creditline Flow
    .setUtmSource("UTM_SOURCE")                 // Optional: UTM Source
    .setUtmContent("UTM_CONTENT")               // Optional: UTM Content
    .setUtmMedium("UTM_MEDIUM")                 // Optional: UTM Medium
    .setUtmCampaign("UTM_CAMPAIGN")             // Optional: UTM Campaign Name
    .setUtmPartnerName("UTM_PARTNER_NAME")      // Optional: UTM Partner Name
    .setUtmPartnerMedium("UTM_PARTNER_MEDUIM")  // Optional: UTM Partner Medium
    .build();
```

</template>
</CodeSwitcher>

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

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
/**
 * Activity Result
 */
private val result = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) {
    // Parse the result
    parseActivityResult(it)
}

// Start Lending Screen
result.launch(builder.getLendingIntent(context))
```

</template>
<template v-slot:java>

```java
/**
 * Activity Result
 */
@NonNull
private final ActivityResultLauncher<Intent> result =
        registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                this::parseActivityResult);

// Start Lending Screen
result.launch(builder.getLendingIntent(context));
```

</template>
</CodeSwitcher>

## Parse Results

Once the user navigates through and completes the lending journey, the sdk automatically closes Lending screen and returns FinBoxJourneyResult.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
if (result?.resultCode == Activity.RESULT_OK) {
    // Result is success
    // Read extras
    val extras = result.data?.extras
    // Read success payload
    val payload = extras?.getParcelable<FinBoxJourneyResult>(FINBOX_JOURNEY_RESULT)
    when {
        payload == null -> {
            // Failed to Receive Payload
        }
        payload.resultCode != FINBOX_RESULT_CODE_SUCCESS -> { // payload.resultCode != FINBOX_RESULT_CODE_CREDIT_LINE_SUCCESS
            // Failed to Complete the journey
        }
        else -> {
            // Journey successfully completed
        }
    }
} else {
    // Result Failed or User Cancelled
}
```

</template>
<template v-slot:java>

```java
if (result != null && result.getResultCode() == Activity.RESULT_OK) {
    // Result is success
    // Read extras
    @Nullable final Bundle extras = result.getData() != null ? result.getData().getExtras() : null;
    if (extras != null) {
        // Read success payload
        @Nullable final FinBoxJourneyResult payload = extras.getParcelable(FINBOX_JOURNEY_RESULT);
        if (payload == null) {
            // Failed to Receive Payload
        } else if (payload.getResultCode() != FINBOX_RESULT_CODE_SUCCESS) { // payload.getResultCode() != FINBOX_RESULT_CODE_CREDIT_LINE_SUCCESS
            // Failed to Complete the journey
        } else {
            // Journey successfully completed
        }
    } else {
        // Failed to Receive data
    }
} else {
    // Result Failed or User Cancelled
}
```

</template>
</CodeSwitcher>

FinBoxJourneyResult has the following values:

- `resultCode`: Status code for the journey.
- `screen`: Name of the last screen in the journey
- `message`: Any additional message to describe the resultCode

Possible values for `resultCode` are as follows:
| Result Code | Description |
| - | - | - |
| `MW200` | Journey is completed successfully |
| `MW500` | User exits the journey |
| `MW400` | Some error occurred in the SDK |
| `CL200` | Credit line withdrawal success |
| `CL500` | Credit line withdrawal failed |
