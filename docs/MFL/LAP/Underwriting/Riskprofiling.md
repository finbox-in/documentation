<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Risk Profiling – LAP</title>
</head>
<body>

  <h1>Risk Profiling – LAP</h1>

  <p>
    BCM can perform risk profiling either in the <strong>“Under review”</strong> stage or the
    <strong>“In-principle sanctioned”</strong> stage; it becomes mandatory at the
    <strong>“In-principle sanctioned”</strong> stage.
  </p>

  <p>
    The risk profiling module takes a set of input parameters and, based on a predefined scoring
    logic, returns an overall risk score and a corresponding risk category.
  </p>

  <p>
    Each input is treated as a question with a response that contributes a specific score, and the
    sum of these individual scores yields the final risk score (a value between <strong>0–100</strong>)
    and risk category (<strong>Low</strong>, <strong>Medium</strong>, or <strong>High</strong>).
    (Logic attached with this mail)
  </p>

  <h2>Risk Profiling Form</h2>

  <p>
    BCM fills a form on the <strong>“Manual Credit Review”</strong> tab to calculate the risk profile.
  </p>

  <p>The inputs required to calculate the risk score are:</p>

  <ul>
    <li>
      <strong>Nature of property:</strong> Selected by the BCM from a master list
    </li>
    <li>
      <strong>FOIR:</strong> Auto-fetched by the system from the loan offer details
    </li>
    <li>
      <strong>LTV:</strong> Auto-fetched by the system from the loan offer details
    </li>
    <li>
      <strong>Vintage:</strong> Entered manually by the BCM (free-text field)
    </li>
    <li>
      <strong>Occupation type:</strong> Selected as either “Salaried” or “Self-employed” by the BCM
    </li>
    <li>
      <strong>Occupation:</strong> Selected by the BCM from a master list
    </li>
    <li>
      <strong>Guarantor in deal:</strong> Selected as “Yes” or “No” by the BCM
    </li>
  </ul>

  <p>
    The loan offer must be set before running risk profiling, since <strong>FOIR</strong> and
    <strong>LTV</strong> are required as inputs for the calculation.
  </p>

  <p>
    The system does <strong>not</strong> impose any hard validation or blocking condition based on
    the resulting risk score or risk category; the outcome is for assessment purposes only.
  </p>

  <p>
    The BCM can edit the risk profiling form and recalculate the risk score until the case moves to
    the <strong>“Loan sanctioned”</strong> stage.
  </p>

  <h2>Risk Gradation</h2>

  <p>
    Risk gradation is a separate verification, for which BCM fills a form mandatorily in the
    <strong>“Under review”</strong> stage under <strong>Primary verifications</strong> on the
    <strong>“Verifications”</strong> tab.
  </p>

  <h2>Reference Document</h2>

  <p>
    <a href="https://infinbox-my.sharepoint.com/:x:/g/personal/madhulika_das_finbox_in/IQBEuxEk0VnsS6u03Bk5E_syAS3Hy9hQcDY3TYye4NtOts0?wdOrigin=LOOP-WEB.PREVIEW.NT&wduihid=3a2703d9-13b8-45d1-91b0-e15eb13253b4&web=1&ct=1767929990532" target="_blank" rel="noopener noreferrer">
      LAP Credit Risk Profiling (3) 1.xlsx
    </a>
  </p>

</body>
</html>
