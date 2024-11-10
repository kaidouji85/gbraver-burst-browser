import { GameState, Player } from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import { createActionManager } from "../../../action-manager/action-manager";
import { createAnimatePlayer } from "../../../animation/animate-player";
import { BGMManagerContainer } from "../../../bgm/bgm-manager";
import { DOMDialogBinder } from "../../../dom-dialogs/dom-dialog-binder";
import { Exclusive } from "../../../exclusive/exclusive";
import { GameLoop } from "../../../game-loop/game-loop";
import { OverlapNotifier } from "../../../render/overlap-notifier";
import { RendererDomGetter } from "../../../render/renderer-dom-getter";
import { Rendering } from "../../../render/rendering";
import { ResourcesContainer } from "../../../resource";
import { SoundId } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { PushWindow } from "../../../window/push-window";
import { Resize } from "../../../window/resize";
import { BattleSceneAction } from "../actions";
import { BattleProgress } from "../battle-progress";
import { BattleControllerType } from "../controller-type";
import { CustomBattleEvent } from "../custom-battle-event";
import { BattleSceneProps } from "../props";
import { createBattleSceneSounds } from "../sounds";
import { createBattleSceneView } from "../view";

/** 戦闘シーンで利用するレンダラ */
export interface OwnRenderer
  extends OverlapNotifier,
    RendererDomGetter,
    Rendering {}

/** 戦闘シーンプロパティ生成関数のパラメータ */
export type BattleScenePropsCreatorParams = BGMManagerContainer &
  ResourcesContainer &
  SEPlayerContainer &
  Readonly<{
    /** 再生するBGM ID */
    playingBGM: SoundId;

    /** レンダラ */
    renderer: OwnRenderer;

    /** DOMダイアログバインダー */
    domDialogBinder: DOMDialogBinder;

    /** コントローラータイプ */
    controllerType: BattleControllerType;

    /** リトライ可能かどうか、trueで可能 */
    canRetry: boolean;

    /** バトル進行オブジェクト */
    battleProgress: BattleProgress;
    /** カスタムバトルイベント */
    customBattleEvent?: CustomBattleEvent;

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
  }>;

/**
 * 戦闘シーンプロパティを生成する
 * @param params パラメータ
 * @returns 生成結果
 */
export function createBattleSceneProps(
  params: BattleScenePropsCreatorParams,
): BattleSceneProps {
  return {
    ...params,

    playerId: params.player.playerId,
    enemyId: params.enemy.playerId,
    stateHistory: params.initialState,

    animatePlayer: createAnimatePlayer({
      timeScale: params.initialAnimationTimeScale,
    }),

    customBattleEvent: params.customBattleEvent ?? null,
    exclusive: new Exclusive(),

    view: createBattleSceneView(params),
    sounds: createBattleSceneSounds(params),

    endBattle: new Subject(),
    battleSceneAction: createActionManager<BattleSceneAction>(),
  };
}
