// @flow

import * as THREE from 'three';
import type {DOMEvent} from "../../../../action/dom-event";
import {PlainHUDCamera} from "../../../../game-object/camera/plain-hud";
import {Observable, Subject, Subscription} from "rxjs";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {Update} from "../../../../action/game-loop/update";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {Render} from "../../../../action/game-loop/render";
import {TitleLogo} from "../../../../game-object/title-logo";
import {toOverlapObservable} from "../../../../action/overlap/dom-event-to-overlap";
import type {Resources} from "../../../../resource";
import type {OverlapAction} from "../../../../action/overlap";
import {toGameObjectActionObservable} from "../../../../action/game-object-action/create-listener";
import type {EndTitle} from "../../../../action/game/end-title";
import type {MouseDown} from "../../../../action/dom-event/mouse-down";
import type {TouchStart} from "../../../../action/dom-event/touch-start";
import type {TitleSceneAction} from "../../../../action/title-scene/title-scene-action";
import {Fader} from "../../../../game-object/fader/fader";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>,
  titleAction: Observable<TitleSceneAction>,
};

/** タイトルシーン HUDレイヤー */
export class TitleHudLayer {
  scene: THREE.Scene;
  camera: PlainHUDCamera;
  titleLogo: TitleLogo;
  fader: Fader;

  _rendererDOM: HTMLElement;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;
  _overlap: Observable<OverlapAction>;
  _titleAction: Subject<TitleSceneAction>;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = new Subject();
    this._titleAction = new Subject();
    this._rendererDOM = param.rendererDOM;

    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera({
      listener: {
        domEvent: param.listener.domEvent
      }
    });

    this._overlap = toOverlapObservable(param.listener.domEvent, this._rendererDOM, this.camera.getCamera());
    const gameObjectAction = toGameObjectActionObservable(this._update, this._preRender, this._overlap);

    this.titleLogo = new TitleLogo(param.resources, gameObjectAction);
    this.scene.add(this.titleLogo.getObject3D());

    this.fader = new Fader({
      isVisible: true,
      listener: gameObjectAction
    });
    this.scene.add(this.fader.getObject3D());

    this._subscription = [
      param.listener.gameLoop.subscribe(action => {
        this._onGameLoop(action);
      }),

      param.listener.domEvent.subscribe(action => {
        if (action.type === 'mouseDown') {
          this._onMouseDown(action);
        } else if (action.type === 'touchStart') {
          this._onTouchStart(action);
        }
      })
    ];
  }

  /** デストラクタ相当処理 */
  destructor(): void {
    this.camera.destructor();
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
      render: this._render,
      titleAction: this._titleAction,
    };
  }

  /**
   * ゲームループの際の処理
   *
   * @param action ゲームループアクション
   */
  _onGameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera(),
      rendererDOM: this._rendererDOM,
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }

  /**
   * マウスダウン時の処理
   *
   * @param action アクション
   */
  _onMouseDown(action: MouseDown): void {
    this._titleAction.next({type: 'ScreenTouch'});
  }

  /**
   * タッチスタート時の処理
   *
   * @param action アクション
   */
  _onTouchStart(action: TouchStart): void {
    this._titleAction.next({type: 'ScreenTouch'});
  }
}