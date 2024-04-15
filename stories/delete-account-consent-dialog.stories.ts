import { DeleteAccountConsentDialog } from "../src/js/dom-dialogs/delete-account-consent";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "delete-account-consent-dialog",
};

export const dialog: DOMStubStory = domStub((params) => {
  const deleteAccountConsentDialog = new DeleteAccountConsentDialog(params);
  deleteAccountConsentDialog.notifyAccountDeletion().subscribe(() => {
    console.log("delete account");
  });
  deleteAccountConsentDialog.notifyClosed().subscribe(() => {
    console.log("close dialog");
  });
  return deleteAccountConsentDialog.getRootHTMLElement();
});
