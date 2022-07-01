// @flow
import type {GameState} from "gbraver-burst-core";
import type {BattleSceneStreams} from "./battle-scene-streams";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {BattleSceneView} from "./view";

/** カスタムイベントプロパティ */
export type CustomBattleEventProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンストリーム */
  streams: BattleSceneStreams,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
  /** ゲームステート履歴 */
  stateHistory: GameState[]
};

/** カスタムバトルイベント */
export interface CustomBattleEvent {
  /**
   * 最新のステート履歴が再生される直前の処理
   *
   * @param props カスタムイベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  willLastState(props: CustomBattleEventProps): Promise<void>;
}