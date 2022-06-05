export default class Xayma {
  firebase: any;
  $textarea!: HTMLTextAreaElement;
  $el!: {
    el: HTMLDivElement;
    children: {
      actions: {
        el: HTMLDivElement;
        buttons: NodeListOf<HTMLButtonElement>;
      };

      editor: {
        el: HTMLDivElement;
        children: {
          textarea: HTMLTextAreaElement;
        };
      };

      login: {
        el: HTMLDivElement;
        options: NodeListOf<HTMLButtonElement>;
      };

      submit: {
        el: HTMLDivElement;
        button: HTMLButtonElement;
      };

      saving: HTMLDivElement;
    };
  };

  private onSave?: () => void;
  private onReady?: () => void;
  parent!: Element;

  entreprise!: string;
  text = "";

  constructor({
    parent,
    onReady,
    entreprise,
    onSave,
  }: {
    parent: Element;
    entreprise: string;
    onReady?: () => void;
    onSave?: () => void;
  }) {
    this.entreprise = entreprise;
    this.parent = parent;
    this.onReady = onReady;
    this.onSave = onSave;
    this.init();
  }

  private async init() {
    const app = (await import("./app")).default;
    app(this.parent);

    const firebase = (await import("./firebase")).default;
    this.firebase = await firebase();

    const el = document.querySelector(".--xayma-main") as HTMLDivElement;

    // actions
    const actions = el.querySelector(".--xayma-actions") as HTMLDivElement;
    const buttons = actions.querySelectorAll("button");

    buttons.forEach((btn) => {
      const value = Number(btn.getAttribute("data-value"));
      if (value && !isNaN(value)) {
        btn.addEventListener("click", () => this.onActionBtnClick(value));
      }
    });

    // editor
    const editor = el.querySelector(".--xayma-editor") as HTMLDivElement;
    const textarea = editor.querySelector("textarea") as HTMLTextAreaElement;
    textarea.addEventListener("change", () => {
      this.text = textarea.value;
    });

    // login
    const login = el.querySelector(".--xayma-login") as HTMLDivElement;
    const loginBtns = login.querySelectorAll("button");

    loginBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.login());
    });

    // submit
    const submit = el.querySelector(".--xayma-submit") as HTMLDivElement;
    const submitBtn = submit.querySelector("button") as HTMLButtonElement;
    submit.addEventListener("click", () => this.submit());

    // saving
    const saving = el.querySelector(".--xayma-saving") as HTMLDivElement;

    this.$el = {
      el,
      children: {
        editor: { el: editor, children: { textarea } },
        actions: { el: actions, buttons },
        login: { el: login, options: loginBtns },
        submit: { el: submit, button: submitBtn },
        saving,
      },
    };

    this.step = 1;
    if (this.onReady) this.onReady();
  }

  private onActionBtnClick(value: number) {
    this.note = value;
  }

  private submit() {
    if (this.firebase.auth.currentUser) {
      const data = {
        note: this.note,
        entreprise: this.entreprise,
        text: this.text || null,
      };

      this.saving = true;
      this.firebase
        .save(data)
        .then(() => {
          if (this.onSave) this.onSave();
        })
        .finally(() => {
          this.saving = false;
        });
    } else this.step = 3;
  }

  private login() {
    this.firebase.login(true).then(() => this.submit());
  }

  private _note?: number | undefined;
  public get note(): number | undefined {
    return this._note;
  }
  public set note(note: number | undefined) {
    this._note = note;

    this.$el.children.actions.buttons.forEach((btn, index) => {
      btn.classList.remove("--coation-active-button");
      btn.classList.remove("--coation-deactive-button");

      if (index + 1 === note) {
        btn.classList.add("--coation-active-button");
      } else if (typeof note !== "undefined") {
        btn.classList.add("--coation-deactive-button");
      }
    });

    this._note = note;
    if (note && this.step < 2) this.step = 2;
  }

  private _step = 1;
  public get step(): number {
    return this._step;
  }
  public set step(value: number) {
    this._step = value;
    this.saving = false;

    this.$el.children.actions.el.classList.remove("--xayma-close");
    this.$el.children.editor.el.classList.remove("--xayma-close");
    this.$el.children.submit.el.classList.remove("--xayma-close");
    this.$el.children.login.el.classList.remove("--xayma-close");

    if (this.step === 1) {
      this.$el.children.editor.el.classList.add("--xayma-close");
      this.$el.children.submit.el.classList.add("--xayma-close");
      this.$el.children.login.el.classList.add("--xayma-close");

      this.note = undefined;
      this.text = "";
    } else if (this.step === 2) {
      this.$el.children.login.el.classList.add("--xayma-close");
    } else if (this.step === 3) {
      this.$el.children.actions.el.classList.add("--xayma-close");
      this.$el.children.editor.el.classList.add("--xayma-close");
      this.$el.children.submit.el.classList.add("--xayma-close");
    }
  }

  private _saving = false;
  public get saving() {
    return this._saving;
  }
  public set saving(value) {
    this._saving = value;

    this.$el.children.saving.classList[!value ? "add" : "remove"](
      "--xayma-close"
    );
  }
}
