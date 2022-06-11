// @flow

import * as THREE from 'three';
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../game-loop/pre-render";
import type {Resources} from "../../resource";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {popUp} from "./animation/pop-up";
import type {BatteryEnchantmentModel} from "./model/battery-enchantment-model";
import {createInitialValue} from "./model/initial-value";
import {BatteryEnchantmentSounds} from "./sounds/battery-enchantment-sounds";
import type {BatteryEnchantmentView} from "./view/battery-enchantment-view";

/**
 * バッテリー増強
 */
export class BatteryEnchantment {
  _model: BatteryEnchantmentModel;
  _view: BatteryEnchantmentView;
  _sounds: BatteryEnchantmentSounds;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: BatteryEnchantmentView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = view;
    this._sounds = new BatteryEnchantmentSounds(resources);
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