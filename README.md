# Student Portfolio — Quick Start

A responsive black/graphite student portfolio built with plain HTML, CSS, and JavaScript. No npm install or framework required. Suitable for Visual Studio Code and GitHub Pages.

## Files
- `index.html` — website content and sections
- `style.css` — theme, responsive layout, and animations
- `script.js` — loads your profile/projects and powers navigation
- `config.js` — **edit this file to personalize your site**
- `assets/project-*.jpg` — optional screenshots for your projects

## Personalize it
1. Open the folder in Visual Studio Code.
2. Open `config.js`.
3. Replace your name, initials, introduction, email, GitHub URL, skills, and projects.
4. Add screenshots inside `assets/` and put a relative path in a project's `image` field, for example `"assets/project-nebula.jpg"`.
5. For each project, add a working public URL in `link` and/or `github`. Leave the value as `""` if you do not have a link yet.
6. Save and refresh the browser.

## Preview locally
- Easiest: double-click `index.html` to open it in your browser.
- Recommended: in VS Code, install **Live Preview** by Microsoft or **Live Server**, then open `index.html` with the extension.
- Internet connection is only needed for the Google Fonts import; the site still works without it.

## Publish free with GitHub Pages
1. Sign in at https://github.com and create a **public** repository named `portfolio`.
2. Upload the *contents* of this folder (not only the ZIP). Keep `index.html`, `config.js`, `script.js`, `style.css`, and `assets/` at the repository root.
3. Open repository **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
5. Wait for publishing. Your live URL normally looks like `https://YOUR-USERNAME.github.io/portfolio/`.
6. Open the public URL in an incognito window and on your phone. After edits, upload/commit the changed files and wait for GitHub Pages to update.

## Before submitting
- Replace the example email and GitHub URL in `config.js`.
- Check the project descriptions and make sure they reflect your actual contribution.
- Add your own project screenshots where available.
- Test every link and the mobile menu.
- Your website files are public after deployment. Do not add passwords, private documents, or information you do not want public.

## AI-use note
You can adapt this for your class submission. Follow your instructor's instructions about disclosing AI assistance and be ready to explain how `index.html`, `style.css`, `script.js`, and `config.js` work.


## Extra additions
- Education section (edit `education` in `config.js`)
- Profile picture support: `assets/profile.jpg`
- Project screenshots: `assets/project-nebula.jpg`, `assets/project-eduassist.jpg`, `assets/project-msme.jpg`
- Project image previews link to GitHub when the real repository URL is supplied
- Subtle animated particles in the background
- Existing visual style and sections are preserved
