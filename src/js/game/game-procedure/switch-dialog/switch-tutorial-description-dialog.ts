import { map } from "rxjs";

import { TutorialDescriptionDialog } from "../../../dom-dialogs/tutorial-description";
import { GameProps } from "../../game-props";

/**
 * チュートリアル説明ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog チュートリアル説明ダイアログ
 */
export const switchTutorialDescriptionDialog = (
  props: GameProps,
  dialog: TutorialDescriptionDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog.notifyStartTutorial().pipe(map(() => ({ type: "TutorialStart" }))),
    ]),
  );
