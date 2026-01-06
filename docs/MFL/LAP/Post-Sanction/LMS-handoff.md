<h2>LMS Handoff</h2>

<h3>First Tranche</h3>
<ul>
  <li>Ops user has to <strong>approve disbursement</strong> for the active tranche to initiate the LMS handoff on the Disbursement tab.</li>
  <li>Pre-checks/validations run on LMS handoff initiation for the first tranche. If any pre-check fails, LMS handoff is blocked:
    <ul>
      <li>All sanction conditions should be approved by Ops</li>
      <li>Ops checklist should be completed</li>
      <li>Disbursement date should be less than or equal to the LMS business date</li>
      <li>UCIC should be present for all applicant/co-applicants (fetched from PAN or mobile)</li>
      <li><code>isNPA</code> flag should be false for all applicant and co-applicants</li>
      <li>IFSC code should be present in the Bank master</li>
      <li>Pincode should be present in the Pincode master</li>
    </ul>
  </li>
  <li>LMS handoff for first tranche initiates the following series of APIs in order:
    <ul>
      <li>Create Customer – for primary applicant and all co-applicants</li>
      <li>Process Receipt – for IMD details (moved to journey after IMD is paid)</li>
      <li>Create Collateral</li>
      <li>Book Loan</li>
      <li>Process Instrumentation – for NACH details</li>
      <li>Create Document – series of 4 APIs</li>
    </ul>
  </li>
  <li>After initiation, Ops user can <strong>check status</strong> of the LMS workflow. Possible statuses:
    <ul>
      <li><strong>Payment initiated:</strong> LMS workflow started but status not fetched</li>
      <li><strong>Failed:</strong> Any pre-check fails or API failure (createCustomer, createCollateral, bookLoan)</li>
      <li><strong>Documents pending:</strong> First 5 APIs succeed, Create Document API in progress</li>
      <li><strong>Document failure:</strong> Create Document API fails</li>
      <li><strong>Disbursed:</strong> createCustomer, createCollateral, bookLoan APIs succeed; system doesn’t wait for NACH or Create Document API</li>
    </ul>
  </li>
  <li>Ops user can <strong>retrigger LMS handoff</strong> if status is “failed”. Retrigger resumes from the last failed API.</li>
  <li>If Create Document API fails, other documents are uploaded. Pre-checks re-run for retrigger:
    <ul>
      <li>Disbursement date ≤ LMS business date</li>
      <li>UCIC present for all applicants/co-applicants</li>
      <li><code>isNPA</code> flag = false</li>
    </ul>
  </li>
</ul>

<h3>Second / Subsequent Tranche</h3>
<ul>
  <li>Pre-checks/validations run before LMS handoff:
    <ul>
      <li>Disbursement date ≤ LMS business date</li>
    </ul>
  </li>
  <li>LMS handoff initiates the <strong>Disbursal API</strong>.</li>
  <li>Possible LMS statuses:
    <ul>
      <li>Failed</li>
      <li>Disbursed</li>
    </ul>
  </li>
  <li>Ops user can retrigger LMS handoff if status is “failed”. Pre-checks are re-run:
    <ul>
      <li>Disbursement date ≤ LMS business date</li>
    </ul>
  </li>
</ul>
