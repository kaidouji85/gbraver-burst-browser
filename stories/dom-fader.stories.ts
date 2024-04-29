import { StoryFn } from "@storybook/html";

import { DOMFader } from "../src/js/components/dom-fader/dom-fader";
import { waitTime } from "../src/js/wait/wait-time";
import { domStub } from "./stub/dom-stub";

export default {
  title: "dom-fader",
};

/** シーン表示 */
export const Scene: StoryFn = domStub(() => {
  const fader = new DOMFader();

  (async () => {
    await waitTime(5000);
    await fader.fadeIn();
    await waitTime(5000);
    await fader.fadeOut();
  })();

  return fader.getRootHTMLElement();
});
