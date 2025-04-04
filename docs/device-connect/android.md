# DeviceConnect: Android

The DeviceConnect Android SDK enables the collection of anonymized, non-PII data from user devices, ensuring compliance with privacy policies by obtaining explicit user consent before initiating data sync processes.

<div class="embed-container">
<iframe src="https://www.youtube.com/embed/SfzGylmUVpY" title="Device Connect Data Sync" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Requirements

To ensure compatibility and optimal performance of the SDK, the following minimum requirements must be met:
- **Android OS Version**: Android 5.0 (Lollipop) or higher (API Level 21+)
- **Java Version**: Java 8 or higher
- **Support Libraries**: AndroidX libraries are mandatory

::: warning NOTE
The SDK is built using **Java 8** language features, which are not fully supported on **Android 7.0** and below.
To maintain compatibility with older devices, it is essential to **enable Java 8 desugaring** in your project.
Devices running **Android 8.0** and above **do not require desugaring**, as Java 8 support is natively available.
:::

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
android {
    ...
    defaultConfig {
        ...
        // Minimum 5.0+ devices
        minSdk 21
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

To include the DeviceConnect SDK in your project, configure your repository settings as follows:

In your project-level `build.gradle` or `settings.gradle`, add the FinBox private Maven repository under the `allprojects.repositories` or `dependencyResolutionManagement.repositories` block.

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
        includeGroup("in.finbox")
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
        includeGroup("in.finbox")
    }
}
```

</template>
</CodeSwitcher>

In your module-level `build.gradle.kts` or `build.gradle` file, add the required FinBox SDK dependencies

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
implementation("in.finbox:mobileriskmanager:<DC_SDK_VERSION>:<DC_FLAVOR>-release@aar") {
    isTransitive = true
}
implementation("in.finbox:common:<COMMON_SDK_VERSION>:<COMMON_FLAVOR>-release@aar") {
    isTransitive = true
}
implementation("in.finbox:logger:<LOGGER_SDK_VERSION>:parent-release@aar") {
    isTransitive = true
}
```

</template>
<template v-slot:groovy>

```groovy
implementation('in.finbox:mobileriskmanager:<DC_SDK_VERSION>:<DC_FLAVOR>-release@aar') {
    transitive = true
}
implementation ('in.finbox:common:<COMMON_SDK_VERSION>:<COMMON_FLAVOR>-release@aar') {
    transitive = true
}
implementation ('in.finbox:logger:<LOGGER_SDK_VERSION>:parent-release@aar') {
    transitive = true
}
```

</template>
</CodeSwitcher>

::: warning NOTE
The following integration details will be provided by the FinBox team at the time of onboarding:

- `ACCESS_KEY`
- `SECRET_KEY`
- `DC_SDK_VERSION`
- `DC_FLAVOR`
- `COMMON_SDK_VERSION`
- `COMMON_FLAVOR`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## User Initialization with `createUser`

To begin data collection and syncing, the DeviceConnect SDK requires associating the current app session with a user. This is done using the `createUser` method

|:Parameter |:Type |:Description |
|----------|----------|----------|
| CLIENT_API_KEY | String| The unique FinBox API key assigned to your application |
| CUSTOMER_ID | String | Unique identifier assigned to the user by your system (see format rules) |

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.createUser("CLIENT_API_KEY", "CUSTOMER_ID",
    object : FinBox.FinBoxAuthCallback {
        override fun onSuccess(accessToken: String) {
            // Authentication is success
        }
        
        override fun onError(@FinBoxErrorCode errorCode: Int) {
            // Authentication failed
        }
    })
```

</template>
<template v-slot:java>

```java
FinBox.createUser("CLIENT_API_KEY", "CUSTOMER_ID",
    new FinBox.FinBoxAuthCallback() {
        @Override
        public void onSuccess(@NonNull String accessToken) {
            // Authentication is success
        }

        @Override
        public void onError(@FinBoxErrorCode int error) {
            // Authentication failed
        }
    });
