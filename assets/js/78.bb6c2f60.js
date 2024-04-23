(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{375:function(e,t,s){"use strict";s.r(t);var n=s(8),a=Object(n.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"bankconnect-basics"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#bankconnect-basics"}},[e._v("#")]),e._v(" BankConnect: Basics")]),e._v(" "),t("p",[e._v("One must be familiar with following terms before starting with BankConnect Integration Process:")]),e._v(" "),t("img",{attrs:{src:"/key-terms.png",alt:"Basic Terms"}}),e._v(" "),t("h2",{attrs:{id:"link-id"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#link-id"}},[e._v("#")]),e._v(" Link ID")]),e._v(" "),t("p",[e._v("A unique identifier provided by the client to reference an individual user.\nThis is used to uniquely identify a user throughout the BankConnect integration process. This identifier is referred to as "),t("code",[e._v("link_id")]),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"session"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#session"}},[e._v("#")]),e._v(" Session")]),e._v(" "),t("p",[e._v("Instances generated to initiate the BankConnect process are called "),t("code",[e._v("sessions")]),e._v(". The creation of a session can be achieved through the Sessions API. Every BankConnect journey is associated with a specific session. Each session is valid for a defined TTL (Time To Live) of x time.")]),e._v(" "),t("h2",{attrs:{id:"account"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#account"}},[e._v("#")]),e._v(" Account")]),e._v(" "),t("p",[e._v("Bank accounts connected within a session, located in the same or different banks. These bank accounts are referred to as simply "),t("strong",[e._v("Accounts")]),e._v(" in BankConnect. FinBox refers to each account within a session using a unique identifier, "),t("code",[e._v("account_id")]),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"statement"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#statement"}},[e._v("#")]),e._v(" Statement")]),e._v(" "),t("p",[e._v("Bank transaction records submitted or fetched within a session, identified by a unique statement_id. Multiple statements can be uploaded for a given account over a period. When multiple statements are uploaded against an entity, BankConnect automatically recognizes the bank account and assigns the "),t("code",[e._v("account_id")]),e._v(" to the statement. Each statement is referred using a unique identifier called "),t("code",[e._v("statement_id")]),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"note"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#note"}},[e._v("#")]),e._v(" Note")]),e._v(" "),t("p",[e._v("You have the flexibility to generate multiple sessions for an individual user, also referred as a "),t("code",[e._v("link_id")]),e._v(" in BankConnect. Each session exclusively provides responses for the statements uploaded within that specific session.\nIt's important to note that data from different sessions cannot be combined.\nFor instance, when a customer visits your platform, you initiate BankConnect with a new session_id. The customer uploads multiple statements to cover a 6-month duration. If the customer returns after 3 months, a new session must be created for that subsequent interaction.")]),e._v(" "),t("p",[e._v("Now since these terms are clear, you can head towards the next section "),t("RouterLink",{attrs:{to:"/session-flow/integration-steps.html"}},[e._v("Integration Pre-requisite")]),e._v(" to understand the integration process.")],1)])}),[],!1,null,null,null);t.default=a.exports}}]);