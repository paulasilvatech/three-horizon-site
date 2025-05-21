# Three Horizons Platform - GitHub Pages Deployment Guide

This repository contains the complete Three Horizons Platform documentation site built with Docusaurus. Follow these instructions to deploy the site to GitHub Pages.

## Quick Start for GitHub Pages Deployment

1. Create a new GitHub repository for your site
2. Clone the repository to your local machine
3. Extract the contents of this ZIP file to your local repository
4. Push the contents to your GitHub repository
5. Configure GitHub Pages in your repository settings

## Detailed Deployment Steps

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `three-horizons-platform`)
4. Make the repository public or private as needed
5. Click "Create repository"

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/three-horizons-platform.git
cd three-horizons-platform
```

### 3. Extract and Add Files

1. Extract the contents of this ZIP file to your local repository folder
2. For GitHub Pages deployment, you'll need to use the pre-built static files:

```bash
# Option 1: Use the pre-built files
# Copy the contents of the 'build' directory to the root of your repository
cp -r build/* .

# Option 2: If you want to rebuild the site yourself
npm install
npm run build
cp -r build/* .
```

### 4. Configure for GitHub Pages

Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './build'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 5. Push to GitHub

```bash
git add .
git commit -m "Initial commit with Three Horizons Platform documentation"
git push -u origin main
```

### 6. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" > "Pages"
3. Under "Source", select "GitHub Actions"
4. Wait for the GitHub Actions workflow to complete
5. Your site will be available at `https://yourusername.github.io/three-horizons-platform/`

## Customization

If you want to customize the site further:

1. Make changes to the source files in the `src`, `docs`, or `static` directories
2. Rebuild the site with `npm run build`
3. Test locally with `npm run serve`
4. Commit and push your changes

## Troubleshooting

- If your site is not appearing, check the GitHub Actions tab for any errors
- Ensure your repository is public or that you have GitHub Pages enabled for private repositories
- Check that the base URL in `docusaurus.config.js` matches your deployment path

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