```

</template>
</CodeSwitcher>

:warning: **Customer ID Rules**:
- Must be alphanumeric only (no special characters)
- Cannot exceed 64 characters
- Must not be null or an empty string ("")

The response (success or failure) is handled using the `FinBoxAuthCallback` callback.

:repeat: **Behavior Notes**:
- The method is idempotent: calling it repeatedly with the same customerId will not cause an error.
- If the customer is already registered, the SDK will return a success response and continue as expected.
- If invalid credentials or customer ID are provided, onError() is triggered with a specific error code

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Starting Background Data Sync: `startPeriodicSync()`

The startPeriodicSync() method begins regular background syncing of user data, based on the permissions granted to the app. It should be called only after a successful `createUser` call.

:gear: **Usage Guidelines**:

- This method must be called only after a successful response from the `createUser` callback. 
- It is essential to ensure that the user has been successfully authenticated and linked to a valid `customerId` before enabling background sync


<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val finbox = FinBox()
finbox.startPeriodicSync()
```

</template>

<template v-slot:java>

```java
FinBox finbox = new FinBox();
finbox.startPeriodicSync();
```

</template>
</CodeSwitcher>

:repeat: **Functionality Overview**:
- Initiates periodic background syncing of user data from all enabled sources (e.g., SMS, installed apps etc).
- Sync intervals are controlled using the `setSyncFrequency` method.
- Sync operations are optimized for battery and network conditions.
  - Automatically pauses syncing when the battery is low.
  - Resumes syncing when the device is charging or reconnected to a network

By default, the sync frequency is set to **8 hours**. You can customize this frequency by calling the `setSyncFrequency` method and passing your preferred interval **in seconds** as an argument. Ensure this method is invoked after the user is created.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finbox.setSyncFrequency(12 * 60 * 60)
```

</template>
<template v-slot:java>

```java
finbox.setSyncFrequency();
```

</template>
</CodeSwitcher>

:lock: **Permissions-Driven Behavior**:
- Data syncing respects all runtime permissions granted by the user. If any required permission (e.g., SMS, Installed etc) is not granted or is later revoked:
  - The SDK will skip syncing from that data source.
  - No crash or exception will be thrown; sync continues from other available sources.

::: tip Handling User Switch or Cross-Login Scenarios
When a user logs out and another user logs into the same device (e.g., a different customer ID), it’s important to ensure that the SDK cleanly associates the new user with future data syncs.

**Recommended Flow on User Login**:
Upon login with a new set of credentials:

1. Call `createUser()`
- This links the new customerId with the SDK.
- The method is idempotent and will handle duplicate calls gracefully if the same user logs in again.

2. Call `startPeriodicSync()`
- This resumes background syncing immediately, ensuring minimal delay in starting data collection for the new session.
:::

## Match Details on Device (Important)

Device matching enhances the SDK's ability to associate user identity signals—such as email address, phone number, and name—with behavioral patterns. This improves insight accuracy while maintaining strict privacy boundaries. These values are securely processed on-device and used only for matching purposes. 

**How It Works**:
- All matching and signal generation are performed locally on the device.
- No personal information (phone number, email, name) is ever transmitted to FinBox servers.

This mechanism supports deeper validation of user ownership without compromising user privacy.

:wrench: **Implementation**:
Use the provided builder method to pass the user's identity attributes:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val deviceMatch = DeviceMatch.Builder().apply {
    setEmail("useremail@gmail.com")
    setName("Full Name")
    setPhone("9999999999")
}.build()
```

</template>

<template v-slot:java>

```java
final DeviceMatch.Builder builder = new DeviceMatch.Builder();
builder.setEmail("useremail@gmail.com");
builder.setName("Full Name");
builder.setPhone("9999999999");
final DeviceMatch deviceMatch = builder.build();
```

</template>
</CodeSwitcher>

Once the in-device values are set, call `setDeviceMatch` before starting the syncs.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finbox.setDeviceMatch(deviceMatch)
```

</template>

<template v-slot:java>

```java
finbox.setDeviceMatch(deviceMatch);
```

</template>
</CodeSwitcher>

::: tip
This step is optional but highly recommended for improved insight quality in multi-user or shared-device environments. Also, for Device Match to work at full potential, the SDK expects `android.permission.READ_SMS` to be accepted by the user.
:::


## Handling Background Restrictions on Specific Devices

To ensure continuous background syncing—even on devices with aggressive battery optimizations—the SDK supports a silent wake-up mechanism using Firebase Cloud Messaging (FCM). When background sync is disrupted (e.g., due to the app being killed or restricted by the OS), FinBox servers send a silent FCM push to wake up the app. These notifications are invisible to the user and are used solely to reinitialize the SDK’s sync processes in the background.

:wrench: **Implementation**: To enable this functionality, forward relevant FCM messages to the SDK within your `FirebaseMessagingService` class.
Add the following logic inside your overridden `onMessageReceived()` method

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
if (MessagingService.forwardToFinBoxSDK(remoteMessage.data)) {
    val firebaseMessagingService = MessagingService(this)
    firebaseMessagingService.onMessageReceived(remoteMessage.data)
} else {
    // Rest of your FCM logic
}
```

