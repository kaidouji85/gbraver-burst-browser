// @flow

import type {Resources} from '../../../resource';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable, Subject, Subscription} from "rxjs";
import type {TdDOMEvent} from "../../../action/td-dom";
import type {DecideBattery} from "../../../action/battle-scene/decide-battery";
import {createInitialState} from "./state/initial-state";
import type {BattleProgress, InitialState} from "../../../battle-room/battle-room";
import {stateHistoryAnimation} from "./animation/state-history";
import type {Render} from "../../../action/game-loop/render";
import type {DoBurst} from "../../../action/battle-scene/do-burst";
import type {Command, GameEnd, GameState} from "gbraver-burst-core";
import {delay} from "../../../animation/delay";
import type {EndBattle} from "../../../action/game/battle";
import type {Scene} from "../scene";
import type {Resize} from "../../../action/resize/resize";
import {all} from "../../../animation/all";
import type {PilotSkill} from "gbraver-burst-core";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  battleProgress: BattleProgress,
  initialState: InitialState,
  listener: {
    domEvent: Observable<TdDOMEvent>,
    gameLoop: Observable<GameLoop>,
    resize: Observable<Resize>
  }
};

/** 戦闘シーンのイベント通知 */
type Notifier = {
  render: Observable<Render>,
  endBattle: Observable<EndBattle>
};

/**
 * 戦闘シーン
 */
export class BattleScene implements Scene {
  _state: BattleSceneState;
  _initialState: InitialState;
  _endBattle: Subject<EndBattle>;
  _battleProgress: BattleProgress;
  _view: BattleSceneView;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._initialState = param.initialState;
    this._state = createInitialState(param.initialState.playerId);
    this._endBattle = new Subject();
    this._battleProgress = param.battleProgress;
    this._view = new BattleSceneView({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.initialState.playerId,
      players: param.initialState.players,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent,
        resize: param.listener.resize,
      }
    });

    this._subscription = [
      this._view.notifier().battleAction.subscribe(action => {
        if (action.type === 'decideBattery') {
          this._onDecideBattery(action);
        } else if (action.type === 'doBurst') {
          this._onBurst(action);
        } else if (action.type === 'doPilotSkill') {
          this._onPilotSkill(action);
        }
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._view.notifier().render,
      endBattle: this._endBattle
    };
  }

  /**
   * 戦闘を開始する
   * 画面遷移などが完了したら、本メソッドを呼ぶ想定
   */
  async start(): Promise<void> {
    try {
      await stateHistoryAnimation(this._view, this._state, this._initialState.stateHistory).play();
      this._state.canOperation = true;
    } catch(e) {
      throw e;
    }
  }

  /**
   * バッテリー決定時の処理
   *
   * @param action アクション
   */
  async _onDecideBattery(action: DecideBattery): Promise<void> {
    try {
      if (!this._state.canOperation) {
        return;
      }

      this._state.canOperation = false;
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
        this._onEndGame(lastState.effect);
        return;
      }

      this._state.canOperation = true;
    } catch (e) {
      throw e;
    }
  }

  /**
   * バースト時の処理
   *
   * @param action アクション
   */
  async _onBurst(action: DoBurst): Promise<void> {
    try {
      if (!this._state.canOperation) {
        return;
      }

      this._state.canOperation = false;
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
        this._onEndGame(lastState.effect);
        return;
      }

      this._state.canOperation = true;
    } catch(e) {
      throw e;
    }
  }

  /**
   * パイロットスキル発動時の処理
   *
   * @param action アクション
   * @return 実行結果
   * @private
   */
  async _onPilotSkill(action: PilotSkill): Promise<void> {
    try {
      if (!this._state.canOperation) {
        return;
      }

      this._state.canOperation = false;
      await all(
        this._view.hud.gameObjects.pilotButton.decide(),
        this._view.hud.gameObjects.burstButton.close(),
        this._view.hud.gameObjects.batterySelector.close(),
      ).chain(delay(500))
        .chain(this._view.hud.gameObjects.pilotButton.close())
        .play();
      const lastState = await this._progressGame({type: 'PILOT_SKILL_COMMAND'});
      if (lastState && lastState.effect.name === 'GameEnd') {
        this._onEndGame(lastState.effect);
        return;
      }

      this._state.canOperation = true;
    } catch(e) {
      throw e;
    }
  }

  /**
   * ゲームを進める
   *
   * @param command プレイヤーが入力したコマンド
   * @return ゲームの最新状態、何も更新されなかった場合はnullを返す
   */
  async _progressGame(command: Command): Promise<?GameState> {
    try {
      let lastCommand: Command = command;
      let lastState: ?GameState = null;
      for (let i=0; i<100; i++) {
        const updateState = await this._battleProgress.progress(lastCommand);
        await stateHistoryAnimation(this._view, this._state, updateState).play();

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
    } catch (e) {
      throw e;
    }
  }

  /**
   * ゲーム終了時の処理
   *
   * @param gameEnd ゲーム終了情報
   */
  async _onEndGame(gameEnd: GameEnd): Promise<void> {
    try {
      await delay(1000).play();
      this._endBattle.next({
        type: 'endBattle',
        gameEnd: gameEnd
      });
    } catch(e) {
      throw e;
    }
  }
}
