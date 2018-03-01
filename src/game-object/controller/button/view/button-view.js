// @flow

import type {ButtonModel} from "../model/button-model";
import * as THREE from "three";
import {TouchTarget} from "../../../../operation/touch/touch-target";

/** ボタンのビュー */
export interface ButtonView extends TouchTarget {
  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel): void;
  /** シーンに追加するthree.jsのオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[];
}