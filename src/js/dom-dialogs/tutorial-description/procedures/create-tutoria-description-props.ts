import { ROOT } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { TutorialDescriptionDialogProps } from "../props";

/**
 * チュートリアル説明ダイアログのプロパティを生成する
 * @returns チュートリアル説明ダイアログのプロパティ
 */
export const createTutorialDescriptionProps =
  (): TutorialDescriptionDialogProps => {
    const root = document.createElement("div");
    root.className = ROOT;
    root.innerHTML = rootInnerHTML();
    return { root };
  };
