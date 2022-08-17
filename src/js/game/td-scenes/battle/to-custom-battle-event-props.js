// @flow
import type {BattleSceneProps} from "./battle-scene-props";
import type {CustomBattleEventProps} from "./custom-battle-event";

/**
 * 戦闘シーンプロパティをカスタムバトルプロパティに変換するヘルパー関数
 * 
 * @param origin 変換元となる戦闘シーンプロパティ
 * @return カスタムバトルイベントプロパティ
 */
export function toCustomBattleEventProps(origin: $ReadOnly<BattleSceneProps>): CustomBattleEventProps {
  return {view: origin.view, pushWindow: origin.pushWindow, sounds: origin.sounds, sceneState: origin.state};
}