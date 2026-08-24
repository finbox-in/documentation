<h2>RCU Stage-2</h2>

<p>CO can initiate RCU Stage 2 – Document Vetting after the final sanction (“Loan Sanctioned” stage). This process enables the RCU team to verify the original collateral documents for authenticity.</p>

<p>The CO can view the uninitiated “RCU Document Vetting” task in the <strong>Verifications</strong> tab → <strong>Other Verifications</strong> sub-tab.</p>

<p>The RCU Document Vetting workflow follows this sequence: <strong>BCM → RCU Vendor → RCU Manager (State-level)</strong></p>

<h3>Document Upload</h3>
<ul>
  <li>CO uploads the original collateral documents under the <strong>All Documents</strong> tab in the <strong>Collateral</strong> category. The CO may replace any previously uploaded photocopies or original documents.</li>
  <li>Document upload is optional at this stage; there is currently no system validation or hard stop to enforce mandatory collateral document uploads.</li>
  <li>The system does not restrict the CO from uploading documents in other categories, such as Financial or Address.</li>
</ul>

<h3>Task Assignment</h3>
<ul>
  <li>After uploading the collateral documents, the CO assigns the vetting task to an RCU vendor to initiate document vetting. The CO selects the vendor from a list mapped to the respective state.</li>
  <li>Once the task is assigned, it appears in the queue of the respective RCU vendor.</li>
</ul>

<h3>RCU Vendor Actions</h3>
<ul>
  <li>Screens the original collateral documents uploaded by the CO. (If no new documents are uploaded, screening is not required)</li>
  <li>Submits a decision on document vetting, optionally attaching a vetting report or supporting document.</li>
</ul>

<h4>Document Screening Statuses</h4>
<ul>
  <li><strong>Screened:</strong> Document is verified and approved</li>
  <li><strong>Sampled:</strong> Requires further investigation</li>
  <li><strong>Hold:</strong> Screening cannot be performed due to an issue</li>
  <li><strong>Under Review:</strong> Default status indicating pending screening</li>
</ul>

<p>If any document is marked as Hold or remains in Under Review, the system does not allow the vendor to provide a final vetting decision or progress the task further.</p>

<h3>RCU Vendor Decision Options</h3>
<ul>
  <li>Positive</li>
  <li>Negative</li>
  <li>Could Not Verify</li>
  <li>Refer to Credit</li>
  <li>R-Doc</li>
  <li>R-Profile</li>
  <li>Hold: Sends the vetting task back to the CO to resolve queries. The task moves to the same CO’s queue, and the CO can resend it to the vendor after addressing the observations or adding clarifications/documents.</li>
</ul>

<h3>Routing to State-level RCU Manager</h3>
<ul>
  <li>Once the RCU vendor submits a decision, the task is automatically routed to the State-level RCU Manager if either of the following conditions is met:
    <ul>
      <li>At least one document is marked as Sampled, or</li>
      <li>The vendor’s decision is one of: Negative, Could Not Verify, Refer to Credit, R-Doc, or R-Profile</li>
    </ul>
  </li>
  <li>If neither condition is met, the RCU vetting workflow ends after the vendor’s decision.</li>
  <li>If routed to the State-level RCU Manager, the manager can perform all actions that the vendor can, including screening documents and providing a final decision.</li>
  <li>The RCU manager can also override the vendor’s actions, such as changing document screening statuses or vetting decisions.</li>
  <li>The RCU manager does not have access to the Hold status when screening individual documents.</li>
  <li>The RCU manager can give the overall vetting decision as Hold to send the task back to the CO for clarification. Once the CO provides the required inputs, the task can be resent to the RCU manager for final review.</li>
</ul>

<p>After the RCU manager provides the final decision, the RCU vetting workflow concludes.</p>

<p>Based on the final RCU decision, the CO can raise relevant RCU deviations in the Deviations Module.</p>
