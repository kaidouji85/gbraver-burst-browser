import { waitTime } from "../src/js/event/wait/wait-time";
import { DOMFader } from "../src/js/game/game-dom/dom-fader/dom-fader";
import { domStub } from "./stub/dom-stub";

export default {
  title: "dom-fader",
};

/** シーン表示 */
export const Scene = domStub(() => {
  const fader = new DOMFader();

  (async () => {
    await waitTime(5000);
    await fader.fadeIn();
    await waitTime(5000);
    await fader.fadeOut();
  })();

  return fader.getRootHTMLElement();
});
