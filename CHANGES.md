# Security / Production Review - Changes

Frontend UI me koi change nahi. Sirf backend (API, lib, models, middleware, scripts).

## Fixed
1. **Order lookup leak** (`api/orders/[orderNumber]`): guest `?phone=` se koi bhi sequential order number + phone se address/phone/email dekh sakta tha. Ab sirf logged-in owner. Response me `user`/`__v` nahi jaate. PATCH par origin + rate-limit guard.
2. **Rate-limit bypass** (`lib/security.js`): `x-forwarded-for` ki left-most value spoof ho sakti hai. Ab `TRUSTED_PROXY_HOPS` ke hisaab se right-side IP. Memory cap (20k keys).
3. **CSRF check production me 403 deta** (proxy ke peeche Host alag hota hai): ab `x-forwarded-host` aur `SITE_URL` bhi accept.
4. **Brute-force counter race** (`authPlugin`): parallel requests counter bypass karte the. Ab atomic `$inc`. Lock: admin 5, user 10 attempts (pehle 20).
5. **Admin token password change ke baad valid rehta tha**: ab `passwordChangedAt` check.
6. **12-character slug bug**: `mongoose.isValidObjectId` 12-char string ko ID maanta hai, to jaise `hair-oil-pro` slug 404 deta. Ab strict 24-hex `isId` sab jagah.
7. **Admin cancel vs customer cancel race**: stock double restore ho sakta tha. Ab atomic transition.
8. **Protocol-relative URL** (`//evil.com`) product images/brochure me allowed tha: block.
9. **Uploads**: invalid multipart par crash, size pre-check, rate-limit.
10. **Blog HTML**: render par bhi sanitize (defence in depth).
11. **Subscribe** duplicate-key race => success. **Mongo** connect timeout 10s.
12. **create-admin**: valid email, password min 12, purane admin sessions invalidate.
13. Dead code hata diya: `lib/productPayload.js`, empty `Dashboard.jsx`, `CartContext.jsx`, empty dirs.

## Env (`.env.example` dekho)
MONGODB_URI, JWT_SECRET (>=32), SITE_URL, TRUSTED_PROXY_HOPS.

## Production notes
- Zip me `package.json`, `next.config`, `public/`, `src/assets/` nahi the. Is zip ko apne project par **extract karke overwrite** karo (purana folder delete mat karo).
- Needs: next 16 (`src/proxy.js`), mongoose, zod v4, jose, bcryptjs, sanitize-html, @tiptap/*.
- `uploads/` folder local disk par hai: VPS/Docker me persistent volume lagao. Vercel/serverless par files gayab ho jaayengi (S3/Cloudinary chahiye).
- Rate limiter in-memory hai (per instance). Multi-instance par Redis/Upstash ya Cloudflare rate-limit lagao.
- `next.config` me security headers lagao (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS).
- Purchase ke bina rating allowed hai (design choice); subscribe me double opt-in nahi hai.

## Round 2 (SEO)
- `src/app/sitemap.js`: static pages + active products + published blogs (hourly refresh, DB down par bhi chalta hai).
- `src/app/robots.js`: /admin, /api, /account, /auth, /cart, /checkout, /wishlist block; sitemap link.
- `src/app/layout.js`: root title/description ("Create Next App" hata diya) + metadataBase.
- `src/lib/siteUrl.js`: `SITE_URL` env se safe site URL. **Production me `SITE_URL` zaroor set karo.**
