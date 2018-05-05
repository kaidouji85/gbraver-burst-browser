// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import {ANIMATION_STAND} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {stand} from "./model/stand";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;
  _tweenGroup: Group;

  constructor(params: {view: NeoLandozerView}) {
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
  }

  /** ゲームループ毎の処理*/
  gameLoop(time: DOMHighResTimeStamp, camera: THREE.Camera): void {
    this._tweenGroup.update(time);
    this._view.gameLoop(this._model, camera);
  }

  /** 本スプライトに関連するthree.jsオブジェクトを返す */
  getThreeJsObjects(): THREE.Object3D[] {
    return this._view.getThreeJsObjects();
  }

  /** 立ち状態にする */
  stand(): Tween {
    return stand(this._model, this._tweenGroup);
  }

  /** 本オブジェクトに関連するTweenを全削除する */
  removeTween() {
    this._tweenGroup.removeAll();
  }
}


