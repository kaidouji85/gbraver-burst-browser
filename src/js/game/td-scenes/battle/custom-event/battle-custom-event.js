// @flow
import type {GameState} from "gbraver-burst-core";
import {BattleSceneSounds} from "../sounds/sounds";
import type {BattleSceneState} from "../state/battle-scene-state";
import {BattleSceneView} from "../view";

/** カスタムイベントプロパティ */
type BattleCustomEventProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
  /** ゲームステート履歴 */
  stateHistory: GameState[]
};

/** 戦闘シーンカスタムイベント */
export interface BattleCustomEvent {
  /**
   * 最新のステート履歴が再生される直前の処理
   *
   * @param props カスタムイベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  willLastState(props: BattleCustomEventProps): Promise<void>;
}