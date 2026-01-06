---
title: RCU Stage 1 Verification
---

<h2>RCU Stage 1 Verification</h2>

<p>
The BCM identifies the un-initiated <strong>RCU verification</strong> task in the
<strong>Verifications</strong> tab and initiates it.
</p>

<h3>Workflow Sequence</h3>
<p>
<strong>BCM → RCU Vendor → State-level RCU Manager</strong>
</p>

<h3>Task Assignment</h3>
<ul>
  <li>
    The BCM assigns the RCU task to an RCU vendor selected from the list of vendors
    mapped to the relevant state.
  </li>
  <li>
    Once assigned, the task appears in the RCU vendor’s queue.
  </li>
</ul>

<h3>RCU Vendor Activities</h3>
<ul>
  <li>Screen all customer-related documents uploaded in the system</li>
  <li>
    Provide a final RCU decision, optionally uploading a supporting report or
    document
  </li>
</ul>

<h3>Document Screening Statuses</h3>
<ul>
  <li><strong>Screened – cleared</strong></li>
  <li><strong>Sampled</strong> – requires further investigation</li>
  <li><strong>Hold</strong> – cannot be screened for some reason</li>
  <li><strong>Under review</strong> – default state, not yet screened</li>
</ul>

<h3>Documents Subject to Screening</h3>
<p>Screening is performed only on manually uploaded customer documents:</p>
<ul>
  <li>KYC Uploaded</li>
  <li>Financial Docs</li>
  <li>Address</li>
  <li>Collateral</li>
  <li>Additional Doc</li>
  <li>Business</li>
</ul>

<h3>Documents Excluded from Screening</h3>
<ul>
  <li>
    KYC documents fetched from third-party APIs (e.g. Digilocker)
  </li>
  <li>
    System-generated or internal categories such as
    <strong>“Verifications”</strong>
  </li>
</ul>

<h3>Screening Validation Rules</h3>
<ul>
  <li>
    If any document remains in <strong>Hold</strong> or
    <strong>Under review</strong>, the system blocks:
    <ul>
      <li>Final RCU decision submission</li>
      <li>Progression of the RCU workflow</li>
    </ul>
  </li>
</ul>

<h3>Final RCU Decisions (Vendor)</h3>
<ul>
  <li><strong>Positive</strong></li>
  <li><strong>Negative</strong></li>
  <li><strong>Could not verify</strong></li>
  <li><strong>Refer to Credit</strong></li>
  <li><strong>R-Doc</strong></li>
  <li><strong>R-Profile</strong></li>
  <li>
    <strong>Hold</strong> – sends the task back to the BCM for resolution, after
    which the BCM can reassign it to the RCU vendor
  </li>
</ul>

<h3>Escalation to State-level RCU Manager</h3>
<p>The task is escalated automatically if:</p>
<ul>
  <li>Any document is marked <strong>Sampled</strong></li>
  <li>
    The vendor’s final decision is:
    <strong>
      Negative, Could not verify, Refer to Credit, R-Doc, or R-Profile
    </strong>
  </li>
</ul>

<p>
If neither condition is met, the RCU flow ends with the vendor’s decision.
</p>

<h3>State-level RCU Manager Capabilities</h3>
<ul>
  <li>Screen documents</li>
  <li>Modify document screening statuses</li>
  <li>Override the vendor’s final decision</li>
  <li>
    The manager <strong>cannot</strong> use the
    <strong>“Hold”</strong> status while screening documents
  </li>
</ul>

<h3>Final Decision by RCU Manager</h3>
<ul>
  <li>
    The RCU manager can select <strong>Hold</strong> as the final decision to send
    the task back to the BCM for clarification
  </li>
  <li>
    The BCM can reassign the task to the RCU manager after addressing the issues
  </li>
  <li>
    Once the RCU manager records a final decision, the RCU workflow
    <strong>ends</strong>
  </li>
</ul>

<h3>Post-RCU Actions</h3>
<ul>
  <li>
    Based on the final RCU outcome, the BCM can raise RCU-related deviations in the
    Deviations module
  </li>
  <li>
    In future phases, these deviations will be auto-triggered by the system
  </li>
</ul>
