// @flow

import type {Resources} from "../../../resource";
import type {ArmDozerSprite} from "../armdozer-sprite";
import * as THREE from "three";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import type {LightningDozerModel} from "./model/lightning-dozer-model";
import {createInitialValue} from "./model/initial-value";
import type {LightningDozerView} from "./view/lightning-dozer-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/**
 *　ライトニングドーザ
 */
export class LightningDozer implements ArmDozerSprite {
  _model: LightningDozerModel;
  _view: LightningDozerView;

  constructor(resources: Resources, listener: Observable<GameObjectAction>, view: LightningDozerView) {
    this._model = createInitialValue();
    this._view = view;
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._view.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** ターンスタート */
  turnStart(): Animate {
    return empty();
  }

  /** ターンスタート -> 立ち */
  turnStartToStand(): Animate {
    return empty();
  }

  /** ノックバック */
  knockBack(): Animate {
    return empty();
  }

  /** ノックバック -> 立ちポーズ */
  knockBackToStand(): Animate {
    return empty();
  }

  /** ガード */
  guard(): Animate {
    return empty();
  }

  /** ガード -> 立ちポーズ */
  guardToStand(): Animate {
    return empty();
  }

  /** 避け */
  avoid(): Animate {
    return empty();
  }

  /** 避け -> 立ち */
  avoidToStand(): Animate {
    return empty();
  }

  /** ダウン */
  down(): Animate {
    return empty();
  }
}