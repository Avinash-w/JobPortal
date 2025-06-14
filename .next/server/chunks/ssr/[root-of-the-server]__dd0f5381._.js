module.exports = {

"[externals]/jwt-decode [external] (jwt-decode, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("jwt-decode");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/react-dom [external] (react-dom, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}}),
"[project]/components/PersonalDetails.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PersonalDetails)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
;
;
;
function PersonalDetails({ user, setUser }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        mobile: "",
        languages: ""
    });
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [previewImage, setPreviewImage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("/default-profile.png");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (user) {
            const nameParts = user?.name?.split(" ") || [];
            setFormData({
                firstName: user?.firstName || nameParts[0] || "",
                middleName: user?.middleName || "",
                lastName: user?.lastName || (nameParts.length > 2 ? nameParts.slice(2).join(" ") : nameParts[1] || ""),
                dob: user?.dob || "",
                gender: user?.gender || "",
                email: user?.email || "",
                mobile: user?.mobile || user?.phone || "",
                languages: user?.languages || ""
            });
            setPreviewImage(user?.profileImage || "/default-profile.png");
        }
    }, [
        user
    ]);
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpload = async ()=>{
        if (!selectedFile) {
            alert("Please select an image first");
            return;
        }
        setUploading(true);
        const formDataImg = new FormData();
        formDataImg.append("file", selectedFile);
        formDataImg.append("userId", user._id);
        try {
            const res = await fetch("/api/uploadProfileImage", {
                method: "POST",
                body: formDataImg
            });
            const data = await res.json();
            if (res.ok) {
                alert("Profile image uploaded!");
                setPreviewImage(data.user.profileImage);
                if (setUser) setUser(data.user); // update parent state or context
            } else {
                console.error("Upload failed:", data.message || data);
                alert("Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Something went wrong during upload");
        } finally{
            setUploading(false);
        }
    };
    const handleSave = async ()=>{
        try {
            const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
            const res = await fetch(`/api/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    personal: {
                        ...formData,
                        name: fullName,
                        phone: formData.mobile
                    }
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert("Details updated successfully!");
                if (setUser) {
                    const refreshedRes = await fetch(`/api/user/${user._id}`);
                    const refreshedUser = await refreshedRes.json();
                    setUser(refreshedUser.user);
                }
            } else {
                alert(data.message || "Update failed");
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("Something went wrong.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-xl shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-gray-800 mb-4",
                children: "Personal Details"
            }, void 0, false, {
                fileName: "[project]/components/PersonalDetails.js",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-6 flex flex-col items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: previewImage,
                    alt: "Profile",
                    width: 80,
                    height: 80,
                    className: "rounded-full border-4 border-indigo-200 shadow-lg object-cover",
                    unoptimized: true
                }, void 0, false, {
                    fileName: "[project]/components/PersonalDetails.js",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PersonalDetails.js",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                    {
                        label: "First Name",
                        name: "firstName"
                    },
                    {
                        label: "Middle Name",
                        name: "middleName"
                    },
                    {
                        label: "Last Name",
                        name: "lastName"
                    },
                    {
                        label: "Date of Birth",
                        name: "dob",
                        type: "date"
                    },
                    {
                        label: "Gender",
                        name: "gender",
                        type: "select",
                        options: [
                            "",
                            "male",
                            "female",
                            "other"
                        ]
                    },
                    {
                        label: "Languages Known",
                        name: "languages"
                    },
                    {
                        label: "Email",
                        name: "email",
                        disabled: true
                    },
                    {
                        label: "Mobile Number",
                        name: "mobile"
                    }
                ].map(({ label, name, type = "text", options = [], disabled = false })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/PersonalDetails.js",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this),
                            type === "select" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                name: name,
                                value: formData[name],
                                onChange: handleChange,
                                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
                                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: opt,
                                        children: opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : "Select Gender"
                                    }, opt, false, {
                                        fileName: "[project]/components/PersonalDetails.js",
                                        lineNumber: 176,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/PersonalDetails.js",
                                lineNumber: 169,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: type,
                                name: name,
                                value: formData[name],
                                onChange: handleChange,
                                disabled: disabled,
                                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
                                placeholder: `Enter ${label}`
                            }, void 0, false, {
                                fileName: "[project]/components/PersonalDetails.js",
                                lineNumber: 184,
                                columnNumber: 17
                            }, this)
                        ]
                    }, name, true, {
                        fileName: "[project]/components/PersonalDetails.js",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/PersonalDetails.js",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Upload Profile Image"
                    }, void 0, false, {
                        fileName: "[project]/components/PersonalDetails.js",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "file",
                                onChange: handleImageChange,
                                className: "block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                            }, void 0, false, {
                                fileName: "[project]/components/PersonalDetails.js",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleUpload,
                                disabled: uploading,
                                className: "px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition",
                                children: uploading ? "Uploading..." : "Upload"
                            }, void 0, false, {
                                fileName: "[project]/components/PersonalDetails.js",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PersonalDetails.js",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PersonalDetails.js",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6 text-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: handleSave,
                    className: "px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition",
                    children: "Save Details"
                }, void 0, false, {
                    fileName: "[project]/components/PersonalDetails.js",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PersonalDetails.js",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PersonalDetails.js",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/EducationDetails.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EducationDetails)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function EducationDetails({ user }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        tenthBoard: "",
        tenthSchool: "",
        tenthYear: "",
        tenthPercent: "",
        twelfthBoard: "",
        twelfthSchool: "",
        twelfthYear: "",
        twelfthPercent: "",
        diplomaBoard: "",
        diplomaCollege: "",
        diplomaYear: "",
        diplomaPercent: "",
        diplomaStream: "",
        gradBoard: "",
        gradCollege: "",
        gradYear: "",
        gradPercent: "",
        gradStream: "",
        otherCertifications: "",
        certificateFile: null
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const fetchEducation = async ()=>{
            try {
                const res = await fetch(`/api/user/${user._id}`);
                const data = await res.json();
                if (res.ok && data?.user?.education) {
                    const edu = data.user.education;
                    setFormData((prev)=>({
                            ...prev,
                            ...edu,
                            certificateFile: null
                        }));
                }
            } catch (err) {
                console.error("Failed to fetch education details", err);
            }
        };
        if (user?._id) {
            fetchEducation();
        }
    }, [
        user
    ]);
    const handleChange = (e)=>{
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setFormData((prev)=>({
                    ...prev,
                    [name]: files[0]
                }));
        } else {
            setFormData((prev)=>({
                    ...prev,
                    [name]: value
                }));
        }
    };
    const handleSave = async ()=>{
        try {
            const formDataToSend = {
                ...formData
            };
            if (formDataToSend.certificateFile) {
                formDataToSend.certificateFile = null;
            }
            const res = await fetch(`/api/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    education: formDataToSend
                })
            });
            await res.json(); // ✅ fixed: no unused variable
            if (res.ok) {
                alert("Education details saved!");
            } else {
                alert("Failed to save.");
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("Error occurred.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-black-700 mb-4",
                children: "Education Details"
            }, void 0, false, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                title: "10th Class",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "tenthBoard",
                        label: "Board",
                        value: formData.tenthBoard,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "tenthSchool",
                        label: "School Name",
                        value: formData.tenthSchool,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "tenthYear",
                        label: "Passing Year",
                        type: "number",
                        value: formData.tenthYear,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "tenthPercent",
                        label: "Percentage/CGPA",
                        value: formData.tenthPercent,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                title: "12th Class",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "twelfthBoard",
                        label: "Board",
                        value: formData.twelfthBoard,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "twelfthSchool",
                        label: "School Name",
                        value: formData.twelfthSchool,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "twelfthYear",
                        label: "Passing Year",
                        type: "number",
                        value: formData.twelfthYear,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "twelfthPercent",
                        label: "Percentage/CGPA",
                        value: formData.twelfthPercent,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                title: "Diploma",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "diplomaBoard",
                        label: "Board/University",
                        value: formData.diplomaBoard,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "diplomaCollege",
                        label: "College Name",
                        value: formData.diplomaCollege,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "diplomaYear",
                        label: "Passing Year",
                        type: "number",
                        value: formData.diplomaYear,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "diplomaPercent",
                        label: "Percentage/CGPA",
                        value: formData.diplomaPercent,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "diplomaStream",
                        label: "Stream",
                        value: formData.diplomaStream,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                title: "Graduation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "gradBoard",
                        label: "Board/University",
                        value: formData.gradBoard,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "gradCollege",
                        label: "College Name",
                        value: formData.gradCollege,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "gradYear",
                        label: "Passing Year",
                        type: "number",
                        value: formData.gradYear,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "gradPercent",
                        label: "Percentage/CGPA",
                        value: formData.gradPercent,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "gradStream",
                        label: "Stream",
                        value: formData.gradStream,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                title: "Other Certifications",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Input, {
                        name: "otherCertifications",
                        label: "Certification Details",
                        value: formData.otherCertifications,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Upload Certificate"
                            }, void 0, false, {
                                fileName: "[project]/components/EducationDetails.js",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "file",
                                name: "certificateFile",
                                onChange: handleChange,
                                className: "block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                            }, void 0, false, {
                                fileName: "[project]/components/EducationDetails.js",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EducationDetails.js",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-6 text-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleSave,
                    className: "px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition",
                    children: "Save Details"
                }, void 0, false, {
                    fileName: "[project]/components/EducationDetails.js",
                    lineNumber: 143,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EducationDetails.js",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
// Reusable Components
const Section = ({ title, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-gray-700 mt-6",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 158,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 159,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
const Input = ({ name, label, value, onChange, type = "text" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 165,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                type: type,
                name: name,
                value: value,
                onChange: onChange,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400",
                placeholder: `Enter ${label}`
            }, void 0, false, {
                fileName: "[project]/components/EducationDetails.js",
                lineNumber: 166,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EducationDetails.js",
        lineNumber: 164,
        columnNumber: 3
    }, this);
}}),
"[project]/components/ProfessionalDetails.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProfessionalDetails)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function ProfessionalDetails({ user }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        experienceYears: "",
        experienceMonths: "",
        salarySlip: null,
        experienceLetter: null,
        joiningLetter: null,
        currentSalary: "",
        expectedSalary: ""
    });
    // Optional: Fetch existing professional data on mount
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const fetchDetails = async ()=>{
            try {
                const res = await fetch(`/api/user/${user._id}`);
                const result = await res.json();
                if (res.ok && result.user?.professional) {
                    setFormData((prev)=>({
                            ...prev,
                            ...result.user.professional,
                            salarySlip: null,
                            experienceLetter: null,
                            joiningLetter: null
                        }));
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        if (user?._id) {
            fetchDetails();
        }
    }, [
        user
    ]);
    const handleFileChange = (e)=>{
        const { name, files } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: files[0]
            }));
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleSave = async ()=>{
        try {
            // Exclude file fields from JSON body
            const jsonData = {
                ...formData
            };
            delete jsonData.salarySlip;
            delete jsonData.experienceLetter;
            delete jsonData.joiningLetter;
            const res = await fetch(`/api/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    professional: jsonData
                })
            });
            await res.json(); // remove unused variable warning
            if (res.ok) {
                alert("Professional details updated successfully!");
            } else {
                alert("Failed to update details.");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Error occurred while saving details.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold text-blue-700",
                children: "Professional Information"
            }, void 0, false, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "number",
                        name: "experienceYears",
                        placeholder: "Experience (Years)",
                        value: formData.experienceYears,
                        className: "input-style",
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "number",
                        name: "experienceMonths",
                        placeholder: "Experience (Months)",
                        value: formData.experienceMonths,
                        className: "input-style",
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "block mb-1 font-medium",
                        children: "Upload Salary Slip"
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "file",
                        name: "salarySlip",
                        className: "input-style",
                        onChange: handleFileChange
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "block mb-1 font-medium",
                        children: "Upload Experience Letter"
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "file",
                        name: "experienceLetter",
                        className: "input-style",
                        onChange: handleFileChange
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "block mb-1 font-medium",
                        children: "Upload Joining Letter"
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "file",
                        name: "joiningLetter",
                        className: "input-style",
                        onChange: handleFileChange
                    }, void 0, false, {
                        fileName: "[project]/components/ProfessionalDetails.js",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                type: "number",
                name: "currentSalary",
                placeholder: "Current Salary (per month)",
                value: formData.currentSalary,
                className: "input-style",
                onChange: handleChange
            }, void 0, false, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                type: "number",
                name: "expectedSalary",
                placeholder: "Expected Salary (per month)",
                value: formData.expectedSalary,
                className: "input-style",
                onChange: handleChange
            }, void 0, false, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-right mt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleSave,
                    className: "px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition",
                    children: "Save Details"
                }, void 0, false, {
                    fileName: "[project]/components/ProfessionalDetails.js",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ProfessionalDetails.js",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ProfessionalDetails.js",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
}}),
"[project]/pages/dashboard.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jwt$2d$decode__$5b$external$5d$__$28$jwt$2d$decode$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/jwt-decode [external] (jwt-decode, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PersonalDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PersonalDetails.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EducationDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/EducationDetails.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProfessionalDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProfessionalDetails.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$jwt$2d$decode__$5b$external$5d$__$28$jwt$2d$decode$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$jwt$2d$decode__$5b$external$5d$__$28$jwt$2d$decode$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
"use client";
;
;
;
;
;
;
;
function Dashboard() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [greeting, setGreeting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("personal");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const token = localStorage.getItem("token");
        if (!token) return;
        const decoded = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jwt$2d$decode__$5b$external$5d$__$28$jwt$2d$decode$2c$__esm_import$29$__["jwtDecode"])(token);
        fetchUser(decoded.userId);
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting("Good Morning");
        } else if (hour < 17) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []);
    const fetchUser = async (id)=>{
        try {
            const res = await fetch(`/api/user/${id}`);
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
            }
        } catch (err) {
            console.error("Error fetching user", err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-blue-50 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto mb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl font-extrabold text-gray-900 tracking-tight",
                                    children: [
                                        greeting,
                                        ", ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-indigo-600",
                                            children: user?.name || "User"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/dashboard.js",
                                            lineNumber: 51,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/dashboard.js",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-gray-500 text-base",
                                    children: "Welcome to your modern dashboard experience"
                                }, void 0, false, {
                                    fileName: "[project]/pages/dashboard.js",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/dashboard.js",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: user?.profileImage || "/default-profile.png",
                            alt: "Profile",
                            width: 100,
                            height: 100,
                            className: "rounded-full border-4 border-indigo-200 shadow-lg transition-transform hover:scale-105 object-cover"
                        }, void 0, false, {
                            fileName: "[project]/pages/dashboard.js",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/dashboard.js",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/dashboard.js",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-2 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `absolute left-0 top-0 w-1 bg-indigo-500 rounded-r-full transition-all duration-300 ${activeTab === "personal" ? "mt-2" : activeTab === "education" ? "mt-[68px]" : "mt-[134px]"} h-12`
                            }, void 0, false, {
                                fileName: "[project]/pages/dashboard.js",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            [
                                {
                                    id: "personal",
                                    label: "Personal",
                                    icon: "👤"
                                },
                                {
                                    id: "education",
                                    label: "Education",
                                    icon: "🎓"
                                },
                                {
                                    id: "professional",
                                    label: "Professional",
                                    icon: "💼"
                                }
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.id),
                                    className: `flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium transition-all duration-300 relative z-10 ${activeTab === tab.id ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-xl",
                                            children: tab.icon
                                        }, void 0, false, {
                                            fileName: "[project]/pages/dashboard.js",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        tab.label,
                                        " Details"
                                    ]
                                }, tab.id, true, {
                                    fileName: "[project]/pages/dashboard.js",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/dashboard.js",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "md:col-span-3 rounded-2xl shadow-xl p-6 transition-all",
                        children: [
                            !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-400",
                                children: "Loading..."
                            }, void 0, false, {
                                fileName: "[project]/pages/dashboard.js",
                                lineNumber: 103,
                                columnNumber: 21
                            }, this),
                            user && activeTab === "personal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PersonalDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                user: user
                            }, void 0, false, {
                                fileName: "[project]/pages/dashboard.js",
                                lineNumber: 104,
                                columnNumber: 48
                            }, this),
                            user && activeTab === "education" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EducationDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                user: user
                            }, void 0, false, {
                                fileName: "[project]/pages/dashboard.js",
                                lineNumber: 105,
                                columnNumber: 49
                            }, this),
                            user && activeTab === "professional" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProfessionalDetails$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                user: user
                            }, void 0, false, {
                                fileName: "[project]/pages/dashboard.js",
                                lineNumber: 106,
                                columnNumber: 52
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/dashboard.js",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/dashboard.js",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/dashboard.js",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__dd0f5381._.js.map