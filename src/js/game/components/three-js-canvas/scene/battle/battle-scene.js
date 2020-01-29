// @flow
import type {Resources} from '../../../../../resource';
import {BattleSceneView} from "./view";
import type {BattleSceneState} from "./state/battle-scene-state";
import type {GameLoop} from "../../../../../action/game-loop/game-loop";
import {Observable, Subject, Subscription} from "rxjs";
import type {TdDOMEvent} from "../../../../../action/td-dom";
import type {DecideBattery} from "../../../../../action/battle-scene/decide-battery";
import {createInitialState} from "./state/initial-state";
import type {BattleRoom, InitialState} from "../../../../../battle-room/battle-room";
import {stateHistoryAnimation} from "./animation/state-history";
import {invisibleUI} from "./animation/invisible-ui";
import type {Render} from "../../../../../action/game-loop/render";
import type {DoBurst} from "../../../../../action/battle-scene/do-burst";
import type {Command} from "gbraver-burst-core/lib/command/command";
import {take} from "rxjs/operators";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {delay} from "../../../../../animation/delay";
import type {EndBattle} from "../../../../../action/game/end-battle";
import type {Scene} from "../scene";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  battleRoom: BattleRoom,
  initialState: InitialState,
  listener: {
    domEvent: Observable<TdDOMEvent>,
    gameLoop: Observable<GameLoop>,
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
  _endBattle: Subject<EndBattle>;
  _battleRoom: BattleRoom;
  _view: BattleSceneView;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._state = createInitialState(param.initialState.playerId);
    this._endBattle = new Subject();
    this._battleRoom = param.battleRoom;
    this._view = new BattleSceneView({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.initialState.playerId,
      players: param.initialState.players,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent,
      }
    });

    this._subscription = [
      this._view.notifier().battleAction.subscribe(action => {
        if (action.type === 'decideBattery') {
          this._onDecideBattery(action);
        } else if (action.type === 'doBurst') {
          this._onBurst(action);
        }
      }),

      param.listener.gameLoop.pipe(
        take(1)
      ).subscribe(action => {
        this._start(param.initialState.stateHistory);
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
   * 戦闘シーン開始時の処理
   * 
   * @param stateHistory 初期ステータス
   */
  async _start(stateHistory: GameState[]): Promise<void> {
    try {
      const animation = delay(500)
        .chain(this._view.hud.gameObjects.fader.fadeIn())
        .chain(stateHistoryAnimation(this._view, this._state, stateHistory));
      await animation.play();
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
      await invisibleUI(this._view).play();
      const lastState = await this._progressGame({
        type: 'BATTERY_COMMAND',
        battery: action.battery
      });
      if (lastState && lastState.effect.name === 'GameEnd') {
        this._onEndGame();
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
      await invisibleUI(this._view).play();
      const lastState = await this._progressGame({type: 'BURST_COMMAND'});
      if (lastState && lastState.effect.name === 'GameEnd') {
        this._onEndGame();
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
        const updateState = await this._battleRoom.progress(lastCommand);
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

  /** ゲーム終了時の処理 */
  async _onEndGame(): Promise<void> {
    try {
      const animation = this._view.hud.gameObjects.fader.fadeOut();
      await animation.play();
      this._endBattle.next({type: 'endBattle'});
    } catch(e) {
      throw e;
    }
  }
}
