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

/** LastState系イベントプロパティ */
export type LastStateProps = BattleSceneProps & {
  /** ステート履歴 */
  stateHistory: GameState[],
};

/** BatteryDecide系イベントプロパティ */
export type BatteryDecideProps = BattleSceneProps & {
  /** プレイヤーが選択したバッテリーコマンド */
  battery: BatteryCommand,
};

/** コマンドキャンセル情報 */
export type CommandCancel = {
  /** プレイヤーが決定したコマンドをキャンセルするか、trueでキャンセルする */
  isCommandCanceled: boolean
};

/** カスタムバトルイベント */
export interface CustomBattleEvent {
  /**
   * 最新のステート履歴が再生される直前の処理
   *
   * @param props カスタムイベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  willLastState(props: LastStateProps): Promise<void>;

  /**
   * バッテリー決定時の割込イベント
   *
   * @param props カスタムイベントプロパティ
   * @return コマンドキャンセル情報
   */
  didBatteryDecide(props: BatteryDecideProps): Promise<CommandCancel>;
}