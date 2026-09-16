import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Check, s as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as krakowStories, r as cn, s as useProgress } from "./router-C5aZ434T.mjs";
import { t } from "./copy-C6vkCIeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/krakow-aZ_6UMsE.js
var import_jsx_runtime = require_jsx_runtime();
function KrakowMap() {
	const locale = useProgress((s) => s.locale);
	const completed = useProgress((s) => s.completed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] w-full bg-bg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 320 400",
				className: "h-full w-full",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M20 300 C 80 280 140 310 200 290 C 250 275 300 300 320 285 L 320 400 L 0 400 Z",
						fill: "#d9cfc3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "168",
						cy: "168",
						rx: "118",
						ry: "96",
						fill: "#ebe3d6",
						stroke: "#1c1917",
						strokeWidth: "1.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "128",
						y: "128",
						width: "86",
						height: "78",
						fill: "#faf6f0",
						stroke: "#1c1917",
						strokeWidth: "1.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "152",
						y: "148",
						width: "38",
						height: "14",
						fill: "#cfc4b6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "148",
						y: "248",
						width: "52",
						height: "36",
						fill: "#8a6a52",
						stroke: "#1c1917",
						strokeWidth: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "24",
						y: "28",
						fill: "#6f6458",
						fontSize: "11",
						fontFamily: "Source Sans 3, sans-serif",
						children: locale === "pl" ? "Stare Miasto" : "Old Town"
					})
				]
			}), krakowStories.map((story) => {
				const done = completed.includes(story.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/krakow/$storyId",
					params: { storyId: story.id },
					className: cn("absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-medium shadow-sm", done ? "border-success bg-success text-primary-fg" : "border-primary bg-primary text-primary-fg"),
					style: {
						left: `${story.pin.x}%`,
						top: `${story.pin.y}%`
					},
					"aria-label": t(story.title, locale),
					children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : story.id.slice(0, 1).toUpperCase()
				}, story.id);
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: krakowStories.map((story) => {
				const done = completed.includes(story.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/krakow/$storyId",
					params: { storyId: story.id },
					className: "flex min-h-14 items-center justify-between gap-3 px-4 py-3 hover:bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: t(story.title, locale)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: t(story.place, locale)
					})] }), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-primary",
						children: locale === "pl" ? "Otwórz" : "Open"
					})]
				}) }, story.id);
			})
		})]
	});
}
function KrakowPage() {
	const locale = useProgress((s) => s.locale);
	const done = useProgress((s) => s.completed).filter((id) => krakowStories.some((s) => s.id === id)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), locale === "pl" ? "Polska" : "Poland"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-4 font-display text-4xl leading-tight tracking-tight",
			children: "Kraków"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-prose text-ink-soft",
			children: locale === "pl" ? "Otwórz pinezkę. Przeczytaj, co ludzie opowiadają, i co da się sprawdzić. Zagraj minutę. Potem idź na miejsce." : "Open a pin. Read what people tell, and what can be checked. Play for a minute. Then go stand there."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm tabular-nums text-muted",
			children: [
				done,
				"/",
				krakowStories.length
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KrakowMap, {})
		})
	] });
}
//#endregion
export { KrakowPage as component };
