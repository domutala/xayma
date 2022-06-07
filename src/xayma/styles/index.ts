import index from "!!raw-loader!sass-loader!./index.scss";
import main from "!!raw-loader!sass-loader!./main.scss";
import finish from "!!raw-loader!sass-loader!./finish.scss";

let style = index;
style += main;
style += finish;

export default style;
