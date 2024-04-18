import { GameState, Player } from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import { createAnimatePlayer } from "../../../animation/animate-player";
import { BGMManager } from "../../../bgm/bgm-manager";
import { Exclusive } from "../../../exclusive/exclusive";
import { GameLoop } from "../../../game-loop/game-loop";
import { OverlapNotifier } from "../../../render/overlap-notifier";
import { RendererDomGetter } from "../../../render/renderer-dom-getter";
import { Rendering } from "../../../render/rendering";
import { Resources } from "../../../resource";
import { SoundId } from "../../../resource/sound/resource";
import { SEPlayer } from "../../../se/se-player";
import { PushWindow } from "../../../window/push-window";
import { Resize } from "../../../window/resize";
import { BattleProgress } from "../battle-progress";
import { BattleSceneProps } from "../battle-scene-props";
import { BattleControllerType } from "../controller-type";
import { CustomBattleEvent } from "../custom-battle-event";
import { BattleSceneSounds } from "../sounds/sounds";
import { BattleSceneView } from "../view";

/** 戦闘シーンで利用するレンダラ */
export interface OwnRenderer
  extends OverlapNotifier,
    RendererDomGetter,
    Rendering {}

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
