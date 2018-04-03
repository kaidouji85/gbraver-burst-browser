// @flow
import * as THREE from "three";
import * as R from 'ramda';
import {Division} from "./division";
import type {TouchRaycastContainer} from "../../../../operation/touch/touch-raycaster";
import {isTouchOverlap} from "../../../../operation/touch/touch-overlap";

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
  /** スライダーがマウスムーブした時に反応するか否かのフラグ、trueで反応する */
  _isActive: boolean;
  /** 当たり判定があった場合に発火されるコールバック関数 */
  _onOverlap: (value: number) => void;

  /**
   * コンストラクタ
   *
   * @param maxValue バッテリー最大値
   * @param onOverlap 当たり判定があった場合に発火されるコールバック関数
   */
  constructor(maxValue: number, onOverlap: (value: number) => void) {
    this._divisionList = R.range(0, maxValue + 1)
      .map(v => {
        const color = new THREE.Color(`rgb(0, ${255 * v / maxValue}, 0)`);
        return new Division(SLIDER_WIDTH / maxValue, SLIDER_HEIGHT, v, color);
      });
    this._maxValue = maxValue;
    this._onOverlap = onOverlap;
    this._isActive = false;
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
      const meshSize = SLIDER_WIDTH / this._maxValue;
      division.mesh.position.x = dx - SLIDER_WIDTH / 2 + meshSize * division.value - meshSize / 2;
      division.mesh.position.y = dy;
    });
  }

  /**
   * マウスダウンした際の処理
   *
   * @param raycaster マウスのレイキャスト
   */
  onMouseDown(raycaster: THREE.Raycater): void {
    // 値=0の当たり判定は、バッテリースライダーの外側に存在している
    // なので、アクティブ判定からは除外する
    const touchList = this._divisionList
      .filter(v => v.value !== 0)
      .filter(v => v.isOverlap(raycaster));
    this._isActive = touchList.length > 0;

    this.onMouseMove(raycaster);
  }

  /**
   * マウスムーブした際の処理
   *
   * @param raycaster マウスのレイキャスト
   */
  onMouseMove(raycaster: THREE.Raycater): void {
    if (!this._isActive) {
      return;
    }

    const touchList = this._divisionList
      .filter(v => v.isOverlap(raycaster))
      .map(v => v.value);
    if (touchList.length > 0) {
      const value = Math.max(...touchList);
      this._onOverlap(value);
    }
  }

  /**
   * マウスアップした際の処理
   *
   * @param raycaster マウスのレイキャスト
   */
  onMouseUp(raycaster: THREE.Raycater): void {
    this._isActive = false;
  }

  /**
   * マウスリーブした際の処理
   *
   * @param raycaster マウスのレイキャスト
   */
  onMouseLeave(raycaster: THREE.Raycater): void {
    this._isActive = false;
  }

  /**
   * タッチムーブした際の処理
   *
   * @param touchRaycaster タッチイベントのレイキャスト
   */
  onTouchMove(touchRaycaster: TouchRaycastContainer): void {
    // TODO 非アクティブなら何もしないようにする
    
    const touchList = this._divisionList
      .filter(v => isTouchOverlap(touchRaycaster, v))
      .map(v => v.value);
    if (touchList.length > 0) {
      const value = Math.max(...touchList);
      this._onOverlap(value);
    }
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._divisionList.map(v => v.mesh);
  }
}