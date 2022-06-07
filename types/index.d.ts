import "./others";

export interface XaymaOptions {
  parent;
  onReady;
  entreprise;
  onSave;
  lang?: "fr" | "en";
}

export declare class Xayma {
  public $textarea: HTMLTextAreaElement;
  public $el: {
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

  public text: string;
  public parent: Element;
  public note: number | undefined;
  public step: number;
  public saving: boolean;

  constructor(options: XaymaOptions);
}

export declare function init(
  entrepriseId: string,
  lang?: "fr" | "en" | undefined
): void;

interface Window {
  xayma: { init: (entreprise: string, lang?: "fr" | "en") => void };
}
