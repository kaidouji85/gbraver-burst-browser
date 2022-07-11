// @flow
import type {BatteryCommand, GameState} from "gbraver-burst-core";
import type {Stream} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {BattleSceneView} from "./view";

/** 全カスタムイベント共通のプロパティ */
export type CustomBattleEventProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** window押下ストリーム */
  pushWindow: Stream<PushWindow>,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
};

/** willLastStateのカスタムイベントプロパティ */
export type WillLastStateProps = CustomBattleEventProps & {
  /** ステート履歴 */
  stateHistory: GameState[],
};

/** didBatteryDecideのカスタムイベントプロパティ */
export type DidBatteryDecideProps = CustomBattleEventProps & {
  /** プレイヤーが選択したバッテリーコマンド */
  battery: BatteryCommand,
};

/** バッテリー決定割込イベント終了情報 */
export type DidBatteryDecideEnd = {
  /** プレイヤーが決定したコマンドをキャンセルするか、trueでキャンセルする */
  isBatteryCanceled: boolean
};

/** カスタムバトルイベント */
export interface CustomBattleEvent {
  /**
   * 最新のステート履歴が再生される直前の処理
   *
   * @param props カスタムイベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  willLastState(props: WillLastStateProps): Promise<void>;

  /**
   * バッテリー決定時の割込イベント
   *
   * @param props カスタムイベントプロパティ
   * @return 割込イベント終了情報
   */
  didBatteryDecide(props: DidBatteryDecideProps): Promise<DidBatteryDecideEnd>;
}