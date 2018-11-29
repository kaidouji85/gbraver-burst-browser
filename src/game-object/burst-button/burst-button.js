// @flow

import * as THREE from 'three';
import type {BurstButtonModel} from "./model/burst-button-model";
import {BurstButtonView} from "./view/burst-button-view";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import {visible} from './animation/visible';
import {invisible} from './animation/invisible';
import type {Update} from "../../action/game-loop/update";
import {Animate} from "../../animation/animate";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** バーストボタン */
export class BurstButton {
  _model: BurstButtonModel;
  _view: BurstButtonView;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = new BurstButtonView(param.resources);
    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      }
    });
  }

  /** ボタンを表示する */
  visible(): Animate {
    return visible(this._model);
  }

  /**
   * ボタンを非表示にする
   * 本アニメはディライの値に関わらず、再生された時点でdisabled=trueになる
   *
   * @param delay 非表示アニメが再生されるまでディライ
   */
  invisible(): Animate {
    return invisible(this._model);
  }

  /** three.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }
}