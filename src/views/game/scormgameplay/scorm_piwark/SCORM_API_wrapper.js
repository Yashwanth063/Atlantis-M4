
// const pipwerks = {
//     SCORM: {
//         version: null,
//         debug: true,
//         API: null,
//         allowedOrigins: [
//             "https://cloud.scorm.com",
//             "https://localhost:3000",
//             "https://your-lms-domain.com",
//             "https://fast.wistia.com"
//         ],

//         init: function () {
//             if (this.debug) console.log("🔍 Initializing SCORM...");

//             return this._sendToParent("Initialize", "").then(success => {
//                 if (success) {
//                     this.version = window.API_1484_11 ? "2004" : "1.2";
//                     if (this.debug) console.log(`📘 SCORM version detected: ${this.version}`);
//                 }
//                 return success;
//             });
//         },

//         finish: function () {
//             if (this.debug) console.log("🛑 Terminating SCORM session...");
//             return this._sendToParent("Terminate", "");
//         },

//         getValue: function (parameter) {
//             if (this.debug) console.log(`📤 Getting SCORM value: ${parameter}`);
//             return this._sendToParent("GetValue", parameter);
//         },


//         setValue: function (parameter, value) {
//             if (this.debug) console.log(`📥 Setting SCORM value: ${parameter} = ${value}`);
//             return this._sendToParent("SetValue", { parameter, value });
//         },

//         commit: function () {
//             if (this.debug) console.log("💾 Committing SCORM data...");
//             return this._sendToParent("Commit", "");
//         },

//         _sendToParent: function (action, data) {
//             return new Promise((resolve) => {
//                 const requestId = Math.random().toString(36).substring(2, 9);

//                 const responseHandler = (event) => {
//                     if (!this._isValidOrigin(event.origin)) return;
//                     if (event.data?.type === "SCORM_RESPONSE" && event.data.requestId === requestId) {
//                         window.removeEventListener("message", responseHandler);
//                         resolve(event.data.success ? event.data.result : null);
//                     }
//                 };

//                 window.addEventListener("message", responseHandler);

//                 window.parent.postMessage({
//                     type: "SCORM_REQUEST",
//                     action,
//                     data,
//                     requestId
//                 }, "*");
//             });
//         },

//         _isValidOrigin: function (origin) {
//             const domain = new URL(origin).hostname;
//             return this.allowedOrigins.some(allowed =>
//                 domain === new URL(allowed).hostname ||
//                 domain.endsWith(`.${new URL(allowed).hostname}`)
//             );
//         }
//     }
// };
console.log("✅ SCORM Wrapper loaded (cross-origin mode)");


const pipwerks = {
    SCORM: {
        version: null,
        debug: true,
        API: null,
        allowedOrigins: [
            "https://cloud.scorm.com",
            "https://localhost:3000",
            "https://192.168.1.35:3000",
            "https://your-lms-domain.com",
            "https://fast.wistia.com"
        ],


// may today
// init: async function () {
//     if (this.debug) console.log("🔍 Initializing SCORM...",this);




// if (this.debug) {
//     const version = pipwerks.SCORM.version
//     console.log(`📘 SCORM version detected: ${version || "Unknown"}`);
//     console.log(`📘 SCORM version detected: ${this.version || "Unknown"}`);
// }

//     // Detect version based on which API object is present
//     // this.version = window.API_1484_11 ? "2004" : window.API ? "1.2" : null;
//     // if (this.debug) console.log(`📘 SCORM version detected: ${this.version || "Unknown"}`);

// this.version = "2004";
//     const action = this.version === "2004" ? "Initialize" : "LMSInitialize";
// console.log("action in SCORM_API_wrapper",action)
//     return this._sendToParent(action, "").then(success => {
//         // Equivalent of: const success = pipwerks.SCORM.init();
//         if (this.debug) {
//             console.log("✅ SCORM initialization success:", success);
//             console.log("📘 SCORM version detected:", this.version || "Unknown");
//         }
//         return success;
//     });
// },


// found it
 init: async function () {
            if (this.debug) console.log("🔍 Initializing SCORM...", this);

            if (this.debug) {
                const version = pipwerks.SCORM.version;
                console.log(`📘 SCORM version received: ${version || "Unknown"}`);
                console.log(`📘 SCORM version detected: ${this.version || "Unknown"}`);
            }

//             this.version = window.API_1484_11 ? "2004" : window.API ? "1.2" : null;
// console.log("version detected:",this.version)
// console.log("version detected2:",this)
            // if (this.debug) console.log(`📘 SCORM version detected: ${this.version || "Unknown"}`);

            const action = this.version === "2004" ? "Initialize" : "LMSInitialize";
            console.log("action in SCORM_API_wrapper", action);

            return this._sendToParent(action, "").then(success => {
                if (this.debug) {
                    console.log("✅ SCORM initialization success:", success);
                    console.log("📘 SCORM version detected:", this.version || "Unknown");
                }
                return success;
            });
        },
 

        finish: function () {
            if (this.debug) console.log("🛑 Terminating SCORM session...");

            const action = this.version === "2004" ? "Terminate" : "LMSFinish";
            return this._sendToParent(action, "");
        },

        getValue: function (parameter) {
            if (this.debug) console.log(`📤 Getting SCORM value: ${parameter}`);

            const action = this.version === "2004" ? "GetValue" : "LMSGetValue";
            return this._sendToParent(action, parameter);
        },

        setValue: function (parameter, value) {
            if (this.debug) console.log(`📥 Setting SCORM value: ${parameter} = ${value}`);

            const action = this.version === "2004" ? "SetValue" : "LMSSetValue";
            return this._sendToParent(action, { parameter, value });
        },

        commit: function () {
            if (this.debug) console.log("💾 Committing SCORM data...");

            const action = this.version === "2004" ? "Commit" : "LMSCommit";
            return this._sendToParent(action, "");
        },

        _sendToParent: function (action, data) {
            return new Promise((resolve) => {
                const requestId = Math.random().toString(36).substring(2, 9);

                const responseHandler = (event) => {
                    if (!this._isValidOrigin(event.origin)) return;
                    if (event.data?.type === "SCORM_RESPONSE" && event.data.requestId === requestId) {
                        window.removeEventListener("message", responseHandler);
                        resolve(event.data.success ? event.data.result : null);
                        console.log("sending to parent-event.data.success",event.data.success)
                        console.log("sending to parent-event.data.result",event.data.result)
                    }
                };

                window.addEventListener("message", responseHandler);

                window.parent.postMessage({
                    type: "SCORM_REQUEST",
                    action,
                    data,
                    requestId
                }, "*");
            });
        },

        _isValidOrigin: function (origin) {
            const domain = new URL(origin).hostname;
            return this.allowedOrigins.some(allowed =>
                domain === new URL(allowed).hostname ||
                domain.endsWith(`.${new URL(allowed).hostname}`)
            );
        }
    }
    };
