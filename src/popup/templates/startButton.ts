import _svg from "../../xayma/svgs";

export default async (template: string) => {
  const button = document.createElement("button");
  button.classList.add("--xayma-start-button");

  const text = document.createElement("div");
  text.classList.add("--xayma-start-button-text");
  text.innerText = "Votre avis";
  button.appendChild(text);

  const icon = document.createElement("div");
  icon.classList.add("--xayma-start-button-icon");
  icon.innerHTML = _svg.love;
  button.appendChild(icon);

  return template.replace("__xayma_start_button__", button.outerHTML);
};
