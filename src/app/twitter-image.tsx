import { renderSocialImage } from "@/lib/social-image";

export const alt = "AI Future Ready social preview";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return renderSocialImage(size.width, size.height);
}
