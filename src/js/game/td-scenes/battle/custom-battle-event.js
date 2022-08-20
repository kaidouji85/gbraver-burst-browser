// @flow
import type {BatteryCommand, BurstCommand, GameState, PilotSkillCommand} from "gbraver-burst-core";
import type {Stream} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import {BattleSceneSounds} from "./sounds/sounds";
import {BattleSceneView} from "./view";

/** 全カスタムイベントで利用できるプロパティ */
export type CustomBattleEventProps = {
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** window押下ストリーム */
  pushWindow: Stream<PushWindow>,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
};

/** 最終ステート系イベントのプロパティ */
export type LastState = CustomBattleEventProps & {
  /** コマンド入力から最終ステートまでのステート更新履歴 */
  update: GameState[],
};

/** バッテリーコマンド選択イベントのプロパティ */
export type BatteryCommandSelected = CustomBattleEventProps & {
  /** プレイヤーが選択したバッテリーコマンド */
  battery: BatteryCommand,
};

/** バーストコマンド選択イベントのプロパティ */
export type BurstCommandSelected = CustomBattleEventProps & {
  /** プレイヤーが選択したバーストコマンド */
  burst: BurstCommand,
}

/** パイロットスキル選択イベントのプロパティ */
export type PilotSkillCommandSelected = CustomBattleEventProps & {
  /** プレイヤーが選択したパイロットスキルコマンド */
  pilot: PilotSkillCommand,
}

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
   * @param props イベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  beforeLastState(props: LastState): Promise<void>;

  /**
   * 最終ステートイベント
   * 本イベントは最終ステート再生と同時に行われる
   *
   * @param props イベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  onLastState(props: LastState): Promise<void>;

  /**
   * 最終ステート完了後イベント
   *
   * @param props イベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  afterLastState(props: LastState): Promise<void>;

  /**
   * バッテリーコマンド選択イベント
   *
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled>;

  /**
   * バーストコマンド選択イベント
   *
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled>;

  /**
   * パイロットスキルコマンド選択イベント
   *
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onPilotSkillCommandSelected(props: PilotSkillCommandSelected): Promise<CommandCanceled>;
}