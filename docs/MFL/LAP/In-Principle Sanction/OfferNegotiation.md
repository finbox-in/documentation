<h2>Offer Negotiation</h2>

<p>BBM negotiation will happen in parallel to legal and technical verification in the "In-principle sanctioned" stage. BBM can only edit PF and ROI and view other parameters of the negotiated offer.</p>

<p><strong>NOTE:</strong> It is not possible that the soft-sanctioned (in-principle) loan offer details will change after legal and technical verification are complete. The only inputs from these two will be ‘recommend’ or ‘do not recommend’. If one of these two decide ‘Not recommended’, BCM will raise a deviation separately.</p>

<p>When BBM creates a negotiated offer, negotiation task flows to NSH for approval of negotiation once BBM submits. There is a validation that BBM cannot close the negotiation task before the NSH approves the negotiation task. Following will be the flow after NSH approves the negotiated PF and ROI:</p>

<ul>
  <li>The negotiation task will move to BCM, where he can either close the negotiation task (which will end the negotiation module) or change the loan amount. Currently, BCM cannot set a new loan amount greater than the current loan amount.</li>
  <li>The BBM will share this new loan amount information with the customer. Post discussions, BBM can either:
    <ul>
      <li>Accept and close the negotiation with the new loan amount set by the BCM, or</li>
      <li>Reject the new loan offer, which opens a new negotiation task for the BBM. This task has the new loan amount set by the BCM, but the PF and ROI are reset to the originally set parameters.</li>
    </ul>
  </li>
  <li>With this new negotiation task, BBM can repeat the negotiation process, changing ROI and PF again, moving it for approval to NSH, and continuing the subsequent processes.</li>
  <li>If NSH rejects the BBM negotiated offer, the offer details will revert to the original in-principle offer approved by the BCM.</li>
</ul>

<p>It is possible that the case can be sent back in the negotiations stage. Two likely scenarios (not in the current scope):</p>

<ul>
  <li>Customer requests an increased loan amount than in-principle and has additional documents to support the request. BBM will assign the task back to BCM, and BCM will send it back to the under-review stage.</li>
  <li>While negotiation is happening, legal might request additional docs or co-applicants to be added. BCM can send the case back to under review.</li>
</ul>

<p>Offer details will be reset in case of send-back. Loan application cancel and rejection options are provided to the BCM for scenarios where the customer no longer wants the loan or major issues are discovered with the application at this stage.</p>

<h3>RBAC rules for this stage:</h3>
<ul>
  <li>BCM can only edit loan amount and view other parameters of the negotiated offer.</li>
  <li>BBM can only edit PF and ROI and view other parameters of the negotiated offer.</li>
  <li>NSH can only view and approve or reject negotiation workflow, i.e., the negotiated offer proposal.</li>
</ul>
