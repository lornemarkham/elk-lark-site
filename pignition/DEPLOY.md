# Deploy Pignition to Vercel + pignition.ca

## 1. Push to GitHub

If the project isn’t in a repo yet:

```bash
cd /path/to/pignition
git init
git add .
git commit -m "Initial commit"
# Create a repo at github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/pignition.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. Click **Add New…** → **Project**.
3. Import your **pignition** repo.
4. Vercel will detect Vite. Keep:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add the env var so the form works:
   - **Environment Variables** → add:
   - **Name:** `VITE_FORMSPREE_FORM_ID`
   - **Value:** `mreygjya`
6. Click **Deploy**. You’ll get a URL like `pignition-xxx.vercel.app`.

## 3. Connect pignition.ca (domain on Cloudflare)

1. In the Vercel dashboard, open your project → **Settings** → **Domains**.
2. Add domain: **pignition.ca** (and optionally **www.pignition.ca**).
3. Vercel will show DNS instructions. For Cloudflare you usually use:

   **Option A – CNAME (recommended)**  
   In Cloudflare, for your zone **pignition.ca**:

   | Type  | Name | Content           | Proxy |
   |-------|------|-------------------|-------|
   | CNAME | @    | cname.vercel-dns.com | DNS only (grey cloud) |
   | CNAME | www  | cname.vercel-dns.com | DNS only (grey cloud) |

   Some setups use **A** for root and **CNAME** for www; use whatever Vercel shows for **pignition.ca** after you add the domain.

   **Option B – Vercel nameservers**  
   If Vercel offers nameservers (e.g. `ns1.vercel-dns.com`), you can switch the domain in Cloudflare to use those instead. Only do this if you’re comfortable moving DNS to Vercel.

4. In Cloudflare, turn the proxy **off** (grey cloud) for the records you use for Vercel so SSL and routing work correctly.
5. Wait a few minutes; Vercel will issue SSL and **pignition.ca** will start serving the site.

## 4. After first deploy

- Confirm the form works at **https://pignition.ca** (Formspree receives submissions).
- If you use **www**, Vercel can redirect root to www or the other way around in **Domains** settings.
