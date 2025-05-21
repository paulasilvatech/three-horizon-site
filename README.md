# Three Horizons Site

This is the repository for the Three Horizons Platform site, built using [Docusaurus 3](https://docusaurus.io/).

## Local Development

To run the site locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The site will be available at http://localhost:3000/Three-Horizons-Playbook/

## Build

To build the site for production:

```bash
npm run build
```

The build output will be generated in the `build/` folder.

## Deployment

The site is automatically deployed to GitHub Pages when a push happens to the `main` branch. This is done through GitHub Actions configured in the `.github/workflows/deploy.yml` file.

To deploy manually:

1. Make sure the settings in `docusaurus.config.js` are correct
2. Manually run the GitHub Actions workflow through the GitHub interface

### GitHub Pages Configuration

For the deployment to work correctly, make sure that:

1. In the GitHub repository, go to Settings > Pages
2. Under "Source", select "GitHub Actions"
3. Verify that the repository has the necessary permissions for GitHub Actions

## Custom Configuration

The site is configured in the `docusaurus.config.js` file. The main settings include:

- `url`: 'https://three-horizon-platform.github.io'
- `baseUrl`: '/Three-Horizons-Playbook/'
- `organizationName`: 'three-horizon-platform'
- `projectName`: 'Three-Horizons-Playbook'

To modify the sidebar structure, edit the `sidebars.js` file.

## Troubleshooting

- If your site is not appearing, check the GitHub Actions tab for any errors
- Ensure your repository is public or that you have GitHub Pages enabled for private repositories
- Check that the base URL in `docusaurus.config.js` matches your deployment path

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
