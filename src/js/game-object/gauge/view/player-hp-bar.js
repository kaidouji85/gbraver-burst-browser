// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {animatedTexture} from "../../../texture/animation/texture-animation";
import {SPRITE_RENDER_ORDER} from "../../../render/render-order/td-render-order";
import {CanvasMesh} from "../../../mesh/canvas-mesh";

/** HPバー キャンバス横幅 */
export const BAR_CANVAS_WIDTH = 1024;
/** HPバー キャンバス縦幅 */
export const BAR_CANVAS_HEIGHT = 512;
/** HPバーメッシュ横幅 */
export const BAR_MESH_WIDTH = 512;
/** HPバーメッシュ縦幅 */
export const BAR_MESH_HEIGHT = 512;
/** キャンバスに描画する際のHPバーの横幅 */
export const BAR_WIDTH = 472;

/** プレイヤーのHPバー */
export class PlayerHpBar {
  _texture: typeof THREE.CanvasTexture;
  _mesh: typeof THREE.Mesh;
  _back: CanvasMesh;
  _group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const canvas = document.createElement('canvas');
    canvas.width = BAR_CANVAS_WIDTH;
    canvas.height = BAR_CANVAS_HEIGHT;
    const context = canvas.getContext('2d');
    const bar = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.HP_BAR)?.image ?? new Image();
    const barHeight = bar.height * BAR_WIDTH / bar.width;
    context.drawImage(bar, 0, context.canvas.height / 2, BAR_WIDTH, barHeight);
    this._texture = new THREE.CanvasTexture(canvas);
    animatedTexture(this._texture, 2, 1);
    this._texture.needsUpdate = true;

    const geometry = new THREE.PlaneGeometry(BAR_MESH_WIDTH, BAR_MESH_HEIGHT,1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: this._texture
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.set(BAR_MESH_HEIGHT / 2, 0, 1);
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
    this._group.add(this._mesh);

    const back = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.HP_BAR_BACK)?.image ?? new Image();
    this._back = new CanvasMesh({canvasWidth: 512, canvasHeight: 512, meshWidth: 512, meshHeight: 512});
    this._back.draw(context => {
      const backWidth = 472;
      const backHeight = back.height * backWidth / back.width;
      context.drawImage(back, 0, context.canvas.height / 2, backWidth, backHeight);
    });
    this._back.getObject3D().position.set(BAR_MESH_HEIGHT / 2, 0, 0);
    this._group.add(this._back.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.material.dispose();
    this._mesh.geometry.dispose();
    this._texture.image = null;
    this._texture.dispose();
    this._back.destructor();
  }

  /**
   * HPバーの値を設定する
   *
   * @param value 0〜1で指定するHPバーの値、1で100%
   */
  setValue(value: number): void {
    const baseOffsetX = 1 - this._correctValue(value);
    this._texture.offset.x = baseOffsetX * BAR_WIDTH / BAR_CANVAS_WIDTH;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }

  /**
   * HPバーの入力値が0〜1になるように補正する
   *
   * @param value オリジナルの値
   * @return 補正結果
   */
  _correctValue(value: number): number {
    if (1 < value) {
      return 1;
    } else if (value < 0) {
      return 0;
    } else {
      return value;
    }
  }
}
