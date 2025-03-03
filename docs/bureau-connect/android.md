# BureauConnect: Android SDK

BureauConnect Android SDK helps you take consent from the user through your Android application before fetching the bureau details.

## Requirements

BureauConnect Android SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring to support older versions.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

#### Kotlin
```
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

#### Groovy
```
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

## Adding Dependency

In the project level `build.gradle` file, add the repository URLs to all `allprojects` block.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

#### Kotlin
```
maven {
    setUrl("s3://risk-manager-android-sdk/artifacts")
    credentials(AwsCredentials::class) {
        accessKey = <ACCESS_KEY>
        secretKey = <SECRET_KEY>
    }
    content {
        includeGroup("in.finbox")
    }
}
```

</template>
<template v-slot:groovy>

#### Groovy
```
maven {
    url "s3://risk-manager-android-sdk/artifacts"
    credentials(AwsCredentials) {
        accessKey = <ACCESS_KEY>
        secretKey = <SECRET_KEY>
    }
    content {
        includeGroup("in.finbox")
    }
}
```

</template>
</CodeSwitcher>

Now add the dependency to module level `build.gradle.kts` or `build.gradle` file:

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

#### Kotlin
```
implementation("in.finbox:bureauconnect:<FBC_SDK_VERSION>:release@aar") {
    isTransitive = true
}
```

</template>
<template v-slot:groovy>

#### Groovy
```
implementation('in.finbox:bureauconnect:<FBC_SDK_VERSION>:release@aar') {
    transitive = true
}
```

</template>
</CodeSwitcher>

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `ACCESS_KEY`
- `SECRET_KEY`
- `FBC_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Build Bureau Connect

Build the `FinBoxBureauConnect` object by passing `apiKey`, `customerId`, `firstName`, `middleName` <strong>(OPTIONAL)</strong>, `lastName`, `phoneNumber` and `environment`.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

#### Kotlin
```
FinBoxBureauConnect.Builder(applicationContext)
    .setApiKey("CLIENT_API_KEY")
    .setCustomerId("CUSTOMER_ID")
    .setFirstName("CUSTOMER_FIRST_NAME")
    .setMiddleName("CUSTOMER_MIDDLE_NAME")
    .setLastName("CUSTOMER_LAST_NAME")
    .setPhoneNumber("CUSTOMER_PHONE_NUMBER")
    .setEnvironment("ENVIRONMENT")
    .build()
```

</template>
<template v-slot:java>

#### Java
```
new FinBoxBureauConnect.Builder(getApplicationContext())
    .setApiKey("CLIENT_API_KEY")
    .setCustomerId("CUSTOMER_ID")
    .setFirstName("CUSTOMER_FIRST_NAME")
    .setMiddleName("CUSTOMER_MIDDLE_NAME")
    .setLastName("CUSTOMER_LAST_NAME")
    .setPhoneNumber("CUSTOMER_PHONE_NUMBER")
    .setEnvironment("ENVIRONMENT")
    .build();
```

Note: Use only "PROD" or "UAT" for ENVIRONMENT.  

</template>
</CodeSwitcher>

## Show SDK Screen

Start BureauActivity and listen for the result

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

#### Kotlin
```
/**
 * Activity Result
 */
private val result = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) {
    // Parse the result
    parseActivityResult(it)
}

// Start Bureau Activity
result.launch(builder.getBureauConnectIntent(getContext()))
```

</template>
<template v-slot:java>

#### Java
```
/**
 * Activity Result
 */
@NonNull
private final ActivityResultLauncher<Intent> result =
        registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                this::parseActivityResult);

// Start Bureau Activity
result.launch(builder.getBureauConnectIntent(getContext()));
```

</template>
</CodeSwitcher>

## Parse Results

Once the user navigates through the SDK and grants the consent, the sdk automatically closes `BureauActivity` and returns `BureauPayload`.

`BureauPayload` contains `consentGiven` and `message`.

- consentGiven - True when consent is granted, false otherwise
- message - Success or Failure Message
- payLoadType - SUCCESS/FAILURE/USER_EXIT

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

#### Kotlin
```
if (result?.resultCode == Activity.RESULT_OK) {
    // Result is success
    // Read extras
    val extras = result.data?.extras
    // Read success payload
    val payload = extras?.getParcelable<BureauPayload>(
        FinboxBureauConstants.BUNDLE_EXTRA_BUREAU_PAYLOAD
    )
    when {
        payload == null -> {
            // Failed to Receive Payload
        }
        payload.consentGiven -> {
            // Consent is granted
        }
        else -> {
            // Failed to give consent
            // Read the error message
        }
    }
} else {
    // Result Failed or User Cancelled
}
```

</template>
<template v-slot:java>

#### Java
```
if (result != null && result.getResultCode() == Activity.RESULT_OK) {
    // Result is success
    // Read extras
    @Nullable final Bundle extras = result.getData() != null ? result.getData().getExtras() : null;
    if (extras != null) {
        // Read success payload
        @Nullable final BureauPayload payload =
                extras.getParcelable(FinboxBureauConstants.BUNDLE_EXTRA_BUREAU_PAYLOAD);
        if (payload == null) {
            // Failed to Receive Payload
        } else if (payload.isConsentGiven()) {
            // Consent is granted
        } else {
            // Failed to give consent
            // Read the error message
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
