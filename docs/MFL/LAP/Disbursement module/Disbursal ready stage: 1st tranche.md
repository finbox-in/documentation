<h2>Disbursal Ready Stage: CO</h2>

<ul>
  <li>Application in <strong>Ready for Disbursal</strong> stage is auto-assigned to the same CO who forwards the case from <strong>Loan Sanctioned</strong> stage and reflects in that CO’s queue.</li>
  <li><strong>Net Payment Amount</strong> = Sanctioned Loan Amount − Total Deductions (refer separate product note on deductions).</li>
</ul>

<h3>Disbursement Request Creation</h3>
<ul>
  <li>CO can create a disbursement request in the <strong>Ready for Disbursal</strong> stage based on Net Payment Amount.</li>
  <li><strong>Single Tranche</strong>: Tranche amount is auto-populated and equals Net Payment Amount.</li>
  <li><strong>Multi Tranche</strong>:
    <ul>
      <li>CO enters tranche amount.</li>
      <li>Each tranche amount must be ≤ Net Payment Amount.</li>
      <li>Sum of all tranche amounts must equal Net Payment Amount.</li>
    </ul>
  </li>
  <li>CO can select only the <strong>current date</strong> as disbursement date. Past or future dates are not allowed.</li>
</ul>

<h3>Payment Details</h3>
<ul>
  <li>CO selects payment type:
    <ul>
      <li>Single Payment Advice</li>
      <li>Multiple Payment Advice (Split Payments)</li>
    </ul>
  </li>
  <li>For single payment advice, amount is auto-set as tranche amount.</li>
  <li>For multiple payment advice, sum of all split payments must equal tranche amount.</li>
  <li>Allowed payment modes:
    <ul>
      <li>Electronic Fund Transfer (NEFT / RTGS)</li>
      <li>Cheque</li>
    </ul>
  </li>
  <li>For EFT:
    <ul>
      <li>Payment &lt; 2 lakhs → NEFT only</li>
      <li>Payment ≥ 2 lakhs → RTGS only</li>
      <li>Sub-mode auto-selected based on amount</li>
      <li>Ops selects one customer bank account (currently only penny-drop verified account available)</li>
    </ul>
  </li>
  <li>For Cheque:
    <ul>
      <li>Ops enters “In Favour Of” details</li>
      <li>No bank account details collected</li>
      <li>Penny-drop account number is passed to LMS createLoan API</li>
    </ul>
  </li>
  <li>Since penny drop is performed on only one account, the same account is used for all split payments and passed to LMS.</li>
</ul>

<ul>
  <li>Disbursement request creates a disbursement task. Application stage remains <strong>Ready for Disbursal</strong> until tranche is disbursed.</li>
  <li>After disbursement:
    <ul>
      <li>Single tranche → Application moves to <strong>Fully Disbursed</strong></li>
      <li>Multi tranche → Application moves to <strong>Partially Disbursed</strong></li>
    </ul>
  </li>
  <li>CO can edit or delete the disbursement request as long as the task is in CO’s queue.</li>
  <li>CO cannot create another disbursement request if an active disbursement request exists.</li>
  <li>CO can send the disbursement task to BPO.</li>
</ul>

<hr/>

<h2>Disbursal Ready Stage: BPO</h2>

<ul>
  <li>Disbursement task appears in BPO pool.</li>
  <li>BPO Manager can self-assign or assign the task to BPO child users.</li>
  <li>BPO child users can only self-assign the task.</li>
  <li>BPO completes checklist questionnaires under:
    <ul>
      <li>Primary Verifications tab</li>
      <li>Checklist tab</li>
    </ul>
  </li>
  <li>BPO can send the task to Ops. Hard stop applies if checklist is incomplete.</li>
  <li>BPO can send the task back to CO.</li>
</ul>

<hr/>

<h2>Disbursal Ready Stage: Ops</h2>

<ul>
  <li>Disbursement task appears in Ops pool and must be self-assigned.</li>
  <li>Ops completes checklist questionnaires under:
    <ul>
      <li>Primary Verifications tab</li>
      <li>Checklist tab</li>
    </ul>
  </li>
  <li>Ops can edit disbursement date:
    <ul>
      <li>Allowed dates: T, T-1, T-2</li>
      <li>If CO-selected date is older than T-2, Ops must reselect</li>
    </ul>
  </li>
  <li>Selected disbursement date must be ≤ LMS business date. FinBox validates this.</li>
  <li>If LMS date validation fails, disbursal reverts to un-initiated state with Ops access restored.</li>
  <li>Ops approves the disbursement task to trigger LMS handoff.</li>
  <li>Tranche is marked <strong>Disbursed</strong> once APIs up to Process Instrumentation succeed and LAN is generated.</li>
  <li>Document upload failures do not block disbursement. Ops handles document upload later in LMS.</li>
  <li>Ops can send the task back to CO or BPO.</li>
</ul>
