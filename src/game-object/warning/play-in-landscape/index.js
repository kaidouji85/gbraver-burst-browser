// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {isPortrait} from "../../../orientation/portrait";

/** キャンバスサイズ */
export const CANVAS_SIZE = 512;

/**
 * ランドスケープでプレイするように促す警告
 */
export class PlayInLandscape {
  /** メッシュ */
  _mesh: SimpleImageMesh;
  /** 本クラスの全サブスクリプション */
  _subscription: Subscription;

  constructor(resources: Resources, listener: Observable<GameObjectAction>) {
    const playInLandscapeResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.PLAY_IN_LANDSCAPE);
    const playInLandscape = playInLandscapeResource
      ? playInLandscapeResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      image: playInLandscape,
    });

    this._subscription = listener.subscribe(action => {
      if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }

  /**
   * プリレンダーの処理
   *
   * @param action アクション
   */
  _preRender(action: PreRender): void {
    const scale = this._getScale(action.rendererDOM.clientWidth);
    this._mesh.getObject3D().scale.set(scale, scale, scale);

    const opacity = isPortrait(action.rendererDOM.clientWidth, action.rendererDOM.clientHeight)
      ? 1
      : 0;
    this._mesh.setOpacity(opacity);
  }

  /**
   * 画面幅からメッシュのスケールを取得する
   *
   * @param screenWidth 画面幅
   * @return {number} メッシュのスケール
   */
  _getScale(screenWidth: number): number {
    return (CANVAS_SIZE < screenWidth)
      ? 1
      : 0.9 * screenWidth / CANVAS_SIZE;
  }
}