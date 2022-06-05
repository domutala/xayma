import svgs from "../svgs";

export default (template: string) => {
  type Action = { icon: string; text: string; note: number };

  const actions: { [key: string]: Action } = {
    frown: { icon: svgs.frown, text: "Horrible", note: 1 },
    dislike: { icon: svgs.dislike, text: "J'aime pas", note: 2 },
    acceptable: { icon: svgs.acceptable, text: "Acceptable", note: 3 },
    like: { icon: svgs.like, text: "J'aime", note: 4 },
    love: { icon: svgs.love, text: "J'adore", note: 5 },
  };

  const div = document.createElement("div");
  div.classList.add("--xayma-actions");

  const keys = Object.keys(actions);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const button = document.createElement("button");
    button.classList.add("--xayma-action-button");
    button.style.animationDuration = `${(keys.length - i + 1) * 200}ms`;
    button.setAttribute("data-value", `${i + 1}`);

    // button.setAttribute(
    //   "onclick",
    //   `COTATION.onActionClick(${actions[key].note});`
    // );

    const icon = document.createElement("div");
    icon.classList.add("--xayma-action-button-icon");
    icon.innerHTML = actions[key].icon;
    button.appendChild(icon);

    const text = document.createElement("div");
    text.classList.add("--xayma-action-button-text");
    text.innerHTML = actions[key].text;
    button.appendChild(text);

    div.appendChild(button);
  }

  return template.replace("__xayma_action__", div.outerHTML);
};
