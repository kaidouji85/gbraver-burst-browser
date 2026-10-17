import { waitTime } from "../src/js/event/wait/wait-time";
import { EasterEgg } from "../src/js/game/game-dom/easter-egg";
import { domStub } from "./stub/dom-stub";

export default {
  title: "easter-egg",
};

/** イースターエッグ */
export const easterEgg = domStub((options) => {
  const easterEgg = new EasterEgg(options);

  (async () => {
    await waitTime(2000);
    await easterEgg.show();
    await waitTime(2000);
    await easterEgg.hidden();
  })();

  return easterEgg.getRootHTMLElement();
});
