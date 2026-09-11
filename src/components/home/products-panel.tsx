import { products } from "../../lib/content";
import { WorkExperience } from "../work-experience";
import { toWorkExperience } from "./map-work-experience";

export function ProductsPanel() {
  return (
    <WorkExperience
      className="w-full"
      experiences={toWorkExperience(products)}
    />
  );
}
