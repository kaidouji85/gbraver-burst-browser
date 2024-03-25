import { SecretPlayerSelect } from "../src/js/dom-scenes/secret-player-select";
import { domStub } from "./stub/dom-stub";

export default {
  title: "secret-player-select",
};

/** シーン通常表示 */
export const scene = domStub(() => {
  const scene = new SecretPlayerSelect();
  return scene.getRootHTMLElement();
})
