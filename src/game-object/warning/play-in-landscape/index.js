// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";

/** キャンバスサイズ */
export const CANVAS_SIZE = 400;

/**
 * ランドスケープでプレイするように促す警告
 */
export class PlayInLandscape {
  /** メッシュ */
  _mesh: SimpleImageMesh;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    const playInLandscapeResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.PLAY_IN_LANDSCAPE);
    const playInLandscape = playInLandscapeResource
      ? playInLandscapeResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      image: playInLandscape,
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }
}