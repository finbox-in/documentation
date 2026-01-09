<h3>Delegation of Authority (DOA) – Credit Approval Logic</h3>

<p>
The loan approval authority is determined based on two key criteria: <b>Loan Amount</b> and <b>Risk Grade</b>.
</p>

<h4>Risk Grade Determination</h4>
<ul>
  <li>Derived from BRE 0 during the QDE stage</li>
  <li>Identified using output key <b>final_risk_score</b> from Pre Eligibility Check v0.0.8</li>
  <li>Calculated for primary applicant and all co-applicants</li>
  <li>The highest risk score among all applicants is considered for DOA</li>
</ul>

<h4>Loan Amount</h4>
<ul>
  <li>Defined by the BCM in the Loan Offer module</li>
  <li>Approval authority is set when the loan offer is created or updated</li>
  <li>Visible on the <b>Manual Credit Review</b> tab</li>
</ul>

<h4>DOA Process Flow</h4>
<ul>
  <li>BCM initiates DOA by approving or escalating to the next authority</li>
  <li>Once escalated, the application is locked for edits by BCM and others</li>
  <li>Only higher authorities can manage sanction conditions and deviations</li>
  <li>Escalation is allowed only to the immediate next authority</li>
  <li>Authorities at or below approval level can reject with mandatory reason</li>
  <li>Current loan status is shown in the <b>Current State</b> field</li>
  <li>Cases can be returned downward (recommended only to BCM)</li>
  <li>BCM can reinitiate DOA after return</li>
</ul>

<h4>Approval Rules</h4>
<ul>
  <li>Only approval authority or higher can approve</li>
  <li>Each credit manager has an individual sanction limit</li>
  <li>Approval allowed only if individual limit ≥ loan amount</li>
  <li>If limit insufficient, system auto-escalates upward</li>
  <li>On approval, case moves to <b>In-principal sanctioned</b></li>
</ul>

<h4>Task Assignment</h4>
<ul>
  <li>Appears as <b>Manual Credit Review</b> in authority’s task pool</li>
  <li>Authority must self-assign to take action</li>
</ul>

<h4>Deviation Rules</h4>
<ul>
  <li>DOA cannot start unless all deviations are approved</li>
  <li>If any deviation is rejected, DOA is blocked</li>
  <li>If new deviations are raised mid-DOA, approval actions are frozen</li>
</ul>

<h4>Credit Approval Hierarchy</h4>

<p><b>Branch Mortgage:</b></p>
<ul>
  <li>BCM → ACM → RCM → SCM → ZCM → NCM → CBO</li>
</ul>

<p><b>PC Mortgage:</b></p>
<ul>
  <li>BCM → CCM → SCM → ZCM → NCM → CBO</li>
</ul>

<p>
RCM level is currently omitted due to lack of users but may be added later.
</p>

<h3>DOA Logic Table</h3>

<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Credit Family</th>
      <th>Loan Amount</th>
      <th>Risk Grade</th>
      <th>FOIR</th>
      <th>LTV</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BCM</td>
      <td>10,00,000</td>
      <td>1,2,3</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>BCM</td>
      <td>5,00,000</td>
      <td>4,5</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>CCM</td>
      <td>15,00,000</td>
      <td>1,2,3</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>CCM</td>
      <td>10,00,000</td>
      <td>4,5,6</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>SCM</td>
      <td>25,00,000</td>
      <td>1,2,3</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>SCM</td>
      <td>15,00,000</td>
      <td>4,5,6</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>ZCM</td>
      <td>30,00,000</td>
      <td>1,2,3</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>ZCM</td>
      <td>20,00,000</td>
      <td>4,5,6</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>NCM</td>
      <td>5,00,00,000</td>
      <td>1–8</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
    <tr>
      <td>CBO</td>
      <td>5,00,00,000</td>
      <td>1–8</td>
      <td>50%</td>
      <td>60%</td>
    </tr>
  </tbody>
</table>
