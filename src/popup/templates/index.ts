import _template from "!!raw-loader!./template.html";
import startButton from "./startButton";
import closerButton from "./closerButton";

export default async () => {
  let template = _template;
  template = await startButton(template);
  template = await closerButton(template);

  return template;
};
