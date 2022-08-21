// @flow
import type {PlayerId} from "gbraver-burst-core";
import type {BGMManager} from "../../../../../bgm/bgm-manager";
import {BattleSceneSounds} from "../../sounds/sounds";
import {BattleSceneView} from "../../view";

/**
 * ステートアニメーションで利用する戦闘シーンプロパティ
 * 本データ型はステートアニメーション内でのみ利用する想定である
 */
export type StateAnimationProps = {
  /** 画面を開いているプレイヤーのID */
  +playerId: PlayerId,
  /** アニメーションタイムスケール */
  +animationTimeScale: number,
  /** 戦闘シーンビュー */
  +view: BattleSceneView,
  /** 戦闘シーン音素材 */
  +sounds: BattleSceneSounds,
  /** BGM管理オブジェクト */
  +bgm: BGMManager,
};