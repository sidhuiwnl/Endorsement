"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  WallOfFame: () => WallOfFame
});
module.exports = __toCommonJS(index_exports);

// src/WallOfFame.tsx
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
function WallOfFameGrid({
  className,
  title,
  description,
  imageUrl,
  userImage,
  handle
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `crotus-border crotus-rounded-xl crotus-p-4 crotus-mt-5 crotus-bg-gray-50 crotus-w-full crotus-flex crotus-flex-col crotus-gap-3 ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "crotus-text-sm crotus-font-medium", children: description }),
    imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        className: "crotus-object-contain crotus-rounded-lg",
        src: imageUrl,
        alt: `Review by ${title}`
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "crotus-flex crotus-flex-row crotus-items-center crotus-gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-relative crotus-inline-block crotus-h-8 crotus-w-8 crotus-rounded-full crotus-overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "img",
        {
          className: "crotus-h-full crotus-w-full crotus-object-cover",
          src: userImage,
          alt: title
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "crotus-flex crotus-flex-col crotus-ml-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "crotus-text-sm crotus-font-bold", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "crotus-text-sm", children: [
          "@",
          handle
        ] })
      ] })
    ] })
  ] });
}
function WallOfSkeletonComp() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-grid crotus-grid-cols-1 sm:crotus-grid-cols-2 lg:crotus-grid-cols-3 crotus-auto-rows-auto crotus-gap-2", children: [...Array(6)].map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "crotus-border crotus-rounded-xl crotus-p-4 crotus-mt-5 crotus-bg-gray-50 crotus-animate-pulse", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-h-4 crotus-bg-gray-200 crotus-rounded crotus-mb-4 crotus-w-3/4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-h-40 crotus-bg-gray-200 crotus-rounded crotus-mb-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "crotus-flex crotus-items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-h-8 crotus-w-8 crotus-bg-gray-200 crotus-rounded-full" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "crotus-ml-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-h-3 crotus-bg-gray-200 crotus-rounded crotus-w-20 crotus-mb-1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-h-3 crotus-bg-gray-200 crotus-rounded crotus-w-16" })
      ] })
    ] })
  ] }, index)) });
}
function fetchReviews(userId) {
  return __async(this, null, function* () {
    try {
      const response = yield fetch(`https://endorsement-nine.vercel.app/api/testimonial?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }
      const data = yield response.json();
      console.log("data", data);
      return data.tweetsText.filter((tweet) => tweet.status === "Approved");
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  });
}
function WallOfFame({ projectId, importLink = "/dashboard/import" }) {
  const [tweetsInfos, setTweetsInfos] = (0, import_react.useState)();
  const [error, setError] = (0, import_react.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    const loadData = () => __async(this, null, function* () {
      if (!projectId) {
        setError("Project ID is required");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const data = yield fetchReviews(projectId);
        setTweetsInfos(data);
        setError(null);
      } catch (error2) {
        console.error("Error fetching reviews:", error2);
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    });
    loadData();
  }, [projectId]);
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WallOfSkeletonComp, {});
  }
  if (!tweetsInfos || tweetsInfos.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "crotus-flex crotus-flex-col crotus-space-y-5 crotus-justify-center crotus-items-center crotus-mt-10", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "crotus-text-3xl md:crotus-text-5xl crotus-text-black crotus-text-center crotus-font-bold crotus-max-w-4xl crotus-tracking-tight", children: "The Wall Looks Empty! Import Reviews To Showcase your Wall of Achievement \u{1F614}" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("link", { href: importLink, className: "crotus-bg-black crotus-text-white crotus-px-4 crotus-py-2 crotus-rounded-full crotus-flex crotus-items-center crotus-space-x-2 crotus-border crotus-border-gray-300 hover:crotus-border-gray-400 crotus-transition-all", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Go To Import Review Section" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRight, { className: "crotus-ml-2", size: 16 })
      ] })
    ] });
  }
  if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "crotus-text-red-500", children: error });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crotus-grid crotus-grid-cols-1 sm:crotus-grid-cols-2 lg:crotus-grid-cols-3 crotus-auto-rows-auto crotus-gap-2", children: tweetsInfos.map((tweetsInfo, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    WallOfFameGrid,
    {
      title: tweetsInfo.username,
      handle: tweetsInfo.handle || "",
      userImage: tweetsInfo.profile,
      description: tweetsInfo.tweetContent,
      imageUrl: tweetsInfo.images[0],
      className: i === 3 || i === 6 ? "md:crotus-col-span-2" : ""
    },
    tweetsInfo.id
  )) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WallOfFame
});
