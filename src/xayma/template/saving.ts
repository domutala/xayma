import svgs from "../svgs";

export default (template: string) => {
  const div = document.createElement("div");
  div.classList.add("--xayma-saving");
  div.innerHTML = svgs.loader;

  return template.replace("__xayma_saving__", div.outerHTML);
};