</template>
<template v-slot:java>

```java
if(MessagingService.forwardToFinBoxSDK(remoteMessage.getData())) {
    final MessagingService firebaseMessagingService = new MessagingService(this);
    firebaseMessagingService.onMessageReceived(remoteMessage.getData());
} else {
    // Rest of your FCM logic
}
```

</template>
</CodeSwitcher>

:white_check_mark: **Prerequisites**: 
- Ensure notification permissions are enabled at the OS level.
- The app must be installed (not uninstalled) for FCM-triggered wake-ups to work

## Multi-Process Support (Optional)

DeviceConnect uses a **content provider** to automatically initialize the SDK. However, Android has a limitation: in multi-process applications, **content providers are only initialized in the main process**. This means that any SDK calls from other processes may result in **unstable behavior**

If you need to use the SDK in a process **other than the main process**, you must:

1. Remove the auto-initializing content provider.
2. Manually initialize the SDK in the required processes

### Remove the Content Provider

Remove the content provider from your `AndroidManifest.xml` file using the following snippet:

```xml
<provider
    android:name="in.finbox.mobileriskmanager.init.AutoInitProvider"
    android:authorities="in.finbox.lenderapplication.riskmanagerprovider"
    android:enabled="true"
    android:exported="false"
    tools:node="remove" />
```

### Initialize the SDK

After removing the auto-initializing content provider, you must manually initialize the FinBox SDK in your app. This ensures the SDK is properly set up whenever the app starts

Open your app’s custom Application class. Override the `onCreate` method in the Application class and add the Finbox SDK initialization code.

Use the following example as a guide:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.initLibrary(this)
```

</template>
<template v-slot:java>

```java
FinBox.initLibrary(this);
```

</template>
</CodeSwitcher>

## Handling User Logout: Stopping Background Sync

When a user logs out of the app, it is important to explicitly stop ongoing background data synchronization to prevent unnecessary activity and ensure compliance with data handling standards.
Call the `stopPeriodicSync` method during logout to:
- Halt all future data sync operations
- Maintain data privacy and session isolation

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finbox.stopPeriodicSync()
```

</template>
<template v-slot:java>

```java
finbox.stopPeriodicSync();
```

</template>
</CodeSwitcher>

## Resetting Local User Data

Use the `resetData` method to clear all locally cached data associated with the current user. This is typically used during logout flows or re-authentication scenarios where a clean local state is required.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.resetData()
```

</template>
<template v-slot:java>

```java
FinBox.resetData();
```

</template>
</CodeSwitcher>

**Behavior**:
- Deletes all locally stored data associated with the active customerId.
- Does not affect server-side data.
- Can be safely called while offline; the reset is performed on-device.
- Syncing can be restarted by simply calling startPeriodicSync() again.

## Forget User

Use the `forgetUser` method to permanently delete all user data from FinBox systems. This should be used to comply with requests under data privacy laws (e.g., GDPR) or full account deletion flows.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.forgetUser()
```

</template>
<template v-slot:java>

```java
FinBox.forgetUser();
```

</template>
</CodeSwitcher>

**Behavior**:
- Deletes all server-side data associated with the user.
- Removes the linked customerId and any stored insights.
- Ensures full compliance with the "Right to be Forgotten."

:warning: Important: After this call, the user cannot be re-associated without a new createUser() invocation

::: tip
:ballot_box_with_check: Recommended Logout Flow:
When a user logs out of the app, follow this flow to ensure clean separation of sessions:
`stopPeriodicSync` > `resetData` 

**Why this matters** :
- stopPeriodicSync() halts background sync tasks.
- resetData() ensures no residual information remains on the device.

For full account deletion, combine:
`stopPeriodicSync` > `resetData` > `forgetUser`

- This will remove local, server-side, and identity-level data completely.
:::