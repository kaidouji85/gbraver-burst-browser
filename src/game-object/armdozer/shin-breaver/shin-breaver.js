// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {ANIMATION_STAND} from "./model/shin-braver-model";
import type {ShinBraverView} from "./view/shin-braver-view";
import {stand} from "./model/stand";
import {Observable} from "rxjs";
import type {SpriteGameLoop} from "../../../action/sprite-game-loop/sprite-game-loop";
import type {GameObjectAction} from "../../../action/game-object-action";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;
  _tweenGroup: Group;

  constructor(params: {view: ShinBraverView, listener: Observable<GameObjectAction>}) {
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

    params.listener.subscribe(action => {
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


