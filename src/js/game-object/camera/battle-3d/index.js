// @flow

import * as THREE from "three";
import type {DOMEvent} from "../../../action/dom-event";
import type {Resize} from "../../../action/dom-event/resize";
import {onResizePerspectiveCamera} from "../../../camera/resize";
import {merge, Observable, Subscription} from "rxjs";
import type {Battle3DCameraModel} from "./model/model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import {engage} from "./engauge";
import {Animate} from "../../../animation/animate";
import {zoomIn} from "./animation/zoom-in";
import {zoomOut} from "./animation/zoom-out";
import type {Position} from './animation/position';
import {moveViewPoint} from "./animation/move-view-point";
import {moveCamera} from "./animation/move-camera";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>,
    update: Observable<Update>
  }
};

/** 戦闘シーン3Dレイヤー用カメラ */
export class Battle3DCamera {
  _model: Battle3DCameraModel;
  _camera: THREE.PerspectiveCamera;
  _subscription: Subscription;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    this._subscription = merge(
      param.listener.domEvent,
      param.listener.update
    ).subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      } else if (action.type === 'Update') {
        this._update(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /**
   * ズームイン
　　*
   * @param duration ミリ秒単位のアニメーション時間
   * @return アニメーション
   */
  zoomIn(duration: number): Animate {
    return zoomIn(this._model, duration);
  }

  /**
   * ズームアウト
   *
   * @param duration ミリ秒単位のアニメーション時間
   * @return アニメーション
   */
  zoomOut(duration: number): Animate {
    return zoomOut(this._model, duration);
  }

  /**
   * カメラ視点を移動する
   *
   * @param position 移動先座標
   * @param duration 移動時間
   * @return アニメーション
   */
  moveViewPoint(position: Position, duration: number): Animate {
    return moveViewPoint(this._model, position, duration);
  }

  /**
   *カメラを移動する
   *
   * @param position 移動先座標
   * @param duration 移動時間
   * @return アニメーション
   */
  moveCamera(position: Position, duration: number): Animate {
    return moveCamera(this._model, position, duration);
  }

  /** カメラを取得する */
  getCamera(): THREE.Camera {
    return this._camera;
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onResizePerspectiveCamera(this._camera, action.width, action.height);
  }

  /** 状態更新 */
  _update(action: Update): void {
    engage(this._model, this._camera);
  }
}