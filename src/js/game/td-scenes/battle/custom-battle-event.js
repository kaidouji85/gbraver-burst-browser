// @flow
import type {BatteryCommand, BurstCommand, GameState, PilotSkillCommand} from "gbraver-burst-core";
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

/** バーストコマンド選択イベントのプロパティ */
export type BurstCommandSelected = BattleSceneProps & {
  /** プレイヤーが選択したバーストコマンド */
  burst: BurstCommand,
}

/** パイロットスキル選択イベントのプロパティ */
export type PilotSkillCommandSelected = BattleSceneProps & {
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