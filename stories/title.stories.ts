import { Title } from "../src/js/dom-scenes/title";
import {
  GuestAccount,
  LoggedInAccount,
} from "../src/js/dom-scenes/title/title-account";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "title",
};

export const guestAccount: DOMStubStory = domStub((resources, se) => {
  const account: GuestAccount = {
    type: "GuestAccount",
  };
  const scene = new Title({
    resources,
    se,
    account,
    isAPIServerEnable: true,
    howToPlayURL: "how-to-play",
    termsOfServiceURL: "terms-of-service",
    privacyPolicyURL: "privacy-policy",
    contactURL: "contact",
  });
  return scene.getRootHTMLElement();
});

export const loggedInAccount: DOMStubStory = domStub((resources, se) => {
  const account: LoggedInAccount = {
    type: "LoggedInAccount",
    name: "test-account",
    pictureURL: "test-picture",
  };
  const scene = new Title({
    resources,
    se,
    account,
    isAPIServerEnable: true,
    howToPlayURL: "how-to-play",
    termsOfServiceURL: "terms-of-service",
    privacyPolicyURL: "privacy-policy",
    contactURL: "contact",
  });
  return scene.getRootHTMLElement();
});
