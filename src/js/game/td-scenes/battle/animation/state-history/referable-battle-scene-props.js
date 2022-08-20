// @flow
import type {BGMManager} from "../../../../../bgm/bgm-manager";
import {BattleSceneSounds} from "../../sounds/sounds";
import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view";

/**
 * ステートアニメーションで利用する戦闘シーンプロパティ
 * 本データ型はステートアニメーション内でのみ利用する想定である
 */
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