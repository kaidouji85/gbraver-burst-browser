import { Title } from "../src/js/dom-scenes/title";
import {
  GuestAccount,
  LoggedInAccount,
} from "../src/js/dom-scenes/title/title-account";
import { domStub } from "./stub/dom-stub";

export default {
  title: "title",
};

/** オンラインモード(ゲストアカウント) */
export const guestAccount = domStub((params) => {
  const account: GuestAccount = {
    type: "GuestAccount",
  };
  const scene = new Title({
    ...params,
    account,
    isLoginVisible: true,
    titleMenuMode: "ONLINE",
    isTitleHelpIconEnable: true,
    howToPlayURL: "how-to-play",
    characterDescriptionURL: "character-description",
    termsOfServiceURL: "terms-of-service",
    privacyPolicyURL: "privacy-policy",
    contactURL: "contact",
  });
  return scene.getRootHTMLElement();
});

/** オンラインモード(ログイン済みアカウント) */
export const loggedInAccount = domStub((params) => {
  const account: LoggedInAccount = {
    type: "LoggedInAccount",
    name: "test-account",
    pictureURL: "test-picture",
  };
  const scene = new Title({
    ...params,
    account,
    titleMenuMode: "ONLINE",
    isLoginVisible: true,
    isTitleHelpIconEnable: true,
    howToPlayURL: "how-to-play",
    characterDescriptionURL: "character-description",
    termsOfServiceURL: "terms-of-service",
    privacyPolicyURL: "privacy-policy",
    contactURL: "contact",
  });
  return scene.getRootHTMLElement();
});
