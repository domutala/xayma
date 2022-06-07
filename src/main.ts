import Popup from "./popup";
export { default as Xayma } from "./xayma";

export function init(entreprise: string, lang?: "fr" | "en") {
  const app = new Popup(entreprise, lang);
  return app;
}

//T6zCmFJsr8swYS3OR8lG
