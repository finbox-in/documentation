<h2>Deductions Logic</h2>

<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Deduction Type</th>
      <th>Deduction Amount (Value / Formula / Logic)</th>
      <th>When Applicable</th>
      <th>When Adjusted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Processing Fee</td>
      <td>
        PF Amount = {(Loan Amount × (PF % / 100)) × 1.18}<br/>
        Amount inclusive of 18% GST<br/>
        PF % entered by BCM in Loan Offer module
      </td>
      <td>All loans</td>
      <td>At disbursal</td>
    </tr>
    <tr>
      <td>E-stamp Charge</td>
      <td>
        ₹38 (if agreement signing done online)<br/>
        ₹0 (if agreement signing done offline)
      </td>
      <td>Only when agreement signing done online</td>
      <td>At disbursal</td>
    </tr>
    <tr>
      <td>Insurance Charges</td>
      <td>Total insurance premium (inclusive of 18% GST)</td>
      <td>All loans</td>
      <td>At disbursal</td>
    </tr>
    <tr>
      <td>Stamp Duty</td>
      <td>
        State-based charge (refer state-wise stamp duty master)<br/>
        ₹0 (if agreement signing done offline)<br/><br/>
        <em>Note: State is derived from branch details of the RO who punched the case</em>
      </td>
      <td>Only when agreement signing done online</td>
      <td>At disbursal</td>
    </tr>
    <tr>
      <td>CERSAI Charge</td>
      <td>
        ₹118 (if sanctioned loan amount &gt; ₹5 lakhs)<br/>
        ₹59 (if sanctioned loan amount ≤ ₹5 lakhs)
      </td>
      <td>All loans</td>
      <td>At disbursal</td>
    </tr>
    <tr>
      <td>Initial Login Fee</td>
      <td>
        ₹1,180 (IMD amount – currently constant)<br/>
        Collected upfront during customer journey
      </td>
      <td>All loans</td>
      <td>Not adjusted from disbursal</td>
    </tr>
    <tr>
      <td>Login Fee Deductible</td>
      <td>
        ₹4,720 (if sanctioned loan amount &gt; ₹10 lakhs – constant)<br/>
        ₹2,950 (if sanctioned loan amount ≤ ₹10 lakhs – constant)
      </td>
      <td>All loans</td>
      <td>At disbursal</td>
    </tr>
  </tbody>
</table>

<p><strong>All amounts mentioned are in Indian Rupees (₹).</strong></p>

<h3>Important Notes</h3>
<ul>
  <li>Broken Period Interest (BPI) is <strong>not</strong> treated as a deduction in LOS.</li>
  <li>BPI is not shown in deduction summary and is excluded from Net Payment Amount calculation.</li>
  <li>BPI is not sent to LMS createLoan API under disbursal charge details.</li>
  <li>Deductions are not deducted from first tranche or first split payment.</li>
  <li>Deductions are applied on <strong>Sanctioned Loan Amount</strong> to derive <strong>Net Payment Amount</strong>.</li>
  <li>CO enters tranche amounts based on Net Payment Amount.</li>
  <li>Sum of all tranche amounts must equal Net Payment Amount (logic change pending implementation).</li>
  <li>Deduction charge details passed in LMS createLoan API are used by LMS to credit the total deduction amount to MFL bank account at disbursal.</li>
</ul>
