# vrapitup — enquiry + INR update

## What changed

- Project enquiry budgets now use INR:
  - < ₹25k
  - ₹25k – ₹75k
  - ₹75k – ₹1.5L
  - ₹1.5L +
- The Start a Project form now POSTs to `/api/enquiry`.
- Vercel sends the enquiry through Gmail to `vrapitupp@gmail.com`.
- The visitor's email is set as `Reply-To`, so you can reply directly.
- Footer contact section includes:
  - +91 9989906804
  - +91 8519895649

## 1. Gmail setup

Use the Gmail account `vrapitupp@gmail.com`.

You need 2-Step Verification enabled, then create a Google **App Password** for this site.

Do NOT put the App Password in React code or commit it to GitHub.

## 2. Vercel environment variables

In Vercel:

Project → Settings → Environment Variables

Add:

- `GMAIL_USER` = `vrapitupp@gmail.com`
- `GMAIL_APP_PASSWORD` = your 16-character Google App Password
- `TO_EMAIL` = `vrapitupp@gmail.com`

Enable them for Production (and Preview if you want to test preview deployments).

Then redeploy the project.

## 3. GitHub

Replace the project files with this version and push:

```bash
git add .
git commit -m "Add INR pricing and real project enquiry email"
git push
```

If Vercel is already connected to the GitHub repository, the push should trigger a new deployment automatically.

## 4. Test

After deployment:

1. Open the live Vercel site.
2. Click **Start a Project**.
3. Fill the form.
4. Submit it.
5. Check `vrapitupp@gmail.com`.
6. Reply to the received email — it should reply to the client's submitted email address.

The email credentials stay server-side in Vercel and are never exposed to the browser.
