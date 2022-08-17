// @flow
import type {GameEnd, GameState} from "gbraver-burst-core";
import type {BGMManager} from "../../../bgm/bgm-manager";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Stream, StreamSource} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import type {BattleProgress} from "./battle-progress";
import type {CustomBattleEvent} from "./custom-battle-event";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {BattleSceneView} from "./view";

/** バトル終了情報 */
export type BattleEnd = {
  /** ゲーム終了情報 */
  gameEnd: GameEnd,
  /** アニメーションタイムスケール */
  animationTimeScale: number,
};

/** 戦闘シーンプロパティ */
export type BattleSceneProps = {
  /** 戦闘シーンステート */
  state: BattleSceneState,
  /** ゲームの初期ステートヒストリー */
  initialState: GameState[],
  /** バトル終了ストリーム */
  endBattle: StreamSource<BattleEnd>,
  /** バトル進行オブジェクト */
  battleProgress: BattleProgress,
  /** カスタムバトルイベント */
  customBattleEvent: ?CustomBattleEvent,
  /** 排他制御オブジェクト */
  exclusive: Exclusive,
  /** 戦闘シーンビュー */
  view: BattleSceneView,
  /** ウインドウ押下ストリーム */
  pushWindow: Stream<PushWindow>,
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds,
  /** BGM管理オブジェクト */
  bgm: BGMManager,
}