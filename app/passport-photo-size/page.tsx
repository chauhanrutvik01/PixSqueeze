import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { openGraphImage } from "@/lib/seo";

const title = "Passport Photo Crop Tool & Size Presets";
const description = "Crop and resize US visa, Indian passport, UK passport and Schengen visa photos privately with clear ratio and file-size guidance.";

const presetSummary = [
  { name: "U.S. visa", ratio: "1:1 square", output: "600 × 600px", target: "240KB maximum" },
  { name: "Indian passport", ratio: "35:45", output: "413 × 531px", target: "50KB working target" },
  { name: "UK printed passport photo", ratio: "35:45", output: "413 × 531px", target: "Enter the portal limit" },
  { name: "Schengen visa", ratio: "35:45", output: "413 × 531px", target: "Enter the consulate limit" },
] as const;

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
      <h2>Passport and visa crop ratios at a glance</h2>
      <div className="not-prose mt-5 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-ink">
            <tr>
              <th className="px-4 py-3 font-extrabold">Preset</th>
              <th className="px-4 py-3 font-extrabold">Crop ratio</th>
              <th className="px-4 py-3 font-extrabold">PixSqueeze output</th>
              <th className="px-4 py-3 font-extrabold">File-size setting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white text-slate-600">
            {presetSummary.map((preset) => (
              <tr key={preset.name}>
                <th className="px-4 py-3 font-bold text-ink">{preset.name}</th>
                <td className="px-4 py-3">{preset.ratio}</td>
                <td className="px-4 py-3">{preset.output}</td>
                <td className="px-4 py-3">{preset.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>These presets prepare crop ratio, pixel dimensions and file weight. They do not check pose, lighting, head size or biometric acceptance, and the receiving authority&apos;s current instructions always take priority.</p>
      <h2>U.S. passport and U.S. visa photos use different workflows</h2>
      <p>The square preset in this tool is for U.S. visa digital-image requirements, not online U.S. passport renewal. For a paper U.S. passport application, the official printed-photo size is 2 × 2 inches. For online renewal, the U.S. Department of State currently asks for the original digital photo between 54KB and 10MB and provides repositioning and cropping inside its application.</p>
      <p><a href="https://travel.state.gov/en/passports/renew-replace/online/upload-digital-photo.html" rel="noreferrer" target="_blank">Check U.S. passport digital-photo guidance</a> or <a href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html" rel="noreferrer" target="_blank">check U.S. visa digital-image requirements</a> before preparing the file.</p>
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
