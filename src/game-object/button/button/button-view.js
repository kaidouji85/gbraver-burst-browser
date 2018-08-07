// @flow

import * as THREE from "three";
import type {ButtonModel} from "./model/button-model";
import {OverlapTarget} from "../../../overlap/target/overlap-target";

/** ボタンのビュー */
export interface ButtonView extends OverlapTarget {

  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel): void;

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[];
}