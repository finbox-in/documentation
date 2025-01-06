(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{351:function(e,t,s){"use strict";s.r(t);var i=s(8),r=Object(i.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"deviceconnect-backend-integration-flow"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#deviceconnect-backend-integration-flow"}},[e._v("#")]),e._v(" DeviceConnect: Backend Integration Flow")]),e._v(" "),t("p",[e._v("Once the FinBox DeviceConnect SDK is initialized, data collected from the device is sent to the FinBox processing engine, mapped to an anonymous "),t("code",[e._v("CUSTOMER_ID")]),e._v(". The "),t("code",[e._v("CUSTOMER_ID")]),e._v(" acts as the primary key for retrieving processed insights and predictors.")]),e._v(" "),t("p",[e._v("The "),t("strong",[e._v("Insights API")]),e._v(" allows clients to:")]),e._v(" "),t("ol",[t("li",[e._v("Trigger predictor calculations for a specific customer.")]),e._v(" "),t("li",[e._v("Retrieve real-time insights once the processing is complete.")])]),e._v(" "),t("p",[e._v("An overview of the API calling is shown below")]),e._v(" "),t("img",{attrs:{src:"/device_connect_back_end_integration.jpg",alt:"Device Connect Backed Integration Workflow"}}),e._v(" "),t("h3",{attrs:{id:"integration-workflow"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#integration-workflow"}},[e._v("#")]),e._v(" "),t("strong",[e._v("Integration Workflow")])]),e._v(" "),t("h3",{attrs:{id:"step-1-trigger-insights-processing"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-1-trigger-insights-processing"}},[e._v("#")]),e._v(" Step 1: Trigger Insights Processing")]),e._v(" "),t("p",[e._v("Call the Insights API with the "),t("code",[e._v("CUSTOMER_ID")]),e._v(" to start predictor calculations for a specific customer. The API will return a status:")]),e._v(" "),t("p",[t("strong",[t("code",[e._v('"in_progress"')])]),e._v(": The data is still being processed.")]),e._v(" "),t("h3",{attrs:{id:"step-2-poll-the-insights-api"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-2-poll-the-insights-api"}},[e._v("#")]),e._v(" Step 2: Poll the Insights API")]),e._v(" "),t("p",[e._v("If the status is "),t("code",[e._v('"in_progress"')]),e._v(", poll the Insights API at intervals of at least "),t("strong",[e._v("10 seconds")]),e._v(". Continue polling for a maximum duration of "),t("strong",[e._v("120 seconds")]),e._v(".")]),e._v(" "),t("h3",{attrs:{id:"step-3-retrieve-the-results"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#step-3-retrieve-the-results"}},[e._v("#")]),e._v(" Step 3: Retrieve the results")]),e._v(" "),t("p",[e._v("Once processing is complete, the API will return a status:")]),e._v(" "),t("ul",[t("li",[t("strong",[t("code",[e._v('"complete"')])]),e._v(": Insights and predictors are now available in the response. "),t("RouterLink",{attrs:{to:"/device-connect/insights-api.html#response"}},[e._v("Insights API Response")])],1)]),e._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[e._v("IMPORTANT")]),e._v(" "),t("ul",[t("li",[e._v("The "),t("code",[e._v("CUSTOMER_ID")]),e._v(" used here must be the same as the one provided during SDK initialization when calling the "),t("code",[e._v("createUser")]),e._v(" method. This ensures that the predictors are calculated for the correct user, as the CUSTOMER_ID serves as the primary key for linking data in both FinBox's system and your database.")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);