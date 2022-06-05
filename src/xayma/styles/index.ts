import index from "!!raw-loader!sass-loader!./index.scss";
import main from "!!raw-loader!sass-loader!./main.scss";
import login from "!!raw-loader!sass-loader!./login.scss";

let style = index;
style += main;
style += login;

export default style;
