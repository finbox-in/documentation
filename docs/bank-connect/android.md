# BankConnect: Android

The Android SDK helps user submits their bank statements via upload or net banking credentials in your Android application.

## Requirements

Bank Connect Android SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

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
        includeGroup("in.finbox.bankconnect")
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
        includeGroup("in.finbox.bankconnect")
    }
}
```

</template>
</CodeSwitcher>

Now add the dependency to module level `build.gradle.kts` or `build.gradle` file:

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
implementation("in.finbox.bankconnect:hybrid:<BC_SDK_VERSION>:release@aar") {
    isTransitive = true
}
```

</template>
<template v-slot:groovy>

```groovy
implementation('in.finbox.bankconnect:hybrid:<BC_SDK_VERSION>:release@aar') {
    transitive = true
}
```

</template>
</CodeSwitcher>

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `ACCESS_KEY`
- `SECRET_KEY`
- `BC_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Integration Workflow

The diagram below illustrates the integration workflow in a nutshell:
<img src="/client_sdk.jpg" alt="Client SDK Workflow" />

## Sample Project

We have hosted a sample project on GitHub, you can check it out here:
<div class="button_holder">
<a class="download_button" target="_blank" href="https://github.com/finbox-in/bankconnect-android">Open GitHub Repository</a>
</div>

## Build Bank Connect

Build the `FinBoxBankConnect` object by passing `apiKey`, `linkId`, `environment`, `fromDate`, `toDate`, `bank`, `mode` and others.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val bankConnect = FinBoxBankConnect.Builder(applicationContext)
    .apiKey("CLIENT_API_KEY")
    .linkId("LINK_ID")
    .environment(Environment.PRODUCTION)               // Required: PRODUCTION or UAT
    .fromDate("01/01/2021")                             // Optional: Default 6 months old date
    .toDate("01/04/2021")                               // Optional: Default value 1 day less than current date
    .bank("sbi")                                        // Optional: Short code of the bank
    .mode(Mode.PDF)                                     // Optional: PDF Mode
    .mobileNumber("9876543210")                         // Optional: Mobile number
    .journeyMode(JourneyMode.MULTI_PDF)                 // Optional: Multi PDF journey
    .aaJourneyMode(AAJourneyMode.ONLY_RECURRING)        // Optional: Recurring AA pulls
    .aaRecurringTenureMonthCount(3)                     // Optional: Consent duration is valid for 3 months
    .aaRecurringFrequencyUnit(AARecurringFrequencyUnit.DAY) // Optional: Frequency unit is in Days
    .aaRecurringFrequencyValue(2)                       // Optional: Number of times to pull the data
    .build()
```

</template>
<template v-slot:java>

```java
FinBoxBankConnect bankConnect = new FinBoxBankConnect.Builder(getApplicationContext())
    .apiKey("CLIENT_API_KEY")
    .linkId("LINK_ID")
    .environment(Environment.PRODUCTION)               // Required: PRODUCTION or UAT
    .fromDate("01/01/2021")                             // Optional: Default 6 months old date
    .toDate("01/04/2021")                               // Optional: Default value 1 day less than current date
    .bank("sbi")                                        // Optional: Short code of the bank
    .mode(Mode.PDF)                                     // Optional: PDF Mode
    .mobileNumber("9876543210")                         // Optional: Mobile number
    .journeyMode(JourneyMode.MULTI_PDF)                 // Optional: Multi PDF journey
    .aaJourneyMode(AAJourneyMode.ONLY_RECURRING)        // Optional: Recurring AA pulls
    .aaRecurringTenureMonthCount(3)                     // Optional: Consent duration is valid for 3 months
    .aaRecurringFrequencyUnit(AARecurringFrequencyUnit.DAY) // Optional: Frequency unit is in Days
    .aaRecurringFrequencyValue(2)                       // Optional: Number of times to pull the data
    .build();
```

</template>
</CodeSwitcher>

