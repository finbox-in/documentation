# DeviceConnect: Integration Flow

Follow the steps below to securely collect device intelligence and access real-time insights via FinBox.

DeviceConnect SDK Integration Summary:

**1. User Permissions & Consent**:

* Ask for user permissions to enable anonymized device data collection.
* Make sure your app complies with relevant privacy and regulatory requirements.
* Clearly show the purpose of data collection to build user trust.

**2. SDK Initialization & User Creation**:

* Initialize the SDK early in your app’s lifecycle
* Assign a unique, custom-generated user hash — no PII should be used or stored
* Start periodic syncing to ensure data is sent to FinBox servers

**3. Intelligent Data Synchronization**:

* Once periodic syncing is enabled, anonymized device data is automatically sent to FinBox every 8 hours

::: tip Advanced Features
Fraud Detection – Detect risky behavior using device-level signals in near real time.

On-Demand Sync – Trigger data syncs manually to fetch the latest behavioral signals, even if the app is inactive
:::

**4. Real-Time Decisioning via Insights API**:

* Use the Insights API to access processed data and actionable insights.

* Integrate it into your credit decisioning or risk models to support:

  * Credit underwriting
  * Fraud risk checks
  * Customer segmentation & personalization

<img src="/device_connect_integration.svg" alt="Device Connect Integration Workflow" style="width:150%;height:150%" />

Explore the [Data Collection](/device-connect/mobile-integration.html), followed by [Fetching Insights and Predictors](/device-connect/insights-integration-flow.html) sections for better understanding
