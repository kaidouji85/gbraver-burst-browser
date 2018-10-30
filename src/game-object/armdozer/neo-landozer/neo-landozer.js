// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../common/armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;
  _tweenGroup: Group;

  constructor(params: { view: NeoLandozerView, listener: Observable<GameObjectAction> }) {
    this._model = createInitialValue();
    this._view = params.view;
    this._tweenGroup = new Group();

    params.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });

    // TODO シーンから呼ぶようにする
    this.stand().start();
  }

  /** 立ち状態にする */
  stand(): Tween {
    return stand(this._model, this._tweenGroup);
  }

  /** パンチアニメーションを再生する */
  punch(): MultiTween {
    // TODO ネオランドーザのアニメーションを作成する
    return createEmptyMultiTween();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._tweenGroup.update(action.time);
    this._view.engage(this._model);
  }

  /** レンダリング直前の処理 */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}