// @flow

import * as THREE from 'three';
import type {TsubasaModel} from "./model/tsubasa-model";
import type {TsubasaView} from "./view/tsubasa-view";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../../game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {show} from "./animation/show";
import {hidden} from "./animation/hidden";
import {TsubasaSounds} from "./sounds/tsubasa-sounds";
import type {Resources} from "../../../resource";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, Unsubscriber} from "../../../stream/core";

/**
 * ツバサ カットイン
 */
export class TsubasaCutIn {
  _model: TsubasaModel;
  _view: TsubasaView;
  _sounds: TsubasaSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: TsubasaView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new TsubasaSounds(resources);
    this._unsubscriber = gameObjectAction.subscribe(action => {
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
    this._unsubscriber.unsubscribe();
  }

  /**
   * カットインを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this._model, this._sounds);
  }

  /**
   * カットインを非表示にする
   *
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this._model);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
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