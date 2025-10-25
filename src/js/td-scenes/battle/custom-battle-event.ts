import {
  BatteryCommand,
  BurstCommand,
  GameState,
  PilotSkillCommand,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";
import { Observable } from "rxjs";

import { AbortManagerContainer } from "../../abort-controller/abort-manager-container";
import { Animate } from "../../animation/animate";
import { SEPlayerContainer } from "../../se/se-player";
import { PushWindow } from "../../window/push-window";
import { AnimationTimeScaleContainer } from "./animation-time-scale-container";
import { BattleSceneSounds } from "./sounds";
import { BattleSceneView } from "./view";

/**
 * 全カスタムイベントで利用できるプロパティ
 * BattleScenePropsからカスタムバトルイベントで利用可能なプロパティを抜粋した
 */
export type CustomBattleEventProps = Readonly<SEPlayerContainer> &
  Readonly<AnimationTimeScaleContainer> &
  Readonly<AbortManagerContainer> & {
    /** リトライした戦闘かどうか、trueでリトライした */
    readonly isRetry: boolean;
    /** 戦闘画面を開いているプレイヤーのID */
    readonly playerId: PlayerId;
    /** 敵プレイヤーのID */
    readonly enemyId: PlayerId;
    /** 戦闘シーンビュー */
    readonly view: BattleSceneView;
    /** window押下ストリーム */
    readonly pushWindow: Observable<PushWindow>;
    /** 戦闘シーン効果音 */
    readonly sounds: BattleSceneSounds;
    /** ステートヒストリー */
    readonly stateHistory: GameState[];
  };

/** 最終ステートコンテナ */
export type LastStateContainer = {
  /** 最終ステート */
  readonly lastState: GameState;
};

/** ステート更新開始イベントのプロパティ */
export type StateUpdateStartedEventProps = CustomBattleEventProps &
  LastStateContainer & {
    /** コマンド入力から最終ステートまでのステート更新履歴 */
    readonly update: GameState[];
  };

/** カスタムステートアニメーションのプロパティ */
export type CustomStateAnimationProps = CustomBattleEventProps & {
  /** 再生するステート */
  readonly currentState: GameState;
  /** コマンド入力から最終ステートまでの更新履歴 */
  readonly update: GameState[];
  /** コマンド入力から現在のステートまでの更新履歴 */
  readonly updateUntilNow: GameState[];
  /** 現在のステートまでの更新履歴 */
  readonly stateHistoryUntilNow: GameState[];

  /** メインターン数 */
  readonly mainTurnCount: number;
  /**連続行動中のターンかどうか、trueで連続行動中のターン */
  readonly isContinuousActive: boolean;

  /** プレイヤーのステート */
  readonly player: PlayerState;
  /** プレイヤーのメインターン数 */
  readonly playerMainTurnCount: number;

  /** 敵のステート */
  readonly enemy: PlayerState;
  /** 敵のメインターン数 */
  readonly enemyMainTurnCount: number;
};

/** 最終ステート系イベントのプロパティ */
export type LastStateEventProps = CustomBattleEventProps &
  LastStateContainer & {
    /** メインターン数 */
    readonly mainTurnCount: number;

    /** プレイヤーのステート */
    readonly player: PlayerState;
    /** プレイヤーのメインターン数 */
    readonly playerMainTurnCount: number;

    /** 敵のステート */
    readonly enemy: PlayerState;
    /** 敵のメインターン数 */
    readonly enemyMainTurnCount: number;

    /** コマンド入力から最終ステートまでのステート更新履歴 */
    readonly update: GameState[];
  };

/** バッテリーコマンド選択イベントのプロパティ */
export type BatteryCommandSelectedEventProps = CustomBattleEventProps &
  LastStateContainer & {
    /** プレイヤーが選択したバッテリーコマンド */
    readonly battery: BatteryCommand;

    /** メインターン数 */
    readonly mainTurnCount: number;

    /** プレイヤーのステート */
    readonly player: PlayerState;
    /** プレイヤーのメインターン数 */
    readonly playerMainTurnCount: number;

    /** 敵のステート */
    readonly enemy: PlayerState;
    /** 敵のメインターン数 */
    readonly enemyMainTurnCount: number;
  };

/** バーストコマンド選択イベントのプロパティ */
export type BurstSelectedEventProps = CustomBattleEventProps &
  LastStateContainer & {
    /** プレイヤーが選択したバーストコマンド */
    readonly burst: BurstCommand;
  };

/** パイロットスキル選択イベントのプロパティ */
export type PilotSkillSelectedEventProps = CustomBattleEventProps &
  LastStateContainer & {
    /** プレイヤーが選択したパイロットスキルコマンド */
    readonly pilot: PilotSkillCommand;
  };

/** コマンドキャンセル情報 */
export type CommandCanceled = {
  /** プレイヤーが決定したコマンドをキャンセルするか、trueでキャンセルする */
  readonly isCommandCanceled: boolean;
};

/** カスタムバトルイベント */
export interface CustomBattleEvent {
  /**
   * ステート更新が開始された時に呼ばれるイベント
   * @param props イベントプロパティ
   */
  onStateUpdateStarted(props: StateUpdateStartedEventProps): void;

  /**
   * カスタムステートアニメーション
   * 最終ステート以外のステートアニメーション再生時に、本メソッドが呼び出さる
   * 戻り値のアニメーションが完了するまで、次のステートアニメーションは再生されない
   * @param props イベントプロパティ
   * @returns カスタムステートアニメーション
   */
  onStateAnimation(props: CustomStateAnimationProps): Animate;

  /**
   * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
   * 最終ステート以外のステートアニメーション再生後に、本メソッドが呼び出さる
   * 戻り値のアニメーションが完了しなくても、次のステートアニメーションは再生される
   * @param props イベントプロパティ
   * @returns カスタムステートアニメーション
   */
  afterStateAnimation(props: CustomStateAnimationProps): Animate;

  /**
   * 最終ステート直前イベント
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  beforeLastState(props: LastStateEventProps): Promise<void>;

  /**
   * 最終ステートイベント
   * 本イベントは最終ステート再生と同時に行われる
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  onLastState(props: LastStateEventProps): Promise<void>;

  /**
   * 最終ステート完了後イベント
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  afterLastState(props: LastStateEventProps): Promise<void>;

  /**
   * バッテリーコマンド選択イベント
   * @param props イベントプロパティ
   * @returns コマンドキャンセル情報
   */
  onBatteryCommandSelected(
    props: BatteryCommandSelectedEventProps,
  ): Promise<CommandCanceled>;

  /**
   * バーストコマンド選択イベント
   * @param props イベントプロパティ
   * @returns コマンドキャンセル情報
   */
  onBurstCommandSelected(
    props: BurstSelectedEventProps,
  ): Promise<CommandCanceled>;

  /**
   * パイロットスキルコマンド選択イベント
   * @param props イベントプロパティ
   * @returns コマンドキャンセル情報
   */
  onPilotSkillCommandSelected(
    props: PilotSkillSelectedEventProps,
  ): Promise<CommandCanceled>;

  /**
   * バトルシミュレーターが選択された
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  onBattleSimulatorSelected(props: CustomBattleEventProps): Promise<void>;
}
