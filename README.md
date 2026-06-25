# Arachne Static Site

Static exported Next.js landing page for [Arachne](https://github.com/nam2184/arachne), an open-source AI coding agent for orchestrating multiple LLM sessions on a visual canvas.

## Development

```bash
npm install
npm run dev
```

## Static Export

```bash
npm run build
```

The exported site is written to `out/`.

## GitHub Pages

This repository includes `.github/workflows/deploy.yml`, which builds the Next.js static export and deploys `out/` to GitHub Pages.

The Next.js config automatically sets `basePath` when the workflow runs in a project repository, such as `https://username.github.io/repository-name/`. If you need to override that behavior, set `NEXT_PUBLIC_BASE_PATH` in the workflow environment.

In GitHub, enable Pages with:

```text
Settings -> Pages -> Source -> GitHub Actions
```
