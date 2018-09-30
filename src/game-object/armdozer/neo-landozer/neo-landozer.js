// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../common/armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import {ANIMATION_STAND} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {stand} from "./model/stand";
import {Observable} from "rxjs";
import {filter} from 'rxjs/operators';
import type {SpriteGameLoop} from "../../../action/sprite-game-loop/sprite-game-loop";
import type {GameObjectAction} from "../../../action/game-object-action";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;
  _tweenGroup: Group;

  constructor(params: {view: NeoLandozerView, listener: Observable<GameObjectAction>}) {
    this._model = {
      position: {
        x: 150,
        y: 0,
        z: 400
      },
      animation: {
        type: ANIMATION_STAND,
        frame: 0
      }
    };
    this._view = params.view;
    this._tweenGroup = new Group();

    params.listener
      .subscribe(action => {
        switch (action.type) {
          case 'SpriteGameLoop':
            this._gameLoop(action);
            return;
          default:
            return;
        }
      });
  }

  /** ゲームループ */
  _gameLoop(action: SpriteGameLoop): void {
    this._tweenGroup.update(action.time);
    this._view.gameLoop(this._model, action.camera);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 立ち状態にする */
  stand(): void {
    stand(this._model, this._tweenGroup);
  }
}


