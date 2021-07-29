# FinBox Lending: Banner

Once the lending SDK is integrated, we need to show a banner in the app that explains the loan step to the customer. The SDK is to be opened after clicking on the banner.

<div style="text-align:center;">
<img src="https://finbox-cdn.s3.ap-south-1.amazonaws.com/docs/assets/servicing/Banner-ll.png" alt="Sample app" style="width:30%" />
</div>

## User Banner API

This API require **Server API Key** to be passed in `x-api-key` header

::: tip Endpoint
GET **`base_url`/v1/user/banner?customerID=`someCustomerID`**
:::

### Response
```json
{
    "data": {
        "banner": "APPLY"
    },
    "error": "",
    "status": true
}
```

## Banner values

The table below indicates the possible values of `banner` key, and **sample banner designs**:

| `banner` key | Description | Sample Banner Design |
| - | - | - |
| `APPLY` | This step symbolises the start of the application and should be shown to eligible users. In case the user with the `customer_id` is not created in our systems, this is the default value returned by the Banner API | <img src="/apply_for_loan.svg" alt="Apply for loan" /><br /><br /><a href="/apply_for_loan.svg" download>Download SVG</a> |
| `INCOMPLETE` | This step implies that the application was started, but was left in the middle. In this case, prompt the user to complete the application | <img src="/incomplete_loan.svg" alt="Incomplete loan" /><br /><br /><a href="/incomplete_loan.svg" download>Download SVG</a> |
| `APPROVED` | After application is approved from lender, show user a state informing them that the application has been approved and they can proceed to the next step (like signing the agreement) | <img src="/loan_approved.svg" alt="Loan Approved" /><br /><br /><a href="/loan_approved.svg" download>Download SVG</a> |
| `REJECTED` | In case the application is rejected you can notify the user that his loan/credit line application has been rejected | <img src="/loan_rejected.svg" alt="Loan rejected" /><br /><br /><a href="/loan_rejected.svg" download>Download SVG</a> |
| `ACTIVE` | When the loan is disbursed or credit line is activated, you can inform the user through this banner | <img src="/active_loan.svg" alt="Active loan" /><br /><br /><a href="/active_loan.svg" download>Download SVG</a> |
| `DUE` | When EMI is due you can notify the user with the following banner | <img src="/emi_due.svg" alt="EMI due" /><br /><br /><a href="/emi_due.svg" download>Download SVG</a> |
| `OVERDUE` | When EMI is overdue then we need to show the User an overdue state so that he can avoid late fee charge | <img src="/emi_overdue.svg" alt="EMI overdue" /><br /><br /><a href="/emi_overdue.svg" download>Download SVG</a> |
| `CLOSED` | This implies that the loan / credit line is closed | - |
| `CANCELLED` | This implies that the loan / credit line application is cancelled | - |
| `HIDE` | This implies the banner is not be shown to the user at the moment. This is a temporary state and doesn't indicate the eligibility of the user. | - |
| `INACTIVE` | This is specific to **Credit Line** Journey. It indicates the credit line has been made inactive by the lender. Among `OVERDUE` and `INACTIVE`, `INACTIVE` will take precendence | - |