import { ConfigChangeCancel } from "../../game-actions/config-change-cancel";
import { GameProps } from "../../game-props";
import { applyBattleWindowFontSize } from "../apply-battle-window-font-size";
import { applySoundVolume } from "../apply-sound-volume";
import { startTitle } from "../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: ConfigChangeCancel;
};

/**
 * 設定変更キャンセル時の処理
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onConfigChangeCancel(options: Options): Promise<void> {
  const { props } = options;
  await props.fader.fadeOut();
  const config = await props.config.load();
  applyBattleWindowFontSize(config.battleWindowFontSize);
  await applySoundVolume(props, config);
  await startTitle(props);
  await props.fader.fadeIn();
}
