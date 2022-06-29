// @flow
import type {GameState, GameStateX, InputCommand} from "gbraver-burst-core";
import {BattleSceneSounds} from "../sounds/sounds";
import type {BattleSceneState} from "../state/battle-scene-state";
import {BattleSceneView} from "../view";

/**
 * カスタムイベントプロパティ
 * @template X ステート効果
 */
type BattleCustomEventProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
  /** ゲームステート履歴 */
  gameStateHistory: GameState[]
};

/** 戦闘シーンカスタムイベント */
export interface BattleCustomEvent {
  /**
   * フェーズ開始前に実行される処理
   *
   * @param state フェーズのステート
   * @param props カスタムイベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  prePhase<X>(state: GameStateX<X>, props: BattleCustomEventProps<InputCommand>): Promise<void>;

  /**
   * フェーズ終了時に実行される処理
   *
   * @param state フェーズのステート
   * @param props カスタムイベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  postPhase<X>(state: GameStateX<X>, props: BattleCustomEventProps<InputCommand>): Promise<void>;
}