export default class Popup {
  main!: any;
  app!: HTMLDivElement;
  entreprise!: string;

  constructor(entreprise: string) {
    this.entreprise = entreprise;
    this.init();
  }

  async init() {
    const template = (await import("./templates")).default;
    const _style = (await import("./styles")).default;
    const Xayma = (await import("../xayma")).default;

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

    this.main = new Xayma({
      parent: container,
      entreprise: this.entreprise,
      onReady: () => this.onReady(),
      onSave: () => this.onSave(),
    });
  }

  onSave() {
    this.toggleOpen(true);
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