| Builder Property | Description | Required |
| - | - | - |
| `apiKey` | specifies the `api_key` | Yes |
| `linkId` | specifies the `link_id` | Yes |
| `environment` | set as `Environment.PRODUCTION` or `Environment.UAT` | Yes |
| `fromDate` | specifies the starting period of the statement in `DD/MM/YYYY`format | No |
| `toDate` | specifies the end period of the statement in `DD/MM/YYYY` format | No |
| `bank` | pass the [bank identifier](/bank-connect/appendix.html#bank-identifiers) to skip the bank selection screen and directly open a that bank's screen instead | No |
| `mode` | set the mode as `Mode.PDF` (manual upload), `Mode.AA` (Account Aggregator), or `Mode.ONLINE` (Net Banking) | No |
| `mobileNumber` | Prefills phone number in Account Aggregator mode, must be exactly 10 digits | No |
| `journeyMode` | Optional parameter to set the journey (i.e. `JourneyMode.MULTI_PDF`, `MULTI_BANKING`, or `AA_MULTI_BANKING`) | No |
| `aaJourneyMode` | set the journey mode for AA (i.e `AAJourneyMode.ONLY_ONCE`, `ONLY_RECURRING`, or `ONCE_WITH_RECURRING`) | No |
| `aaRecurringTenureMonthCount` | set the recurring consent duration (min: 1 and max: 24) | No |
| `aaRecurringFrequencyUnit` | set the frequency unit to pull the data during the recurring consent duration (`AARecurringFrequencyUnit.DAY`, `MONTH`, or `YEAR`) | No |
| `aaRecurringFrequencyValue` | set the frequency value to pull the data during the recurring consent duration (min: 1 and max: 3) | No |

`fromDate` and `toDate` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `fromDate` will be today's date - 6 months and `toDate` will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

Once the above statement is added, a series of checks are done to make sure the SDK is implemented correctly. A `RunTimeException` will be thrown while trying to build the project in case any of the checks are not completed.

::: warning Minimal Requirements for SDK to work:

1. `apiKey` is mandatory
2. `linkId` is mandatory, and cannot be blank
3. `environment` is mandatory
4. In case `fromDate` / `toDate` is provided, make sure they are of correct date format: `DD/MM/YYYY`.
5. Make sure `fromDate` is always less than `toDate`
6. Make sure `toDate` is never today's date, the maximum possible value for it is today's date - 1 day
7. If provided, `mobileNumber` must be exactly 10 digits
Once all these conditions are met, the BankConnect object will build.
:::

## Build Bank Connect V2

`FinBoxBankConnectV2.Builder` builds a `FinBoxBankConnectV2` object. It accepts everything `FinBoxBankConnect` does, plus redirect URLs, AA journey codes, and richer session metadata.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val bankConnectV2 = FinBoxBankConnectV2.Builder(applicationContext)
    .apiKey("CLIENT_API_KEY")
    .linkId("LINK_ID")
    .environment(Environment.PRODUCTION)                    // Required: PRODUCTION or UAT
    .redirectUrl("https://yourapp.com/redirect")            // Optional: Redirect URL on success
    .errorRedirectUrl("https://yourapp.com/error")          // Optional: Redirect URL on error
    .fromDate("01/01/2021")                                 // Optional: Default 6 months old date
    .toDate("01/04/2021")                                   // Optional: Default value 1 day less than current date
    .logoUrl("https://yourapp.com/logo.png")                // Optional: Logo shown on the SDK screen
    .bank("sbi")                                            // Optional: Short code of the bank
    .mode(Mode.AA)                                          // Optional
    .mobileNumber("9876543210")                             // Optional: Must be exactly 10 digits
    .sessionExpiry(30)                                      // Optional: Session validity in minutes
    .journeyMode(JourneyMode.MULTI_BANKING)                 // Optional
    .acceptAnything(true)                                   // Optional
    .isMobileFieldEditable(true)                            // Optional
    .aaJourneyCode("BCAA004")                               // Optional
    .isBackButtonDisabled(true)                             // Optional
    .aaErrorRedirectRequired(true)                          // Optional
    .aaErroredBanks(listOf("HDFC", "ICICI"))                // Optional
    .aaFirstFlow(true)                                      // Optional
    .aaVendor("VENDOR_NAME")                                // Optional
    .accountNumber("0048")                                  // Optional
    .programId("PROGRAM_ID")                                // Optional
    .pan("ABCDE1234F")                                      // Optional
    .names(listOf("John Doe"))                              // Optional
    .employerNames(listOf("FinBox"))                        // Optional
    .companiesForSelfTransfer(listOf("FinBox Pvt Ltd"))     // Optional
    .consents(mapOf("consent_key" to "consent_value"))      // Optional
    .metadata(SessionMetadata(names = listOf("John Doe")))  // Optional
    .build()
```

</template>
<template v-slot:java>

```java
FinBoxBankConnectV2 bankConnectV2 = new FinBoxBankConnectV2.Builder(getApplicationContext())
    .apiKey("CLIENT_API_KEY")
    .linkId("LINK_ID")
    .environment(Environment.PRODUCTION)                    // Required: PRODUCTION or UAT
    .redirectUrl("https://yourapp.com/redirect")            // Optional: Redirect URL on success
    .errorRedirectUrl("https://yourapp.com/error")          // Optional: Redirect URL on error
    .fromDate("01/01/2021")                                 // Optional: Default 6 months old date
    .toDate("01/04/2021")                                   // Optional: Default value 1 day less than current date
    .logoUrl("https://yourapp.com/logo.png")                // Optional: Logo shown on the SDK screen
    .bank("sbi")                                            // Optional: Short code of the bank
    .mode(Mode.AA)                                          // Optional
    .mobileNumber("9876543210")                             // Optional: Must be exactly 10 digits
    .sessionExpiry(30)                                      // Optional: Session validity in minutes
    .journeyMode(JourneyMode.MULTI_BANKING)                 // Optional
    .acceptAnything(true)                                   // Optional
    .isMobileFieldEditable(true)                            // Optional
    .aaJourneyCode("BCAA004")                               // Optional
    .isBackButtonDisabled(true)                             // Optional
    .aaErrorRedirectRequired(true)                          // Optional
    .aaErroredBanks(Arrays.asList("HDFC", "ICICI"))         // Optional
    .aaFirstFlow(true)                                      // Optional
    .aaVendor("VENDOR_NAME")                                // Optional
    .accountNumber("0048")                                  // Optional
    .programId("PROGRAM_ID")                                // Optional
    .pan("ABCDE1234F")                                      // Optional
    .names(Arrays.asList("John Doe"))                       // Optional
    .employerNames(Arrays.asList("FinBox"))                 // Optional
    .companiesForSelfTransfer(Arrays.asList("FinBox Pvt Ltd")) // Optional
    .consents(Collections.singletonMap("consent_key", "consent_value")) // Optional
    .metadata(new SessionMetadata(Arrays.asList("John Doe"), null, null)) // Optional
    .build();
```

</template>
</CodeSwitcher>

Builder properties in addition to `apiKey`, `linkId`, `environment`, `fromDate`, `toDate`, `bank`, `mode`, `journeyMode`, `mobileNumber` documented above:

| Builder Property | Description | Required |
| - | - | - |
| `redirectUrl` | URL to redirect to on success | No |
| `errorRedirectUrl` | URL to redirect to on error | No |
| `logoUrl` | logo shown on the SDK screen | No |
| `sessionExpiry` | session validity in minutes | No |
| `acceptAnything` | relax document acceptance checks | No |
| `isMobileFieldEditable` | allow editing the mobile number on the SDK screen | No |
| `aaJourneyCode` | Account Aggregator journey code | No |
| `isBackButtonDisabled` | disable the back button on the SDK screen | No |
| `aaErrorRedirectRequired` | redirect to `errorRedirectUrl` on AA errors | No |
| `aaErroredBanks` | banks to exclude due to prior AA errors | No |
| `aaFirstFlow` | whether this is the user's first AA flow | No |
| `aaVendor` | Account Aggregator vendor name | No |
| `accountNumber` | user's account number | No |
| `programId` | program id | No |
| `pan` | user's PAN | No |
| `names` | known names for the user | No |
| `employerNames` | known employer names for the user | No |
| `companiesForSelfTransfer` | companies to treat as self-transfers | No |
| `consents` | arbitrary consent key/value pairs | No |
| `metadata` | bundles `names`, `employerNames`, `companiesForSelfTransfer` into a `SessionMetadata` object | No |

::: warning NOTE
The same minimal requirements listed above apply here too: `apiKey`, `linkId`, and `environment` are mandatory, and `fromDate` / `toDate` / `mobileNumber` follow the same validation rules.
:::

## Show SDK Screen

Register a launcher for the result, then launch the intent obtained from the `FinBoxBankConnect` (or `FinBoxBankConnectV2`) object built above. This mirrors `CreateSessionFragment` in the [sample project](https://github.com/finbox-in/bankconnect-android).

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
import `in`.finbox.bankconnect.hybrid.constants.FINBOX_JOURNEY_RESULT
import `in`.finbox.bankconnect.hybrid.payload.FinBoxPayload

private val bankConnectLauncher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == Activity.RESULT_OK) {
        val payload = result.data?.extras?.getParcelable<FinBoxPayload>(FINBOX_JOURNEY_RESULT)
        payload?.let {
            it.entityId?.let { entityId -> showToast("EntityId: $entityId") }
                ?: it.sessionId?.let { sessionId -> showToast("SessionId: $sessionId") }
                ?: it.message?.let { message -> showToast(message) }
        } ?: showToast("Something went wrong")
    }
}

// Launch the SDK. Use bankConnectV2.getBankConnectIntentV2(this) if you built a FinBoxBankConnectV2
bankConnectLauncher.launch(bankConnect.getBankConnectIntentV1(this))
```

</template>
<template v-slot:java>

```java
import in.finbox.bankconnect.hybrid.constants.ConstantKt;
import in.finbox.bankconnect.hybrid.payload.FinBoxPayload;

@NonNull
private final ActivityResultLauncher<Intent> bankConnectLauncher =
        registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            if (result.getResultCode() == Activity.RESULT_OK) {
                @Nullable final Bundle extras = result.getData() != null ? result.getData().getExtras() : null;
                @Nullable final FinBoxPayload payload = extras != null ? extras.getParcelable(ConstantKt.FINBOX_JOURNEY_RESULT) : null;
                if (payload == null) {
                    // Something went wrong
                } else if (payload.getEntityId() != null && payload.getEntityId().length() > 0) {
                    showToast("EntityId: " + payload.getEntityId());
                } else if (payload.getSessionId() != null && payload.getSessionId().length() > 0) {
                    showToast("SessionId: " + payload.getSessionId());
                } else if (payload.getMessage() != null) {
                    showToast(payload.getMessage());
                }
            }
        });

// Launch the SDK. Use bankConnectV2.getBankConnectIntentV2(this) if you built a FinBoxBankConnectV2
bankConnectLauncher.launch(bankConnect.getBankConnectIntentV1(this));
```

</template>
</CodeSwitcher>

::: warning NOTE
`FINBOX_JOURNEY_RESULT` is a constant exported by the SDK, not a literal you write yourself, its value is `"finbox_result"`.
- Kotlin: import it directly, `in.finbox.bankconnect.hybrid.constants.FINBOX_JOURNEY_RESULT`.
- Java: Kotlin top-level constants compile to a static field on a `<FileName>Kt` holder class, so import `in.finbox.bankconnect.hybrid.constants.ConstantKt` and reference `ConstantKt.FINBOX_JOURNEY_RESULT`.
:::

## Parse Results

Once the user navigates through the banks and uploads the bank statement, the sdk automatically closes the SDK screen and returns a `FinBoxPayload`, read above in the launcher's callback.

`FinBoxPayload` contains `linkId` and `entityId` (or `sessionId`). A successful upload contains a unique `entityId` (or `sessionId`).

- linkId - Unique id passed when building the Bank Connect object
- entityId - Unique id of a successful statement upload during Entity flow
- sessionId - Session id of a successful statement upload during Session flow
- message - Optional human-readable message accompanying the result

:::warning Webhook
To track detailed errors, and transaction process completion at the server-side, it is recommended to also integrate [Webhook](/bank-connect/webhook.html).
:::

## Customization

The SDK screen inherits its theme and colors from `Theme.BankConnectHybrid`, which extends `Theme.MaterialComponents.DayNight.NoActionBar` and ships both a light and a dark variant. In most cases no customization is required, but if there is a mismatch in colors, you can override it through your own `styles.xml` file, Android resource merging lets a style of the same name in your app take precedence over the SDK's default.

1. The SDK toolbar's background comes from `colorPrimary` (the status bar color follows `colorPrimaryVariant`). If your app's colors are different, override them by redeclaring `Theme.BankConnectHybrid`:

 ```xml
    <style name="Theme.BankConnectHybrid" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/your_brand_color</item>
        <item name="colorPrimaryVariant">@color/your_brand_color_dark</item>
        <item name="colorOnPrimary">@color/white</item>
    </style>
 ```

2. `Theme.BankConnectHybrid` is the base theme of the SDK screen. If you'd rather it inherit your own app's base theme instead of the SDK's defaults, redeclare it with your theme as the parent, along with its app bar overlay:

 ```xml
    <style name="Theme.BankConnectHybrid" parent="AppTheme">

    </style>

    <style name="Theme.BankConnectHybrid.AppBar" parent="AppTheme.AppBarOverlay" />
 ```

::: warning NOTE
Overrides only take effect if the style name matches exactly, `Theme.BankConnectHybrid` and `Theme.BankConnectHybrid.AppBar`. If you override the light theme, add the same override under `values-night/styles.xml` for the dark variant.
:::
