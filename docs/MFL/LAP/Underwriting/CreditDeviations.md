---
title: Credit Deviations
---

<h2>Credit Deviations</h2>

<p>
The <strong>Loan Offer</strong> must be set before any deviation can be raised, as
deviations are specific to each product type.
(Reference: Credit Deviations Master attached in mail)
</p>

<h3>General Rules</h3>
<ul>
  <li>Different LAP products have different sets of applicable deviations.</li>
  <li>
    The authority required to approve a deviation depends on the LAP product and,
    in some cases, the loan amount.
  </li>
  <li>
    As per the <strong>Product Level Scheme Collateral Policy</strong> master:
    Minimum permissible loan amount: ₹3 lakhs<br>
    Maximum permissible loan amount: ₹5 crores
  </li>
  <li>
    The system prevents the BCM from entering an amount outside this range wherever
    the loan offer amount can be set/edited.
  </li>
</ul>

<h3>Deviation Flow by Stage</h3>
<ul>
  <li>
    <strong>Under Review:</strong>
    <ul>
      <li>Deviations can be raised by the BCM prior to initiating the DOA flow.</li>
      <li>If any deviation is pending or rejected, the current DOA assignee cannot
      approve DOA or forward to next authority until all deviations are approved.</li>
    </ul>
  </li>
  <li>
    <strong>In-principle sanctioned:</strong>
    <ul>
      <li>BCM can raise deviations as RCU verification decisions may come in this stage.</li>
      <li>Case movement is restricted until all open deviations are approved.</li>
    </ul>
  </li>
  <li>
    <strong>Loan sanctioned:</strong>
    <ul>
      <li>Deviations can be raised by CO based on RCU Stage 2 document vetting decisions.</li>
      <li>Case movement blocked until all open deviations are approved.</li>
    </ul>
  </li>
</ul>

<h3>How to Raise a Deviation</h3>
<ol>
  <li>Select the deviation from the master list.</li>
  <li>Choose the relevant applicant or co-applicant.</li>
  <li>The deviation task is automatically assigned to the specified approval authority (e.g., SCM).</li>
  <li>Currently, if multiple SCMs exist in a state, tasks are not sent to a shared pool.</li>
  <li>All deviations are manually initiated; automatic deviations are not yet implemented.</li>
</ol>

<h3>Approval Rules</h3>
<ul>
  <li>
    Approval authority and any higher authority in the hierarchy can approve deviations
    in their queue.
  </li>
  <li>
    Example: If two deviations are raised, one assigned to a ZCM and another to NCM:
    NCM can approve both, but ZCM can approve only the one assigned to them.
  </li>
</ul>

<h3>Restrictions and Constraints</h3>
<ul>
  <li>Pending deviations can be deleted by the user who raised them until approved/rejected.</li>
  <li>Once approved or rejected, deviations <strong>cannot</strong> be deleted or re-evaluated.</li>
  <li>Duplicate deviations for the same applicant cannot be raised.</li>
  <li>
    If the BCM changes the LAP product after raising a deviation, the same type can
    be raised again. Deviations from the previous product can be deleted if still pending.
  </li>
  <li>The system does not auto-delete deviations when the LAP product changes.</li>
</ul>
