// @flow

import {Howl} from 'howler';
import * as THREE from 'three';
import {Animate} from "../../../animation/animate";
import {process} from '../../../animation/process';
import type {PreRender} from "../../../game-loop/pre-render";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GameObjectAction} from "../../action/game-object-action";
import {popUp} from "./animation/pop-up";
import type {ShockWaveModel} from "./model/shock-wave-model";
import type {ShockWaveView} from "./view/shock-wave-view";

/**
 * 衝撃波
 */
export class ShockWave {
  _model: ShockWaveModel;
  _view: ShockWaveView;
  _hitSound: typeof Howl;
  _unsubscriber: Unsubscriber;

  /**
   * リソース管理オブジェクト
   *
   * @param view ビュー
   * @param initialModel モデルの初期値
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(view: ShockWaveView, initialModel: ShockWaveModel, resources: Resources, gameObjectAction: Stream<GameObjectAction>) {
    this._model = initialModel;
    this._view = view;

    const hitResource = resources.sounds.find(v => v.id === SOUND_IDS.MECHA_IMPACT);
    this._hitSound = hitResource
      ? hitResource.sound
      : new Howl();

    this._unsubscriber = gameObjectAction.subscribe(action => {
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
    this._unsubscriber.unsubscribe();
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