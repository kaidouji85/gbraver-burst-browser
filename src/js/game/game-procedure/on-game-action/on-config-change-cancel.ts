import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { applyBattleWindowFontSize } from "../apply-battle-window-font-size";
import { applySoundVolume } from "../apply-sound-volume";
import { startTitle } from "../start-title";

/**
 * 設定変更キャンセル時の処理
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onConfigChangeCancel(props: Readonly<GameProps>): Promise<void> {
  await props.fader.fadeOut();
  const config = await props.config.load();
  applyBattleWindowFontSize(config.battleWindowFontSize);
  await applySoundVolume(props, config);
  await startTitle(props);
  await props.fader.fadeIn();
}

/** アクションタイプ */
const actionType = "ConfigChangeCancel";

/** 設定変更キャンセル時のイベントリスナーコンテナ */
export const configChangeCancelContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onConfigChangeCancel(props);
    }
  },
};
