// @flow

import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {NeoLandozerModel} from "./model/neo-landozer-model";
import type {NeoLandozerView} from "./view/neo-landozer-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import {knockBack} from "./animation/knock-back";
import {recoverKnockBack} from "./animation/recover-knock-back";

/** ネオランドーザのゲームオブジェクト */
export class NeoLandozer implements ArmDozerSprite {
  _model: NeoLandozerModel;
  _view: NeoLandozerView;

  constructor(params: { view: NeoLandozerView, listener: Observable<GameObjectAction> }) {
    this._model = createInitialValue();
    this._view = params.view;

    params.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** 立ち状態にする */
  stand(): Animate {
    return stand(this._model);
  }

  /** 攻撃する */
  attack(): Animate {
    return empty();
  }

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number {
    return 0;
  }

  /** ダメージアニメーションを再生する */
  knockBack(): Animate {
    return knockBack(this._model);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }

  /** レンダリング直前の処理 */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}