import Popup from "./popup";

export { default as Xayma } from "./xayma";
export { default as Popup } from "./popup";

export function init(entreprise: string) {
  const app = new Popup(entreprise);
  return app;
}

//T6zCmFJsr8swYS3OR8lG
