import type { ToggleTimeScale } from "../../actions/toggle-time-scale";
import type { BattleSceneProps } from "../../props";

/**
 * タイムスケール変更時の処理
 * 本関数には戦闘シーンステートを変更する副作用がある
 *
 * @param props 戦闘シーンプロパティ
 * @param action タイムスケール変更アクション
 */
export function onToggleTimeScale(
  props: BattleSceneProps,
  action: ToggleTimeScale,
): void {
  props.animatePlayer.timeScale = action.timeScale;
}
