// @flow

import type {ButtonModel} from "../model/button-model";
import * as THREE from "three";

/** ボタンのビュー */
export interface ButtonView {
  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel): void;
  /** シーンに追加するthree.jsのオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[];
  /** マウス、指とボタンが重なっているかを判定する */
  isOverlap(raycaster: THREE.Raycaster): boolean;
}