// console.log("✅ SCORM Wrapper loaded (cross-origin mode)");

// const pipwerks = {
//     SCORM: {
//         version: null,
//         debug: true,
//         API: null,
//         allowedOrigins: [
//             "https://cloud.scorm.com",
//             "https://localhost:3000",
//             "https://192.168.1.35:3000",
//             "https://your-lms-domain.com",
//             "https://fast.wistia.com"
//         ],

//         init: async function () {
//             if (this.debug) console.log("🔍 Initializing SCORM...", this);

//             if (this.debug) {
//                 const version = pipwerks.SCORM.version;
//                 console.log(`📘 SCORM version received: ${version || "Unknown"}`);
//                 console.log(`📘 SCORM version detected: ${this.version || "Unknown"}`);
//             }

//             this.version = window.API_1484_11 ? "2004" : window.API ? "1.2" : null;

//             if (this.debug) console.log(`📘 SCORM version detected: ${this.version || "Unknown"}`);

//             const action = this.version === "2004" ? "Initialize" : "LMSInitialize";
//             console.log("action in SCORM_API_wrapper", action);

//             return this._sendToParent(action, "").then(success => {
//                 if (this.debug) {
//                     console.log("✅ SCORM initialization success:", success);
//                     console.log("📘 SCORM version detected:", this.version || "Unknown");
//                 }
//                 return success;
//             });
//         },

//         finish: function () {
//             if (this.debug) console.log("🛑 Terminating SCORM session...");
//             const action = this.version === "2004" ? "Terminate" : "LMSFinish";
//             return this._sendToParent(action, "");
//         },

//         getValue: function (parameter) {
//             if (this.debug) console.log(`📤 Getting SCORM value: ${parameter}`);
//             const action = this.version === "2004" ? "GetValue" : "LMSGetValue";
//             return this._sendToParent(action, parameter);
//         },

//         setValue: function (parameter, value) {
//             if (this.debug) console.log(`📥 Setting SCORM value: ${parameter} = ${value}`);
//             const action = this.version === "2004" ? "SetValue" : "LMSSetValue";
//             return this._sendToParent(action, { parameter, value });
//         },

//         commit: function () {
//             if (this.debug) console.log("💾 Committing SCORM data...");
//             const action = this.version === "2004" ? "Commit" : "LMSCommit";
//             return this._sendToParent(action, "");
//         },

//         _sendToParent: function (action, data) {
//             return new Promise((resolve) => {
//                 const requestId = Math.random().toString(36).substring(2, 9);
//                 const responseHandler = (event) => {
//                     if (!this._isValidOrigin(event.origin)) return;
//                     if (event.data?.type === "SCORM_RESPONSE" && event.data.requestId === requestId) {
//                         window.removeEventListener("message", responseHandler);
//                         resolve(event.data.success ? event.data.result : null);
//                         console.log("sending to parent-event.data.success", event.data.success);
//                         console.log("sending to parent-event.data.result", event.data.result);
//                     }
//                 };
//                 window.addEventListener("message", responseHandler);
//                 window.parent.postMessage({
//                     type: "SCORM_REQUEST",
//                     action,
//                     data,
//                     requestId
//                 }, "*");
//             });
//         },

