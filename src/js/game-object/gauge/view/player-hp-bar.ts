import * as THREE from "three";

import { CanvasMesh } from "../../../mesh/canvas-mesh";
import { SPRITE_RENDER_ORDER } from "../../../render/render-order/td-render-order";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image/ids";
import { animatedTexture } from "../../../texture/animation/texture-animation";

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
  #texture: THREE.CanvasTexture;
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  #back: CanvasMesh;
  #group: THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();

    const canvas = document.createElement("canvas");
    canvas.width = BAR_CANVAS_WIDTH;
    canvas.height = BAR_CANVAS_HEIGHT;
    const context = canvas.getContext("2d") || new CanvasRenderingContext2D();
    const bar =
      resources.canvasImages.find((v) => v.id === CANVAS_IMAGE_IDS.HP_BAR)
        ?.image ?? new Image();
    const barHeight = (bar.height * BAR_WIDTH) / bar.width;
    context.drawImage(bar, 0, context.canvas.height / 2, BAR_WIDTH, barHeight);
    this.#texture = new THREE.CanvasTexture(canvas);
    animatedTexture(this.#texture, 2, 1);
    this.#texture.needsUpdate = true;
    const geometry = new THREE.PlaneGeometry(
      BAR_MESH_WIDTH,
      BAR_MESH_HEIGHT,
      1,
      1,
    );
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: this.#texture,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.position.set(BAR_MESH_HEIGHT / 2, 0, 1);
    this.#mesh.renderOrder = SPRITE_RENDER_ORDER;
    this.#group.add(this.#mesh);
    const back =
      resources.canvasImages.find((v) => v.id === CANVAS_IMAGE_IDS.HP_BAR_BACK)
        ?.image ?? new Image();
    this.#back = new CanvasMesh({
      canvasWidth: 512,
      canvasHeight: 512,
      meshWidth: 512,
      meshHeight: 512,
    });

    this.#back.draw((context) => {
      const backWidth = 472;
      const backHeight = (back.height * backWidth) / back.width;
      context.drawImage(
        back,
        0,
        context.canvas.height / 2,
        backWidth,
        backHeight,
      );
    });
    this.#back.getObject3D().position.set(BAR_MESH_HEIGHT / 2, 0, 0);
    this.#group.add(this.#back.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
    this.#texture.dispose();
    this.#back.destructor();
  }

  /**
   * HPバーの値を設定する
   *
   * @param value 0〜1で指定するHPバーの値、1で100%
   */
  setValue(value: number): void {
    const baseOffsetX = 1 - this.#correctValue(value);
    this.#texture.offset.x = (baseOffsetX * BAR_WIDTH) / BAR_CANVAS_WIDTH;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * HPバーの入力値が0〜1になるように補正する
   *
   * @param value オリジナルの値
   * @returns 補正結果
   */
  #correctValue(value: number): number {
    if (1 < value) {
      return 1;
    } else if (value < 0) {
      return 0;
    } else {
      return value;
    }
  }
}
