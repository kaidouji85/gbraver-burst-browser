import { MailVerifiedIncomplete } from "../src/js/dom-scenes/mail-verified-incomplete/mail-verified-incomplete";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "mail-verified-incomplete",
};

export const scene: DOMStubStory = domStub(() => {
  const scene = new MailVerifiedIncomplete("test@mail.address.com");
  scene.notifyTitleTransition().subscribe(() => {
    console.log("goto title");
  });
  scene.notifyReload().subscribe(() => {
    console.log("reload");
  });
  return scene.getRootHTMLElement();
});
