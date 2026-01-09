<p>
The loan approval authority is determined based on two key criteria: the loan amount and the associated risk grade (refer to the DOA logic at the bottom of this sheet)
</p>

<h4>Risk Grade</h4>
<ul>
  <li>This is derived from the BRE 0 during the QDE stage</li>
  <li>The risk grade is identified using the output key ‘final_risk_score’ in Pre Eligibility Check v0.0.8</li>
  <li>‘final_risk_score’ is obtained for the primary applicant and all co-applicants; the highest risk score among them is considered (as Risk grade) for the DOA decision-making</li>
</ul>

<h4>Loan Amount</h4>
<ul>
  <li>This amount is defined by the BCM within the Loan Offer module</li>
</ul>

<ul>
  <li>The approval authority (role level) is established whenever the loan offer is created or updated, as per the DOA approval logic</li>
  <li>This authority role is visible on the ‘Manual Credit Review’ tab</li>
  <li>The BCM initiates the DOA process by either approving the loan or escalating it to the next higher authority, the CCM</li>
  <li>Once the BCM escalates the case, the entire application becomes locked for edits by the BCM and all other users</li>
  <li>During this phase, only higher-level credit authorities can add sanction conditions or manage deviations (raise, approve, or reject)</li>
  <li>Each authority can escalate the case only to the immediate next higher authority in the hierarchy until it reaches the final approval authority</li>
  <li>For example, CCM can escalate only to SCM</li>
  <li>Authorities at or below the approval authority have the option to reject the case, with mandatory input of a rejection reason and sub-reason</li>
  <li>The ‘Current State’ displayed on the Manual Credit Review tab indicates the loan sanction status, such as Approved, Rejected, or displays the current DOA assignee (role level) handling the approval</li>
  <li>Any authority may also return the case to a lower authority for further review (MFL suggests this should be exclusively to BCM, pending implementation)</li>
  <li>Once returned, BCM can reinitiate the DOA flow, passing the case upward authority by authority as before</li>
  <li>Only the approval authority and higher may approve the case, provided the user has sufficient individual sanction limits (following modifications suggested by MFL are pending - approval authority shouldn’t be able to send the case further up)</li>
  <li>Each credit manager, regardless of level, holds an individual sanction limit which may be equal to or lower than the role-level sanction threshold</li>
  <li>For instance, a BCM’s role-level sanction limit for risk grades 1, 2, and 3 might be ₹10 lakhs, but a BCM in Vellore could have an individual limit of ₹8 lakhs</li>
  <li>When an approval authority attempts to approve, the system verifies the individual sanction limit</li>
  <li>Approval is permitted only if the individual limit is greater than or equal to the loan amount</li>
  <li>If the individual sanction limit is insufficient, the case is escalated to the next higher authority</li>
  <li>The system repeats the limit check at every level until reaching an authority with an adequate limit</li>
  <li>Upon approval, the case automatically advances to the next stage “In-principal sanctioned”</li>
  <li>Whenever a case is assigned to a higher authority for DOA by BCM, it appears in that authority’s pool under the task name “Manual Credit Review”</li>
  <li>An authority must self-assign the task to perform any actions on the case, such as approval or rejection</li>
  <li>DOA flow cannot initiate unless all deviations are approved</li>
  <li>If any deviation is rejected, the system prevents initiation of the DOA flow</li>
  <li>If any new deviations are raised by higher credit authorities while DOA is in progress, DOA actioning (loan approval/rejection) isn't allowed until all pending deviations approved</li>
</ul>

<h4>Credit Approval Hierarchy</h4>

<p>Branch mortgage hierarchy:</p>
<p>BCM → ACM → RCM → SCM → ZCM → NCM → CBO</p>

<p>PC mortgage hierarchy:</p>
<p>BCM → CCM → SCM → ZCM → NCM → CBO</p>

<p>
Currently, RCM level is omitted due to absence of RCM users but may be included based on future business needs
</p>

<h4>DOA logic</h4>

<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Credit Family</th>
      <th>Loan Amt$</th>
      <th>Risk Grade</th>
      <th>FOIR</th>
      <th>LTV</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>BCM#</td><td>10,00,000</td><td>1,2,3</td><td>50%</td><td>60%</td></tr>
    <tr><td>BCM#</td><td>5,00,000</td><td>4,5</td><td>50%</td><td>60%</td></tr>
    <tr><td>CCM</td><td>15,00,000</td><td>1,2,3</td><td>50%</td><td>60%</td></tr>
    <tr><td>CCM</td><td>10,00,000</td><td>4,5,6</td><td>50%</td><td>60%</td></tr>
    <tr><td>SCM</td><td>25,00,000</td><td>1,2,3</td><td>50%</td><td>60%</td></tr>
    <tr><td>SCM</td><td>15,00,000</td><td>4,5,6</td><td>50%</td><td>60%</td></tr>
    <tr><td>ZCM</td><td>30,00,000</td><td>1,2,3</td><td>50%</td><td>60%</td></tr>
    <tr><td>ZCM</td><td>20,00,000</td><td>4,5,6</td><td>50%</td><td>60%</td></tr>
    <tr><td>NCM</td><td>5,00,00,000</td><td>1,2,3,4,5,6,7,8</td><td>50%</td><td>60%</td></tr>
    <tr><td>CBO</td><td>5,00,00,000</td><td>1,2,3,4,5,6,7,8</td><td>50%</
