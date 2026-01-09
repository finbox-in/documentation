<!DOCTYPE html>
<html lang="en">
<head>
Loan Offer Configuration – MFL LAP
</head>
<body>

  <h1>Loan Offer Configuration – MFL LAP</h1>

  <p>
    BCM manually sets the loan offer for MFL LAP during the <strong>“Under review”</strong> stage
    in the <strong>“Loan offer”</strong> tab.
  </p>

  <p>While configuring the loan offer, the BCM inputs the following parameters:</p>

  <h2>Product Configuration</h2>

  <ul>
    <li>
      <strong>Super product:</strong> Default is “LAP” and is auto-populated.
      “Housing loan” is not supported currently.
    </li>
    <li>
      <strong>Product:</strong> One of the following can be selected:
      <ul>
        <li>General LAP</li>
        <li>Micro LAP</li>
        <li>SBL</li>
      </ul>
    </li>
    <li>
      <strong>Sub-product:</strong> One of the following can be selected:
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
      <strong>Scheme:</strong> Based on the selected product and the state where the loan was sourced,
      the BCM is shown eligible schemes as defined in the
      “Product-level scheme collateral policy master” (attached with mail).
      RO login details are used to derive the state.
    </li>
    <li>
      <strong>Property type:</strong> Based on product, state, and scheme, the system shows the
      permitted property types as per the
      “Product-level scheme collateral policy master”.
    </li>
    <li>
      <strong>Loan purpose:</strong> One of the following can be selected
      (This is the UAT master, Finbox is discussing the prod master with MFL):
      <ul>
        <li>Business expansion</li>
        <li>Education purpose</li>
        <li>Home renovation/improvement</li>
        <li>New business</li>
      </ul>
    </li>
  </ul>

  <h2>Financial Parameters</h2>

  <ul>
    <li>
      <strong>Loan amount (INR):</strong> The amount the BCM intends to sanction.
      The “Product-level scheme collateral policy master” defines minimum and maximum
      permissible loan amounts by product, scheme, etc.
      <ul>
        <li>
          If the entered amount is outside this range, the system allows submission but
          displays a warning that “loan amount norms are not met”.
        </li>
        <li>
          The BCM can subsequently raise a deviation in the deviations module
          (auto-deviation is not yet implemented).
        </li>
      </ul>
    </li>
    <li>
      <strong>ROI (%):</strong> The rate of interest the BCM wants to offer.
      The “Product-level scheme collateral policy master” defines threshold minimum and
      maximum ROI based on product/scheme/property type/state etc (Refer master).
      <ul>
        <li>
          If the entered ROI is outside this range, the system allows submission but
          displays a warning that “loan amount norms are not met”.
        </li>
        <li>
          The BCM can later capture this as a deviation.
        </li>
      </ul>
    </li>
    <li>
      <strong>Tenure (months):</strong> The tenure offered.
      The master specifies a maximum permissible tenure based on product/scheme/property
      type/state etc (Refer master).
      <ul>
        <li>
          If the entered tenure exceeds this, the system still allows submission but
          warns that “tenure norms are not met”.
        </li>
        <li>
          The BCM can raise a corresponding deviation later.
        </li>
      </ul>
    </li>

   <li>
      <strong>Tranche type:</strong>
      <ul>
        <li>Single tranche</li>
        <li>Multi tranche</li>
      </ul>
    </li>

   <li>
      <strong>FOIR (%):</strong> The BCM manually calculates and enters the FOIR.
      The master defines a maximum permissible FOIR based on product/scheme/property
      type/state etc.
      <ul>
        <li>
          If the entered FOIR exceeds this limit, the system permits submission but
          shows a warning that “FOIR norms are not met”.
        </li>
        <li>
          The BCM can later record this as a deviation.
        </li>
      </ul>
    </li>

  <li>
      <strong>LTV (%):</strong> Auto-calculated from the loan amount and total property value.
      The master defines a maximum permissible LTV based on product/scheme/property
      type/state etc.
      <ul>
        <li>
          If the calculated LTV exceeds this internal threshold, the system shows a
          warning that “LTV norms are not met” but still allows submission.
        </li>
        <li>
          The BCM can subsequently raise a deviation.
        </li>
        <li>
          There is a hard stop of <strong>20% ≤ LTV ≤ 75%</strong>.
          If LTV falls outside this range, the system blocks submission of the loan offer.
        </li>
        <li>
          LTV is recalculated every time the loan offer is submitted or edited, but it
          does not auto-refresh when only “Total property value” is edited.
        </li>
        <li>
          “Total property value” and other collateral details must be completed before
          the loan offer can be set.
        </li>
      </ul>
    </li>
    <li>
      <strong>Processing fee (%):</strong> The processing fee the BCM wants to offer.
      The permissible range is 2%–3%.
      Values outside this range are not allowed and the system blocks submission.
    </li>
  </ul>

  <h2>Derived Fields (Post Submission)</h2>

  <p>
    After the BCM submits the loan offer, the system derives and displays additional
    fields on the Loan offer tab:
  </p>

  <ul>
    <li>
      <strong>Processing fee incl. GST:</strong> Processing fee including 18% GST.
    </li>
    <li>
      <strong>EMI:</strong> Calculated as:
      <pre>
EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]

Where:
P = loan amount
r = ROI (monthly) = ROI / 12
n = tenure in months
      </pre>
    </li>
    <li><strong>Type of interest:</strong> Tiered (currently constant)</li>
    <li><strong>Type of interest tiered:</strong> 5 years + floating combination (currently constant)</li>
    <li><strong>Base interest (%):</strong> 10 (constant)</li>
    <li><strong>Margin (%):</strong> ROI - 10</li>
  </ul>

  <p>
    The BCM can edit the loan offer as long as the application remains in the
    <strong>“Under review”</strong> stage.
  </p>

</body>
</html>
