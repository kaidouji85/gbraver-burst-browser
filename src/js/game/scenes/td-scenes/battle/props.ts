import {
  ArmdozerId,
  GameEnd,
  GameState,
  PilotId,
  PlayerId,
} from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import { PushWindow } from "../../../../dom/window/push-window";
import { AbortManagerContainer } from "../../../../event/abort-controller/abort-manager-container";
import { Exclusive } from "../../../../event/exclusive/exclusive";
import { ResourcesContainer } from "../../../../resource";
import { BGMManagerContainer } from "../../../../sounds/bgm/bgm-manager";
import { SEPlayerContainer } from "../../../../sounds/se/se-player";
import { PlayerPilotVisibility } from "../../../config/browser-config";
import { DOMDialogBinder } from "../../../dialogs/dom-dialog-binder";
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
  /** プレイヤー情報 */
  player: {
    /** アームドーザ */
    armdozerId: ArmdozerId;
    /** プレイヤー */
    pilotId: PilotId;
  };
};

/** 戦闘シーンプロパティ */
export type BattleSceneProps = Readonly<ResourcesContainer> &
  Readonly<BGMManagerContainer> &
  Readonly<SEPlayerContainer> &
  Readonly<BattleSceneActionManageContainer> &
  Readonly<AbortManagerContainer> &
  AnimationTimeScaleContainer & {
    /** リトライした戦闘かどうか、trueでリトライした */
    readonly isRetry: boolean;

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
    /** プレイヤー側のパイロット情報の表示設定 */
    readonly playerPilotVisibility: PlayerPilotVisibility;

    /** バトル終了ストリーム */
    readonly endBattle: Subject<BattleEnd>;
    /** ウインドウ押下ストリーム */
    readonly pushWindow: Observable<PushWindow>;
  };
