import { ROOT } from "../dom/class-name";
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
  return { root };
};
