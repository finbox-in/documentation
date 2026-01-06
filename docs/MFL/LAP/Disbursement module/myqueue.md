<h2>My Queue Behaviour</h2>

<h3>Disbursal Module: My Queue Policies</h3>

<h3>Disbursal Ready Stage: CO</h3>
<ul>
  <li>CO can see the <strong>disbursal_ready</strong> application in <strong>My Queue</strong>.</li>
  <li>The main task in Disbursal Ready stage is auto-assigned to the same CO who forwarded the case from <strong>Loan Sanctioned</strong> stage.</li>
  <li>The disbursement task is automatically assigned to the same CO who creates the disbursement request.</li>
</ul>

<h3>Disbursal Ready Stage: BPO</h3>
<ul>
  <li>BPO Manager and BPO Child users can see the disbursement task in their pool.</li>
  <li>BPO Manager can self-assign the task or assign it to any child user.</li>
  <li>BPO Child user can only self-assign the task and cannot assign it to others.</li>
  <li>BPO users do not get edit access unless they self-assign the task.</li>
</ul>

<h3>Disbursal Ready Stage: Ops</h3>
<ul>
  <li>Ops user can see the disbursement task in their pool.</li>
  <li>Ops user must self-assign the task to edit anything.</li>
  <li>In <strong>Disbursement Triggered</strong> state, the task is auto-assigned to the same Ops user who had it in <strong>Pending on Ops</strong> state.</li>
  <li>In <strong>Disbursement Approved</strong> state, the task is unassigned from Ops and appears only in <strong>All Cases</strong>, not in My Queue or Pool.</li>
  <li>When the application state becomes <strong>Fully Disbursed</strong> or <strong>Partially Disbursed</strong>, the task is unassigned and appears in <strong>All Cases</strong>.</li>
</ul>

<h3>Partially Disbursed Stage: CO</h3>
<ul>
  <li>CO can see the <strong>Partially Disbursed</strong> application in <strong>All Cases</strong>.</li>
  <li>CO can create a new tranche without assigning the disbursement task to themselves.</li>
  <li>Once the disbursement task is created, it is automatically assigned to the CO who created it and appears in that CO’s <strong>My Queue</strong>.</li>
</ul>

<h3>Partially Disbursed Stage: BPO</h3>
<ul>
  <li>BPO Manager and BPO Child users can see the new or active disbursement task in their pool.</li>
  <li>BPO Manager can self-assign or assign the task to any child user.</li>
  <li>BPO Child user can only self-assign the task.</li>
  <li>BPO users have no edit access unless they self-assign the task.</li>
</ul>

<h3>Partially Disbursed Stage: Ops</h3>
<ul>
  <li>Ops user can see the new or active disbursement task in their pool.</li>
  <li>Ops user must self-assign the task to edit anything.</li>
  <li>In <strong>Disbursement Triggered</strong> state, the task is auto-assigned to the same Ops user who had it in <strong>Pending on Ops</strong> state.</li>
  <li>In <strong>Disbursement Approved</strong> state, the task is unassigned and appears only in <strong>All Cases</strong>.</li>
  <li>When the application state becomes <strong>Fully Disbursed</strong> or <strong>Partially Disbursed</strong>, the task is unassigned and appears in <strong>All Cases</strong>.</li>
</ul>

<h3>Fully Disbursed Stage</h3>
<ul>
  <li>Cases appear only in <strong>All Cases</strong> for all users.</li>
  <li>They do not appear in any user’s Pool or My Queue.</li>
</ul>
