// @flow

import * as THREE from 'three';
import {TitleLogoView} from "./view";
import type {Resources} from "../../resource";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {PreRender} from "../../action/game-loop/pre-render";

/** タイトルロゴ */
export class TitleLogo {
  _view: TitleLogoView;
  _subscription: Subscription;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._view = new TitleLogoView(resources);
    this._subscription = listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._onPreRender(action);
      }
    });
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
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.preRender(action);
  }
}