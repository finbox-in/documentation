
<h2>BCM – Under Review Stage</h2>

<p>
Once BPO Stage 1 forwards a case, the application moves to the BCM pool in the
<strong>“Under review”</strong> stage. It remains there until a BCM self-assigns it,
after which it appears in that BCM’s queue for processing.
</p>

<h3>BCM Activities in “Under review” Stage</h3>
<ul>
  <li>Completes all primary verifications (FI/PD)</li>
  <li>Initiates parallel verifications (Legal, Technical, RCU)</li>
  <li>Uploads the CAM report</li>
  <li>Updates collateral details</li>
  <li>Sets the loan offer</li>
  <li>Raises deviations</li>
  <li>Raises sanction conditions</li>
  <li>Completes risk profiling</li>
  <li>Initiates the DOA flow</li>
</ul>

<h3>Key Sequence and Validation Rules</h3>
<ul>
  <li>All primary verifications must be completed before CAM upload</li>
  <li>CAM must be uploaded before setting the loan offer</li>
  <li>All mandatory collateral details must be captured before setting the loan offer</li>
  <li><em>Property address line 2</em> and <em>landmark</em> are optional fields</li>
  <li><em>Built-up area</em> is optional if property type is <strong>Flat</strong></li>
  <li><em>Super built-up area</em> is optional if property type is <strong>Independent</strong></li>
  <li><em>Carpet area</em> must be less than <em>built-up area</em></li>
  <li><em>Built-up area</em> must be less than <em>super built-up area</em></li>
  <li>The loan offer must be set before raising deviations, as deviations depend on the selected loan product (e.g. General LAP, Micro LAP, SBL)</li>
  <li>The loan offer must be set before initiating both DOA flow and risk profiling</li>
  <li>The BCM checklist for this stage must be completed before initiating DOA flow</li>
  <li>All deviations must be resolved and in <strong>“Approved”</strong> status before DOA flow can be initiated</li>
  <li>At least one bank account for either the applicant or co-applicant must be added before initiating DOA, if not already present (to be implemented)</li>
</ul>

<h3>Additional Rules and Permissions</h3>
<ul>
  <li>
    In parallel with the above activities, the BCM can modify information entered by RO/CO
    in earlier stages, except for:
    <ul>
      <li>Sourcing details</li>
      <li>Requested loan details</li>
      <li>IMD details</li>
    </ul>
    These fields are locked for editing.
  </li>
  <li>The BCM can upload additional documents to the application if required</li>
  <li>
    The BCM cannot add a co-applicant in the <strong>“Under review”</strong> stage.
    To add a co-applicant, the case must be sent back to an earlier stage.
  </li>
  <li>
    The BCM can generate unsigned documents such as:
    <ul>
      <li>Sanction Letter</li>
      <li>LAF</li>
      <li>KFS</li>
      <li>Loan Agreement</li>
      <li>SOC</li>
      <li>GTC + MITC</li>
    </ul>
    during the <strong>“Under review”</strong> stage.
    <br />
    <em>(Separate note to be shared on document generation)</em>
  </li>
</ul>
