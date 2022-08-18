// @flow
import type {GameEnd, GameState, Player} from "gbraver-burst-core";
import type {BGMManager} from "../../../bgm/bgm-manager";
import {Exclusive} from "../../../exclusive/exclusive";
import type {GameLoop} from "../../../game-loop/game-loop";
import type {OverlapNotifier} from "../../../render/overlap-notifier";
import type {RendererDomGetter} from "../../../render/renderer-dom-getter";
import type {Rendering} from "../../../render/rendering";
import type {Resources} from "../../../resource";
import type {SoundId} from "../../../resource/sound";
import type {Stream, StreamSource} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import type {Resize} from "../../../window/resize";
import type {BattleProgress} from "./battle-progress";
import type {CustomBattleEvent} from "./custom-battle-event";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {createInitialState} from "./state/initial-state";
import {BattleSceneView} from "./view";

/** バトル終了情報 */
export type BattleEnd = {
  /** ゲーム終了情報 */
  gameEnd: GameEnd,
  /** アニメーションタイムスケール */
  animationTimeScale: number,
};

/** 戦闘シーンプロパティ */
export interface BattleSceneProps {
  /** 戦闘シーンステート */
  state: BattleSceneState;
  /** ゲームの初期ステートヒストリー */
  initialState: GameState[];
  /** バトル終了ストリーム */
  endBattle: StreamSource<BattleEnd>;
  /** バトル進行オブジェクト */
  battleProgress: BattleProgress;
  /** カスタムバトルイベント */
  customBattleEvent: ?CustomBattleEvent;
  /** 排他制御オブジェクト */
  exclusive: Exclusive;
  /** 戦闘シーンビュー */
  view: BattleSceneView;
  /** ウインドウ押下ストリーム */
  pushWindow: Stream<PushWindow>;
  /** 戦闘シーン効果音 */
  sounds: BattleSceneSounds;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
}

/** 戦闘シーンで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** 戦闘シーンプロパティ生成関数のパラメータ */
export type BattleScenePropsCreatorParams = {
    /** リソース管理オブジェクト */
    resources: Resources,
    /** BGM管理オブジェクト */
    bgm: BGMManager,
    /** 再生するBGM ID */
    playingBGM: SoundId,
    /** レンダラ */
    renderer: OwnRenderer,
    /** バトル進行オブジェクト */
    battleProgress: BattleProgress,
    /** アニメーションスケールの初期値 */
    initialAnimationTimeScale: number,
    /** 初期ゲームステート */
    initialState: GameState[],
    /** プレイヤー情報 */
    player: Player,
    /** 敵情報 */
    enemy: Player,
    /** ゲームループストリーム */
    gameLoop: Stream<GameLoop>,
    /** リサイズストリーム */
    resize: Stream<Resize>,
    /** window押下ストリーム */
    pushWindow: Stream<PushWindow>,
    /** カスタムバトルイベント */
    customBattleEvent?: CustomBattleEvent,
};

/**
 * 戦闘シーンプロパティを生成する
 * 
 * @param params パラメータ
 * @return 生成結果
 */
export function createBattleSceneProps(params: BattleScenePropsCreatorParams): BattleSceneProps {
  return {
    pushWindow: params.pushWindow, 
    exclusive: new Exclusive(), 
    initialState: params.initialState,
    state: createInitialState(params.player.playerId, params.initialAnimationTimeScale),
    endBattle: createStreamSource(),
    battleProgress: params.battleProgress,
    customBattleEvent: params.customBattleEvent,
    view: new BattleSceneView({resources: params.resources, renderer: params.renderer,
      player: params.player, enemy: params.enemy, gameLoop: params.gameLoop, resize: params.resize}),
    sounds: new BattleSceneSounds(params.resources, params.playingBGM),
    bgm: params.bgm,
  };
}