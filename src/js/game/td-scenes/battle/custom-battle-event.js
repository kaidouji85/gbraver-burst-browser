// @flow
import type {BatteryCommand, GameState} from "gbraver-burst-core";
import type {Stream} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {BattleSceneView} from "./view";

/** カスタムイベントで利用できる戦闘シーンのプロパティ */
export type BattleSceneProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** window押下ストリーム */
  pushWindow: Stream<PushWindow>,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
};

/** 最終ステート系イベントのプロパティ */
export type LastState = BattleSceneProps & {
  /** ステート履歴 */
  stateHistory: GameState[],
};

/** バッテリーコマンド選択イベントのプロパティ */
export type BatteryCommandSelected = BattleSceneProps & {
  /** プレイヤーが選択したバッテリーコマンド */
  battery: BatteryCommand,
};

/** コマンドキャンセル情報 */
export type CommandCanceled = {
  /** プレイヤーが決定したコマンドをキャンセルするか、trueでキャンセルする */
  isCommandCanceled: boolean
};

/** カスタムバトルイベント */
export interface CustomBattleEvent {
  /**
   * 最終ステート直前イベント
   *
   * @param props ベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  beforeLastState(props: LastState): Promise<void>;

  /**
   * バッテリーコマンド選択イベント
   *
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled>;
}