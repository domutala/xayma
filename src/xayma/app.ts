import template from "./template";
import _style from "./styles";

export default (parent: Element) => {
  const div = document.createElement("div");
  div.innerHTML = template;

  const style = document.createElement("style");
  style.innerHTML = _style;
  div.firstChild?.appendChild(style);

  parent.appendChild(div.firstChild as any);
};
