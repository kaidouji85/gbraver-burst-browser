import { MiniController } from "../src/js/game-dom/mini-controller";
import { domStub } from "./stub/dom-stub";

export default {
  title: "mini-controller",
};

export const miniController = domStub(() => {
  const controller = new MiniController();
  return controller.getRootHTMLElement();
});
