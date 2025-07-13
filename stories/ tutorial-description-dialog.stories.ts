import { TutorialDescriptionDialog } from "../src/js/dom-dialogs/tutorial-description";
import { domStub } from "./stub/dom-stub";

export default {
  title: "tutorial-description-dialog",
};

/** 通常表示 */
export const dialog = domStub((options) => {
  const dialog = new TutorialDescriptionDialog(options);
  return dialog.getRootHTMLElement();
});
