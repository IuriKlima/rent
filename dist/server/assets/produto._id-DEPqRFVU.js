import { U as jsxRuntimeExports } from "./worker-entry-B2NUglqf.js";
import { B as Button } from "./router-CYVMDCYh.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const SplitErrorComponent = ({
  error,
  reset
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-24 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold", children: "Algo deu errado" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: error.message }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: reset, className: "mt-6 rounded-full", children: "Tentar novamente" })
] });
export {
  SplitErrorComponent as errorComponent
};
