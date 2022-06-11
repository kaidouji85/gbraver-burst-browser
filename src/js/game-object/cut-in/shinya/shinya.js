// @flow

import * as THREE from 'three';
import {Animate} from "../../../animation/animate";
import type {PreRender} from "../../../game-loop/pre-render";
import type {Resources} from "../../../resource";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GameObjectAction} from "../../action/game-object-action";
import {hidden} from "./animation/hidden";
import {show} from "./animation/show";
import {createInitialValue} from "./model/initial-value";
import type {ShinyaModel} from "./model/shinya-model";
import {ShinyaSounds} from "./sounds/shinya-sounds";
import type {ShinyaView} from "./view/shinya-view";

/**
 * シンヤ カットイン
 */
export class ShinyaCutIn {
  _model: ShinyaModel;
  _view: ShinyaView;
  _sounds: ShinyaSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: ShinyaView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new ShinyaSounds(resources);
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