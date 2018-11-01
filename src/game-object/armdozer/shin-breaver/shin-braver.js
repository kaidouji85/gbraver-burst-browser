// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ArmDozerSprite} from '../common/armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverView} from "./view/shin-braver-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import type {MultiTween} from "../../../depricated-tween/multi-tween/multi-tween";
import {punch} from "./animation/punch";
import {createEmptyMultiTween} from "../../../depricated-tween/multi-tween/empty-multi-tween";
import {myTurn} from "./animation/my-turn";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;
  _tweenGroup: Group;

  constructor(params: { view: ShinBraverView, listener: Observable<GameObjectAction> }) {
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
  }

  /** 立ちポーズにする */
  stand(): Tween {
    return stand(this._model, this._tweenGroup);
  }

  /** マイターンのアニメ */
  myTurn(): MultiTween {
    return myTurn(this._model, this._tweenGroup);
  }

  /** パンチアニメーションを再生する */
  punch(): MultiTween {
    return punch(this._model, this._tweenGroup);
  }

  /** シーンに追加するオブジェクトを返す */
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