// @flow

import {Group} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../common/armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {SpriteGameLoop} from "../../../action/sprite-game-loop/sprite-game-loop";
import type {GameObjectAction} from "../../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;
  _tweenGroup: Group;

  constructor(params: { view: NeoLandozerView, listener: Observable<GameObjectAction> }) {
    this._model = createInitialValue();
    this._view = params.view;
    this._tweenGroup = new Group();

    params.listener.subscribe(action => {
      switch (action.type) {
        case 'SpriteGameLoop':
          this._gameLoop(action);
          return;
        default:
          return;
      }
    });

    // TODO シーンから呼ぶようにする
    this.stand();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 立ち状態にする */
  stand(): void {
    stand(this._model, this._tweenGroup).start();
  }

  /** ゲームループ */
  _gameLoop(action: SpriteGameLoop): void {
    this._tweenGroup.update(action.time);
    this._view.engage(this._model, action.camera);
  }
}


