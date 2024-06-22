import { map } from "rxjs";

import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { GameProps } from "../../game-props";

/**
 * 通信エラーダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog 通信エラーダイアログ
 */
export const switchNetworkErrorDialog = (
  props: GameProps,
  dialog: NetworkErrorDialog,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog.notifyPostNetworkError().pipe(
        map((postNetworkError) => ({
          type: "EndNetworkError",
          postNetworkError,
        })),
      ),
    ]),
  );
