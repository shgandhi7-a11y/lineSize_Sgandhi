import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./_ssr/ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/__root-BfJIOIt4.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Same host guard the injector uses for og:image — public names only. */
function publicShareHost(hostHeader) {
	const host = String(hostHeader ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
	if (host === "vercel.app" || host.endsWith(".vercel.app") || host === "vercel.com" || host.endsWith(".vercel.com")) return "";
	return host;
}
var readShareHost_createServerFn_handler = createServerRpc({
	id: "2e1eef4ed1f99244022a3ce77cc1dace2bdf0b232b6fa423ced29b6655df318f",
	name: "readShareHost",
	filename: "src/routes/__root.tsx"
}, (opts) => readShareHost.__executeServer(opts));
var readShareHost = createServerFn({ method: "GET" }).handler(readShareHost_createServerFn_handler, async () => {
	try {
		const { getRequestHeader } = await import("./_ssr/ssr.mjs").then((n) => n.a).then((n) => n.t);
		const raw = getRequestHeader("x-forwarded-host") || getRequestHeader("host") || "";
		return publicShareHost(process.env.VITE_PUBLIC_HOSTNAME) || publicShareHost(raw);
	} catch {
		return publicShareHost(process.env.VITE_PUBLIC_HOSTNAME);
	}
});
//#endregion
export { readShareHost_createServerFn_handler };
