import _template from "!!raw-loader!./template.html";

import login from "./login";
import actions from "./actions";
import saving from "./saving";

let template = _template;
template = saving(template);
template = actions(template);
template = login(template);

export default template;
