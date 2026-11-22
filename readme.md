# ARK CNC LASER CUTTING

A responsive static business website built with HTML, CSS and JavaScript. It has no package installation or build step.

## Preview locally

Open `index.html` in a browser.

## Add the real business details

Edit the `ARK_CONTACT` object near the top of `script.js`:

- `phone`: phone number for the Call Now action, preferably in international format.
- `whatsapp`: digits only, including the country code.
- `email`: enquiry destination. The form prepares an email in the visitor’s email app; it does not send data to a server.
- `address`: full business address. This activates the embedded Google Map and the Maps link.

The site intentionally contains no invented contact information. Until configured, those buttons explain which value is missing and the enquiry form does not claim to have sent anything.

## Replace the artwork

The supplied ARK logo is saved as `assets/ark-logo.png` and used in the site header, footer and favicon. The project did not contain the requested machine photo, so the hero still uses original SVG placeholder artwork:

- Replace `assets/cnc-machine.svg` with the supplied machine photo, then update the image path in `index.html`.
- Replace `assets/ark-logo.png` if you receive a newer logo, keeping the same path or updating its references in `index.html`.

The work gallery currently uses drawn sample illustrations and is labelled as illustrative.

## Add Designs gallery images

Design images are stored in `assets/designs/` and listed in the `DESIGN_GALLERY` array in `script.js`. To add an image, copy it into that folder and add an object with its relative `src`, a short `title`, and descriptive `alt` text. The responsive Designs section and lightbox update from that list; when the list is empty, the section shows its empty-state message.

## Publish with Cloudflare Pages

1. Put the project in a GitHub repository.
2. In Cloudflare Pages, create a project connected to that repository.
3. Choose **None** as the framework preset. Leave the build command blank and set the output directory to `/` (the repository root).
4. Deploy. Cloudflare serves `index.html` as the site entry point.

## Publish with GitHub Pages

1. Push the project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, choose the branch and `/ (root)` folder, then save.
4. GitHub Pages will publish `index.html` from the selected branch.

Both hosts can publish this project directly; no build tooling is required.
