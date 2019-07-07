// @flow

import * as THREE from "three";
import type {DOMEvent} from "../../../action/dom-event";
import type {Resize} from "../../../action/dom-event/resize";
import {onResizePerspectiveCamera} from "../../../camera/resize";
import {merge, Observable} from "rxjs";
import type {Battle3DCameraModel} from "./model/model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import {engage} from "./engauge";
import type {GameObjectAction} from "../../../action/game-object-action";
import {Animate} from "../../../animation/animate";
import {zoomIn} from "./animation/zoom-in";
import {zoomOut} from "./animation/zoom-out";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>,
    gameObject: Observable<GameObjectAction>
  }
};

/** 戦闘シーン3Dレイヤー用カメラ */
export class Battle3DCamera {
  _model: Battle3DCameraModel;
  _camera: THREE.PerspectiveCamera;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    merge(param.listener.domEvent, param.listener.gameObject).subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      } else if (action.type === 'Update') {
        this._update(action);
      }
    })
  }

  /** ズームイン */
  zoomIn(): Animate {
    return zoomIn(this._model);
  }

  /** ズームアウト */
  zoomOut(): Animate {
    return zoomOut(this._model);
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