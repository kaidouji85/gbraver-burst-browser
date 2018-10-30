// @flow

import * as THREE from "three";
import {Tween} from '@tweenjs/tween.js';
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";

/** アームドーザスプライト */
export interface ArmDozerSprite {
  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D;

  /** 立ちポーズのアニメを開始する */
  stand(): Tween;

  /** パンチのアニメーションを再生する */
  punch(): MultiTween;
}
