// @flow

import {ArmDozerSprite} from '../base';
import {ShinBraverStateContainer} from "./state";
import * as THREE from "three";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _state: ShinBraverState;
  _stateContainer: ShinBraverStateContainer;
  _view: ShinBraverView;

  constructor(params: {view: ShinBraverView}) {
    this._model = {
      position: {
        x: 150,
        y: 0,
        z: 400
      },
      animation: {
        type: 'STAND',
        frame: 0
      }
    };
    this._stateContainer = new ShinBraverStateContainer();
    this._state = this._stateContainer.stand;
    this._view = params.view;
  }

  gameLoop(camera: THREE.Camera): void {
    this._model = this._state.gameLoop(this._model);
    this._view.gameLoop(this._model, camera);
  }

  getThreeJsObjects(): THREE.Object3D[] {
    return this._view.getThreeJsObjects();
  }
}

/** シンブレイバーのモデル */
export interface ShinBraverModel {
  position: {
    x: number,
    y: number,
    z: number
  },
  animation: {
    type: AnimationType,
    frame: number,
  }
}

/** アニメーションタイプ */
export type AnimationType = 'STAND';

/** シンブレイバーの状態オブジェクト */
export interface　ShinBraverState {
  gameLoop(model: ShinBraverModel): ShinBraverModel;
}

/** シンブレイバーのビュー */
export interface ShinBraverView {
  gameLoop(model: ShinBraverModel, camera: THREE.Camera): void;
  getThreeJsObjects(): THREE.Object3D[];
}