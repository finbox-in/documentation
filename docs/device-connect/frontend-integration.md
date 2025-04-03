# DeviceConnect: Frontend Integration Flow

DeviceConnect empowers businesses with real-time, anonymized data intelligence to drive smarter decision-making. Follow these key integration steps to ensure a seamless and privacy-compliant implementation

The frontend integration process consists of three key steps.

<img src="/device_connect_android_integration.jpg" alt="Device Connect Android Integration Workflow" style="width:80%;height:80%" />

### Step 1: Requesting Runtime Permissions

Implement a Consent Screen to show the permissions being requested and explain their benefits to the user.

Refer to the [Handle Permissions](/device-connect/permissions.html#runtime-permissions-added-by-the-sdk) section for the complete list of permissions required by the SDK. To exclude unnecessary permissions, use the node marker value `remove` mentioned in the same section.

### Step 2: Creating the User

After obtaining runtime permissions, create a unique user within the FinBox system. To do this, you can call the `createUser` method with a specified `CUSTOMER_ID`  which serves as a unique identifier for the user.  

The `createUser` method not only creates a user in the FinBox system but also serves as a validation check for your API credentials. This ensures that the credentials provided during integration are authorized and correct, allowing subsequent steps, such as data syncing, to proceed securely.

For sample code and response details, Refer to section [Create User](/device-connect/android.html#create-user)

::: tip TIP

- Avoid using sensitive personal identifiers like phone numbers or email addresses to ensure user anonymity, when creating the `CUSTOMER_ID`
- Call the `createUser` method even if some permissions are denied by the user. The SDK will automatically sync data based on the granted permissions.
:::

### Step 3: Initiating Data Synchronization

Call `createUser`, and after receiving a successful response, invoke the `startPeriodicSync` function. 
(Refer [Start Periodic Sync](/device-connect/android.html#start-periodic-sync) section)

This function ensures data collection both during the user journey and in the background while the app is running.

If a user initially denies a permission but grants it later, the SDK will automatically collect the data during the next scheduled sync (as per the set frequency). 

::: danger IMPORTANT

- Call `createUser` every time the user opens the app, and on success, call `startPeriodicSync`. This keeps background syncing active, adapts to any permission changes, and ensures a steady connection with FinBox servers.
- Forward notifications to the SDK to handle background process interruptions (Refer to Forward Notifications to SDK). Refer to [Forward Notifications to SDK](/device-connect/android.html#forward-notifications-to-sdk)
- For multi-process applications, manually initialize the SDK before calling createUser. Refer to [Multi-Process Support](/device-connect/android.html#multi-process-support) section for such cases.
:::

:::tip Integrate Today!
Drive Smarter Decisions with DeviceConnect
:::