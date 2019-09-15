// @flow

import {BattleScene} from "../scene/battle";
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
import {OfflineBattleRoom} from "../battle-room/offline-battle-room";
import type {GameLoop} from "../action/game-loop/game-loop";
import type {DOMEvent} from "../action/dom-event";
import {createRender} from "../render/create-render";

/** ゲーム全体の制御を行う */
export class Game {
  _resources: Resources;
  _scene: BattleScene;
  _threeJsRender: THREE.WebGLRenderer;
  _renderer: Renderer;
  _gameLoop: Observable<GameLoop>;
  _domEvent: Observable<DOMEvent>;
  _endBattle: Subject<EndBattle>;
  _subscription: Subscription;

  constructor(resources: Resources) {
    this._threeJsRender = createRender();
    if (this._threeJsRender.domElement && document.body) {
      document.body.appendChild(this._threeJsRender.domElement);
    }

    this._resources = resources;
    this._gameLoop = createGameLoopListener();
    this._domEvent = createDOMEventListener(this._threeJsRender.domElement);
    this._renderer = new Renderer({
      renderer: this._threeJsRender,
      listener: {
        domEvent: this._domEvent
      }
    });
    this._endBattle = new Subject();

    this._subscription = this._endBattle.subscribe(action => {
      if (action.type === 'endBattle') {
        this._onEndBattle(action);
      }
    });

    this._startBattle();
  }

  /**
   * 戦闘シーン終了時の処理
   *
   * @param action アクション
   */
  _onEndBattle(action: EndBattle): void {
    this._scene.destructor();
    this._startBattle();
  }

  /** 戦闘を開始するヘルパーメソッド */
  async _startBattle() {
    // TODO テスト用にダミーデータを用いている
    const player: Player = {
      playerId: 'test01',
      armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
    };
    player.armdozer.power = 6000; // TODO 開発用
    const npc: NPC = NeoLandozerNpc;
    const battleRoom = new OfflineBattleRoom(player, npc);
    const initialState = await battleRoom.start();

    this._scene = new BattleScene({
      resources: this._resources,
      rendererDOM: this._threeJsRender.domElement,
      battleRoom: battleRoom,
      initialState: initialState,
      listener: {
        domEvent: this._domEvent,
        gameLoop: this._gameLoop,
      },
      notifier: {
        render: this._renderer.getRenderNotifier(),
        endBattle: this._endBattle
      }
    });
    // デバッグ用にレンダラ情報をコンソールに出力
    // console.log(this._renderer._renderer.info);
  }
}