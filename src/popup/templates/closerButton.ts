export default async (template: string) => {
  const button = document.createElement("button");
  button.classList.add("--xayma-closer-button");
  button.innerHTML = "fermer";

  return template.replace("__xayma_closer_button__", button.outerHTML);
};
