// @flow

import * as THREE from "three";
import type {Resources} from "../../resource/resource-manager";
import {createCanvasMesh} from "../../util/mesh/mesh-creator";

type Props = {
  resources: Resources,
  canvasWidth: number,
  canvasHeight: number,
  meshWidth: number,
  meshHeight: number,
};

/** キャンバステクスチャをもつMesh */
export class CanvasMesh {
  /** リソース管理クラス */
  resources: Resources;
  /** メッシュ */
  mesh: THREE.Mesh;
  /** メッシュ幅 */
  meshWidth: number;
  /** メッシュ高 */
  meshHeight: number;
  /** 描画を行うキャンバス */
  canvas: HTMLCanvasElement;

  constructor(props: Props) {
    this.resources = props.resources;

    this.canvas = document.createElement('canvas');
    this.canvas.width = props.canvasWidth;
    this.canvas.height = props.canvasHeight;

    this.meshWidth = props.meshWidth;
    this.meshHeight = props.meshHeight;
    this.mesh = createCanvasMesh(this.canvas, this.meshWidth, this.meshHeight);
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this.mesh];
  }
}