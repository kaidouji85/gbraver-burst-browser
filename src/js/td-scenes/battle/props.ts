import { GameEnd, GameState, PlayerId } from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { AnimatePlayer } from "../../animation/animate-player";
import { BGMManagerContainer } from "../../bgm/bgm-manager";
import { DOMDialogBinder } from "../../dom-dialogs/dom-dialog-binder";
import { Exclusive } from "../../exclusive/exclusive";
import { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import { PushWindow } from "../../window/push-window";
import { BattleSceneAction } from "./actions";
import { BattleProgress } from "./battle-progress";
import { BattleControllerType } from "./controller-type";
import { CustomBattleEvent } from "./custom-battle-event";
import { BattleSceneSounds } from "./sounds";
import { BattleSceneView } from "./view";

/** バトル終了情報 */
export type BattleEnd = {
  /** ゲーム終了情報 */
  gameEnd: GameEnd;
  /** アニメーションタイムスケール */
  animationTimeScale: number;
};

/** 戦闘シーンプロパティ */
export type BattleSceneProps = ResourcesContainer &
  BGMManagerContainer &
  SEPlayerContainer & {
    /** 画面を開いているプレイヤーのID */
    readonly playerId: PlayerId;
    /** ゲームステートヒストリー */
    stateHistory: GameState[];

    /** DOMダイアログバインダー */
    readonly domDialogBinder: DOMDialogBinder;

    /** アニメーションプレイヤー */
    readonly animatePlayer: AnimatePlayer;

    /** バトル進行オブジェクト */
    readonly battleProgress: BattleProgress;
    /** カスタムバトルイベント */
    readonly customBattleEvent: CustomBattleEvent | null;
    /** 排他制御オブジェクト */
    readonly exclusive: Exclusive;

    /** 戦闘シーンビュー */
    readonly view: BattleSceneView;
    /** 戦闘シーン効果音 */
    readonly sounds: BattleSceneSounds;
    /** コントローラータイプ */
    readonly controllerType: BattleControllerType;

    /** バトル終了ストリーム */
    readonly endBattle: Subject<BattleEnd>;
    /** ウインドウ押下ストリーム */
    readonly pushWindow: Observable<PushWindow>;
    /**
     * 戦闘シーンアクション管理オブジェクト
     * 動的生成されるダイアログからの通知を購読するために利用する
     */
    readonly battleSceneAction: ActionManager<BattleSceneAction>;
  };
