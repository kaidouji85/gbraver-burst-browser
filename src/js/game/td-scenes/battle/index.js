// @flow
import type {Resources} from '../../../resource';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {GameLoop} from "../../../game-loop/game-loop";
import type {DecideBattery} from "./actions/decide-battery";
import {createInitialState} from "./state/initial-state";
import type {BattleProgress} from "./battle-progress";
import {stateHistoryAnimation} from "./animation/state-history";
import type {Command, GameEnd, GameState, Player} from "gbraver-burst-core";
import {delay} from "../../../animation/delay";
import type {Scene} from "../scene";
import type {Resize} from "../../../window/resize";
import {all} from "../../../animation/all";
import {BattleSceneSounds} from "./sounds/sounds";
import {Exclusive} from "../../../exclusive/exclusive";
import type {OverlapNotifier} from "../../../render/overla-notifier";
import type {RendererDomGetter} from "../../../render/renderer-dom-getter";
import type {Rendering} from "../../../render/rendering";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import type {BGMManager} from "../../../bgm/bgm-manager";
import type {SoundId} from "../../../resource/sound";
import {fadeIn, fadeOut, play, stop} from "../../../bgm/bgm-operators";
import {Animate} from "../../../animation/animate";

/** 戦闘シーンで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  bgm: BGMManager,
  playingBGM: SoundId,
  renderer: OwnRenderer,
  battleProgress: BattleProgress,
  initialState: GameState[],
  player: Player,
  enemy: Player,
  gameLoop: Stream<GameLoop>,
  resize: Stream<Resize>
};

/** 戦闘シーン */
export class BattleScene implements Scene {
  _state: BattleSceneState;
  _initialState: GameState[];
  _endBattle: StreamSource<GameEnd>;
  _battleProgress: BattleProgress;
  _exclusive: Exclusive;
  _view: BattleSceneView;
  _sounds: BattleSceneSounds;
  _bgm: BGMManager;
  _animationTimeScale: number;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._exclusive = new Exclusive();
    this._initialState = param.initialState;
    this._state = createInitialState(param.player.playerId);
    this._endBattle = createStreamSource();
    this._battleProgress = param.battleProgress;
    this._view = new BattleSceneView({
      resources: param.resources,
      renderer: param.renderer,
      player: param.player,
      enemy: param.enemy,
      gameLoop: param.gameLoop,
      resize: param.resize,
    });
    this._sounds = new BattleSceneSounds(param.resources, param.playingBGM);
    this._animationTimeScale  = 1;  // TODO パラメータで渡せるようにする
    this._bgm = param.bgm;

    this._unsubscriber = [
      this._view.battleActionNotifier().subscribe(action => {
        if (action.type === 'decideBattery') {
          this._onDecideBattery(action);
        } else if (action.type === 'doBurst') {
          this._onBurst();
        } else if (action.type === 'doPilotSkill') {
          this._onPilotSkill();
        }
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ゲーム終了通知
   *
   * @return 通知ストリーム
   */
  gameEndNotifier(): Stream<GameEnd> {
    return this._endBattle;
  }

  /**
   * 戦闘を開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   *
   * @return 処理が完了したら発火するPromise
   */
  start(): Promise<void> {
    return this._exclusive.execute(async (): Promise<void> => {
      (async () => {
        await this._bgm.do(play(this._sounds.bgm));
        await this._bgm.do(fadeIn);
      })();
      await this._playAnimation(stateHistoryAnimation(this._view, this._sounds, this._state, this._initialState));
    });
  }

  /**
   * バッテリー決定時の処理
   *
   * @param action アクション
   * @return 処理が完了したら発火するPromise
   */
  async _onDecideBattery(action: DecideBattery): Promise<void> {
    this._exclusive.execute(async (): Promise<void> => {
      await this._playAnimation(
        all(
          this._view.hud.gameObjects.batterySelector.decide(),
          this._view.hud.gameObjects.burstButton.close(),
          this._view.hud.gameObjects.pilotButton.close()
        )
          .chain(delay(500))
          .chain(this._view.hud.gameObjects.batterySelector.close())
      );

      const lastState = await this._progressGame({type: 'BATTERY_COMMAND', battery: action.battery});
      if (lastState && lastState.effect.name === 'GameEnd') {
        await this._onEndGame(lastState.effect);
      }
    });
  }

  /**
   * バースト時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onBurst(): Promise<void> {
    this._exclusive.execute(async () => {
      await this._playAnimation(
        all(
          this._view.hud.gameObjects.burstButton.decide(),
          this._view.hud.gameObjects.batterySelector.close(),
          this._view.hud.gameObjects.pilotButton.close()
        )
          .chain(delay(500))
          .chain(this._view.hud.gameObjects.burstButton.close())
      );
      const lastState = await this._progressGame({type: 'BURST_COMMAND'});
      if (lastState && lastState.effect.name === 'GameEnd') {
        await this._onEndGame(lastState.effect);
      }
    });
  }

  /**
   * パイロットスキル発動時の処理
   *
   * @return 処理が完了したら発火するPromise
   */
  async _onPilotSkill(): Promise<void> {
    this._exclusive.execute(async () => {
      await this._playAnimation(
        all(
          this._view.hud.gameObjects.pilotButton.decide(),
          this._view.hud.gameObjects.burstButton.close(),
          this._view.hud.gameObjects.batterySelector.close(),
        )
          .chain(delay(500))
          .chain(this._view.hud.gameObjects.pilotButton.close())
      );

      const lastState = await this._progressGame({type: 'PILOT_SKILL_COMMAND'});
      if (lastState && lastState.effect.name === 'GameEnd') {
        await this._onEndGame(lastState.effect);
      }
    });
  }

  /**
   * ゲームを進める
   *
   * @param command プレイヤーが入力したコマンド
   * @return ゲームの最新状態、何も更新されなかった場合はnullを返す
   */
  async _progressGame(command: Command): Promise<?GameState> {
    let lastCommand: Command = command;
    let lastState: ?GameState = null;
    for (let i=0; i<100; i++) {
      const updateState = await this._battleProgress.progress(lastCommand);
      await this._playAnimation(stateHistoryAnimation(this._view, this._sounds, this._state, updateState));
      lastState = updateState[updateState.length - 1] ?? null;
      if (!(lastState && lastState.effect.name === 'InputCommand')) {
        return lastState;
      }

      const playerCommand = lastState.effect.players.find(v => v.playerId === this._state.playerId);
      if (!(playerCommand && playerCommand.selectable === false)) {
        return lastState;
      }

      lastCommand = playerCommand.nextTurnCommand;
    }

    return lastState
  }

  /**
   * ゲーム終了時の処理
   *
   * @param gameEnd ゲーム終了情報
   * @return 処理が完了したら発火するPromise
   */
  async _onEndGame(gameEnd: GameEnd): Promise<void> {
    await this._bgm.do(fadeOut)
    await this._bgm.do(stop);
    this._endBattle.next(gameEnd);
  }

  /**
   * タイムスケールに常に同じ値をセットして、アニメーションを再生するヘルパーメソッド
   *
   * @param animate 再生するアニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  async _playAnimation(animate: Animate): Promise<void> {
    await animate.timeScale(this._animationTimeScale).play();
  }
}