//         _isValidOrigin: function (origin) {
//             const domain = new URL(origin).hostname;
//             return this.allowedOrigins.some(allowed =>
//                 domain === new URL(allowed).hostname ||
//                 domain.endsWith(`.${new URL(allowed).hostname}`)
//             );
//         }
//     }
// };


// ✅ Handle version setting from parent frame (cross-origin)
window.addEventListener("message", (event) => {
    if (!pipwerks.SCORM._isValidOrigin(event.origin)) return;

    if (event.data?.type === "SET_SCORM_VERSION") {
        pipwerks.SCORM.version = event.data.version;
        console.log("📥 SCORM version received from parent:", pipwerks.SCORM.version);
    }
});

if (window === window.top) {
    // Add SCORM version detection
    function detectSCORMVersion() {
        if (typeof window.API_1484_11 !== "undefined") return "2004";
        if (typeof window.API !== "undefined") return "1.2";
        return null;
    }

    function getSCORMAPI(version) {
        return version === "2004" ? window.API_1484_11 : window.API;
    }

    const scormVersion = detectSCORMVersion();
    const API = getSCORMAPI(scormVersion);

    console.log("✅ SCORM API found:", API?.constructor?.name || "Unknown");
    console.log("📦 Detected SCORM version:", scormVersion);

    window.addEventListener("message", async (event) => {
        if (!pipwerks.SCORM._isValidOrigin(event.origin)) return;
        if (event.data?.type !== "SCORM_REQUEST") return;

        const { action, data, requestId } = event.data;
        let result = false;

        try {
            switch (action) {
                case "Initialize":
                    result = (scormVersion === "2004")
                        ? API?.Initialize?.("")
                        : API?.LMSInitialize?.("");
                    break;
                case "Terminate":
                    result = (scormVersion === "2004")
                        ? API?.Terminate?.("")
                        : API?.LMSFinish?.("");
                    break;
                case "GetValue":
                    result = (scormVersion === "2004")
                        ? API?.GetValue?.(data)
                        : API?.LMSGetValue?.(data);
                    break;
                case "SetValue":
                    result = (scormVersion === "2004")
                        ? API?.SetValue?.(data.parameter, data.value)
                        : API?.LMSSetValue?.(data.parameter, data.value);
                    break;
                case "Commit":
                    result = (scormVersion === "2004")
                        ? API?.Commit?.("")
                        : API?.LMSCommit?.("");
                    break;
            }

            event.source.postMessage({
                type: "SCORM_RESPONSE",
                requestId,
                success: true,
                result
            }, event.origin);
        } catch (error) {
            event.source.postMessage({
                type: "SCORM_RESPONSE",
                requestId,
                success: false,
                error: error.message
            }, event.origin);
        }
    });
}

// --------------------------------------
// Public SCORM Helper
// --------------------------------------
export const SCORMWrapper = {
    initializeScorm: async function () {
        const success = await pipwerks.SCORM.init();
        if (!success) {
            console.error("❌ SCORM initialization failed");
            return false;
        }
        console.log("✅ SCORM session initialized");
        return true;
    },

    terminateScorm: async function () {
        const success = await pipwerks.SCORM.finish();
        if (!success) {
            console.error("❌ SCORM termination failed");
            return false;
        }
        console.log("✅ SCORM session terminated");
        return true;
    },

    sendScormScore: async function (rawScore, maxScore) {
        const minScore = 0;
        const scaledScore = Math.max(0, Math.min(1, (rawScore - minScore) / (maxScore - minScore))).toFixed(2);
        const isPassed = parseFloat(scaledScore) >= 0.8;

        const values2004 = [
            { param: "cmi.score.min", value: minScore },
            { param: "cmi.score.max", value: maxScore },
            { param: "cmi.score.raw", value: rawScore },
            { param: "cmi.score.scaled", value: scaledScore },
            { param: "cmi.completion_status", value: isPassed ? "completed" : "incomplete" },
            { param: "cmi.success_status", value: isPassed ? "passed" : "failed" }
        ];
values2004.forEach(item => {
    console.log(`${item.param}: ${item.value}`);
});
        const values12 = [
            { param: "cmi.core.score.min", value: minScore },
            { param: "cmi.core.score.max", value: maxScore },
            { param: "cmi.core.score.raw", value: rawScore },
            { param: "cmi.core.lesson_status", value: isPassed ? "passed" : "failed" }
        ];
values12.forEach(item => {
    console.log(`${item.param}: ${item.value}`);
});

        const values = pipwerks.SCORM.version === "2004" ? values2004 : values12;
        // const values = pipwerks.SCORM.version === "2004";

        for (const { param, value } of values) {
            const success = pipwerks.SCORM.setValue(param, value);
            if (!success) console.error(`⚠️ Failed to set ${param}`);
        }

        pipwerks.SCORM.commit();
        console.log("✅ SCORM score updated and committed");
    }
};


export default pipwerks;



