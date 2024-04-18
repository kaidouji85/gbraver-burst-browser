import { GameEnd, GameState, PlayerId } from "gbraver-burst-core";
import { Observable, Subject } from "rxjs";

import { AnimatePlayer } from "../../animation/animate-player";
import { BGMManager } from "../../bgm/bgm-manager";
import { Exclusive } from "../../exclusive/exclusive";
import { SEPlayer } from "../../se/se-player";
import { PushWindow } from "../../window/push-window";
import { BattleProgress } from "./battle-progress";
import { BattleControllerType } from "./controller-type";
import { CustomBattleEvent } from "./custom-battle-event";
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
  /** SE再生オブジェクト */
  readonly se: SEPlayer;
  /** コントローラータイプ */
  readonly controllerType: BattleControllerType;
};
