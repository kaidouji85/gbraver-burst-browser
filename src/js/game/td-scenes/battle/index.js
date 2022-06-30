// @flow
import type {Command, GameEnd, GameState, Player} from "gbraver-burst-core";
import {all} from "../../../animation/all";
import {Animate} from "../../../animation/animate";
import {delay} from "../../../animation/delay";
import type {BGMManager} from "../../../bgm/bgm-manager";
import {fadeOut, play, stop} from "../../../bgm/bgm-operators";
import {Exclusive} from "../../../exclusive/exclusive";
import type {GameLoop} from "../../../game-loop/game-loop";
import type {OverlapNotifier} from "../../../render/overla-notifier";
import type {RendererDomGetter} from "../../../render/renderer-dom-getter";
import type {Rendering} from "../../../render/rendering";
import type {Resources} from '../../../resource';
import type {SoundId} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import type {Resize} from "../../../window/resize";
import type {Scene} from "../scene";
import type {DecideBattery} from "./actions/decide-battery";
import type {ToggleTimeScale} from "./actions/toggle-time-scale";
import {stateAnimation, stateHistoryAnimation} from "./animation/state-history";
import type {BattleProgress} from "./battle-progress";
import type {BattleCustomEvent} from "./custom-event/battle-custom-event";
import {BattleSceneSounds} from "./sounds/sounds";
import type {BattleSceneState} from "./state/battle-scene-state";
import {createInitialState} from "./state/initial-state";
import {BattleSceneView} from "./view";

/** 戦闘シーンで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** バトル終了情報 */
type BattleEnd = {
  /** ゲーム終了情報 */
  gameEnd: GameEnd,
  /** アニメーションタイムスケール */
  animationTimeScale: number,
};

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
  /** 戦闘シーンカスタムイベント */
  battleCustomEvent?: BattleCustomEvent,
};

