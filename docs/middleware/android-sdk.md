# FinBox Lending: Android

FinBox Lending SDK is a drop-in module that can add a digital lending journey to any mobile application.

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

## Adding Dependency

Add the repository url to `allprojects` in the project `build.gradle` file.

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
        includeGroup("in.finbox")
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
implementation ("in.finbox.lending:onboarding:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox', module: 'mobileriskmanager'
    exclude group: 'in.finbox', module: 'common'
    exclude group: 'in.finbox', module: 'logger'
    isTransitive = true
}
implementation ("in.finbox.lending:preloan:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:dashboard:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:kyc:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:loan:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:esign:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:enach:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:payment:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:bankconnect:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    exclude group: 'in.finbox', module: 'bankconnect'
    isTransitive = true
}
implementation ("in.finbox.lending:pennydrop:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:gst:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:videokyc:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    isTransitive = true
}
implementation ("in.finbox.lending:core:<LENDING_SDK_VERSION>:release@aar") {
    isTransitive = true
}
implementation('in.finbox:mobileriskmanager:<DC_SDK_VERSION>:parent-release@aar') {
    isTransitive = true
}
implementation('in.finbox:common:<COMMON_SDK_VERSION>:<PLATFORM_NAME>-release@aar') {
    isTransitive = true
}
implementation("in.finbox:logger:<LOGGER_SDK_VERSION>:parent-release@aar") {
    isTransitive = true
}
implementation('in.finbox:bankconnect:<BC_SDK_VERSION>:release@aar') {
    isTransitive = true
}
```

</template>
<template v-slot:groovy>

```groovy
implementation ("in.finbox.lending:onboarding:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox', module: 'mobileriskmanager'
    exclude group: 'in.finbox', module: 'common'
    exclude group: 'in.finbox', module: 'logger'
    transitive = true
}
implementation ("in.finbox.lending:preloan:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:dashboard:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:kyc:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:loan:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:esign:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:enach:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:payment:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:bankconnect:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    exclude group: 'in.finbox', module: 'bankconnect'
    transitive = true
}
implementation ("in.finbox.lending:pennydrop:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:gst:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:videokyc:<LENDING_SDK_VERSION>:release@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
implementation ("in.finbox.lending:core:<LENDING_SDK_VERSION>:release@aar") {
    transitive = true
}
implementation('in.finbox:mobileriskmanager:<DC_SDK_VERSION>:parent-release@aar') {
    transitive = true
}
implementation('in.finbox:common:<COMMON_SDK_VERSION>:<PLATFORM_NAME>-release@aar') {
    transitive = true
}
implementation("in.finbox:logger:<LOGGER_SDK_VERSION>:parent-release@aar") {
    transitive = true
}
implementation('in.finbox:bankconnect:<BC_SDK_VERSION>:release@aar') {
    transitive = true
}
```

</template>
</CodeSwitcher>

::: tip Note
The following keys will be shared over an email
- `ACCESS_KEY`
- `SECRET_KEY`
- `LENDING_SDK_VERSION`
- `DC_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `LOGGER_SDK_VERSION`
- `BC_SDK_VERSION`
- `PLATFORM_NAME`
:::

## Permissions

Lending SDK requires `SMS` and `Location` permission as mandatory. Make sure you **dont** have any node markers that remove these permissions in your manifest file

Manifest **should not** have any of the following
```xml
<uses-permission
    android:name="android.permission.RECEIVE_SMS"
    tools:node="remove" />
<uses-permission
    android:name="android.permission.READ_SMS"
    tools:node="remove" />
<uses-permission
    android:name="android.permission.ACCESS_COARSE_LOCATION"
    tools:node="remove" />
<uses-permission
    android:name="android.permission.ACCESS_FINE_LOCATION"
    tools:node="remove" />
```

:::warning ProGuard
While generating a signed application, make sure **ProGuard** file uses `proguard-android.txt` **not** `proguard-android-optimize.txt`, i.e. make sure it is:

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
```

</template>
<template v-slot:groovy>

```groovy
proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
```

</template>
</CodeSwitcher>

:::

## Start SDK flow

Once all dependencies are added, SDK requires 3 inputs: `CUSTOMER_ID`, `USER_TOKEN` and `CLIENT_API_KEY`.
`ENVIRONMENT` is an optional field. Default value of environment is `PROD`.

::: tip Note
`USER_TOKEN` needs to be generated against a `CUSTOMER_ID` on backend before starting the SDK. Refer [here](/middleware/sourcing-rest-api.html#generate-token)

`ENVIRONMENT` needs to be updated to `PROD` when migrating application to production.
:::

In the `onCreate` of your application class initialize dependencies required by the SDK:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
CoreApp.initDi(this)
```
</template>
<template v-slot:java>

```java
CoreApp.Companion.initDi(this)
```
</template>
</CodeSwitcher>

Now that all required parameters are available, we can start the SDK flow as follows:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val REQUEST_CODE_ONBOARDING = 101
val builder = FinBoxLending.Builder(context)
    .setLendingEnvironment("<ENVIRONMENT>")
    .setCustomerId("<CUSTOMER_ID>")
    .setFinBoxApiKey("<CLIENT_API_KEY>")
    .setUserToken("<USER_TOKEN>")
    .build()

startActivityForResult(
    builder.getLendingIntent(context),
    REQUEST_CODE_ONBOARDING
)
```

</template>
<template v-slot:java>

```java
private String REQUEST_CODE_ONBOARDING = 101;
FinBoxLending builder = FinBoxLending.Builder(context)
    .setLendingEnvironment(<ENVIRONMENT>)
    .setCustomerId(<CUSTOMER_ID>)
    .setFinBoxApiKey(<CLIENT_API_KEY>)
    .setUserToken(<USER_TOKEN>)
    .build();

startActivityForResult(
 builder.getLendingIntent(getContext()),
 REQUEST_CODE_ONBOARDING
)

```

</template>
</CodeSwitcher>

## Credit Line

For credit line journey, include the following dependency in the app `build.gradle` file:
```groovy
implementation("in.finbox.lending:creditline:<LENDING_SDK_VERSION>:uat@aar") {
    exclude group: 'in.finbox.lending', module: 'core'
    transitive = true
}
```

In case of credit line product, once the lending journey is completed, user can opt-in for a credit while doing a transaction. For such a case use following method to start the credit line withdrawl journey:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val REQUEST_CODE_ONBOARDING = 101
val builder = FinBoxLending.Builder(context)
    .setLendingEnvironment(<ENVIRONMENT>)
    .setCustomerId("<CUSTOMER_ID>")
    .setFinBoxApiKey("<CLIENT_API_KEY>")
    .setUserToken("<USER_TOKEN>")
    .setCreditLineAmount(<WITHDRAW_AMOUNT>)
    .setCreditLineTransactionId("<TRANSACTION_ID>")
    .build()

startActivityForResult(
    builder.getLendingIntent(context),
    REQUEST_CODE_ONBOARDING
)
```

</template>
<template v-slot:java>

```java
private String REQUEST_CODE_ONBOARDING = 101;
FinBoxLending builder = FinBoxLending.Builder(context)
    .setLendingEnvironment(<ENVIRONMENT>)
    .setCustomerId("<CUSTOMER_ID>")
    .setFinBoxApiKey("<CLIENT_API_KEY>")
    .setUserToken("<USER_TOKEN>")
    .setCreditLineAmount(<WITHDRAW_AMOUNT>)
    .setCreditLineTransactionId("<TRANSACTION_ID>")
    .build();

startActivityForResult(
 builder.getLendingIntent(getContext()),
 REQUEST_CODE_ONBOARDING
)

```
</template>
</CodeSwitcher>

- `setCreditLineAmount` is the method that will contain the amount (in **Float**) that a user is trying to withdraw
- `setCreditLineTransactionId` will hold the transaction id (in **String**) for the withdrawal flow

## Callback

The callback will be provided when the user exits the SDK. You can track the status of user exit actions in the `onActivityResult` callback function

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (requestCode == REQUEST_CODE_ONBOARDING) {
        val result = data.extras.getParcelable<FinBoxJourneyResult>(FINBOX_JOURNEY_RESULT)
        // callback when user exits the flow, intent data has information holding users state
    }
}
```

</template>
<template v-slot:java>

```java
import static in.finbox.lending.core.constants.ConstantKt.FINBOX_JOURNEY_RESULT;
import static in.finbox.lending.core.constants.ConstantKt.FINBOX_RESULT_CODE_ERROR;
import static in.finbox.lending.core.constants.ConstantKt.FINBOX_RESULT_CODE_SUCCESS;


