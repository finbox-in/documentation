# DeviceConnect: Flutter

Device Connect Flutter SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.

## Requirements

Device Connect Flutter SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

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
  
  ```properties
  ACCESS_KEY=<ACCESS_KEY>
  SECRET_KEY=<SECRET_KEY>
  DC_SDK_VERSION=<RM_SDK_VERSION>
  COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
  COMMON_FLAVOR=<COMMON_FLAVOR>
  LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
  ```

Add plugin dependency in `pubspec.yaml` file:

  ```yml
  finbox_dc_plugin: any
  ```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `ACCESS_KEY`
- `SECRET_KEY`
- `DC_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `COMMON_FLAVOR`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Create User

Call `createUser` method to create the user. It takes Client Api Key and Customer Id as the arguments.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never be `null` or a blank string `""`.
:::

```dart
FinBoxDcPlugin.createUser("CLIENT_API_KEY", "CUSTOMER_ID").fold(
    (right) => {
          // Authentication is success
          print("Access Token: $right")
        },
    (left) => {
          // Authentication failed
          print("Error Code $left")
        });
```

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Start Periodic Sync

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals.

```dart
FinBoxDcPlugin.startPeriodicSync();
```

## Match Details on Device

Device matching enables additional pattern recognition to match email, phone numbers and name. The matching happens on the device and the user phone numbers, email addresses won't leave the device.

Call `setDeviceMatch` method before starting the syncs.

```dart
FinBoxDcPlugin.setDeviceMatch("useremail@gmail.com", "Full Name", "9999999999");
```

## Forward Notifications to SDK

In certain cases, FinBox server requests critical data from SDK directly (other than scheduled sync period), to make sure this works it is required to forward FCM Notifications to SDK.

Add the following lines inside `FirebaseMessaging.onMessage.listen` method.

```dart
FinBoxDcPlugin.forwardFinBoxNotificationToSDK(event.data);
```

## Multi-Process Support

DeviceConnect uses a content provider to auto initialize the SDK. The limitation with the OS is that content providers are only initialized once in a **multi-process application** and from the main process. For this reason, any calls to the SDK from other processes will lead to unstable behavior.

In case, you want to use the Flutter SDK from a process other than the main process, follow the two steps mentioned below to initialize the SDK.

### Remove the Content Provider

Remove the content provider that auto initializes the SDK from the Android Manifest file.

```xml
<provider
    android:name="in.finbox.mobileriskmanager.init.AutoInitProvider"
    android:authorities="in.finbox.lenderapplication.riskmanagerprovider"
    android:enabled="true"
    android:exported="false"
    tools:node="remove" />
```

### Initialize the SDK

Initialize the FinBox Flutter SDK in the `onCreate` method of FlutterApplication class.

```dart
FinBoxDcPlugin.initLibrary(this)
```

## Cancel Periodic Sync

If you have already set up the sync for the user, cancel the syncs using `stopPeriodicSync` method.

```dart
FinBoxDcPlugin.stopPeriodicSync();
```

## Handle Sync Frequency

By default sync frequency is set to **8 hours**, you can modify it by passing preferred time **in seconds** as an argument to `setSyncFrequency` method once the user is created.

```dart
FinBoxDcPlugin.setSyncFrequency(12 * 60 * 60);
```

## Reset User Data

In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method `resetData`.

```dart
FinBoxDcPlugin.resetData();
```

## Forget User

In case the user choose to be forgotten, use the method `forgetUser`. This will delete the user details in our system.

```dart
FinBoxDcPlugin.forgetUser();
```
