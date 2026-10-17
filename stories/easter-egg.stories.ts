import { EasterEgg } from "../src/js/game/game-dom/easter-egg";
import { domStub } from "./stub/dom-stub";

export default {
  title: "easter-egg",
};

/** イースターエッグ */
export const easterEgg = domStub(() => {
  const easterEgg = new EasterEgg();
  return easterEgg.getRootHTMLElement();
});
