// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {ANIMATION_STAND} from "./model/shin-braver-model";
import type {ShinBraverView} from "./view/shin-braver-view";
import {stand} from "./model/stand";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;
  _tweenGroup: Group;

  constructor(params: {view: ShinBraverView}) {
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
  gameLoop(camera: THREE.Camera, time: DOMHighResTimeStamp): void {
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
}