/** 戦闘シーン */
export class BattleScene implements Scene {
  #state: BattleSceneState;
  #initialState: GameState[];
  #endBattle: StreamSource<BattleEnd>;
  #battleProgress: BattleProgress;
  #battleCustomEvent: ?BattleCustomEvent;
  #exclusive: Exclusive;
  #view: BattleSceneView;
  #sounds: BattleSceneSounds;
  #bgm: BGMManager;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: BattleSceneParams) {
    this.#exclusive = new Exclusive();
    this.#initialState = param.initialState;
    this.#state = createInitialState(param.player.playerId, param.initialAnimationTimeScale);
    this.#endBattle = createStreamSource();
    this.#battleProgress = param.battleProgress;
    this.#battleCustomEvent = param.battleCustomEvent;
    this.#view = new BattleSceneView({
      resources: param.resources,
      renderer: param.renderer,
      player: param.player,
      enemy: param.enemy,
      gameLoop: param.gameLoop,
      resize: param.resize,
    });
    this.#sounds = new BattleSceneSounds(param.resources, param.playingBGM);
    this.#bgm = param.bgm;

    this.#unsubscriber = [
      this.#view.battleActionNotifier().subscribe(action => {
        if (action.type === 'decideBattery') {
          this.#onDecideBattery(action);
        } else if (action.type === 'doBurst') {
          this.#onBurst();
        } else if (action.type === 'doPilotSkill') {
          this.#onPilotSkill();
        } else if (action.type === 'toggleTimeScale') {
          this.#onToggleTimeScale(action);
        }
      })
    ];
  }

  /** @override */
  destructor(): void {
    this.#view.destructor();
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
    return this.#endBattle;
  }

  /**
   * 戦闘を開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   *
   * @return 処理が完了したら発火するPromise
   */
  start(): Promise<void> {
    return this.#exclusive.execute(async (): Promise<void> => {
      this.#bgm.do(play(this.#sounds.bgm));
      await this.#playAnimation(stateHistoryAnimation(this.#view, this.#sounds, this.#state, this.#initialState));
    });
  }

  /**
   * 本シーンが利用している全てのHTML要素を返す
   *
   * @return 本シーンが利用している全てのHTML要素
   */
  getHTMLElements(): HTMLElement[] {
    return this.#view.dom.getHTMLElements();
  }

  /**
   * バッテリー決定時の処理
   *
   * @param action アクション
   * @return 処理が完了したら発火するPromise
   */
  async #onDecideBattery(action: DecideBattery): Promise<void> {
    this.#exclusive.execute(async (): Promise<void> => {
      await this.#playAnimation(
        all(
          this.#view.hud.gameObjects.batterySelector.decide(),
          this.#view.hud.gameObjects.burstButton.close(),
          this.#view.hud.gameObjects.pilotButton.close(),
          this.#view.hud.gameObjects.timeScaleButton.close(),
        )
          .chain(delay(500))
          .chain(this.#view.hud.gameObjects.batterySelector.close())
      );
      await this.#progressGame({type: 'BATTERY_COMMAND', battery: action.battery});
    });
  }

  /**
   * バースト時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async #onBurst(): Promise<void> {
    this.#exclusive.execute(async () => {
      await this.#playAnimation(
        all(
          this.#view.hud.gameObjects.burstButton.decide(),
          this.#view.hud.gameObjects.batterySelector.close(),
          this.#view.hud.gameObjects.pilotButton.close(),
          this.#view.hud.gameObjects.timeScaleButton.close(),
        )
          .chain(delay(500))
          .chain(this.#view.hud.gameObjects.burstButton.close())
      );
      await this.#progressGame({type: 'BURST_COMMAND'});
    });
  }

  /**
   * パイロットスキル発動時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async #onPilotSkill(): Promise<void> {
    this.#exclusive.execute(async () => {
      await this.#playAnimation(
        all(
          this.#view.hud.gameObjects.pilotButton.decide(),
          this.#view.hud.gameObjects.burstButton.close(),
          this.#view.hud.gameObjects.batterySelector.close(),
          this.#view.hud.gameObjects.timeScaleButton.close(),
        )
          .chain(delay(500))
          .chain(this.#view.hud.gameObjects.pilotButton.close())
      );
      await this.#progressGame({type: 'PILOT_SKILL_COMMAND'});
    });
  }

  /**
   * タイムスケール変更時の処理
   * 
   * @param action アクション
   */
   #onToggleTimeScale(action: ToggleTimeScale): void {
    this.#state.animationTimeScale = action.timeScale;
  }

  /**
   * ゲームを進めるヘルパーメソッド
   *
   * @param command プレイヤーが入力したコマンド
   * @return 処理が完了したら発火するPromise
   */
  async #progressGame(command: Command): Promise<void> {
    const repeatProgressWhenUnselectable = async (): Promise<?GameState> => {
      let lastCommand: Command = command;
      const maxProgressCount = 100;
      for (let i=0; i<maxProgressCount; i++) {
        const updateState = await this.#battleProgress.progress(lastCommand);
        if (updateState.length < 1) {
          return;
        }
        const removeLastState = updateState.slice(0 , -1);
        await this.#playAnimation(stateHistoryAnimation(this.#view, this.#sounds, this.#state, removeLastState));
        const lastState: GameState = updateState[updateState.length - 1];
        // TODO カスタムイベントを呼び出す
        await this.#playAnimation(stateAnimation(lastState, this.#view, this.#sounds, this.#state));
        if (lastState.effect.name !== 'InputCommand') {
          return lastState;
        }
        const playerCommand = lastState.effect.players.find(v => v.playerId === this.#state.playerId);
        if (!playerCommand || playerCommand.selectable) {
          return lastState;
        }
        lastCommand = playerCommand.nextTurnCommand;
      }
      return null
    };
    const onGameEnd = async (gameEnd: GameEnd): Promise<void> => {
      await this.#bgm.do(fadeOut)
      await this.#bgm.do(stop);
      this.#endBattle.next({gameEnd, animationTimeScale: this.#state.animationTimeScale});
    };

    const lastState = await repeatProgressWhenUnselectable();
    if (lastState && lastState.effect.name === 'GameEnd') {
      await onGameEnd(lastState.effect);
    }
  }

  /**
   * タイムスケールに常に同じ値をセットして、アニメーションを再生するヘルパーメソッド
   *
   * @param animate 再生するアニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  async #playAnimation(animate: Animate): Promise<void> {
    await animate.timeScale(this.#state.animationTimeScale).play();
  }
}
