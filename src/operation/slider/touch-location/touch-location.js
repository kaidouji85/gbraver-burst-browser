// @flow
import * as THREE from "three";
import {Division} from "./division";
import type {TouchRaycastContainer} from "../../../overlap/check/touch/touch-raycaster";
import {isTouchOverlap} from "../../../overlap/check/touch/touch-overlap";
import type {MouseRaycaster} from "../../../overlap/check/mouse/mouse-raycaster";
import {isMouseOverlap} from "../../../overlap/check/mouse/mouse-overlap";

/** コンストラクタのパラメータ */
export type Param = {
  values: number[],
  width: number,
  height: number
};

/** スライダーのどの部分に触れたかを判定する */
export class TouchLocation {
  /** 目盛りの当たり判定をあつめたもの */
  _divisionList: Division[];
  /** 本オブジェクトで使用するthree.jsオブジェクトをまとめたもの */
  _group: THREE.Group;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    const squareCount = param.values.length - 1;
    this._divisionList = param.values
      .map((v, index) => {
        const color = new THREE.Color(`rgb(0, ${255 * index / squareCount}, 0)`);
        const division = new Division(param.width / squareCount, param.height, v, color);
        const meshSize = param.width / squareCount;
        division.mesh.position.x = -param.width / 2 + meshSize * index;
        division.mesh.position.y = 0;
        return division;
      });
    this._group = new THREE.Group();
    this._divisionList.forEach(v => this._group.add(v.mesh));
  }

  /**
   * マウスが重なっているスライダーの目盛りを返す
   * マウスがどの目盛りとも重なっていなかった場合は、長さ0の配列を返す
   *
   * 戻り値の例)
   * [3]
   * => マウスが3の目盛りと重なっている
   *
   * []
   * => マウスはどの目盛りとの重なっていない
   *
   * [2,3]
   * => マウスは2、3の2つの目盛りと重なっている
   *
   * @param mouse マウスレイキャスト
   * @return マウスが重なっている目盛り
   */
  getMouseOverlap(mouse: MouseRaycaster): number[] {
    return this._divisionList
      .filter(v => isMouseOverlap(mouse, v))
      .map(v => v.value);
  }

  /**
   * 指が重なっているスライダーの目盛りを返す
   * 指がどの目盛りとも重なっていなかった場合は、長さ0の配列を返す
   * 戻り値の例はgetMouseOverlapを参照
   *
   * @param mouse 指レイキャスト
   * @return 指が重なっている目盛り
   */
  getTouchOverlap(touch: TouchRaycastContainer): number[] {
    return this._divisionList
      .filter(v => isTouchOverlap(touch, v))
      .map(v => v.value);
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}