@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (data != null && data.getExtras() != null) {
        FinBoxJourneyResult result = data.getExtras().getParcelable(FINBOX_JOURNEY_RESULT);
        if (result.getResultCode().equals(FINBOX_RESULT_CODE_SUCCESS)) {

        } else if (result.getResultCode().equals(FINBOX_RESULT_CODE_ERROR)) {

        } else if (result.getResultCode().equals(FINBOX_RESULT_CODE_ERROR)) {

        }
    }
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

Possible values for `screen` are as follows:
| Screen | Description |
| - | - | - |
| `Launcher` | The base screen (Hidden Activity) |
| `Permissions` | Permission list screen |
| `Profile` | Basic profile screen |
| `PAN Consent` | PAN consent screen |
| `Dashboard` | Dashboard screen |
| `Loan Form` | Loan application screen |
| `KYC` | KYC screen |
| `Bank Verification` | Bank verification screen |
| `Loan Offer` | Loan details screen |
| `Sign Agreement` | Sign agreement screen |


## Notifications

FinBox Lending SDK sends notifications of its own for mandatory events. It is expected that the client app has Firebase configured and can forward the notification payload to the SDK. In order for SDK to capture the notifications add the following:

1. implement `FinBoxLendingMessagingImpl` interface
2. Override `getLendingIntent` & `getRepayLendingIntent` to provide intent to open the SDK
3. initialize the lending messaging service
4. `forwardToFinBoxLendingSDK` will check if the notification payload was triggered by FinBox lending team
5. `buildLendingNotification` will build the notification and show it to the user

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin

