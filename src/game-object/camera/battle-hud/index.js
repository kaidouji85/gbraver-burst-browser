// @flow

import * as THREE from "three";
import {createCamera} from "./camera";
import type {DOMEvent} from "../../../action/dom-event";
import {Observable, Subscription} from "rxjs";
import type {Resize} from "../../../action/dom-event/resize";
import {onResizeOrthographicCamera} from "../../../camera/resize";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>,
  }
};

/** 戦闘シーンHUDレイヤー用カメラ */
export class BattleHUDCamera {
  _camera: THREE.OrthographicCamera;
  _subscription: Subscription;

  constructor(param: Param) {
    this._camera = createCamera();

    this._subscription = param.listener.domEvent.subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /** カメラを取得する */
  getCamera(): THREE.Camera {
    return this._camera;
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onResizeOrthographicCamera(this._camera, action.width, action.height);
  }
}