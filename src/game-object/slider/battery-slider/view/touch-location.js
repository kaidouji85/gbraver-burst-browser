// @flow
import * as THREE from "three";
import * as R from 'ramda';
import {Division} from "./division";
import type {TouchRaycastContainer} from "../../../../screen-touch/touch/touch-raycaster";
import {isTouchOverlap} from "../../../../screen-touch/touch/touch-overlap";
import type {MouseRaycaster} from "../../../../screen-touch/mouse/mouse-raycaster";
import {isMouseOverlap} from "../../../../screen-touch/mouse/mouse-overlap";

/** スライダー部分の幅 */
export const SLIDER_WIDTH = 375;
/** スライダー部分の高 */
//export const SLIDER_HEIGHT = 52;
export const SLIDER_HEIGHT = 84;  //TODO 開発が終わったら、上のものに戻す

/** スライダーのどの部分に触れたかを判定する */
export class TouchLocation {
  /** 目盛りの当たり判定をあつめたもの */
  _divisionList: Division[];
  /** 表示位置再計算のために、目盛りの最大値をキャッシュする */
  _maxValue: number;

  /**
   * コンストラクタ
   *
   * @param maxValue バッテリー最大値
   * @param onOverlap 当たり判定があった場合に発火されるコールバック関数
   */
  constructor(maxValue: number) {
    this._divisionList = R.range(0, maxValue + 1)
      .map(v => {
        const color = new THREE.Color(`rgb(0, ${255 * v / maxValue}, 0)`);
        return new Division(SLIDER_WIDTH / maxValue, SLIDER_HEIGHT, v, color);
      });
    this._maxValue = maxValue;
    this.setPos(0, 0);
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

  /**
   * 位置を設定する
   *
   * @param dx x座標
   * @param dy y座標
   */
  setPos(dx: number, dy: number): void {
    this._divisionList.forEach(division => {
      const meshSize = SLIDER_WIDTH / this._maxValue;
      division.mesh.position.x = dx - SLIDER_WIDTH / 2 + meshSize * division.value - meshSize / 2;
      division.mesh.position.y = dy;
    });
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._divisionList.map(v => v.mesh);
  }
}