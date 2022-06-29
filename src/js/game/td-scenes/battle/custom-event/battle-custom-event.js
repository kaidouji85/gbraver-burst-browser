// @flow
import {GameStateX, InputCommand} from "gbraver-burst-core";
import {BattleSceneSounds} from "../sounds/sounds";
import type {BattleSceneState} from "../state/battle-scene-state";
import {BattleSceneView} from "../view";

/**
 * カスタムイベントプロパティ
 * @template X ステート効果
 */
type BattleCustomEventProps<X> = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
  /** ゲームステート */
  gameState: GameStateX<X>
};

/** 戦闘シーンカスタムイベント */
export interface BattleCustomEvent {
  /**
   * コマンド入力フェーズに入る前
   *
   * @param props カスタムイベントプロパティ
   */
  preInputCommand(props: BattleCustomEventProps<InputCommand>): Promise<void>;
}