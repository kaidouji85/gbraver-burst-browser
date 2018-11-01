// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズにする */
  stand(): Tween;

  /** 自分ターンの時のポーズ */
  myTurn(): MultiTween;

  /** パンチのアニメーションを再生する */
  punch(): MultiTween;
}
