import { HeroSectionView } from "@/view/hero-section/HeroSectionView";
import { renderToStaticMarkup } from "react-dom/server";

export const heroData = {
  type: "hero-section",
  contents: [
    {
      header: "Welcome to Our Site",
      sub: "Build anything easily",
      button: "Get Started",
    },
  ],
};

const html = renderToStaticMarkup(<HeroSectionView data={heroData} />);

const trialPlugin = (editor) => {
  editor.on("load", () => {
    editor.BlockManager.add("hero-block", {
      label: "Hero",
      category: "Sections",
      content: html,
    });
  });
};

export default trialPlugin;
