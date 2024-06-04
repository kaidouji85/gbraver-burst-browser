import { map } from "rxjs";

import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * 通信エラーダイアログのアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const networkErrorDialogConnector =
  (
    props: GameActionManageContainer,
  ): DomDialogActionConnector<NetworkErrorDialog> =>
  (dialog) =>
    props.gameAction.connect([
      dialog.notifyPostNetworkError().pipe(
        map((postNetworkError) => ({
          type: "EndNetworkError",
          postNetworkError,
        })),
      ),
    ]);
