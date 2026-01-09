<h2>Post Sanction</h2>

<p>When the case is finally sanctioned, it moves from the "In-principle sanctioned" stage to the "Loan sanctioned" stage (Post sanction stage). The CO performs the following activities in this stage:</p>

<ul>
  <li>Property Document Collection</li>
  <li>Insurance</li>
  <li>Pennydrop</li>
  <li>NACH</li>
  <li>Agreement (Emudra)</li>
  <li>RCU stage 2</li>
  <li>Closing out Sanction Conditions</li>
</ul>

<p>The CO will also check if all sanction conditions have been met and will mark each condition as <strong>complied</strong>, <strong>waived off</strong>, <strong>PDD</strong>, or <strong>OTC</strong>. Approvals for conditions marked as waived-off, PDD, or OTC must be done by the designated authority (as per MFL logic) before the case can move to the next stage.</p>

<h3>Key sequence and related validations:</h3>
<ul>
  <li>Insurance must be performed before Penny drop.</li>
  <li>Penny drop must be performed before E-NACH.</li>
  <li>E-NACH must be performed before E-signing.</li>
  <li>RCU stage 2 can be performed in parallel to the above activities but is mandatory in this stage.</li>
</ul>

<p>After the loan sanction state, the case will move to the <strong>Disbursal Ready</strong> state:</p>
<ul>
  <li>CO can initiate disbursal.</li>
  <li>BPO2 can perform their checks.</li>
  <li>Ops can perform their checks.</li>
</ul>

<p>For multi-tranche disbursal:</p>
<ul>
  <li>Once one tranche is disbursed, the case moves to <strong>Partially Disbursed</strong>, where CO, BPO2, and Ops can perform their tasks for subsequent tranches.</li>
</ul>

<p>For single tranche disbursal:</p>
<ul>
  <li>The case moves directly to <strong>Disbursed</strong> state once completed.</li>
</ul>

<p>Once the entire loan disbursement is completed, the case moves to <strong>Disbursed</strong> state.</p>

<p>For reporting and "My Queue" purposes, the case can be identified with a combination of <strong>task_type</strong> and <strong>task_state</strong> at any given point:</p>
<ul>
  <li>For the first tranche, <strong>task_type</strong> will be <em>Disbursal Ready</em> and <strong>task_state</strong> will indicate the responsible party (CO, BPO2, Ops, etc.).</li>
  <li>For subsequent tranches, <strong>task_type</strong> will be <em>Partially Disbursed</em> and <strong>task_state</strong> will indicate the responsible party (CO, BPO2, Ops, etc.).</li>
</ul>
