// @flow

import type {Resources} from '../../../resource';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {GameLoop} from "../../../game-loop/game-loop";
import type {DecideBattery} from "./actions/decide-battery";
import {createInitialState} from "./state/initial-state";
import type {BattleProgress, InitialState} from "../../../battle-room/battle-room";
import {stateHistoryAnimation} from "./animation/state-history";
import type {Command, GameEnd, GameState} from "gbraver-burst-core";
import {delay} from "../../../animation/delay";
import type {Scene} from "../scene";
import type {Resize} from "../../../window/resize";
import {all} from "../../../animation/all";
import {BattleSceneSounds} from "./sounds";
import {Exclusive} from "../../../exclusive/exclusive";
import type {OverlapNotifier} from "../../../render/overla-notifier";
import type {RendererDomGetter} from "../../../render/renderer-dom-getter";
import type {Rendering} from "../../../render/rendering";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";

/** 戦闘シーンで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: OwnRenderer,
  battleProgress: BattleProgress,
  initialState: InitialState,
  listener: {
    gameLoop: Stream<GameLoop>,
    resize: Stream<Resize>
  }
};

/**
 * 戦闘シーン
 */
export class BattleScene implements Scene {
  _state: BattleSceneState;
  _initialState: InitialState;
  _endBattle: StreamSource<GameEnd>;
  _battleProgress: BattleProgress;
  _exclusive: Exclusive;
  _view: BattleSceneView;
  _sounds: BattleSceneSounds;
  _unsubscriber: Unsubscriber[];

  constructor(param: Param) {
    this._exclusive = new Exclusive();
    this._initialState = param.initialState;
    this._state = createInitialState(param.initialState.playerId);
    this._endBattle = new RxjsStreamSource();
    this._battleProgress = param.battleProgress;
    this._view = new BattleSceneView({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.initialState.playerId,
      players: param.initialState.players,
      listener: {
        gameLoop: param.listener.gameLoop,
        resize: param.listener.resize,
      }
    });
    this._sounds = new BattleSceneSounds(param.resources);

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

  /** デストラクタ */
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
   */
  start(): Promise<void> {
    return this._exclusive.execute(async (): Promise<void> => {
      await stateHistoryAnimation(this._view, this._sounds, this._state, this._initialState.stateHistory).play();
    });
  }

  /**
   * バッテリー決定時の処理
   *
   * @param action アクション
   */
  async _onDecideBattery(action: DecideBattery): Promise<void> {
    this._exclusive.execute(async (): Promise<void> => {
      await all(
        this._view.hud.gameObjects.batterySelector.decide(),
        this._view.hud.gameObjects.burstButton.close(),
        this._view.hud.gameObjects.pilotButton.close(),
      ).chain(delay(500)
      ).chain(this._view.hud.gameObjects.batterySelector.close()
      ).play();
      const lastState = await this._progressGame({
        type: 'BATTERY_COMMAND',
        battery: action.battery
      });
      if (lastState && lastState.effect.name === 'GameEnd') {
        await this._onEndGame(lastState.effect);
        return;
      }
    });
  }

  /**
   * バースト時の処理
   */
  async _onBurst(): Promise<void> {
    this._exclusive.execute(async (): Promise<void> => {
      await all(
        this._view.hud.gameObjects.burstButton.decide(),
        this._view.hud.gameObjects.batterySelector.close(),
        this._view.hud.gameObjects.pilotButton.close()
      )
        .chain(delay(500))
        .chain(this._view.hud.gameObjects.burstButton.close())
        .play();
      const lastState = await this._progressGame({type: 'BURST_COMMAND'});
      if (lastState && lastState.effect.name === 'GameEnd') {
        await this._onEndGame(lastState.effect);
        return;
      }
    });
  }

  /**
   * パイロットスキル発動時の処理
   *
   * @return 実行結果
   */
  async _onPilotSkill(): Promise<void> {
    this._exclusive.execute(async (): Promise<void> => {
      await all(
        this._view.hud.gameObjects.pilotButton.decide(),
        this._view.hud.gameObjects.burstButton.close(),
        this._view.hud.gameObjects.batterySelector.close(),
      ).chain(delay(500))
        .chain(this._view.hud.gameObjects.pilotButton.close())
        .play();
      const lastState = await this._progressGame({type: 'PILOT_SKILL_COMMAND'});
      if (lastState && lastState.effect.name === 'GameEnd') {
        await this._onEndGame(lastState.effect);
        return;
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
        await stateHistoryAnimation(this._view, this._sounds, this._state, updateState).play();

        if (updateState.length <= 0) {
          return null;
        }

        lastState = updateState[updateState.length - 1];
        if (lastState.effect.name !== 'InputCommand') {
          return lastState;
        }

        const playerCommand = lastState.effect.players.find(v => v.playerId === this._state.playerId);
        if (!playerCommand) {
          return lastState;
        }

        if (playerCommand.selectable === true) {
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
   */
  async _onEndGame(gameEnd: GameEnd): Promise<void> {
    await delay(1000).play();
    this._endBattle.next(gameEnd);
  }
}
