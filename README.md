# Moodex Labs — Next.js Starter (GitHub-ready)

A minimal Next.js + Tailwind starter wired to your Cloudflare Worker chat endpoint.

## Quickstart

```bash
npm i
cp .env.example .env.local
# edit .env.local:
# NEXT_PUBLIC_WORKER_URL=https://moodex-chat.<your>.workers.dev/chat
npm run dev
```

Deploy on Vercel and add env vars in Project Settings:
- `NEXT_PUBLIC_SITE_NAME` = MOODEX LABS
- `NEXT_PUBLIC_WORKER_URL` = your worker /chat URL

To push to GitHub:
```bash
git init
git add -A
git commit -m "init moodex labs"
git branch -M main
git remote add origin https://github.com/<you>/moodex-labs.git
git push -u origin main
```
