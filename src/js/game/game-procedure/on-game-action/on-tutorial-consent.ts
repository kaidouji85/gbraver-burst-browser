import { TutorialDescriptionDialog } from "../../../dom-dialogs/tutorial-description";
import { TutorialConsent } from "../../game-actions/tutorial-consent";
import { GameProps } from "../../game-props";
import { switchTutorialDescriptionDialog } from "../switch-dialog/switch-tutorial-description-dialog";

/**
 * チュートリアル開始前の同意
 * @param options オプション
 */
export function onTutorialConsent(options: {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: TutorialConsent;
}) {
  const { props } = options;
  const dialog = new TutorialDescriptionDialog(props);
  switchTutorialDescriptionDialog(props, dialog);
}
