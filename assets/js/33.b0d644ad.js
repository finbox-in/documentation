(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{331:function(t,s,a){"use strict";a.r(s);var e=a(8),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"bankconnect-javascript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bankconnect-javascript"}},[t._v("#")]),t._v(" BankConnect: JavaScript")]),t._v(" "),s("p",[t._v("The JavaScript SDK helps user submit their bank statements via upload or net banking credentials in your Web applications. The SDK will be opened via a web URL.")]),t._v(" "),s("p",[t._v("The first step in integration involves calling the "),s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#session-api"}},[t._v("Session API")]),t._v("\nThen the workflow can be implemented in one of the following ways:")],1),t._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#redirect-workflow"}},[t._v("Load in a new page with redirect URL")])],1),t._v(" "),s("li",[s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#inline-frame-workflow"}},[t._v("Embedding inside an Inline Frame ("),s("code",[t._v("<iframe>")]),t._v(")")])],1)]),t._v(" "),s("h2",{attrs:{id:"session-api"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#session-api"}},[t._v("#")]),t._v(" Session API")]),t._v(" "),s("p",[t._v("To start with the integration, call the following API to create a session:")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Endpoint")]),t._v(" "),s("p",[t._v("POST "),s("strong",[t._v(t._s(t.$page.frontmatter.base_url)+"/"+t._s(t.$page.frontmatter.version)+"/session/")])])]),t._v(" "),s("h3",{attrs:{id:"parameters"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Name")]),t._v(" "),s("th",[t._v("Type")]),t._v(" "),s("th",[t._v("Description")]),t._v(" "),s("th",[t._v("Required")]),t._v(" "),s("th",[t._v("Default")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("link_id")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("link_id value")]),t._v(" "),s("td",[t._v("Yes")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("api_key")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("API key provided by FinBox")]),t._v(" "),s("td",[t._v("Yes")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("redirect_url")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("URL to redirect to incase of success or failure")]),t._v(" "),s("td",[t._v("Yes for "),s("strong",[t._v("Redirect Workflow")])]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("from_date")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Start date range to fetch statements. Should be of format "),s("code",[t._v("DD/MM/YYYY")])]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("Last 6 month start date")])]),t._v(" "),s("tr",[s("td",[t._v("to_date")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("End date range to fetch statements. Should be of format "),s("code",[t._v("DD/MM/YYYY")])]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("Yesterday")])]),t._v(" "),s("tr",[s("td",[t._v("logo_url")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("An optional parameter to show logo branding in bankconnect SDK. Should be a URL.")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("bank_name")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("pass the "),s("RouterLink",{attrs:{to:"/bank-connect/appendix.html#bank-identifiers"}},[t._v("bank identifier")]),t._v(" to skip the bank selection screen and directly open a that bank's screen instead")],1),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("mode")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("optional parameter to set the mode(i.e. pdf, aa, and online)")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("mobile_number")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Prefills phone number in Account Aggregator mode")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("journey_mode")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("Optional parameter to set the journey (i.e.multi_pdf or multi_banking)")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("aa_journey_mode")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("set the journey mode for AA (i.e only_once or only_recurring)")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("aa_recurring_tenure_month_count")]),t._v(" "),s("td",[t._v("integer")]),t._v(" "),s("td",[t._v("set the recurring consent duration (min: 1 and max: 24)")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("aa_recurring_frequency_unit")]),t._v(" "),s("td",[t._v("string")]),t._v(" "),s("td",[t._v("set the frequency unit to pull the data during the recurring consent duration (year, month, day, hour)")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("aa_recurring_frequency_value")]),t._v(" "),s("td",[t._v("integer")]),t._v(" "),s("td",[t._v("set the frequency value to pull the data during the recurring consent duration (min: 1 and max: 3)")]),t._v(" "),s("td",[t._v("No")]),t._v(" "),s("td",[t._v("-")])])])]),t._v(" "),s("p",[s("code",[t._v("from_date")]),t._v(" and "),s("code",[t._v("to_date")]),t._v(" specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, "),s("code",[t._v("from_date")]),t._v(" will be today's date - 6 months and "),s("code",[t._v("to_date")]),t._v(" will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in "),s("code",[t._v("DD/MM/YYYY")]),t._v(" format.")]),t._v(" "),s("p",[s("b",[t._v("Note")]),t._v(": If the "),s("code",[t._v("to-date")]),t._v(" lies in the first week of the month, the respective month is not considered in the journey.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("redirect_url")]),t._v(" in request is a compulsory field in "),s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#redirect-workflow"}},[t._v("Redirect Workflow")]),t._v(" but is not required with the "),s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#inline-frame-workflow"}},[t._v("Inline Frame workflow")])],1),t._v(" "),s("li",[t._v("Please make sure "),s("code",[t._v("from_date")]),t._v(" is always less than "),s("code",[t._v("to_date")])]),t._v(" "),s("li",[t._v("Make sure "),s("code",[t._v("to_date")]),t._v(" is never today's date, the maximum possible value for it is today's date - 1 day")])])]),t._v(" "),s("h3",{attrs:{id:"response"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),s("p",[t._v("On successful API call, it gives a "),s("strong",[t._v("200 HTTP code")]),t._v(" with a response in following format:")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"redirect_url"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://bankconnectclient.finbox.in/?session_id=127d12db1d71bd182b"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("Use "),s("code",[t._v("redirect_url")]),t._v(" to open up the BankConnect SDK. This URL can be used embedded inside an "),s("code",[t._v("<iframe>")]),t._v(" or can be opened in a new tab or current window.")]),t._v(" "),s("h2",{attrs:{id:"redirect-workflow"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redirect-workflow"}},[t._v("#")]),t._v(" Redirect Workflow")]),t._v(" "),s("img",{attrs:{src:"/javascript_redirect.jpg",alt:"JavaScript SDK Redirect Workflow"}}),t._v(" "),s("p",[t._v("The flow for this involves following steps:")]),t._v(" "),s("ul",[s("li",[t._v("Create a session using "),s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#session-api"}},[t._v("Session API")])],1),t._v(" "),s("li",[t._v("Get the URL received from above API and open it in a new tab")]),t._v(" "),s("li",[t._v("On success / exit, SDK will redirect to the specified redirect URL with parameters as follows:\n"),s("ul",[s("li",[t._v("Exit: "),s("code",[t._v("{url}?success=false")])]),t._v(" "),s("li",[t._v("Success: "),s("code",[t._v("{url}?success=true&entity_id=<some-entity-id>")])]),t._v(" "),s("li",[t._v("Success: "),s("code",[t._v("{url}?success=true&session_id=<some-session-id>")]),t._v(" (For Session Flow)")])])])]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),s("p",[t._v("Since there is no callback received on this flow, it is recommended to configure "),s("RouterLink",{attrs:{to:"/bank-connect/webhook.html"}},[t._v("Webhook")])],1)]),t._v(" "),s("h2",{attrs:{id:"inline-frame-workflow"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#inline-frame-workflow"}},[t._v("#")]),t._v(" Inline Frame Workflow")]),t._v(" "),s("img",{attrs:{src:"/javascript_iframe.jpg",alt:"JavaScript SDK iframe Workflow"}}),t._v(" "),s("p",[t._v("The flow for this involves the following steps:")]),t._v(" "),s("ul",[s("li",[t._v("Create a session using "),s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#session-api"}},[t._v("Session API")])],1),t._v(" "),s("li",[t._v("Get the URL received from above API and embed it in an "),s("code",[t._v("<iframe>")])]),t._v(" "),s("li",[t._v("You'll "),s("RouterLink",{attrs:{to:"/bank-connect/javascript.html#receive-callbacks"}},[t._v("receive callbacks")]),t._v(" by implementing an event listener. Based on the event you can close / hide the inline frame.")],1)]),t._v(" "),s("h2",{attrs:{id:"receive-callbacks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#receive-callbacks"}},[t._v("#")]),t._v(" Receive callbacks")]),t._v(" "),s("ol",[s("li",[t._v("To receive callbacks in "),s("code",[t._v("<iframe>")]),t._v(" workflow, you need to implement an event listener. It can be implemented as follows:")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token doctype"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),s("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token name"}},[t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("en"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}},[s("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n    window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'message'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Event -> "')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  ")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("iframe")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("<url-from-create-session>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("width")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("500px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("700px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("iframe")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("Ï\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("To receive callbacks in "),s("code",[t._v("Android WebView")]),t._v(", a "),s("a",{attrs:{href:"https://developer.android.com/guide/webapps/webview#UsingJavaScript",target:"_blank",rel:"noopener noreferrer"}},[t._v("Javascript Interface"),s("OutboundLink")],1),t._v(" can be used to get the events.")])]),t._v(" "),s("ul",[s("li",[t._v("Interface Name: "),s("code",[t._v("BankConnectAndroid")])]),t._v(" "),s("li",[t._v("Callback Functions\n"),s("ul",[s("li",[t._v("All Events: "),s("code",[t._v("onResult")])]),t._v(" "),s("li",[t._v("Error: "),s("code",[t._v("onError")])]),t._v(" "),s("li",[t._v("Exit: "),s("code",[t._v("onExit")])]),t._v(" "),s("li",[t._v("Success: "),s("code",[t._v("onSuccess")])]),t._v(" "),s("li",[t._v("Extra Info: "),s("code",[t._v("onInfo")])])])])]),t._v(" "),s("h3",{attrs:{id:"event-object"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#event-object"}},[t._v("#")]),t._v(" Event Object")]),t._v(" "),s("p",[t._v("The "),s("code",[t._v("event")]),t._v(" object received by the listener can be one of the following:")]),t._v(" "),s("h4",{attrs:{id:"success"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#success"}},[t._v("#")]),t._v(" Success")]),t._v(" "),s("p",[t._v("This is received when user completes the upload process.")]),t._v(" "),s("ol",[s("li",[t._v("Iframe")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"finbox-bankconnect"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("status")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"success"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("payload")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"entityId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1d1f-sfdrf-17hf-asda"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Unique ID that will used to fetch statement data")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"sessionId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"8a7a-jidaj-22aa-asla"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Unique ID that will used to fetch statement data for session flow")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("WebView")])]),t._v(" "),s("p",[s("code",[t._v("BankConnectAndroid.onSuccess")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"entityId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1d1f-sfdrf-17hf-asda"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Unique ID that will used to fetch statement data")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"sessionId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"8a7a-jidaj-22aa-asla"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Unique ID that will used to fetch statement data for session flow")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"exit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#exit"}},[t._v("#")]),t._v(" Exit")]),t._v(" "),s("p",[t._v("This is received when user exits the SDK.")]),t._v(" "),s("ol",[s("li",[t._v("Iframe")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"finbox-bankconnect"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("status")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"exit"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("payload")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<exit message>"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("WebView\n"),s("code",[t._v("BankConnectAndroid.onExit")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<exit message>"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"error"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#error"}},[t._v("#")]),t._v(" Error")]),t._v(" "),s("p",[t._v("This is received whenever any error occurs in the user flow.")]),t._v(" "),s("ol",[s("li",[t._v("Iframe")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"finbox-bankconnect"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("status")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"error"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("payload")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"reason"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Reason for failure"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"error_type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MUXXX"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//MUXXX for Manual Upload and NBXXX for Net Banking")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("WebView\n"),s("code",[t._v("BankConnectAndroid.onError")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"reason"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Reason for failure"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"error_type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MUXXX"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//MUXXX for Manual Upload and NBXXX for Net Banking")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("Two Events")]),t._v(" "),s("p",[t._v("In case an error occurs, you'll receive "),s("code",[t._v("OnError")]),t._v(" event payload, and then if the user exits the SDK, you'll receive another event payload, this time for "),s("code",[t._v("OnExit")]),t._v(".")])]),t._v(" "),s("h5",{attrs:{id:"error-types"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#error-types"}},[t._v("#")]),t._v(" Error types")]),t._v(" "),s("p",[t._v("In case of Error, error_type of  "),s("code",[t._v("MUXXX")]),t._v(" implies an error in Manual PDF Upload and "),s("code",[t._v("NBXXX")]),t._v(" implies its from Netbanking.")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Case")]),t._v(" "),s("th",[t._v("error_type")]),t._v(" "),s("th",[t._v("Sample payload")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("Trial Expired for Dev Credentials")]),t._v(" "),s("td",[t._v("MU002")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"Trial Expired for Dev Credentials",linkID:"<USER_ID_PASSED>","error_type":"MU002"}')])])]),t._v(" "),s("tr",[s("td",[t._v("PDF Password Incorrect")]),t._v(" "),s("td",[t._v("MU003")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"Password Incorrect",linkID:"<USER_ID_PASSED>","error_type":"MU003"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Specified bank doesn't match with detected bank")]),t._v(" "),s("td",[t._v("MU004")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"Not axis statement",linkID:"<USER_ID_PASSED>","error_type":"MU004"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Non Parsable PDF - PDF file is corrupted or has no selectable text (only scanned images)")]),t._v(" "),s("td",[t._v("MU006")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"",linkID:"<USER_ID_PASSED>","error_type":"MU006"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Not a valid statement or bank is not supported")]),t._v(" "),s("td",[t._v("MU020")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"Not a valid statement or bank is not supported",linkID:"<USER_ID_PASSED>","error_type":"MU020"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Invalid Date Range")]),t._v(" "),s("td",[t._v("MU021")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"Please upload statements within the date range fromDate to toDate",linkID:"<USER_ID_PASSED>","error_type":"MU021"}')])])]),t._v(" "),s("tr",[s("td",[t._v("NetBanking Failed")]),t._v(" "),s("td",[t._v("NB000")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"failure_message",linkID:"<USER_ID_PASSED>","error_type":"NB000"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Netbanking Login Error")]),t._v(" "),s("td",[t._v("NB003")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"failure_message",linkID:"<USER_ID_PASSED>","error_type":"NB003"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Captcha Error")]),t._v(" "),s("td",[t._v("NB004")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"Invalid Captcha",linkID:"<USER_ID_PASSED>","error_type":"NB004"}')])])]),t._v(" "),s("tr",[s("td",[t._v("Security Error")]),t._v(" "),s("td",[t._v("NB005")]),t._v(" "),s("td",[s("code",[t._v('{"reason:"failure_message",linkID:"<USER_ID_PASSED>","error_type":"NB005"}')])])])])]),t._v(" "),s("h4",{attrs:{id:"info-events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#info-events"}},[t._v("#")]),t._v(" Info Events")]),t._v(" "),s("p",[t._v("Android and JS events are passed which can used for purposes such as analytics.The object passed is of the following format.")]),t._v(" "),s("ol",[s("li",[t._v("Iframe")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"finbox-bankconnect"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("status")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("payload")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"event_name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bank_selected"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Name of the EVENT")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"HDFC BANK"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//extra data passed in certain events")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("WebView\n"),s("code",[t._v("BankConnectAndroid.onInfo")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"linkId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<USER_ID_PASSED>"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//Link ID is the identifier that was passed while initializing the SDK")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"event_name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"manual_upload_back"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Name of the EVENT")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"message"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//extra data passed in certain events")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("Event")]),t._v(" "),s("th",[t._v("event_name")]),t._v(" "),s("th",[t._v("message")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("Bank selected")]),t._v(" "),s("td",[t._v("bank_selected")]),t._v(" "),s("td",[s("code",[t._v("<BANK NAME>")])])]),t._v(" "),s("tr",[s("td",[t._v("Manual upload screen opened")]),t._v(" "),s("td",[t._v("manual")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("Clicked back in Manual Upload")]),t._v(" "),s("td",[t._v("manual_upload_back")]),t._v(" "),s("td",[t._v("-")])]),t._v(" "),s("tr",[s("td",[t._v("Clicked back in Netbanking")]),t._v(" "),s("td",[t._v("net_banking_back")]),t._v(" "),s("td",[t._v("-")])])])])])}),[],!1,null,null,null);s.default=n.exports}}]);