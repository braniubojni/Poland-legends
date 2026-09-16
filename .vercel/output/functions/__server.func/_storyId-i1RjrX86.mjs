import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, y as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as ArrowRight, r as MapPin, s as ArrowLeft, t as Volume2 } from "./_libs/lucide-react.mjs";
import { t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { i as getStory, n as Route, o as nextStoryId, r as cn, s as useProgress } from "./_ssr/router-C5aZ434T.mjs";
import { t } from "./_ssr/copy-C6vkCIeI.mjs";
import { t as Slot } from "./_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_storyId-i1RjrX86.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] font-medium transition-[opacity,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			outline: "border border-border bg-surface text-fg hover:bg-bg",
			ghost: "text-fg hover:bg-surface",
			muted: "bg-bg text-muted hover:text-fg"
		},
		size: {
			default: "h-11 min-h-11 px-4 text-sm",
			sm: "h-9 min-h-9 px-3 text-sm",
			lg: "h-12 min-h-12 px-5 text-base"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function playHejnal(ctx) {
	const notes = [
		349.23,
		440,
		523.25,
		587.33,
		523.25,
		440,
		392
	];
	const start = ctx.currentTime + .05;
	notes.forEach((freq, i) => {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "sawtooth";
		osc.frequency.value = freq;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 1400;
		osc.connect(filter);
		filter.connect(gain);
		gain.connect(ctx.destination);
		const t0 = start + i * .28;
		const t1 = t0 + .22;
		gain.gain.setValueAtTime(0, t0);
		gain.gain.linearRampToValueAtTime(.08, t0 + .03);
		if (i === notes.length - 1) {
			gain.gain.linearRampToValueAtTime(.08, t0 + .08);
			gain.gain.setValueAtTime(0, t0 + .09);
			osc.start(t0);
			osc.stop(t0 + .12);
		} else {
			gain.gain.linearRampToValueAtTime(.001, t1);
			osc.start(t0);
			osc.stop(t1 + .02);
		}
	});
}
function HejnalPlayer() {
	const locale = useProgress((s) => s.locale);
	const ctxRef = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	function onPlay() {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!ctxRef.current) ctxRef.current = new AC();
		const ctx = ctxRef.current;
		ctx.resume();
		playHejnal(ctx);
		setPlaying(true);
		window.setTimeout(() => setPlaying(false), 2200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			onClick: onPlay,
			disabled: playing,
			className: "min-w-44",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }), locale === "pl" ? playing ? "Gra…" : "Odtwórz hejnał" : playing ? "Playing…" : "Play the call"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: locale === "pl" ? "Krótki motyw w F-dur. Urwany w pół frazy — tak, jak na wieży." : "A short F-major phrase. Cut mid-note — as from the tower."
		})]
	});
}
function StoryArt({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 640 240",
			className: "h-auto w-full",
			"aria-hidden": "true",
			children: [
				id === "hejnal" || id === "wieze" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowersArt, {}) : null,
				id === "smok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragonArt, {}) : null,
				id === "lajkonik" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorseArt, {}) : null,
				id === "golebie" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PigeonArt, {}) : null,
				id === "rynek" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareArt, {}) : null
			]
		})
	});
}
function TowersArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "640",
			height: "240",
			fill: "#f3eee6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "210",
			y: "70",
			width: "70",
			height: "170",
			fill: "#9c1c2c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "210,70 245,18 280,70",
			fill: "#1c1917"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "238",
			y: "88",
			width: "14",
			height: "16",
			fill: "#faf6f0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "320",
			y: "110",
			width: "62",
			height: "130",
			fill: "#7a2a32"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "320,110 351,68 382,110",
			fill: "#1c1917"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "0",
			y: "220",
			width: "640",
			height: "20",
			fill: "#d9cfc3"
		})
	] });
}
function DragonArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "640",
			height: "240",
			fill: "#f3eee6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M80 200 C 140 120 220 90 310 130 C 360 154 400 140 430 100",
			fill: "none",
			stroke: "#9c1c2c",
			strokeWidth: "14"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "440",
			cy: "92",
			r: "18",
			fill: "#1c1917"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "480",
			y: "40",
			width: "120",
			height: "180",
			fill: "#8a6a52"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "0",
			y: "210",
			width: "640",
			height: "30",
			fill: "#c9b8a4"
		})
	] });
}
function HorseArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "640",
			height: "240",
			fill: "#f3eee6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "220",
			y: "120",
			width: "180",
			height: "70",
			fill: "#9c1c2c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "250",
			cy: "200",
			r: "18",
			fill: "#1c1917"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "370",
			cy: "200",
			r: "18",
			fill: "#1c1917"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "380",
			y: "70",
			width: "70",
			height: "70",
			fill: "#1c1917"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "450,70 510,90 450,110",
			fill: "#9c1c2c"
		})
	] });
}
function PigeonArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "640",
			height: "240",
			fill: "#f3eee6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "180",
			y: "70",
			width: "280",
			height: "90",
			fill: "#d9cfc3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "160",
			cy: "190",
			r: "16",
			fill: "#6f6458"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "220",
			cy: "198",
			r: "12",
			fill: "#6f6458"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "300",
			cy: "188",
			r: "18",
			fill: "#6f6458"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "380",
			cy: "196",
			r: "14",
			fill: "#6f6458"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "0",
			y: "208",
			width: "640",
			height: "32",
			fill: "#cfc4b6"
		})
	] });
}
function SquareArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "640",
			height: "240",
			fill: "#f3eee6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "90",
			y: "40",
			width: "460",
			height: "170",
			fill: "none",
			stroke: "#1c1917",
			strokeWidth: "3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "240",
			y: "90",
			width: "160",
			height: "70",
			fill: "#9c1c2c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "90",
			y1: "125",
			x2: "550",
			y2: "125",
			stroke: "#d9cfc3",
			strokeWidth: "2"
		})
	] });
}
function shuffle(items) {
	const next = [...items];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = next[i];
		const b = next[j];
		if (a === void 0 || b === void 0) continue;
		next[i] = b;
		next[j] = a;
	}
	return next;
}
function OrderGame({ prompt, steps, correct, onComplete }) {
	const locale = useProgress((s) => s.locale);
	const pool = (0, import_react.useMemo)(() => shuffle(steps), [steps]);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("play");
	function tap(id) {
		if (status !== "play") return;
		if (picked.includes(id)) return;
		const next = [...picked, id];
		setPicked(next);
		if (next.length !== correct.length) return;
		if (next.every((stepId, i) => stepId === correct[i])) {
			setStatus("right");
			onComplete();
		} else setStatus("wrong");
	}
	function reset() {
		setPicked([]);
		setStatus("play");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: locale === "pl" ? "Kolejność" : "Order"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-xl leading-snug text-fg",
				children: t(prompt, locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 flex flex-col gap-2",
				children: pool.map((step) => {
					const order = picked.indexOf(step.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => tap(step.id),
						disabled: order >= 0 || status !== "play",
						className: cn("flex min-h-12 w-full items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 text-left text-sm", order < 0 && "border-border bg-bg hover:border-fg/30", order >= 0 && status === "play" && "border-primary/40 bg-primary/10", order >= 0 && status === "right" && "border-success bg-success/10", order >= 0 && status === "wrong" && "border-primary bg-primary/10"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs tabular-nums",
							children: order >= 0 ? order + 1 : ""
						}), t(step.label, locale)]
					}) }, step.id);
				})
			}),
			status === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-soft",
					children: locale === "pl" ? "Prawie. Spróbuj od nowa." : "Almost. Try again."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "outline",
					onClick: reset,
					children: locale === "pl" ? "Jeszcze raz" : "Reset"
				})]
			}) : null,
			status === "right" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-success",
				children: locale === "pl" ? "Taka jest kolej rzeczy." : "That is the order of things."
			}) : null
		]
	});
}
function QuizGame({ questions, onComplete }) {
	const locale = useProgress((s) => s.locale);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const q = questions[index];
	if (!q) return null;
	const revealed = picked !== null;
	const correct = picked === q.correctId;
	function choose(id) {
		if (picked) return;
		setPicked(id);
		if (id === q.correctId) setScore((s) => s + 1);
	}
	function next() {
		if (index + 1 >= questions.length) {
			setDone(true);
			onComplete();
			return;
		}
		setIndex((i) => i + 1);
		setPicked(null);
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl text-fg",
			children: locale === "pl" ? "Gotowe" : "Done"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-muted",
			children: [
				score,
				"/",
				questions.length
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: [
					locale === "pl" ? "Pytanie" : "Question",
					" ",
					index + 1,
					" / ",
					questions.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-xl leading-snug text-fg",
				children: t(q.prompt, locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-2",
				children: q.options.map((opt) => {
					const isCorrect = opt.id === q.correctId;
					const isPick = opt.id === picked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => choose(opt.id),
						className: cn("flex min-h-12 w-full items-center rounded-[var(--radius-sm)] border px-4 py-3 text-left text-sm transition-colors duration-150", !revealed && "border-border bg-bg hover:border-fg/30", revealed && isCorrect && "border-success bg-success/10 text-fg", revealed && isPick && !isCorrect && "border-primary bg-primary/10 text-fg", revealed && !isCorrect && !isPick && "border-border bg-bg text-muted"),
						children: t(opt.label, locale)
					}) }, opt.id);
				})
			}),
			revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-ink-soft",
					children: [
						correct ? locale === "pl" ? "Tak." : "Yes." : locale === "pl" ? "Nie ten." : "Not that one.",
						" ",
						t(q.explanation, locale)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: next,
					children: index + 1 >= questions.length ? locale === "pl" ? "Zakończ" : "Finish" : locale === "pl" ? "Dalej" : "Next"
				})]
			}) : null
		]
	});
}
function TowersGame({ prompt, explanation, onComplete }) {
	const locale = useProgress((s) => s.locale);
	const [pick, setPick] = (0, import_react.useState)(null);
	function choose(which) {
		if (pick) return;
		setPick(which);
		onComplete();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: locale === "pl" ? "Wskaż" : "Point"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-xl leading-snug text-fg",
				children: t(prompt, locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerButton, {
					label: locale === "pl" ? "Ta" : "This one",
					height: 120,
					selected: pick === "short",
					state: pick === null ? "idle" : pick === "short" ? "wrong" : "dim",
					onClick: () => choose("short")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerButton, {
					label: locale === "pl" ? "Ta" : "This one",
					height: 168,
					selected: pick === "tall",
					state: pick === null ? "idle" : pick === "tall" ? "right" : "dim",
					onClick: () => choose("tall")
				})]
			}),
			pick ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-ink-soft",
				children: [pick === "tall" ? locale === "pl" ? "Tak. " : "Yes. " : locale === "pl" ? "Nie ta. " : "Not that one. ", t(explanation, locale)]
			}) : null
		]
	});
}
function TowerButton({ label, height, selected, state, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex min-h-44 flex-col items-center justify-end gap-3 rounded-[var(--radius-md)] border px-3 py-4", state === "idle" && "border-border bg-bg hover:border-fg/30", state === "right" && "border-success bg-success/10", state === "wrong" && "border-primary bg-primary/10", state === "dim" && "border-border bg-bg opacity-60", selected && "ring-1 ring-fg/10"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "72",
			height,
			viewBox: `0 0 72 ${height}`,
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "22",
					y: height - 90,
					width: "28",
					height: "90",
					fill: "currentColor",
					className: "text-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: `22,${height - 90} 36,${height - 114} 50,${height - 90}`,
					fill: "currentColor",
					className: "text-fg"
				}),
				height > 140 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "32",
					y: height - 78,
					width: "8",
					height: "10",
					fill: "currentColor",
					className: "text-bg"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-center text-sm",
			children: label
		})]
	});
}
function StoryGame({ game, onComplete }) {
	if (game.kind === "quiz") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizGame, {
		questions: game.questions,
		onComplete
	});
	if (game.kind === "order") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderGame, {
		prompt: game.prompt,
		steps: game.steps,
		correct: game.correct,
		onComplete
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowersGame, {
		prompt: game.prompt,
		explanation: game.explanation,
		onComplete
	});
}
function StoryPage() {
	const { storyId } = Route.useParams();
	const locale = useProgress((s) => s.locale);
	const markDone = useProgress((s) => s.markDone);
	const story = getStory(storyId);
	const nextId = nextStoryId(storyId);
	if (!story) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: locale === "pl" ? "Nie ma takiej opowieści." : "No such story." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/krakow",
		className: "mt-4 inline-flex text-primary",
		children: "Kraków"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/krakow",
			className: "inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Kraków"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 text-xs font-medium tracking-[0.18em] text-muted uppercase",
			children: t(story.place, locale)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl leading-tight tracking-tight",
			children: t(story.title, locale)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryArt, { id: story.id })
		}),
		story.id === "hejnal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HejnalPlayer, {})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: locale === "pl" ? "Legenda" : "The legend"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-prose text-ink-soft",
				children: t(story.legend, locale)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: locale === "pl" ? "Co wiemy" : "What we know"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-prose text-ink-soft",
				children: t(story.fact, locale)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-2xl",
				children: locale === "pl" ? "Gra" : "Play"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryGame, {
				game: story.game,
				onComplete: () => markDone(story.id)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 flex gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: locale === "pl" ? "Zobacz dziś" : "See it today"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-prose text-ink-soft",
				children: t(story.seeToday, locale)
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 flex flex-wrap gap-3",
			children: nextId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/krakow/$storyId",
					params: { storyId: nextId },
					children: [locale === "pl" ? "Następna opowieść" : "Next story", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/krakow",
					children: locale === "pl" ? "Wróć do mapy" : "Back to the map"
				})
			})
		})
	] });
}
//#endregion
export { StoryPage as component };
