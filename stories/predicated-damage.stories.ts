import { PredicatedDamage } from "../src/js/game-dom/predicated-damage";
import { domStub } from "./stub/dom-stub";

export default {
  title: "predicated-damage",
};

/** 単純表示 */
export const component = domStub(() => {
  const indicator = new PredicatedDamage();
  return indicator.getRootHTMLElement();
});
