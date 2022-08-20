// @flow
import type {BGMManager} from "../../../../../bgm/bgm-manager";
import type {BattleSceneProps} from "../../battle-scene-props";
import {BattleSceneSounds} from "../../sounds/sounds";
import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view";

/** ステートアニメーションで参照可能な戦闘シーンプロパティ */
export type ReferableBattleSceneProps = {
  /** 戦闘シーンビュー */
  +view: BattleSceneView,
  /** 戦闘シーン音素材 */
  +sounds: BattleSceneSounds,
  /** BGM管理オブジェクト */
  +bgm: BGMManager,
  /** 戦闘シーンステート */
  +state: BattleSceneState,
};

/**
 * 戦闘シーンプロパティをステートアニメーション用プロパティに変換する
 *
 * @param origin 変換元
 * @return 変換結果
 */
export function toReferableBattleSceneProps(origin: BattleSceneProps): ReferableBattleSceneProps {
  return {view: origin.view, sounds: origin.sounds, bgm: origin.bgm, state: origin.state};
}