// @flow
import * as THREE from "three";
import * as R from 'ramda';
import {Division} from "./division";

/** コンストラクタのパラメータ */
type Param = {
  /** バッテリースライダーの幅 */
  width: number,
  /** バッテリースライダーの高 */
  height: number,
  /** バッテリーの最大値 */
  maxValue: number
};

/** スライダーのどの部分に触れたかを判定する */
export class TouchLocation {
  /** 目盛りの当たり判定をあつめたもの */
  _divisionList: Division[];
  /** 表示位置再計算のために、バッテリースライダー幅をキャッシュする */
  _width: number;
  /** 表示位置再計算のために、目盛りの最大値をキャッシュする */
  _maxValue: number;

  constructor(param: Param) {
    this._divisionList = R.range(1, param.maxValue + 1)
      .map(v => {
        const color = new THREE.Color(`rgb(0, ${255 * v / param.maxValue}, 0)`);
        return new Division(param.width / param.maxValue, param.height, v, color);
      });
    this._maxValue = param.maxValue;
    this._width = param.width;
    this.setPos(0, 0);
  }

  /**
   * 描画位置を設定する
   *
   * @param dx x座標
   * @param dy y座標
   */
  setPos(dx: number, dy: number): void {
    this._divisionList.forEach(division => {
      const meshSize = this._width / this._maxValue;
      division.mesh.position.x = dx - this._width / 2 + meshSize * division.value - meshSize / 2;
      division.mesh.position.y = dy;
    });
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._divisionList.map(v => v.mesh);
  }
}