import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as KeyRound, D as MapPin, H as CircleCheck, K as Building2, L as Eye, O as Lock, W as Calendar, i as User, j as Info, t as X, z as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BFRYJctQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [time, setTime] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const updateDateTime = () => {
			const now = /* @__PURE__ */ new Date();
			setTime(now.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
				hour12: true
			}));
			setDate(now.toLocaleDateString("en-GB"));
		};
		updateDateTime();
		const interval = setInterval(updateDateTime, 1e3);
		return () => clearInterval(interval);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen flex-col bg-white text-slate-800 overflow-hidden font-sans select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-8 items-center justify-between bg-[#0047BA] px-3 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[12.5px] font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-5 w-5 place-items-center rounded-sm bg-white/20 text-[10px] font-bold",
						children: "MS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MyShop Retail Pro - Login" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 text-xs font-mono select-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "hover:bg-white/10 px-2 py-0.5 rounded-sm",
							children: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "hover:bg-white/10 px-2 py-0.5 rounded-sm",
							children: "▢"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "hover:bg-destructive px-2 py-0.5 rounded-sm",
							children: "✕"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col items-center justify-center p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-4xl space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col select-none font-sans italic",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl font-bold tracking-tight text-[#0047BA] leading-none",
										children: "MyShop"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[23px] font-bold text-[#D32F2F] tracking-tight self-end pr-1",
										children: "Retail Pro"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 w-[1px] bg-slate-300" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-slate-500",
										children: "Welcome to"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold text-slate-800 -mt-1",
										children: "MyShop Retail Pro"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[12.5px] text-slate-500 font-medium",
										children: "Retail Billing & Inventory Management Software"
									})
								] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "h-16 w-36",
								viewBox: "0 0 160 80",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "15",
										y: "10",
										width: "44",
										height: "28",
										rx: "2",
										fill: "#0047BA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "18",
										y: "13",
										width: "38",
										height: "22",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M23 18h2.5l2 5h8.5l1.5-3.5h-9.5",
										stroke: "#0047BA",
										strokeWidth: "1.2",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "28.5",
										cy: "25.5",
										r: "1.2",
										fill: "#0047BA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "35.5",
										cy: "25.5",
										r: "1.2",
										fill: "#0047BA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M32 38h10v4H32z",
										fill: "#0A2A5C"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M27 42h20v2H27z",
										fill: "#0A2A5C"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "68",
										y: "22",
										width: "20",
										height: "28",
										rx: "2",
										fill: "#0A2A5C"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "71",
										y: "25",
										width: "14",
										height: "7",
										fill: "#E6EFFC"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "73",
										cy: "36",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "78",
										cy: "36",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "83",
										cy: "36",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "73",
										cy: "40",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "78",
										cy: "40",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "83",
										cy: "40",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "73",
										cy: "44",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "78",
										cy: "44",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "83",
										cy: "44",
										r: "1",
										fill: "white"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "99",
										y: "12",
										width: "28",
										height: "22",
										rx: "2",
										fill: "#0047BA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "103",
										y: "9",
										width: "20",
										height: "5",
										fill: "#E2E8F0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M106 11h14",
										stroke: "#4A5568",
										strokeWidth: "1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "99",
										y: "30",
										width: "28",
										height: "16",
										fill: "#F59E0B",
										rx: "1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M103 34h2v8h-2zm4 0h1v8h-1zm3 0h2v8h-2zm4 0h1v8h-1zm3 0h2v8h-2z",
										fill: "#000"
									})
								]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-[#C2D6E9] bg-white shadow-xl overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 bg-[#E5EFFC] px-4 py-2.5 border-b border-[#C2D6E9] text-[#0047BA] font-semibold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4.5 w-4.5 stroke-[2.5]" }), " User Login"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[260px_1fr] gap-4 p-8 items-center bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-center border-r border-slate-100 pr-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "h-40 w-48",
										viewBox: "0 0 120 100",
										fill: "none",
										xmlns: "http://www.w3.org/2000/svg",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "15",
												y: "10",
												width: "70",
												height: "46",
												rx: "3",
												fill: "#1A365D"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "19",
												y: "14",
												width: "62",
												height: "38",
												fill: "white"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M44 56h12v10H44z",
												fill: "#0F172A"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M35 66h30v3H35z",
												fill: "#0F172A"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "50",
												cy: "27",
												r: "8",
												fill: "#0047BA"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M34 45c0-6 7-8 16-8s16 2 16 8v3H34v-3z",
												fill: "#0047BA"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
												cx: "50",
												cy: "74",
												rx: "30",
												ry: "3",
												fill: "#E2E8F0"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "65",
												y: "44",
												width: "22",
												height: "18",
												rx: "2",
												fill: "#F59E0B",
												stroke: "#B45309",
												strokeWidth: "1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M70 44v-4c0-3.3 2.7-6 6-6s6 2.7 6 6v4",
												stroke: "#475569",
												strokeWidth: "2",
												fill: "none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "76",
												cy: "51",
												r: "1.5",
												fill: "#000"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M76 52.5v4",
												stroke: "#000",
												strokeWidth: "1.5",
												strokeLinecap: "round"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "space-y-3 pl-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "User Name",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-slate-500" }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "erp-input w-full border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ADMIN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SALESMAN" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Password",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-slate-500" }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													name: "password",
													className: "erp-input w-full pr-9 border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm",
													defaultValue: "adminpass"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "absolute right-2 top-1.5 h-4 w-4 text-slate-400 hover:text-slate-700 cursor-pointer" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Branch",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-slate-500" }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "erp-input w-full border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Main Location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Branch Division 2" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
											label: "Financial Year",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-slate-500" }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "erp-input w-full border-[#C2D6E9] text-slate-800 bg-white focus:border-[#0047BA] focus:ring-1 focus:ring-[#0047BA] rounded-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "2024-2025" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "2023-2024" })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2.5 pt-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/",
													className: "flex h-9 items-center gap-1.5 rounded-sm bg-[#0047BA] hover:bg-[#003da8] px-6 font-semibold text-white transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), " Login"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "flex h-9 items-center gap-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 px-5 text-slate-700 font-semibold transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), " Cancel"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "flex h-9 items-center gap-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 px-4 text-slate-700 font-semibold transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }), " Change Password"]
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-around border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[12px] text-slate-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-[#0047BA]" }), " Version : 1.0.0.0"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "h-4 w-4 text-[#0047BA]",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
													x: "2",
													y: "3",
													width: "20",
													height: "14",
													rx: "2",
													ry: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "8",
													y1: "21",
													x2: "16",
													y2: "21"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "12",
													y1: "17",
													x2: "12",
													y2: "21"
												})
											]
										}), " RC433"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-[#0047BA]" }),
											" ",
											date
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-[#0047BA]" }),
											" ",
											time
										]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-slate-200 bg-[#E5EFFC] px-6 py-2.5 text-[12.5px] font-semibold text-[#0047BA]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4.5 w-4.5 text-[#0047BA]" }),
							" Licensed To : ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-slate-800",
								children: "BEST SUPER MARKET"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4.5 w-4.5 text-[#0047BA]" }), " Main Division | Main Location"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-slate-600 font-medium",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" MyShop Retail Pro. All Rights Reserved."
						]
					})
				]
			})
		]
	});
}
function FieldRow({ label, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[130px_1fr] items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[13px] font-semibold text-[#0047BA]",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute left-2.5 top-1.5 z-10",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "[&_input]:pl-9 [&_select]:pl-9",
				children
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
