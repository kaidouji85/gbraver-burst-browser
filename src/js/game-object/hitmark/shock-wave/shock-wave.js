// @flow

import {Howl} from 'howler';
import * as THREE from 'three';
import type {ShockWaveView} from "./view/shock-wave-view";
import type {ShockWaveModel} from "./model/shock-wave-model";
import type {PreRender} from "../../../game-loop/pre-render";
import {Animate} from "../../../animation/animate";
import {popUp} from "./animation/pop-up";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import {process} from '../../../animation/process';
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, Unsubscriber} from "../../../stream/core";

/**
 * 衝撃波
 */
export class ShockWave {
  _model: ShockWaveModel;
  _view: ShockWaveView;
  _hitSound: typeof Howl;
  _subscription: Unsubscriber;

  /**
   * リソース管理オブジェクト
   *
   * @param view ビュー
   * @param initialModel モデルの初期値
   * @param resources リソース管理オブジェクト
   * @param listener イベントリスナ
   */
  constructor(view: ShockWaveView, initialModel: ShockWaveModel, resources: Resources, listener: Stream<GameObjectAction>) {
    this._model = initialModel;
    this._view = view;

    const hitResource = resources.sounds.find(v => v.id === SOUND_IDS.MECHA_IMPACT);
    this._hitSound = hitResource
      ? hitResource.sound
      : new Howl();

    this._subscription = listener.subscribe(action => {
      if (action.type === 'Update') {
        this._onUpdate();
      } else if (action.type === 'PreRender') {
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
   * 衝撃波を表示する
   *
   * @return アニメーション
   */
  popUp(): Animate {
    return process(() => {
      this._hitSound.play();
    })
      .chain(popUp(this._model));
  }

  /**
   * シーンに追加するオブジェクトを返す
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
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}