<h2>LMS Handoff</h2>

<h3>First Tranche</h3>

<ul>
  <li>Ops user has to ‘approve disbursement’ for the active tranche to initiate the LMS handoff on disbursement tab</li>
</ul>

<h4>Pre-checks/validations</h4>
<p>
Pre-checks/validations run on LMS handoff initiation for the first tranche. If any pre-check fails, LMS handoff is blocked:
</p>

<ul>
  <li>All sanction conditions should be approved by Ops</li>
  <li>Ops checklist should be completed</li>
  <li>Disbursement date should be less than or equal to the LMS business date</li>
  <li>UCIC should be present for all applicant/co-applicants (fetched from PAN or mobile)</li>
  <li>“isNPA” flag should be false for all applicant and co-applicants</li>
  <li>IFSC code should be present in the Bank master</li>
  <li>Pincode should be present in the Pincode master</li>
</ul>

<h4>LMS handoff APIs (First Tranche)</h4>
<p>
LMS handoff for first tranche initiates the below series of APIs in the following order:
</p>

<ol>
  <li>Create Customer - for primary applicant and all co-applicants</li>
  <li>Process Receipt - For IMD details - This will be moved to journey now just after IMD is paid and not in the disbursal workflow</li>
  <li>Create Collateral</li>
  <li>Book Loan</li>
  <li>Process Instrumentation - For NACH details</li>
  <li>Create Document - Series of 4 APIs</li>
</ol>

<h4>LMS Workflow Status</h4>
<p>
After LMS handoff is initiated, Ops user gets an option to “check status” of the LMS workflow. List of possible statuses:
</p>

<ul>
  <li>“Payment initiated” - When LMS workflow initiated but status not fetched</li>
  <li>“Failed” - When any any pre-checks fails or any API out of the following fail: createCustomerAPI, createCollateral, bookLoan</li>
  <li>“Documents pending” - This is a substatus - When first 5 APIs are successful (till Process instrumentation) and Create Document API is in progress (this API might take some time, depends on number of documents)</li>
  <li>“Document failure” - This is a substatus - When Create Document API fails</li>
  <li>“Disbursed” - When createCustomer, createCollateral, bookLoan APIs are successful. System doesn't wait for the status of NACH API or createDocument API</li>
</ul>

<h4>Retrigger Logic</h4>

<ul>
  <li>Ops user gets an option to retrigger LMS handoff (“retrigger disbursement” button) if the status is “failed”</li>
  <li>Retrigger option resumes the LMS workflow from the API which last failed</li>
  <li>Currently there is no option to retrigger from UI if either of NACH/Document APIs fail i.e. after the status of tranche is "Disbursed. Functionality to be added</li>
  <li>If Create Document API fails due to any document, rest other documents are uploaded</li>
</ul>

<p>
If LMS handoff is re-triggered in failure scenarios, following pre-checks are re-run:
</p>

<ul>
  <li>Disbursement date should be less than or equal to the LMS business date</li>
  <li>UCIC should be present for all applicant/co-applicants (fetched from PAN or mobile)</li>
  <li>“isNPA” flag should be false for all applicant and co-applicants</li>
</ul>

<hr />

<h3>Second / Subsequent Tranche</h3>

<h4>Pre-checks/validations</h4>
<p>
Pre-checks/validations run on initiating LMS handoff for second/subsequent tranches:
</p>

<ul>
  <li>Disbursement date should be less than or equal to the LMS business date</li>
</ul>

<h4>LMS handoff APIs (Second / Subsequent Tranche)</h4>
<ul>
  <li>Disbursal API</li>
</ul>

<h4>LMS Workflow Status</h4>
<p>
List of the possible statuses of the LMS handoff for second/subsequent tranches:
</p>

<ul>
  <li>Failed</li>
  <li>Disbursed</li>
</ul>

<h4>Retrigger Logic</h4>
<ul>
  <li>Ops user gets an option to retrigger LMS handoff for second/subsequent tranches if the status is “failed”</li>
</ul>

<p>
If LMS handoff is re-triggered in case of failure for second/subsequent tranches, following pre-checks are re-run:
</p>

<ul>
  <li>Disbursement date should be less than or equal to the LMS business date</li>
</ul>
