import type { GameEnd, GameState, Player, PlayerId } from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import {
  AnimatePlayer,
  createAnimatePlayer,
} from "../../animation/animate-player";
import type { BGMManager } from "../../bgm/bgm-manager";
import { Exclusive } from "../../exclusive/exclusive";
import type { GameLoop } from "../../game-loop/game-loop";
import type { OverlapNotifier } from "../../render/overlap-notifier";
import type { RendererDomGetter } from "../../render/renderer-dom-getter";
import type { Rendering } from "../../render/rendering";
import type { Resources } from "../../resource";
import type { SoundId } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";
import type { PushWindow } from "../../window/push-window";
import type { Resize } from "../../window/resize";
import type { BattleProgress } from "./battle-progress";
import { BattleControllerType } from "./controller-type";
import type { CustomBattleEvent } from "./custom-battle-event";
import { BattleSceneSounds } from "./sounds/sounds";
import { BattleSceneView } from "./view";

/** バトル終了情報 */
export type BattleEnd = {
  /** ゲーム終了情報 */
  gameEnd: GameEnd;
  /** アニメーションタイムスケール */
  animationTimeScale: number;
};

/** 戦闘シーンプロパティ */
export type BattleSceneProps = {
  /** 画面を開いているプレイヤーのID */
  readonly playerId: PlayerId;
  /** アニメーションプレイヤー */
  readonly animatePlayer: AnimatePlayer;
  /** ゲームステートヒストリー */
  stateHistory: GameState[];
  /** バトル終了ストリーム */
  readonly endBattle: Subject<BattleEnd>;
  /** バトル進行オブジェクト */
  readonly battleProgress: BattleProgress;
  /** カスタムバトルイベント */
  readonly customBattleEvent: CustomBattleEvent | null;
  /** 排他制御オブジェクト */
  readonly exclusive: Exclusive;
  /** 戦闘シーンビュー */
  readonly view: BattleSceneView;
  /** ウインドウ押下ストリーム */
  readonly pushWindow: Observable<PushWindow>;
  /** 戦闘シーン効果音 */
  readonly sounds: BattleSceneSounds;
  /** BGM管理オブジェクト */
  readonly bgm: BGMManager;
  /** コントローラータイプ */
  readonly controllerType: BattleControllerType;
};

/** 戦闘シーンで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** 戦闘シーンプロパティ生成関数のパラメータ */
export type BattleScenePropsCreatorParams = Readonly<{
  /** リソース管理オブジェクト */
  resources: Resources;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** 再生するBGM ID */
  playingBGM: SoundId;
  /** レンダラ */
  renderer: OwnRenderer;
  /** バトル進行オブジェクト */
  battleProgress: BattleProgress;
  /** アニメーションスケールの初期値 */
  initialAnimationTimeScale: number;
  /** 初期ゲームステート */
  initialState: GameState[];
  /** プレイヤー情報 */
  player: Player;
  /** 敵情報 */
  enemy: Player;
  /** ゲームループストリーム */
  gameLoop: Observable<GameLoop>;
  /** リサイズストリーム */
  resize: Observable<Resize>;
  /** window押下ストリーム */
  pushWindow: Observable<PushWindow>;
  /** カスタムバトルイベント */
  customBattleEvent?: CustomBattleEvent;
  /** コントローラータイプ */
  controllerType: BattleControllerType;
}>;

/**
 * 戦闘シーンプロパティを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createBattleSceneProps(
  params: BattleScenePropsCreatorParams,
): BattleSceneProps {
  return {
    ...params,
    playerId: params.player.playerId,
    animatePlayer: createAnimatePlayer({
      timeScale: params.initialAnimationTimeScale,
    }),
    exclusive: new Exclusive(),
    stateHistory: params.initialState,
    endBattle: new Subject(),
    customBattleEvent: params.customBattleEvent ?? null,
    view: new BattleSceneView(params),
    sounds: new BattleSceneSounds(params.resources, params.playingBGM),
  };
}