class SampleMessService: FirebaseMessagingService(), FinBoxLendingMessagingImpl {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        FinBoxLendingMessagingService.initLendingMessagingService(this)
        //.... Client app level logic
        if (remoteMessage.data.isNotEmpty()) {
            if (FinBoxLendingMessagingService.forwardToFinBoxLendingSDK(remoteMessage.data)) {
                FinBoxLendingMessagingService.buildLendingNotification(applicationContext, remoteMessage)
            } else {
                // Show client app notification
            }
        }
    }

    override fun getLendingIntent(): PendingIntent {
        val intent = generateFinBoxLending().getLendingIntent(applicationContext)
        // Create the TaskStackBuilder
        return PendingIntent.getActivity(
            this,
            REQUEST_CODE_NOTIFICATION_LOAN_STATUS,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT
        )
    }

    override fun getRepayLendingIntent(): PendingIntent {
        val intent = generateFinBoxLending().getRepayLendingIntent(applicationContext)
        // Create the TaskStackBuilder
        return PendingIntent.getActivity(
            this,
            REQUEST_CODE_NOTIFICATION_LOAN_REPAY_STATUS,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT
        )
    }

    //Common builder object to start lending SDK
    private fun generateFinBoxLending(): FinBoxLending {
        val builder = FinBoxLending.Builder(applicationContext)
            .setLendingEnvironment(<ENVIRONMENT>)
            .setFinBoxApiKey("<CLIENT_API_KEY>")
            .setCustomerId("<CUSTOMER_ID>")
            .setUserToken("<USER_TOKEN>")
            .build()
        return builder
    }
}

