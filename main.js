(() => {
  const cfg = window.KOLAYER || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- links from config ----
  $$("[data-link]").forEach((a) => {
    const url = cfg.links && cfg.links[a.dataset.link];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
    else if (a.closest(".footer-links")) a.classList.add("is-off");
  });

  // ---- ticker + percentages ----
  $$("[data-ticker]").forEach((el) => (el.textContent = cfg.ticker || "$KOL"));
  $$("[data-burn-pct]").forEach((el) => (el.textContent = (cfg.burnPercent ?? 50) + "%"));
  $$("[data-buyback-pct]").forEach((el) => (el.textContent = (cfg.buybackPercent ?? 50) + "%"));
  if (cfg.tokensBurned) $("#burned").textContent = cfg.tokensBurned;

  // ---- contract address chip ----
  const ca = (cfg.contractAddress || "").trim();
  $$("[data-ca-short]").forEach((el) => (el.textContent = ca ? `${ca.slice(0, 4)}…${ca.slice(-4)}` : "Launching soon"));
  const toast = $("#toast");
  let toastTimer;
  const say = (msg) => {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1800);
  };
  $$("[data-copy-ca]").forEach((b) => b.addEventListener("click", async () => {
    if (!ca) return say("Contract address drops at launch");
    try { await navigator.clipboard.writeText(ca); say("Contract address copied"); }
    catch { say(ca); }
  }));

  // ---- stats ----
  const statsGrid = $("#statsGrid");
  (cfg.stats || []).forEach((s) => {
    const card = document.createElement("article");
    card.className = `panel stat tilt reveal ${s.size === "narrow" ? "narrow" : ""}`;
    card.innerHTML = `<div class="stat-value"></div><div class="stat-label"></div>`;
    card.querySelector(".stat-value").textContent = s.value;
    card.querySelector(".stat-label").textContent = s.label;
    statsGrid.appendChild(card);
  });

  // ---- ledger ----
  const rows = $("#ledgerRows");
  const sample = cfg.ledgerIsSample !== false;
  $("#sampleFlag").hidden = !sample;
  const statusText = (r) => r.status === "holding" ? "Holding" : r.status === "sold" ? `Sold ${r.soldPct ?? ""}%`.replace(" %", "") : "Exited";
  const cell = (label, node) => { const w = document.createElement("span"); const l = document.createElement("span"); l.className = "cell-label"; l.textContent = label; w.append(l, node); return w; };
  const text = (t, cls) => { const s = document.createElement("span"); if (cls) s.className = cls; s.textContent = t; return s; };
  function renderLedger(filter) {
    rows.replaceChildren();
    const list = (cfg.ledger || []).filter((r) => filter === "all" || (filter === "holding" ? r.status === "holding" : r.status !== "holding"));
    if (!list.length) { rows.append(text("No deals in this view yet.", "ledger-empty")); return; }
    for (const r of list) {
      const row = document.createElement("div");
      row.className = "ledger-row";
      const kol = document.createElement(sample ? "span" : "a");
      kol.className = "kol"; kol.textContent = r.kol;
      if (!sample) { kol.href = `https://x.com/${r.kol.replace("@", "")}`; kol.target = "_blank"; kol.rel = "noopener"; }
      const short = `${r.wallet.slice(0, 4)}…${r.wallet.slice(-4)}`;
      const wallet = document.createElement(sample ? "span" : "a");
      wallet.className = "wallet"; wallet.textContent = short;
      if (!sample) { wallet.href = `https://solscan.io/account/${r.wallet}`; wallet.target = "_blank"; wallet.rel = "noopener"; }
      const status = text(statusText(r), `status ${r.status}`);
      row.append(
        cell("Date", text(r.date, "mono")),
        cell("Project", text(r.project, "proj")),
        cell("KOL", kol),
        cell("Paid", text(r.paid)),
        cell("Vesting", text(r.vesting, "mono")),
        cell("Wallet", wallet),
        status,
      );
      rows.append(row);
    }
  }
  renderLedger("all");
  $$(".filter").forEach((b) => b.addEventListener("click", () => {
    $$(".filter").forEach((x) => x.classList.toggle("is-active", x === b));
    renderLedger(b.dataset.filter);
  }));

  // ---- nav ----
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const menuBtn = $("#menuBtn"), links = $("#navLinks");
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach((a) => a.addEventListener("click", () => { links.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); }));

  // ---- reveal on scroll (with resting tilt for stat cards) ----
  $$(".stats .stat").forEach((el) => el.style.setProperty("--tilt", getComputedStyle(el).transform === "none" ? "none" : getComputedStyle(el).transform));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add("is-in"), i * 90);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  // ---- hero stack: settle in, then follow the pointer and spread on scroll ----
  const hero = $(".hero"), stack = $("#stack");
  requestAnimationFrame(() => setTimeout(() => hero.classList.add("is-ready"), 300));
  if (!reduced && stack) {
    let rx = 58, rz = -38;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      rx = 58 - y * 10; rz = -38 + x * 14;
      stack.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg)`;
    });
    hero.addEventListener("pointerleave", () => (stack.style.transform = ""));
  }

  // ---- card tilt on hover ----
  if (!reduced && matchMedia("(hover: hover)").matches) {
    $$(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
  }
})();
