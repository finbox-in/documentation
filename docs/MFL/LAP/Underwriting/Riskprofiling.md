

<h2>Risk Profiling</h2>

<p>
The BCM can perform <strong>Risk Profiling</strong> either during the
<strong>“Under review”</strong> stage or the
<strong>“In-principle sanctioned”</strong> stage.
Risk profiling becomes <strong>mandatory</strong> at the
<strong>“In-principle sanctioned”</strong> stage.
</p>

<h3>Overview</h3>
<p>
The risk profiling module evaluates a set of inputs using a predefined scoring
logic to derive:
</p>
<ul>
  <li>An overall <strong>risk score</strong> (0–100)</li>
  <li>A corresponding <strong>risk category</strong>: Low, Medium, or High</li>
</ul>

<p>
Each input is treated as a question with an associated score. The total of all
individual scores determines the final risk score and category.
(The detailed logic is maintained externally and shared separately.)
</p>

<h3>Risk Profiling Form</h3>
<p>
The BCM completes the risk profiling by filling the form available under the
<strong>“Manual Credit Review”</strong> tab.
</p>

<h4>Input Parameters</h4>
<ul>
  <li>
    <strong>Nature of property</strong>:
    Selected by the BCM from a master list
  </li>
  <li>
    <strong>FOIR</strong>:
    Auto-fetched by the system from the Loan Offer
  </li>
  <li>
    <strong>LTV</strong>:
    Auto-fetched by the system from the Loan Offer
  </li>
  <li>
    <strong>Vintage</strong>:
    Entered manually by the BCM (free-text field)
  </li>
  <li>
    <strong>Occupation type</strong>:
    Selected as <strong>Salaried</strong> or
    <strong>Self-employed</strong>
  </li>
  <li>
    <strong>Occupation</strong>:
    Selected by the BCM from a master list
  </li>
  <li>
    <strong>Guarantor in deal</strong>:
    Selected as <strong>Yes</strong> or <strong>No</strong>
  </li>
</ul>

<h3>Pre-requisites</h3>
<ul>
  <li>
    The <strong>Loan Offer must be set</strong> before running risk profiling,
    since FOIR and LTV are required inputs.
  </li>
</ul>

<h3>System Behaviour</h3>
<ul>
  <li>
    The system does <strong>not</strong> enforce any hard validation or blocking
    based on the calculated risk score or risk category.
  </li>
  <li>
    The outcome is used for <strong>assessment purposes only</strong>.
  </li>
</ul>

<h3>Edit Rules</h3>
<ul>
  <li>
    The BCM can edit the risk profiling form and recalculate the risk score
    until the application reaches the
    <strong>“Loan sanctioned”</strong> stage.
  </li>
</ul>

<h3>Related Verification: Risk Gradation</h3>
<ul>
  <li>
    <strong>Risk gradation</strong> is a separate verification activity.
  </li>
  <li>
    It must be completed mandatorily in the
    <strong>“Under review”</strong> stage.
  </li>
  <li>
    The BCM fills the risk gradation form under
    <strong>Primary verifications</strong> in the
    <strong>Verifications</strong> tab.
  </li>
</ul>

<h3>Reference</h3>
<ul>
  <li>LAP Credit Risk Profiling (3) 1.xlsx</li>
</ul>
