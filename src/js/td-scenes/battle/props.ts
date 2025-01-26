import { GameEnd, GameState, PlayerId } from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import { AbortControllerContainer } from "../../abort-cntroller/abort-controller-container";
import { BGMManagerContainer } from "../../bgm/bgm-manager";
import { DOMDialogBinder } from "../../dom-dialogs/dom-dialog-binder";
import { Exclusive } from "../../exclusive/exclusive";
import { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import { PushWindow } from "../../window/push-window";
import { AnimationTimeScaleContainer } from "./animation-time-scale-container";
import { BattleProgress } from "./battle-progress";
import { BattleSceneActionManageContainer } from "./battle-scene-action-manage-container";
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
  SEPlayerContainer &
  BattleSceneActionManageContainer &
  AnimationTimeScaleContainer &
  AbortControllerContainer & {
    /** 画面を開いているプレイヤーのID */
    readonly playerId: PlayerId;
    /** 敵プレイヤーのID */
    readonly enemyId: PlayerId;
    /** ゲームステートヒストリー */
    stateHistory: GameState[];

    /** DOMダイアログバインダー */
    readonly domDialogBinder: DOMDialogBinder;

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
  };
