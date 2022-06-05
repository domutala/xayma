import "./others";

export interface XaymaOptions {
  parent;
  onReady;
  entreprise;
  onSave;
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

interface Window {
  xayma: { init: (entreprise: string) => void };
}
