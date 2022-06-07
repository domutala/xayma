import app from "./app";
import firebase from "./firebase";
import svgs from "./svgs";
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

      email: {
        el: HTMLDivElement;
        input: HTMLInputElement;
      };

      submit: {
        el: HTMLDivElement;
        button: HTMLButtonElement;
      };

      saving: HTMLDivElement;
      finish: {
        el: HTMLDivElement;
        children: {
          icon: HTMLDivElement;
          text: HTMLDivElement;
        };
      };
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
    lang = "fr",
  }: {
    parent: Element;
    entreprise: string;
    onReady?: () => void;
    onSave?: () => void;
    lang?: "fr" | "en";
  }) {
    this.entreprise = entreprise;
    this.parent = parent;
    this.lang = lang;

    this.onReady = onReady;
    this.onSave = onSave;
    this.init();
  }

  private async init() {
    app(this.parent);

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

    // email
    const email = el.querySelector(".--xayma-email") as HTMLDivElement;
    const emailInput = email.querySelector("input") as HTMLInputElement;
    emailInput.value = this.email;
    emailInput.addEventListener("change", () => {
      this.email = emailInput.value;
    });

    // submit
    const submit = el.querySelector(".--xayma-submit") as HTMLDivElement;
    const submitBtn = submit.querySelector("button") as HTMLButtonElement;
    submitBtn.addEventListener("click", () => this.submit());

    // saving
    const saving = el.querySelector(".--xayma-saving") as HTMLDivElement;

    // finish
    const finish = el.querySelector(".--xayma-finish") as HTMLDivElement;
    const finishIcon = finish.querySelector(
      ".--xayma-finish-icon"
    ) as HTMLDivElement;
    const finishText = finish.querySelector(
      ".--xayma-finish-text"
    ) as HTMLDivElement;

    this.$el = {
      el,
      children: {
        editor: { el: editor, children: { textarea } },
        actions: { el: actions, buttons },
        email: { el: email, input: emailInput },
        submit: { el: submit, button: submitBtn },
        saving,
        finish: {
          el: finish,
          children: {
            icon: finishIcon,
            text: finishText,
          },
        },
      },
    };

    this.step = 1;
    this.translate(this.lang);
    if (this.onReady) this.onReady();
  }

  private onActionBtnClick(value: number) {
    this.note = value;
  }

  private submit() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

    if (re.test(this.email)) {
      const data = {
        note: this.note,
        entreprise: this.entreprise,
        text: this.text || null,
        email: this.email,
      };

      this.saving = true;
      this.firebase
        .save(data)
        .then(() => {
          if (this.onSave) this.onSave();

          const notes = {
            1: svgs.frown,
            2: svgs.dislike,
            3: svgs.acceptable,
            4: svgs.like,
            5: svgs.love,
          };

          this.$el.children.finish.children.icon.innerHTML =
            notes[this.note as 1];
          this.step = 100;
        })
        .finally(() => {
          this.saving = false;
        });
    } else this.step = 3;
  }

  private translate(lang: "fr" | "en") {
    const words = {
      fr: {
        actions: {
          1: "Horrible",
          2: "J'aime pas",
          3: "Acceptable",
          4: "J'aime",
          5: "J'adore",
        },
        editor: {
          placeholder: "Racontez-nous votre expérience (facultatif)...",
        },
        email: {
          placeholder: "Votre adresse email",
        },
        finish: {
          text: "Merci d'avoir participer à améliorer la qualité de ce service en partageant votre expérience!",
        },
        submit: {
          text: "Envoyer",
        },
      },
      en: {
        actions: {
          1: "Horrible",
          2: "I don't like it",
          3: "Acceptable",
          4: "I like it",
          5: "I love it",
        },
        editor: {
          placeholder: "Tell us about your expérience (optional)...",
        },
        email: {
          placeholder: "Your email address",
        },
        finish: {
          text: "Thank you for participating in improving the quality of this service by sharing your expérience !",
        },
        submit: {
          text: "Send",
        },
      },
    };

    const word = words[lang];

    this.$el.children.actions.buttons.forEach((btn, i) => {
      const text = btn.querySelector(
        ".--xayma-action-button-text"
      ) as HTMLDivElement;

      text.innerText = word.actions[(i + 1) as 1];
    });

    this.$el.children.editor.children.textarea.placeholder =
      word.editor.placeholder;
    this.$el.children.email.input.placeholder = word.email.placeholder;
    this.$el.children.finish.children.text.innerText = word.finish.text;
    this.$el.children.submit.button.innerText = word.submit.text;
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
    this.$el.children.email.el.classList.remove("--xayma-close");
    this.$el.children.finish.el.classList.remove("--xayma-close");

    if (this.step === 1) {
      this.$el.children.editor.el.classList.add("--xayma-close");
      this.$el.children.submit.el.classList.add("--xayma-close");
      this.$el.children.email.el.classList.add("--xayma-close");
      this.$el.children.finish.el.classList.add("--xayma-close");

      this.note = undefined;
      this.text = "";
    } else if (this.step === 2) {
      this.$el.children.email.el.classList.add("--xayma-close");
      this.$el.children.finish.el.classList.add("--xayma-close");
    } else if (this.step === 3) {
      this.$el.children.editor.el.classList.add("--xayma-close");
      this.$el.children.finish.el.classList.add("--xayma-close");
    } else {
      this.$el.children.actions.el.classList.add("--xayma-close");
      this.$el.children.editor.el.classList.add("--xayma-close");
      this.$el.children.submit.el.classList.add("--xayma-close");
      this.$el.children.email.el.classList.add("--xayma-close");
      this.$el.children.finish.el.classList.remove("--xayma-close");
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

  // private _email = "";
  public get email() {
    return sessionStorage.getItem("xayma.auth.email") || "";
  }
  public set email(value: string) {
    // this._email = value;
    sessionStorage.setItem("xayma.auth.email", value);
  }

  private _lang: "fr" | "en" = "fr";
  public get lang(): "fr" | "en" {
    return this._lang;
  }
  public set lang(value: "fr" | "en") {
    this._lang = value;
  }
}
