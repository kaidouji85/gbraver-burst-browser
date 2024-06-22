import { map } from "rxjs";

import { NetBattleSelectorDialog } from "../../../dom-dialogs/net-battle-selector";
import { GameProps } from "../../game-props";

/**
 * ネットバトルセレクターダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog ネットバトルセレクターダイアログ
 */
export const switchNetBattleSelectorDialog = (
  props: GameProps,
  dialog: NetBattleSelectorDialog,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog
        .notifyCasualMatchSelection()
        .pipe(map(() => ({ type: "CasualMatchStart" }))),
      dialog
        .notifyPrivateMatchHostSelection()
        .pipe(map(() => ({ type: "PrivateMatchHostStart" }))),
      dialog
        .notifyPrivateMatchGuestSelection()
        .pipe(map(() => ({ type: "PrivateMatchGuestStart" }))),
      dialog.notifyClosed().pipe(map(() => ({ type: "NetBattleCancel" }))),
    ]),
  );
