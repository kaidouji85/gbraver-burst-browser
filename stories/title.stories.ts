import { StoryFn } from "@storybook/html";

import { Title } from "../src/js/dom-scenes/title";
import {
  GuestAccount,
  LoggedInAccount,
} from "../src/js/dom-scenes/title/title-account";
import { domStub } from "./stub/dom-stub";

export default {
  title: "title",
};

export const guestAccount: StoryFn = domStub((params) => {
  const account: GuestAccount = {
    type: "GuestAccount",
  };
  const scene = new Title({
    ...params,
    account,
    isAPIServerEnable: true,
    howToPlayURL: "how-to-play",
    characterDescriptionURL: "character-description",
    termsOfServiceURL: "terms-of-service",
    privacyPolicyURL: "privacy-policy",
    contactURL: "contact",
  });
  return scene.getRootHTMLElement();
});

export const loggedInAccount: StoryFn = domStub((params) => {
  const account: LoggedInAccount = {
    type: "LoggedInAccount",
    name: "test-account",
    pictureURL: "test-picture",
  };
  const scene = new Title({
    ...params,
    account,
    isAPIServerEnable: true,
    howToPlayURL: "how-to-play",
    characterDescriptionURL: "character-description",
    termsOfServiceURL: "terms-of-service",
    privacyPolicyURL: "privacy-policy",
    contactURL: "contact",
  });
  return scene.getRootHTMLElement();
});
