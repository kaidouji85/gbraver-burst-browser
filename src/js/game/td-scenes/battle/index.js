// @flow
import type {GameState, Player} from "gbraver-burst-core";
import type {BGMManager} from "../../../bgm/bgm-manager";
import {Exclusive} from "../../../exclusive/exclusive";
import type {GameLoop} from "../../../game-loop/game-loop";
import type {OverlapNotifier} from "../../../render/overlap-notifier";
import type {RendererDomGetter} from "../../../render/renderer-dom-getter";
import type {Rendering} from "../../../render/rendering";
import type {Resources} from '../../../resource';
import type {SoundId} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import type {PushWindow} from "../../../window/push-window";
import type {Resize} from "../../../window/resize";
import type {Scene} from "../scene";
import type {ToggleTimeScale} from "./actions/toggle-time-scale";
import type {BattleProgress} from "./battle-progress";
import type {BattleEnd, BattleSceneProps} from './battle-scene-props';
import type {CustomBattleEvent} from "./custom-battle-event";
import {onBurst} from "./procedure/on-burst";
import {onDecideBattery} from "./procedure/on-decide-battery";
import {onPilotSkill} from "./procedure/on-pilot-skill";
import {start} from "./procedure/start";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {createInitialState} from "./state/initial-state";
import {BattleSceneView} from "./view";

/** 戦闘シーンで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** コンストラクタのパラメータ */
type BattleSceneParams = {
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

/** 戦闘シーン */
export class BattleScene implements Scene, BattleSceneProps {
  state: BattleSceneState;
  initialState: GameState[];
  endBattle: StreamSource<BattleEnd>;
  battleProgress: BattleProgress;
  customBattleEvent: ?CustomBattleEvent;
  exclusive: Exclusive;
  view: BattleSceneView;
  pushWindow: Stream<PushWindow>;
  sounds: BattleSceneSounds;
  bgm: BGMManager;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: BattleSceneParams) {
    this.pushWindow = param.pushWindow;
    this.exclusive = new Exclusive();
    this.initialState = param.initialState;
    this.state = createInitialState(param.player.playerId, param.initialAnimationTimeScale);
    this.endBattle = createStreamSource();
    this.battleProgress = param.battleProgress;
    this.customBattleEvent = param.customBattleEvent;
    this.view = new BattleSceneView({
      resources: param.resources,
      renderer: param.renderer,
      player: param.player,
      enemy: param.enemy,
      gameLoop: param.gameLoop,
      resize: param.resize,
    });
    this.sounds = new BattleSceneSounds(param.resources, param.playingBGM);
    this.bgm = param.bgm;
    this.#unsubscriber = [
      this.view.battleActionNotifier().subscribe(action => {
        if (action.type === 'decideBattery') {
          onDecideBattery(this, action);
        } else if (action.type === 'doBurst') {
          onBurst(this, action);
        } else if (action.type === 'doPilotSkill') {
          onPilotSkill(this, action);
        } else if (action.type === 'toggleTimeScale') {
          this.#onToggleTimeScale(action);
        }
      })
    ];
  }

  /** @override */
  destructor(): void {
    this.view.destructor();
    this.#unsubscriber.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ゲーム終了通知
   *
   * @return 通知ストリーム
   */
  gameEndNotifier(): Stream<BattleEnd> {
    return this.endBattle;
  }

  /**
   * 戦闘シーンを開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   *
   * @return 処理が完了したら発火するPromise
   */
  async start(): Promise<void> {
    await start(this);
  }

  /**
   * 本シーンが利用している全てのHTML要素を返す
   *
   * @return 本シーンが利用している全てのHTML要素
   */
  getHTMLElements(): HTMLElement[] {
    return this.view.dom.getHTMLElements();
  }

  /**
   * タイムスケール変更時の処理
   * 
   * @param action アクション
   */
  #onToggleTimeScale(action: ToggleTimeScale): void {
    this.state.animationTimeScale = action.timeScale;
  }
}
