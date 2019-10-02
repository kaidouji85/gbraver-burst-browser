// @flow

import {BattleScene} from "./battle";
import type {Resources} from "../resource";
import * as THREE from "three";
import {createGameLoopListener} from "../action/game-loop/create-listener";
import {createDOMEventListener} from "../action/dom-event/create-listener";
import {Renderer} from "../game-object/renderer";
import {Observable, Subject, Subscription} from "rxjs";
import type {EndBattle} from "../action/game/end-battle";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core/lib/master/armdozers";
import type {NPC} from "../npc/npc";
import {NeoLandozerNpc} from "../npc/neo-landozer-npc";
import type {GameLoop} from "../action/game-loop/game-loop";
import type {DOMEvent} from "../action/dom-event";
import {createRender} from "../render/create-render";
import {OfflineBattleRoom} from "../battle-room/offline-battle-room";
import type {Render} from "../action/game-loop/render";

/** シーン */
export type Scene = {
  destructor(): void;
};

/** 空のシーン */
export function emptyScene(): Scene {
  return {
    destructor: () => {
      // NOP
    }
  };
}

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;

  _threeJsRender: THREE.WebGLRenderer;
  _domEvent: Observable<DOMEvent>;
  _renderAction: Subject<Render>;
  _renderer: Renderer;

  _scene: Scene;
  _sceneSubscription: Subscription[];

  _gameLoop: Observable<GameLoop>;
  _endBattle: Subject<EndBattle>;
  _gameSubscription: Subscription[];

  constructor(resources: Resources) {
    this._resources = resources;

    this._threeJsRender = createRender();
    if (this._threeJsRender.domElement && document.body) {
      document.body.appendChild(this._threeJsRender.domElement);
    }
    this._domEvent = createDOMEventListener(this._threeJsRender.domElement);
    this._renderAction = new Subject();
    this._renderer = new Renderer({
      renderer: this._threeJsRender,
      listener: {
        domEvent: this._domEvent,
        render: this._renderAction
      }
    });

    this._scene = emptyScene();
    this._sceneSubscription = [];

    this._gameLoop = createGameLoopListener();
    this._endBattle = new Subject();
    this._gameSubscription = [
      this._endBattle.subscribe(action => {
        this._onEndBattle(action);
      })
    ];

    this._onStart();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._scene.destructor();
    this._disposeSceneSubscription();
    this._disposeGameSubscription();
  }

  /** ゲーム開始時のイベント */
  async _onStart(): Promise<void> {
    const battleScene = await this._createBattleScene();
    this._changeBattleScene(battleScene);
    // デバッグ用にレンダラ情報をコンソールに出力
    //console.log(this._renderer._renderer.info);
  }

  /**
   * 戦闘シーン終了時の処理
   *
   * @param action アクション
   */
  async _onEndBattle(action: EndBattle): Promise<void> {
    const battleScene = await this._createBattleScene();
    this._changeBattleScene(battleScene);
    // デバッグ用にレンダラ情報をコンソールに出力
    //console.log(this._renderer._renderer.info);
  }

  /**
   * 戦闘シーンを生成する
   *
   * @returns 戦闘シーン
   */
  async _createBattleScene(): Promise<BattleScene> {
    // TODO テスト用にダミーデータを用いている
    const player: Player = {
      playerId: 'test01',
      armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
    };
    const npc: NPC = NeoLandozerNpc;
    const battleRoom = new OfflineBattleRoom(player, npc);
    const initialState = await battleRoom.start();

    return new BattleScene({
      resources: this._resources,
      rendererDOM: this._threeJsRender.domElement,
      battleRoom: battleRoom,
      initialState: initialState,
      listener: {
        domEvent: this._domEvent,
        gameLoop: this._gameLoop,
      }
    });
  }

  /**
   * 現在のシーンを戦闘シーンに変更する
   *
   * @param battleScene 戦闘シーン
   */
  _changeBattleScene(battleScene: BattleScene): void {
    this._disposeSceneSubscription();
    this._scene.destructor();

    this._scene = battleScene;
    this._sceneSubscription = [
      battleScene.notifier().render.subscribe(this._renderAction),
      battleScene.notifier().endBattle.subscribe(this._endBattle)
    ];
  }

  /** シーン固有のサブスクリプションを破棄する */
  _disposeSceneSubscription(): void {
    this._sceneSubscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /** ゲーム固有のサブスクリプションを破棄する */
  _disposeGameSubscription(): void {
    this._gameSubscription.forEach(v => {
      v.unsubscribe();
    });
  }
}