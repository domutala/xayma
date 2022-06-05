import _template from "!!raw-loader!./login.html";

export default (template: string) => {
  return template.replace("__xayma_login__", _template);
};
