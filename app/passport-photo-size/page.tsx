import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { openGraphImage } from "@/lib/seo";

const title = "Passport & Visa Photo Size Tool";
const description = "Crop US visa, Indian passport, UK passport and Schengen visa photos privately. Apply preset dimensions and editable file-size limits.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/passport-photo-size" },
  openGraph: { title: `${title} | PixSqueeze`, description, url: "/passport-photo-size", images: [openGraphImage] },
  twitter: { card: "summary_large_image", title: `${title} | PixSqueeze`, description, images: [openGraphImage] },
};

export default function Page() {
  return (
    <ToolPage
      mode="passport"
      eyebrow="Country photo presets"
      title="Prepare a"
      accent="passport or visa photo"
      description="Choose a US, Indian, UK or Schengen preset to apply the crop ratio, pixel dimensions and an appropriate file-size target without uploading your portrait."
      benefits={["US, India, UK and Schengen presets", "Editable target size for portal-specific limits", "Local browser processing with no photo upload"]}
    >
      <h2>Choose the preset for your application</h2>
      <p>The selector configures a centered crop and output size for the selected application. US visa photos use a square 600 × 600px output with a 240KB ceiling. Indian passport, UK printed-photo and Schengen presets use a 35 × 45mm ratio.</p>
      <h2>File-size rules are not universal</h2>
      <p>The Indian preset starts at 50KB as a practical working target, but Passport Seva channels can have different requirements. UK and Schengen digital limits vary by submission method or application portal, so those fields are intentionally left open for the value shown by your destination.</p>
      <h2>How to prepare the photo</h2>
      <ol>
        <li>Choose a well-lit, front-facing portrait with room around the head and shoulders.</li>
        <li>Select the relevant country or visa preset and confirm the target KB value.</li>
        <li>Crop and resize, then inspect the framing and downloaded file before submitting.</li>
      </ol>
      <h2>Verify the issuing authority’s current rules</h2>
      <p>This tool prepares dimensions, aspect ratio and file weight. It cannot assess background, expression, head position, shadows, eyeglasses or biometric acceptance. Always compare the result with the current instructions on the official application portal.</p>
    </ToolPage>
  );
}
