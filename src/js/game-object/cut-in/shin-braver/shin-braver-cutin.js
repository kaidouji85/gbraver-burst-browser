// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import type {ShinBraverCutInModel} from "./model/shin-braver-cutin-model";
import {ShinBraverCutInView} from "./view/shin-braver-cutin-view";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {Animate} from "../../../animation/animate";
import {burst} from "./animation/burst";
import {hidden} from "./animation/hidden";
import type {PreRender} from "../../../action/game-loop/pre-render";

/** メッシュの大きさ */
export const MESH_SIZE = 200;

/**
 * シンブレイバーカットイン
 */
export class ShinBraverCutIn {
  _model: ShinBraverCutInModel;
  _view: ShinBraverCutInView;
  _subscription: Subscription;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new ShinBraverCutInView(resources);
    this._subscription = listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * 3Dレイヤーのオブジェクトをトラッキングする
   * 本メソッドにはHUDレイヤー系座標をセットすること
   *
   * @param x x座標
   */
  tracking(x: number): void {
    this._model.tracking.x = x;
  }

  /**
   * カットインアニメーションを再生する
   *
   * @return アニメーション
   */
  play(): Animate {
    return burst(this._model);
  }

  /**
   * カットインを非表示にする
   *
   * @return {Animate}
   */
  hidden(): Animate {
    return hidden(this._model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }
}