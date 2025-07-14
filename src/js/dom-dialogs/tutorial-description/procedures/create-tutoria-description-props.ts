import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ROOT } from "../dom/class-name";
import {
  extractCloseButton,
  extractCloser,
  extractStartTutorial,
} from "../dom/elements";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { TutorialDescriptionDialogProps } from "../props";

/** プロパティ生成オプション */
export type TutorialDescriptionDialogPropsOptions = RootInnerHTMLOptions;

/**
 * チュートリアル説明ダイアログのプロパティを生成する
 * @returns チュートリアル説明ダイアログのプロパティ
 */
export const createTutorialDescriptionProps = (
  options: TutorialDescriptionDialogPropsOptions,
): TutorialDescriptionDialogProps => {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(options);

  const closer = extractCloser(root);
  const startTutorial = extractStartTutorial(root);
  const close = extractCloseButton(root);

  const exclusive = new Exclusive();

  const closeNotifier = new Subject<void>();
  return { root, closer, startTutorial, close, exclusive, closeNotifier };
};
