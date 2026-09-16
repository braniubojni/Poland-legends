import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Lock } from "../_libs/lucide-react.mjs";
import { r as cn, s as useProgress } from "./router-C5aZ434T.mjs";
import { t } from "./copy-C6vkCIeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMZAqBog.js
var import_jsx_runtime = require_jsx_runtime();
var cities = [
	{
		id: "krakow",
		name: {
			en: "Kraków",
			pl: "Kraków"
		},
		unlocked: true,
		map: {
			x: 52,
			y: 72
		},
		blurb: {
			en: "Six living stories. Open a pin, read the legend beside the record, then play.",
			pl: "Sześć żywych opowieści. Otwórz pinezkę, przeczytaj legendę obok faktu i zagraj."
		}
	},
	{
		id: "warsaw",
		name: {
			en: "Warsaw",
			pl: "Warszawa"
		},
		unlocked: false,
		map: {
			x: 62,
			y: 42
		},
		blurb: {
			en: "Coming next.",
			pl: "Wkrótce."
		}
	},
	{
		id: "gdansk",
		name: {
			en: "Gdańsk",
			pl: "Gdańsk"
		},
		unlocked: false,
		map: {
			x: 48,
			y: 14
		},
		blurb: {
			en: "Coming next.",
			pl: "Wkrótce."
		}
	},
	{
		id: "wroclaw",
		name: {
			en: "Wrocław",
			pl: "Wrocław"
		},
		unlocked: false,
		map: {
			x: 28,
			y: 58
		},
		blurb: {
			en: "Coming next.",
			pl: "Wkrótce."
		}
	},
	{
		id: "poznan",
		name: {
			en: "Poznań",
			pl: "Poznań"
		},
		unlocked: false,
		map: {
			x: 30,
			y: 40
		},
		blurb: {
			en: "Coming next.",
			pl: "Wkrótce."
		}
	},
	{
		id: "lublin",
		name: {
			en: "Lublin",
			pl: "Lublin"
		},
		unlocked: false,
		map: {
			x: 76,
			y: 54
		},
		blurb: {
			en: "Coming next.",
			pl: "Wkrótce."
		}
	}
];
function PolandMap() {
	const locale = useProgress((s) => s.locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 360 400",
			className: "h-auto w-full",
			role: "img",
			"aria-label": locale === "pl" ? "Mapa Polski" : "Map of Poland",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M70 108 L96 86 L128 90 L152 78 L176 84 L198 64 L226 74 L248 58 L276 66 L304 84 L322 112 L330 146 L324 176 L338 206 L336 242 L318 276 L296 308 L268 336 L236 356 L200 364 L166 356 L136 338 L108 314 L86 284 L70 250 L58 214 L62 178 L54 148 L66 124 Z",
				fill: "#ebe3d6",
				stroke: "#1c1917",
				strokeWidth: "1.6"
			}), cities.map((city) => {
				const cx = city.map.x * 3.6;
				const cy = city.map.y * 4;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: city.unlocked ? 7 : 5,
					fill: city.unlocked ? "#9c1c2c" : "#6f6458"
				}), city.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: "12",
					fill: "none",
					stroke: "#9c1c2c",
					strokeWidth: "1.2",
					opacity: "0.45"
				}) : null] }, city.id);
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2 p-4 sm:grid-cols-2",
			children: cities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: city.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/krakow",
				className: cn("flex min-h-12 items-center justify-between rounded-[var(--radius-md)] border border-primary/30 bg-bg px-4 py-3 text-sm hover:border-primary"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium",
					children: t(city.name, locale)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: t(city.blurb, locale)
				})] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-12 items-center justify-between rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium text-ink-soft",
					children: t(city.name, locale)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "pl" ? "Wkrótce" : "Coming next" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" })]
			}) }, city.id))
		})]
	});
}
function Home() {
	const locale = useProgress((s) => s.locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
			children: locale === "pl" ? "Polska, miasto po mieście" : "Poland, city by city"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl leading-tight tracking-tight text-fg",
			children: locale === "pl" ? "Opowieści, które wciąż stoją." : "Stories that still stand."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-prose text-ink-soft",
			children: locale === "pl" ? "Mapa polskich opowieści. Zaczynamy od Krakowa: sześć miejsc, sześć krótkich gier. Legenda obok faktu. Potem kolejne miasta." : "A map of Polish stories. We start in Kraków: six places, six short games. Legend beside the record. Other cities later."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolandMap, {})
		})
	] });
}
//#endregion
export { Home as component };
