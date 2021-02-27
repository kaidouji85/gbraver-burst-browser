// @flow

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import type {LightningBarrierModel} from "./model/lightning-barrier-model";
import {createInitialValue} from "./model/initial-value";
import {Observable, Subscription} from "rxjs";
import type {Update} from "../../../game-loop/update";
import type {PreRender} from "../../../game-loop/pre-render";
import {filter, first, map} from "rxjs/operators";
import {electrification} from "./animation/electrification";
import {LightningBarrierView} from "./view/lightning-barrier-view";
import type {Resources} from "../../../resource";
import {Animate} from "../../../animation/animate";
import {show} from "./animation/show";
import {hidden} from "./animation/hidden";
import {LightningBarrierSounds} from "./sounds/lightning-barrier-sounds";
import type {GameObjectAction} from "../../action/game-object-action";

/**
 * 電撃バリア
 */
export class LightningBarrierGameEffect {
  _model: LightningBarrierModel;
  _view: LightningBarrierView;
  _sounds: LightningBarrierSounds;
  _tweenGroup: typeof TWEEN.Group;
  _subscriptions: Subscription[];

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._model = createInitialValue();
    this._view = new LightningBarrierView(resources);
    this._sounds = new LightningBarrierSounds(resources);
    this._tweenGroup = new TWEEN.Group();
    this._subscriptions = [
      listener.subscribe(action => {
        if (action.type === 'Update') {
          this._onUpdate(action);
        } else if (action.type === 'PreRender') {
          this._onPreRender(action);
        }
      }),

      listener.pipe(
        filter(v => v.type === 'Update'),
        map(v => ((v: any): Update)),
        first()
      ).subscribe(() => {
        this._onFirstUpdate();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
    this._tweenGroup.removeAll();
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
   * バリアを表示する
   *
   * @return アニメーション
   */
  show(): Animate {
    return show(this._model, this._sounds);
  }

  /**
   * バリアを消す
   * 
   * @return アニメーション
   */
  hidden(): Animate {
    return hidden(this._model, this._sounds);
  }

  /**
   * 初回のアップデート処理
   */
  _onFirstUpdate(): void {
    electrification(this._model, this._tweenGroup).loop();
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._tweenGroup.update(action.time);
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