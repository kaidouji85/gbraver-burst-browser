import type {
  BatteryCommand,
  BurstCommand,
  GameState,
  PilotSkillCommand,
} from "gbraver-burst-core";

import { Animate } from "../../animation/animate";
import { BattleSceneProps } from "./battle-scene-props";

/**
 * 全カスタムイベントで利用できるプロパティ
 * BattleScenePropsからカスタムバトルイベントで利用可能なプロパティを抜粋した
 */
export type CustomBattleEventProps = Readonly<
  Pick<
    BattleSceneProps,
    "se" | "playerId" | "view" | "pushWindow" | "sounds" | "stateHistory"
  >
>;

/** ステート更新開始イベントのプロパティ */
export type StateUpdateStarted = CustomBattleEventProps & {
  /** コマンド入力から最終ステートまでのステート更新履歴 */
  update: GameState[];
};

/** カスタムステートアニメーションのプロパティ */
export type CustomStateAnimation = CustomBattleEventProps & {
  /** 再生するステート */
  readonly currentState: GameState;
};

/** 最終ステート系イベントのプロパティ */
export type LastState = CustomBattleEventProps & {
  /** コマンド入力から最終ステートまでのステート更新履歴 */
  update: GameState[];
};

/** バッテリーコマンド選択イベントのプロパティ */
export type BatteryCommandSelected = CustomBattleEventProps & {
  /** プレイヤーが選択したバッテリーコマンド */
  battery: BatteryCommand;
};

/** バーストコマンド選択イベントのプロパティ */
export type BurstCommandSelected = CustomBattleEventProps & {
  /** プレイヤーが選択したバーストコマンド */
  burst: BurstCommand;
};

/** パイロットスキル選択イベントのプロパティ */
export type PilotSkillCommandSelected = CustomBattleEventProps & {
  /** プレイヤーが選択したパイロットスキルコマンド */
  pilot: PilotSkillCommand;
};

/** コマンドキャンセル情報 */
export type CommandCanceled = {
  /** プレイヤーが決定したコマンドをキャンセルするか、trueでキャンセルする */
  isCommandCanceled: boolean;
};

/** カスタムバトルイベント */
export interface CustomBattleEvent {
  /**
   * ステート更新が開始された時に呼ばれるイベント
   * @param props イベントプロパティ
   */
  onStateUpdateStarted(props: StateUpdateStarted): void;

  /**
   * カスタムステートアニメーション
   * 最終ステート以外のステートアニメーション再生時に、本メソッドが呼び出さる
   * 戻り値のアニメーションが完了するまで、次のステートアニメーションは再生されない
   * @param props イベントプロパティ
   * @return カスタムステートアニメーション
   */
  onStateAnimation(props: CustomStateAnimation): Animate;

  /**
   * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
   * 最終ステート以外のステートアニメーション再生後に、本メソッドが呼び出さる
   * 戻り値のアニメーションが完了しなくても、次のステートアニメーションは再生される
   * @param props イベントプロパティ
   * @return カスタムステートアニメーション
   */
  afterStateAnimation(props: CustomStateAnimation): Animate;

  /**
   * 最終ステート直前イベント
   * @param props イベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  beforeLastState(props: LastState): Promise<void>;

  /**
   * 最終ステートイベント
   * 本イベントは最終ステート再生と同時に行われる
   * @param props イベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  onLastState(props: LastState): Promise<void>;

  /**
   * 最終ステート完了後イベント
   * @param props イベントプロパティ
   * @return 処理が完了したら発火するPromise
   */
  afterLastState(props: LastState): Promise<void>;

  /**
   * バッテリーコマンド選択イベント
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onBatteryCommandSelected(
    props: BatteryCommandSelected,
  ): Promise<CommandCanceled>;

  /**
   * バーストコマンド選択イベント
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled>;

  /**
   * パイロットスキルコマンド選択イベント
   * @param props イベントプロパティ
   * @return コマンドキャンセル情報
   */
  onPilotSkillCommandSelected(
    props: PilotSkillCommandSelected,
  ): Promise<CommandCanceled>;
}
