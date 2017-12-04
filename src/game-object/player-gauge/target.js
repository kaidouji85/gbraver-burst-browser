// @flow
import * as THREE from "three";
import type {Resources} from "../../resource/resource-manager";
import {createCanvasMesh} from "../../mesh/mesh-creator";
import {PlayerHpGauge} from "../../canvas/draw/hp-gauge/index";
import {PlayerBatteryGauge} from "../../canvas/draw/battery-gauge/index";

/** キャンバス幅 */
export const CANVAS_WIDTH = 256;
/** キャンバス高 */
export const CANVAS_HEIGHT = 256;
/** メッシュ幅 */
export const MESH_WIDTH = 300;
/** メッシュ高 */
export const MESH_HEIGHT = 300;

/** プレイヤーゲージ */
export class PlayerGaugeTarget {
  /** リソース管理クラス */
  resources: Resources;
  /** メッシュ */
  mesh: THREE.Mesh;
  /** 描画を行うキャンバス */
  canvas: HTMLCanvasElement;

  constructor(resources: Resources) {
    this.resources = resources;
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.mesh = createCanvasMesh(this.canvas, MESH_WIDTH, MESH_HEIGHT);
  }

  /** ゲージを更新する */
  refresh(props: {hp: number, maxHp: number, battery: number, maxBattery: number}) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    PlayerHpGauge(context, this.resources, context.canvas.width/2, 32, props.hp, props.maxHp);
    PlayerBatteryGauge(context, this.resources, context.canvas.width/2, 80, props.battery);
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this.mesh];
  }
}