import template from "./templates";
import _style from "./styles";
import Xayma from "../xayma";
export default class Popup {
  main!: any;
  app!: HTMLDivElement;
  entreprise!: string;
  lang?: "fr" | "en";

  $el!: {
    el: HTMLDivElement;
    starterButton: HTMLButtonElement;
    closerButton: HTMLButtonElement;
  };

  constructor(entreprise: string, lang?: "fr" | "en") {
    this.entreprise = entreprise;
    this.lang = lang;

    this.init();
  }

  async init() {
    if (!this.lang) {
      const lang = window.navigator.language;
      this.lang = ["fr", "en"].includes(lang) ? (lang as "fr") : "fr";
    }

    const app = document.createElement("div");
    app.innerHTML = await template();
    this.app = app.firstChild as HTMLDivElement;

    const style = document.createElement("style");
    style.innerHTML = _style;
    this.app.appendChild(style);
    document.body.appendChild(app);

    const starter = this.app.querySelector(
      ".--xayma-start-button"
    ) as HTMLButtonElement;
    starter.addEventListener("click", () => this.toggleOpen());

    const closer = this.app.querySelector(
      ".--xayma-closer-button"
    ) as HTMLButtonElement;
    closer.addEventListener("click", () => this.toggleOpen());

    const container = this.app.querySelector(
      ".--xayma-main-container"
    ) as HTMLDivElement;

    this.$el = {
      el: this.app,
      closerButton: closer,
      starterButton: starter,
    };

    this.translate(this.lang);

    this.main = new Xayma({
      parent: container,
      entreprise: this.entreprise,
      lang: this.lang,
      onReady: () => this.onReady(),
    });
  }

  private translate(lang: "fr" | "en") {
    const words = {
      fr: {
        starterButton: "Votre avis",
        closerButton: "Fermer",
      },
      en: {
        starterButton: "Feedback",
        closerButton: "Close",
      },
    };

    const word = words[lang];

    const text = this.$el.starterButton.querySelector(
      ".--xayma-start-button-text"
    ) as HTMLDivElement;
    text.innerText = word.starterButton;

    this.$el.closerButton.innerText = word.closerButton;
  }

  onReady() {
    this.app.classList.add("ready");
  }

  toggleOpen(forceClose?: boolean) {
    forceClose;
    this.app.classList[forceClose ? "remove" : "toggle"]("open");
    this.main.step = 1;
  }
}
