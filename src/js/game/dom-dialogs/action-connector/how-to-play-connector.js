// @flow

import { HowToPlay } from "../how-to-play/how-to-play-dialog";
import type { DomDialogActionConnector } from "./dom-dialog-action-connector";

/** コネクターのデータ型 */
type Connector = DomDialogActionConnector<HowToPlay>;

/** 遊び方ダイアログとゲームアクションを関連付ける */
export const howToPlayConnector: Connector = (dialog, gameAction) => [
  dialog.closeNotifier().subscribe(() => {
    gameAction.next({ type: "EndHowToPlay" });
  }),
];
