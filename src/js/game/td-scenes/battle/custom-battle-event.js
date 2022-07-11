// @flow
import type {BatteryCommand, GameState} from "gbraver-burst-core";
import type {Stream} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {BattleSceneView} from "./view";

/** 戦闘シーンからカスタムイベントに常に渡されるプロパティ */
export type RequiredBattleSceneProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** window押下ストリーム */
  pushWindow: Stream<PushWindow>,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** 戦闘シーンステート */
  sceneState: BattleSceneState,
}

/** カスタムイベントプロパティ */
export type CustomBattleEventProps = RequiredBattleSceneProps & {
  /** ゲームステート履歴 */
  stateHistory: GameState[],
};

/** バッテリー決定割込イベント終了情報 */
export type BatteryDecideEvent = {
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
  willLastState(props: CustomBattleEventProps): Promise<void>;

  /**
   * バッテリー決定時の割込イベント
   * 本メソッドを定義しなかった場合、割込イベントは実行されない
   *
   * @param props 戦闘シーンプロパティ
   * @param battery プレイヤーが選択したバッテリーコマンド
   * @return 割込イベント終了情報
   */
  didBatteryDecide(props: RequiredBattleSceneProps, battery: BatteryCommand): Promise<BatteryDecideEvent>;
}