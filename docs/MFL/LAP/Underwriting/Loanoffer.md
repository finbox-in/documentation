
<h2>Loan Offer</h2>

<p>
The BCM manually sets the loan offer for <strong>MFL LAP</strong> during the
<strong>“Under review”</strong> stage from the <strong>Loan offer</strong> tab.
</p>

<h3>Loan Offer Configuration</h3>

<h4>Core Parameters</h4>
<ul>
  <li>
    <strong>Super product</strong>: Auto-populated as <strong>LAP</strong>.
    Housing Loan is not supported.
  </li>
  <li>
    <strong>Product</strong>:
    <ul>
      <li>General LAP</li>
      <li>Micro LAP</li>
      <li>SBL</li>
    </ul>
  </li>
  <li>
    <strong>Sub-product</strong>:
    <ul>
      <li>Top-up with closure</li>
      <li>New application</li>
      <li>Balance transfer without top-up</li>
      <li>Balance transfer top-up</li>
      <li>Resale</li>
      <li>Under construction</li>
    </ul>
  </li>
  <li>
    <strong>Scheme</strong>:
    Eligible schemes are shown based on the selected product and sourcing state,
    as defined in the <strong>Product-level scheme collateral policy master</strong>.
    RO login details determine the state.
  </li>
  <li>
    <strong>Property type</strong>:
    Displayed based on product, scheme, and state as per the master.
  </li>
  <li>
    <strong>Loan purpose</strong> (UAT master):
    <ul>
      <li>Business expansion</li>
      <li>Education purpose</li>
      <li>Home renovation / improvement</li>
      <li>New business</li>
    </ul>
  </li>
</ul>

<h4>Financial Parameters</h4>
<ul>
  <li>
    <strong>Loan amount (INR)</strong>:
    Defined by the BCM.
    <ul>
      <li>
        Minimum and maximum limits are governed by the master.
      </li>
      <li>
        Amounts outside limits trigger a warning but allow submission.
      </li>
      <li>
        Deviations can be raised manually later.
      </li>
    </ul>
  </li>

  <li>
    <strong>ROI (%)</strong>:
    <ul>
      <li>
        Threshold min/max values are defined in the master.
      </li>
      <li>
        Out-of-range values allow submission with a warning.
      </li>
      <li>
        Deviations can be captured subsequently.
      </li>
    </ul>
  </li>

  <li>
    <strong>Tenure (months)</strong>:
    <ul>
      <li>
        Maximum permissible tenure is defined in the master.
      </li>
      <li>
        Exceeding tenure allows submission with a warning.
      </li>
    </ul>
  </li>

  <li>
    <strong>Tranche type</strong>:
    <ul>
      <li>Single tranche</li>
      <li>Multi tranche</li>
    </ul>
  </li>

  <li>
    <strong>FOIR (%)</strong>:
    <ul>
      <li>
        Manually calculated and entered by the BCM.
      </li>
      <li>
        Maximum FOIR is defined in the master.
      </li>
      <li>
        Exceeding FOIR allows submission with a warning.
      </li>
    </ul>
  </li>

  <li>
    <strong>LTV (%)</strong>:
    <ul>
      <li>
        Auto-calculated from loan amount and total property value.
      </li>
      <li>
        Master-defined maximum LTV triggers a warning if exceeded.
      </li>
      <li>
        Hard stop enforced: <strong>20% ≤ LTV ≤ 75%</strong>.
      </li>
      <li>
        LTV recalculates on loan offer submit/edit, not on collateral edit alone.
      </li>
    </ul>
  </li>

  <li>
    <strong>Processing fee (%)</strong>:
    <ul>
      <li>
        Permissible range: <strong>2% – 3%</strong>.
      </li>
      <li>
        Values outside this range block submission.
      </li>
    </ul>
  </li>
</ul>

<h3>Collateral Dependency</h3>
<ul>
  <li>
    <strong>Total property value</strong> and all mandatory collateral details
    must be completed before setting the loan offer.
  </li>
</ul>

<h3>Derived Fields (Post Submission)</h3>
<ul>
  <li>
    <strong>Processing fee incl. GST</strong>:
    Processing fee + 18% GST
  </li>
  <li>
    <strong>EMI</strong>:
    <pre>
EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]

P = Loan amount  
r = Monthly ROI = ROI / 12  
n = Tenure in months
    </pre>
  </li>
  <li><strong>Type of interest</strong>: Tiered (constant)</li>
  <li>
    <strong>Interest tier</strong>: 5 years + floating combination (constant)
  </li>
  <li><strong>Base interest (%)</strong>: 10 (constant)</li>
  <li><strong>Margin (%)</strong>: ROI − 10</li>
</ul>

<h3>Edit Rules</h3>
<ul>
  <li>
    The BCM can edit the loan offer as long as the application remains in the
    <strong>“Under review”</strong> stage.
  </li>
</ul>
