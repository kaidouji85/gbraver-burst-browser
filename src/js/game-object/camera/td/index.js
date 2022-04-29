// @flow

import * as THREE from "three";
import type {Resize} from "../../../window/resize";
import {onResizePerspectiveCamera} from "../../../camera/resize";
import type {Battle3DCameraModel} from "./model/model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../game-loop/update";
import {engage} from "./engauge";
import {Animate} from "../../../animation/animate";
import type {Position} from './position';
import {lookAt} from "./animation/look-at";
import {move} from "./animation/move";
import {getViewPortHeight, getViewPortWidth} from "../../../view-port/view-port-size";
import type {Stream, Unsubscriber} from "../../../stream/stream";

// TODO カメラ位置、カメラ視点をコンストラクタから渡す
/** 戦闘シーン3Dレイヤー用カメラ */
export class TDCamera {
  _model: Battle3DCameraModel;
  _camera: typeof THREE.PerspectiveCamera;
  _unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param update Updateストリーム
   * @param resize リサイズストリーム
   */
  constructor(update: Stream<Update>, resize: Stream<Resize>) {
    this._model = createInitialValue();
    const aspect = getViewPortWidth() / getViewPortHeight();
    this._camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
    this._unsubscriber = [
      update.subscribe(() => {
        this._update();
      }),
      resize.subscribe(action => {
        this._resize(action);
      })
    ];
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this._unsubscriber.forEach(v => {
      v.unsubscribe();
    })
  }

  /**
   * カメラ視点を移動する
   *
   * @param position 移動先座標
   * @param duration 移動時間
   * @return アニメーション
   */
  lookAt(position: Position, duration: number): Animate {
    return lookAt(this._model, position, duration);
  }

  /**
   *カメラを移動する
   *
   * @param position 移動先座標
   * @param duration 移動時間
   * @return アニメーション
   */
  move(position: Position, duration: number): Animate {
    return move(this._model, position, duration);
  }

  /**
   * カメラを取得する
   *
   * @return カメラ
   */
  getCamera(): typeof THREE.Camera {
    return this._camera;
  }

  /**
   * リサイズ時の処理
   *
   * @param action アクション
   */
  _resize(action: Resize): void {
    onResizePerspectiveCamera(this._camera, action.width, action.height);
  }

  /**
   * 状態更新
   */
  _update(): void {
    engage(this._model, this._camera);
  }
}