import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { GameActionListener } from "./game-action-listener";

/**
 * 画面リロード依頼時の処理
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onReloadRequest(props: Readonly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  window.location.reload();
}

/** アクションタイプ */
const actionType = "ReloadRequest";

/** 画面リロード依頼時のリスナーコンテナ */
export const reloadRequestContainer: { [key: string]: GameActionListener } = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onReloadRequest(props);
    }
  },
};
