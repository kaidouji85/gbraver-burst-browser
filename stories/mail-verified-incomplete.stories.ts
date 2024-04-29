import { StoryFn } from "@storybook/html";

import { MailVerifiedIncomplete } from "../src/js/dom-scenes/mail-verified-incomplete";
import { domStub } from "./stub/dom-stub";

export default {
  title: "mail-verified-incomplete",
};

/** シーン表示 */
export const scene: StoryFn = domStub(() => {
  const scene = new MailVerifiedIncomplete("test@mail.address.com");
  scene.notifyTitleTransition().subscribe(() => {
    console.log("goto title");
  });
  scene.notifyReload().subscribe(() => {
    console.log("reload");
  });
  return scene.getRootHTMLElement();
});
