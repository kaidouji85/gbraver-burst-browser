// @flow

import {ArmDozerSprite} from '../armdozer-sprite';
import * as THREE from "three";
import type {ShinBraverView} from "./view/shin-braver-view";
import {stand} from "./animation/stand";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import type {ShinBraverModel} from "./model/shin-braver-model";
import {createInitialValue} from "./model/initial-value";
import type {Update} from "../../../action/game-loop/update";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {punch} from "./animation/punch";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import {charge} from "./animation/charge";
import {attack} from "./animation/attack";

/** シンブレイバーのゲームオブジェクト */
export class ShinBraver implements ArmDozerSprite {
  _model: ShinBraverModel;
  _view: ShinBraverView;

  constructor(params: { view: ShinBraverView, listener: Observable<GameObjectAction> }) {
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

  /** 立ちポーズにする */
  stand(): Animate {
    return stand(this._model);
  }

  // TODO 削除する
  /** パンチアニメーションを再生する */
  punch(): Animate {
    return punch(this._model);
  }

  charge(): Animate {
    return charge(this._model);
  }

  attack(): Animate {
    return attack(this._model);
  }

  /** パンチをしてから攻撃がヒットするまでの時間 */
  punchHitDuration(): number {
    return 1600;
  }

  /** ダメージアニメーションを再生する */
  knockBack(): Animate {
    return empty();
  }

  /** ノックバックから立ちに戻る */
  recoverKnockBack(): Animate {
    return empty();
  }

  /** シーンに追加するオブジェクトを返す */
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