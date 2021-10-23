// @flow

import * as THREE from 'three';
import type {ContinuousAttackView} from "./view/continuous-attack-view";
import type {ContinuousAttackModel} from "./model/continuous-attack-model";
import {createInitialValue} from "./model/initial-value";
import type {PreRender} from "../../game-loop/pre-render";
import {Animate} from "../../animation/animate";
import {popUp} from "./animation/pop-up";
import {ContinuousAttackSounds} from "./sounds/continuous-attack-sounds";
import type {Resources} from "../../resource";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, Unsubscriber} from "../../stream/core";

/**
 * 連続攻撃
 */
export class ContinuousAttackIndicator {
  _model: ContinuousAttackModel;
  _view: ContinuousAttackView;
  _sounds: ContinuousAttackSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: ContinuousAttackView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new ContinuousAttackSounds(resources);
    this._unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      } else if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._view.destructor();
    this._unsubscriber.unsubscribe();
  }

  /**
   * ポップアップ
   * 
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this._model, this._sounds);
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
   * アップデート時の処理
   */
  _onUpdate(): void {
    this._view.engage(this._model);
  }

  /**
   * プリレンダー時の処置
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}