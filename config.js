// Everything you need to edit lives in this file.
window.KOLAYER = {
  ticker: "$KOL",
  // Paste the mint once the token is live. Leave empty to show "Launching soon".
  contractAddress: "",
  links: {
    x: "https://x.com/",
    telegram: "https://t.me/",
    bookCampaign: "https://t.me/",
    joinRoster: "https://t.me/",
    dexscreener: "",
    pumpfun: "",
  },

  // Commitments shown in the stats cards. Change them to match your real policy.
  stats: [
    { value: "100%", label: "KOL wallets public", size: "wide" },
    { value: "0", label: "Hidden allocations", size: "narrow" },
    { value: "24H", label: "From deal to ledger", size: "narrow" },
    { value: "50%", label: "Of every fee buys $KOL", size: "wide" },
  ],

  // Token utility numbers.
  buybackPercent: 50,
  burnPercent: 50,
  tokensBurned: null, // e.g. "12,400,000" once the first burn happens

  // The ledger. Set ledgerIsSample to false once these are real deals.
  ledgerIsSample: true,
  ledger: [
    { date: "2026-11-21", project: "$NEON", kol: "@deltasniper", paid: "4 SOL + 0.5% supply", vesting: "30 days linear", wallet: "7xKqWbP2mR9tYdF3hLs8NvA4cE1uZo6jQ5gTy2Hb3fPd", status: "holding" },
    { date: "2026-11-19", project: "$GRID", kol: "@0xmarrow", paid: "6 SOL", vesting: "None", wallet: "9fTs2LmVq8RkYxWc4NpB7aHd1eJu5gZo3iQy6Kt8Mn2X", status: "holding" },
    { date: "2026-11-17", project: "$LOOP", kol: "@kaitocalls", paid: "1% supply", vesting: "14-day cliff", wallet: "3bNq7RtYw2XkLp9Vd5Fh8MaCs1eUj4gZo6iQy2Kt8Hm4", status: "sold", soldPct: 40 },
    { date: "2026-11-14", project: "$VOLT", kol: "@sigmafade", paid: "3 SOL + 0.25% supply", vesting: "7 days", wallet: "5hRw8KtYq3XmLp2Vd9Fn7BaCs4eUj1gZo6iQy8Kt2Hm7", status: "exited" },
    { date: "2026-11-12", project: "$NEON", kol: "@lunarbid", paid: "2 SOL", vesting: "None", wallet: "8mTq4PwYr6XkLp3Vd2Fh9NaCs7eUj5gZo1iQy4Kt6Hb9", status: "holding" },
  ],
};
