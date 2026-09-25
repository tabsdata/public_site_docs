// Static stand-in for the tabsdata API server. Answers /api/v1/* from a
// recorded snapshot (data.json) so the real UI bundle runs with no backend.
(function () {
	var BASE = window.__TD_BASE || "";

	// Drop the demo folder from a path the UI built out of a full URL.
	window.__tdStrip = function (p) {
		if (typeof p !== "string" || !BASE) return p;
		if (p === BASE) return "/";
		return p.indexOf(BASE + "/") === 0 || p.indexOf(BASE + "?") === 0 ? p.slice(BASE.length) || "/" : p;
	};
	window.__tdPath = function () {
		return window.__tdStrip(location.pathname);
	};
	window.__tdGo = function (to) {
		var url = String(to);
		if (url.charAt(0) === "/" && url.indexOf(BASE + "/") !== 0) url = BASE + url;
		location.assign(url);
	};

	// Some links skip the router: the execution plan graph's node menus
	// ("Go to sample", the function card) are plain <a href="/projects/...">
	// opened in a new tab, so the demo folder never gets prefixed and the
	// link lands outside the demo. Prefix any such href inside the app as it
	// renders. Router links already carry the prefix and are left alone.
	// The whole <body> is watched because menus render in a portal outside
	// #root; the demo's own "Back to docs" link points at the docs site on
	// purpose and is skipped.
	//
	// The UI also links a function's input table under the function's own
	// collection (a subscriber in postgres_dest links records as
	// postgres_dest/tables/records, though records lives in s3_source), a
	// page that errors on a live server too. TABLE_HOMES maps each
	// project/table to its real collection so those links go to the table.
	var TABLE_HOMES = {"basic_demo/records": "s3_source", "customer_management/bronze_customers": "bronze", "customer_management/bronze_leads": "bronze", "customer_management/bronze_opportunities": "bronze", "customer_management/customers": "salesforce", "customer_management/gold_customers": "gold", "customer_management/gold_leads": "gold", "customer_management/gold_opportunities": "gold", "customer_management/leads": "salesforce", "customer_management/opportunities": "salesforce", "customer_management/silver_customers": "silver", "customer_management/silver_leads": "silver", "customer_management/silver_opportunities": "silver", "finance/finance_invoice_summary": "finance_reporting", "finance/gl_transactions": "oracle_finance", "finance/invoices": "oracle_finance"};
	var TABLE_LINK = /^(.*\/projects\/(\w+)\/collections\/)(\w+)(\/tables\/(\w+).*)$/;
	function fixLinks(node) {
		if (!BASE || !node.querySelectorAll) return;
		var links = node.matches && node.matches("a[href]") ? [node] : [];
		links = links.concat([].slice.call(node.querySelectorAll("a[href]")));
		links.forEach(function (a) {
			if (a.id === "td-demo-back") return;
			var h = a.getAttribute("href");
			if (!h || h.charAt(0) !== "/" || h.charAt(1) === "/") return;
			var fixed = h !== BASE && h.indexOf(BASE + "/") !== 0 ? BASE + h : h;
			var m = fixed.match(TABLE_LINK);
			var home = m && TABLE_HOMES[m[2] + "/" + m[5]];
			if (home && home !== m[3]) fixed = m[1] + home + m[4];
			if (fixed !== h) a.setAttribute("href", fixed);
		});
	}
	document.addEventListener("DOMContentLoaded", function () {
		fixLinks(document.body);
		new MutationObserver(function (records) {
			records.forEach(function (r) {
				if (r.type === "attributes") fixLinks(r.target);
				else r.addedNodes.forEach(fixLinks);
			});
		}).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["href"] });
	});

	// Switching versions keeps the open tab. The side panel's version links
	// (".../functions/x?at=...") carry no `tab`, so picking another version
	// from the Snippet tab lands back on Info. When a link goes to the page
	// already open with only a different version, carry the current `tab`
	// over. Router links navigate from their own props, not the DOM href, so
	// this takes over the click and navigates the way the router listens for.
	document.addEventListener(
		"click",
		function (e) {
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			var a = e.target.closest && e.target.closest("a[href]");
			if (!a || a.target === "_blank") return;
			var here = new URL(location.href);
			var tab = here.searchParams.get("tab");
			if (!tab) return;
			var to = new URL(a.href, location.href);
			if (to.origin !== here.origin || to.pathname !== here.pathname || to.searchParams.has("tab")) return;
			if (!to.searchParams.has("at") && !to.searchParams.has("vid")) return;
			to.searchParams.set("tab", tab);
			e.preventDefault();
			e.stopPropagation();
			history.pushState({}, "", to.pathname + to.search + to.hash);
			window.dispatchEvent(new PopStateEvent("popstate"));
		},
		true
	);

	// A signed-in session that never expires.
	function b64(o) {
		return btoa(JSON.stringify(o)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
	}
	var token = b64({ typ: "JWT", alg: "none" }) + "." + b64({ jti: "demo", exp: 4102444800 }) + ".demo";
	try {
		localStorage.setItem(
			"td-auth",
			JSON.stringify({ access_token: token, refresh_token: token, expires_in: 3600, token_type: "Bearer" })
		);
		localStorage.setItem("td-auth-info", JSON.stringify({"id": "00000000000000000000000004", "name": "admin", "full_name": "Administrator", "email": null, "created_on": 1790186242790, "created_by_id": "00000000000000000000000000", "modified_on": 1790186242790, "modified_by_id": "00000000000000000000000000", "password_set_on": 1790186242790, "password_must_change": false, "enabled": true, "system": false, "created_by": "system", "modified_by": "system", "user_roles": [{"id": "06gd8lsan1odt7djo8ofov1dck", "name": "basic_demo_admin", "description": "Project basic_demo administrators", "created_on": 1790268902070, "created_by_id": "00000000000000000000000004", "modified_on": 1790268902070, "modified_by_id": "00000000000000000000000004", "kind": "project_admin", "project_id": "06gd8lsamtp4v2mdl2por7jfh4", "fixed": true, "created_by": "admin", "modified_by": "admin"}, {"id": "06gd8ls8v9pl5audprf09228ng", "name": "finance_admin", "description": "Project finance administrators", "created_on": 1790268901624, "created_by_id": "00000000000000000000000004", "modified_on": 1790268901624, "modified_by_id": "00000000000000000000000004", "kind": "project_admin", "project_id": "06gd8ls8v5rflb44tgue7l4t2s", "fixed": true, "created_by": "admin", "modified_by": "admin"}, {"id": "06gd8ls5rtq9hethcmvsauhfho", "name": "customer_management_admin", "description": "Project customer_management administrators", "created_on": 1790268900829, "created_by_id": "00000000000000000000000004", "modified_on": 1790268900829, "modified_by_id": "00000000000000000000000004", "kind": "project_admin", "project_id": "06gd8ls5rppj76un7c59968ddo", "fixed": true, "created_by": "admin", "modified_by": "admin"}, {"id": "0000000000000000000000000g", "name": "default", "description": "Default Role", "created_on": 1790186242790, "created_by_id": "00000000000000000000000000", "modified_on": 1790186242790, "modified_by_id": "00000000000000000000000000", "kind": "default", "project_id": null, "fixed": true, "created_by": "system", "modified_by": "system"}, {"id": "00000000000000000000000008", "name": "sys_admin", "description": "System Administrator Role", "created_on": 1790186242790, "created_by_id": "00000000000000000000000000", "modified_on": 1790186242790, "modified_by_id": "00000000000000000000000000", "kind": "sys_admin", "project_id": null, "fixed": true, "created_by": "system", "modified_by": "system"}]}));
	} catch (e) {}

	var dataReady = fetch(BASE + "/data.json")
		.then(function (r) {
			return r.json();
		})
		.then(function (d) {
			var byPath = {};
			Object.keys(d).forEach(function (k) {
				var path = k.split("?")[0];
				(byPath[path] = byPath[path] || []).push(k);
			});
			return { d: d, byPath: byPath };
		});

	function sortedQuery(q) {
		return q.split("&").filter(Boolean).sort().join("&");
	}

	function lookup(db, method, apiUrl) {
		var key = method + " " + apiUrl;
		if (db.d[key]) return db.d[key];
		var parts = apiUrl.split("?");
		var path = method + " " + parts[0];
		var candidates = db.byPath[path] || [];
		var want = sortedQuery(parts[1] || "");
		for (var i = 0; i < candidates.length; i++) {
			if (sortedQuery(candidates[i].split("?")[1] || "") === want) return db.d[candidates[i]];
		}
		// Same path, different query: prefer the recording with the fewest
		// filters. Picking an arbitrary one returned a filtered list (only a
		// collection's publishers, say) where the UI wanted all of them.
		if (candidates.length) {
			var best = candidates.slice().sort(function (a, b) {
				return (a.split("filter=").length - b.split("filter=").length) || a.length - b.length;
			})[0];
			return db.d[best];
		}
		return null;
	}

	function json(status, obj) {
		return new Response(JSON.stringify(obj), {
			status: status,
			headers: { "Content-Type": "application/json" },
		});
	}

	var EMPTY_LIST = {
		version: "1",
		context: { errors: [], warnings: [], notifications: [] },
		data: {
			list_params: { len: 50, filter: [], order_by: null, previous: null, next: null, pagination_id: null },
			len: 0,
			data: [],
			previous: null,
			previous_pagination_id: null,
			next: null,
			next_pagination_id: null,
		},
	};

	var realFetch = window.fetch.bind(window);
	window.fetch = function (input, init) {
		var url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
		var i = url.indexOf("/api/v1/");
		if (i < 0) return realFetch(input, init);
		var apiUrl = url.slice(i);
		var method = ((init && init.method) || (input && input.method) || "GET").toUpperCase();
		if (method !== "GET") {
			return Promise.resolve(
				json(403, {
					code: "Demo::0",
					error: "read_only",
					error_description: "This is a read-only demo of the Tabsdata UI.",
				})
			);
		}
		return dataReady.then(function (db) {
			var hit = lookup(db, method, apiUrl);
			if (!hit || hit.status !== 200) console.debug("[ui-demo] no recording:", apiUrl, hit && hit.status);
			if (!hit) return json(200, EMPTY_LIST);
			return new Response(hit.body, {
				status: hit.status,
				headers: { "Content-Type": hit.ct || "application/json" },
			});
		});
	};
})();
