import React from "react";

export default function ApplyDemo() {
  return (
    <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-900">
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        This button uses a CSS class <code>.btn-apply</code> defined in <code>globals.css</code> using the <code>@apply</code> directive.
      </p>
      <button className="btn-apply">
        @apply Button
      </button>
    </div>
  );
}