```

</template>
<template v-slot:java>

```java
class SampleMessService extends FirebaseMessagingService implements FinBoxLendingMessagingImpl {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        FinBoxLendingMessagingService.INSTANCE.initLendingMessagingService(this);
        //.... Client app level logic
        if(!remoteMessage.getData().isEmpty()) {
            if (FinBoxLendingMessagingService.INSTANCE.forwardToFinBoxLendingSDK(remoteMessage.getData())) {
                FinBoxLendingMessagingService.INSTANCE.buildLendingNotification(getApplicationContext(), remoteMessage);
            } else {
                // Show app notification
            }
        }
    }

    @NotNull
    @Override
    public PendingIntent getLendingIntent() {
        Intent intent = generateFinBoxLending().getLendingIntent(getApplicationContext());
        return PendingIntent.getActivity(
                this,
                REQUEST_CODE_NOTIFICATION_LOAN_STATUS,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT
        );
    }

    @NotNull
    @Override
    public PendingIntent getRepayLendingIntent() {
        Intent intent = generateFinBoxLending().getRepayLendingIntent(getApplicationContext());
        return PendingIntent.getActivity(
                this,
                REQUEST_CODE_NOTIFICATION_LOAN_REPAY_STATUS,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT
        );
    }

    //Common builder object to start lending SDK
    private FinBoxLending generateFinBoxLending() {
        FinBoxLending builder = null;
        try {
            builder = new FinBoxLending.Builder(getApplicationContext())
                    .setLendingEnvironment(<ENVIRONMENT>)
                    .setFinBoxApiKey("<CLIENT_API_KEY>")
                    .setCustomerId("<CUSTOMER_ID>")
                    .setUserToken("<USER_TOKEN>")
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return builder;
    }
}

```

</template>
</CodeSwitcher>
 
## Customizations

1. The privacy policy URL needs to be updated to the company policy. The default privacy policy is pointing to FinBox privacy. Add a String resource to specify the policy URL.

```xml
<string name="finbox_lending_privacy_policy_url">https://finbox.in/about/privacy</string>
```

::: tip Note
Make sure the value passed is a valid URL
:::

2. The toolbar title can be updated which will be visible in the Dashboard module. In order to update the toolbar just add a String resource for the same.

```xml
<string name="finbox_appbar_title">My App</string>
```

3. SDK fonts can be customised to match the parent application. The SDK used 3 main fonts as mentioned below:

```xml
<style name="FBLendingAppTheme.FinBox.TextPrimary" parent="TextAppearance.AppCompat">
    <item name="fontFamily">bold-font</item>
</style>

<style name="FBLendingAppTheme.FinBox.TextSecondary" parent="TextAppearance.AppCompat">
    <item name="fontFamily">regular-font</item>
</style>

<style name="FBLendingAppTheme.FinBox.TextSubHead" parent="TextAppearance.AppCompat">
    <item name="fontFamily">semibold-font</item>
</style>
```

- `FBLendingAppTheme.FinBox.TextPrimary` is used for all buttons and bold headers
- `FBLendingAppTheme.FinBox.TextSecondary` is the regular font that is used for regular text
- `FBLendingAppTheme.FinBox.TextSubHead` is the medium bold font that is used for Sections or subheadings

Customize the SDK font by adding the application `fontFamily` in the styles.

4. SDK Buttons can be customized by overriding `FBLendingAppTheme`

```xml
<style name="FBLendingAppTheme.FinBox.Button" parent="Widget.MaterialComponents.Button">
    <item name="cornerRadius">16dp</item>
    <item name="fontFamily">button-font</item>
</style>

<style name="FBLendingAppTheme.FinBox.TextButton" parent="Widget.MaterialComponents.Button.TextButton"></style>
```

Change button corner radius and text font as per your application theme.
