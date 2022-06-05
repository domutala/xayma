export default async (template: string) => {
  // const _svg = (await import("../../xayma/svgs")).default;

  const button = document.createElement("button");
  button.classList.add("--xayma-closer-button");
  button.innerHTML = "fermer";
  // button.innerHTML = _svg.close;

  return template.replace("__xayma_closer_button__", button.outerHTML);
};
