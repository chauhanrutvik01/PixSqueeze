# PixSqueeze SEO and marketing launch plan

Rankings are earned through useful pages, reliable indexing, user satisfaction and credible mentions. This plan avoids paid links, copied articles and doorway-page tactics that create short-lived gains and long-term risk.

## Launch day

1. Deploy the current production build and confirm `/`, `/check`, the four `/compress-*` pages, `robots.txt`, `sitemap.xml`, `opengraph-image` and `manifest.webmanifest` return `200`.
2. Verify the domain property in Google Search Console. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` during the build if HTML-tag verification is used.
3. Submit `https://pixsqueeze.me/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
4. Request indexing for the homepage, `/compress-jpg`, `/compress-png`, `/compress-webp`, `/compress-heic`, `/compress-image-to-50kb`, `/compress-image-to-100kb`, `/check` and `/guides`.
5. Test a real compression and confirm GA4 receives `compression_started`, `compression_completed`, `compressed_image_downloaded` and `image_size_checked` without filenames or image data.

## Brand defence

Another website currently uses the PixSqueeze name on a different domain. Use one consistent description everywhere: “PixSqueeze — free exact-size image compression in your browser.”

- Secure matching social handles where practical.
- Publish one canonical launch announcement that links to `https://pixsqueeze.me`.
- Use the full `.me` domain when mentioning the product until branded search clearly distinguishes it.
- Keep the site name, logo, organization details and descriptions consistent.

## First 30 days

- Earn the first relevant links from tools roundups, developer resource lists, privacy-tool collections and image-workflow articles. Ask for editorial inclusion; do not buy bulk links.
- Share specific use cases rather than generic promotion: exact 50KB application photos, HEIC-to-JPG compatibility, private client-asset compression and website image budgets.
- Add screenshots or a short demo clip to launch posts so people can understand the workflow before clicking.
- Contact small web-design, photography, education and job-application publishers whose existing articles genuinely benefit from a private exact-size tool.
- Publish one expert guide each week and link it to one relevant tool page.

Suggested next topics:

1. Compress passport photo to 50KB safely
2. Compress a signature image to 20KB
3. JPG vs WebP for websites
4. How to reduce iPhone photo file size
5. Image dimensions for job applications
6. How to remove EXIF metadata from a photo
7. Compress product images for Shopify and WordPress
8. Why an image upload says “file too large”

## Measurement

Review these every week, comparing 28-day periods:

- Search Console: indexed pages, impressions, clicks, average position and queries by landing page
- GA4: engaged sessions and completed downloads by landing page
- Conversion rate: `compressed_image_downloaded` divided by landing-page sessions
- Brand split: searches containing “PixSqueeze” versus non-brand image-compression terms
- Content contribution: guide pages that assist a later tool visit or download

Do not judge the program only by total traffic. Early success is indexed pages, growing impressions, first non-brand clicks and a healthy compression-to-download completion rate.

## Quarterly maintenance

- Refresh only pages whose facts, browser support or user questions changed; keep sitemap modification dates accurate.
- Merge or improve pages that receive impressions but fail to satisfy their query intent.
- Add internal links from high-impression guides to the most relevant compressor, size preset or format page.
- Re-test mobile usability, Core Web Vitals, structured data, broken links and social previews after significant releases.
