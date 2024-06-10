import type {
  BatteryCommand,
  BurstCommand,
  GameState,
  PilotSkillCommand,
  PlayerId,
} from "gbraver-burst-core";
import { Observable } from "rxjs";

import { Animate } from "../../animation/animate";
import { SEPlayerContainer } from "../../se/se-player";
import type { PushWindow } from "../../window/push-window";
import { BattleSceneSounds } from "./sounds";
import { BattleSceneView } from "./view";

/**
 * 全カスタムイベントで利用できるプロパティ
 * BattleScenePropsからカスタムバトルイベントで利用可能なプロパティを抜粋した
 */
export type CustomBattleEventProps = SEPlayerContainer & {
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
export type StateUpdateStarted = CustomBattleEventProps &
  LastStateContainer & {
    /** コマンド入力から最終ステートまでのステート更新履歴 */
    readonly update: GameState[];
  };

/** カスタムステートアニメーションのプロパティ */
export type CustomStateAnimation = CustomBattleEventProps & {
  /** 再生するステート */
  readonly currentState: GameState;
};

/** 最終ステート系イベントのプロパティ */
export type LastState = CustomBattleEventProps &
  LastStateContainer & {
    /** コマンド入力から最終ステートまでのステート更新履歴 */
    readonly update: GameState[];
  };

/** バッテリーコマンド選択イベントのプロパティ */
export type BatteryCommandSelected = CustomBattleEventProps &
  LastStateContainer & {
    /** プレイヤーが選択したバッテリーコマンド */
    readonly battery: BatteryCommand;
  };

/** バーストコマンド選択イベントのプロパティ */
export type BurstCommandSelected = CustomBattleEventProps &
  LastStateContainer & {
    /** プレイヤーが選択したバーストコマンド */
    readonly burst: BurstCommand;
  };

/** パイロットスキル選択イベントのプロパティ */
export type PilotSkillCommandSelected = CustomBattleEventProps &
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
  onStateUpdateStarted(props: StateUpdateStarted): void;

  /**
   * カスタムステートアニメーション
   * 最終ステート以外のステートアニメーション再生時に、本メソッドが呼び出さる
   * 戻り値のアニメーションが完了するまで、次のステートアニメーションは再生されない
   * @param props イベントプロパティ
   * @returns カスタムステートアニメーション
   */
  onStateAnimation(props: CustomStateAnimation): Animate;

  /**
   * ステートアニメ終了後に呼ばれる、カスタムステートアニメーション
   * 最終ステート以外のステートアニメーション再生後に、本メソッドが呼び出さる
   * 戻り値のアニメーションが完了しなくても、次のステートアニメーションは再生される
   * @param props イベントプロパティ
   * @returns カスタムステートアニメーション
   */
  afterStateAnimation(props: CustomStateAnimation): Animate;

  /**
   * 最終ステート直前イベント
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  beforeLastState(props: LastState): Promise<void>;

  /**
   * 最終ステートイベント
   * 本イベントは最終ステート再生と同時に行われる
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  onLastState(props: LastState): Promise<void>;

  /**
   * 最終ステート完了後イベント
   * @param props イベントプロパティ
   * @returns 処理が完了したら発火するPromise
   */
  afterLastState(props: LastState): Promise<void>;

  /**
   * バッテリーコマンド選択イベント
   * @param props イベントプロパティ
   * @returns コマンドキャンセル情報
   */
  onBatteryCommandSelected(
    props: BatteryCommandSelected,
  ): Promise<CommandCanceled>;

  /**
   * バーストコマンド選択イベント
   * @param props イベントプロパティ
   * @returns コマンドキャンセル情報
   */
  onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled>;

  /**
   * パイロットスキルコマンド選択イベント
   * @param props イベントプロパティ
   * @returns コマンドキャンセル情報
   */
  onPilotSkillCommandSelected(
    props: PilotSkillCommandSelected,
  ): Promise<CommandCanceled>;
}
