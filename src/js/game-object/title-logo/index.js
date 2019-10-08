// @flow

import * as THREE from 'three';
import {TitleLogoView} from "./view";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

/** タイトルロゴ */
export class TitleLogo {
  _view: TitleLogoView;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    this._view = new TitleLogoView(resources);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}