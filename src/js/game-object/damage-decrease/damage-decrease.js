// @flow

import * as THREE from 'three';
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../game-loop/pre-render";
import type {Resources} from "../../resource";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {popUp} from "./animation/pop-up";
import type {DamageDecreaseModel} from "./model/damage-decrease-model";
import {createInitialValue} from "./model/initial-value";
import {DamageDecreaseSounds} from "./sounds/damage-decrease-sounds";
import type {DamageDecreaseView} from "./view/damage-decrease-view";

/**
 * ダメージ減少
 */
export class DamageDecrease {
  #model: DamageDecreaseModel;
  #view: DamageDecreaseView;
  #sounds: DamageDecreaseSounds;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param view ビュー
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: DamageDecreaseView, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this.#model = createInitialValue();
    this.#view = view;
    this.#sounds = new DamageDecreaseSounds(resources);
    this.#unsubscriber = gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this.#onUpdate();
      } else if (action.type === 'PreRender') {
        this.#onPreRender(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * ポップアップ
   * 
   * @return アニメーション
   */
  popUp(): Animate {
    return popUp(this.#model, this.#sounds);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * アップデート時の処理
   */
  #onUpdate(): void {
    this.#view.engage(this.#model);
  }

  /**
   * プリレンダー時の処置
   *
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#view.lookAt(action.camera);
  }
}