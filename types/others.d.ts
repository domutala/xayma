declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.html" {
  const content: string;
  export default content;
}

interface Window {
  xayma: { init: (entreprise: string) => void };
}
