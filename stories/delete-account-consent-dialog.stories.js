// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {DeleteAccountConsentDialog} from "../src/js/game/dom-dialogs/delete-account-consent/delete-account-consent-dialog";

export default {
  title: 'delete-account-consent-dialog'
};

export const dialog: DOMStubStory = domStub(resources => {
  const deleteAccountConsentDialog = new DeleteAccountConsentDialog();
  return deleteAccountConsentDialog.getRootHTMLElement();
});
