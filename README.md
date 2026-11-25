# KOLayer

The transparency layer for KOL marketing. Every paid post on the record: who got paid, how much, and whether they're still holding.

A static site: plain HTML, CSS and JavaScript. No build step.

## Run it

```bash
npx serve .        # or: python3 -m http.server 4173
```

## Deploy

Import the repo in Vercel (framework: "Other", no build command, output directory `.`), or drag the folder into Netlify.

## Edit content

Everything you need to change is in `config.js`:

| Setting | What it does |
|---|---|
| `contractAddress` | Shows in the CA chip and copies on click. Empty shows "Launching soon". |
| `links` | X, Telegram, booking, roster, DexScreener and pump.fun links. Empty footer links are dimmed. |
| `stats` | The four tilted cards in "The standard". |
| `buybackPercent`, `burnPercent`, `tokensBurned` | Numbers in the $KOL section. |
| `ledger` | The rows in "The ledger". |
| `ledgerIsSample` | While `true`, the ledger shows a "Sample data" tag and wallets and KOLs aren't linked. Set to `false` once the rows are real deals, so wallets link to Solscan and KOLs to X. |

Once you have a domain, change the `og:image` tag in `index.html` to the full URL (e.g. `https://kolayer.xyz/assets/og.jpg`) so link previews show the image.

## Files

```
index.html       page structure
styles.css       design (colours and fonts at the top in :root)
main.js          ledger, filters, CA copy, scroll reveals, 3D tilt
config.js        your content
assets/          logo mark, share image, background textures
```
