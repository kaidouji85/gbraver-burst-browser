// @flow

import type {Battle3DCameraModel} from "../model/model";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import type {Position} from "./position";

/**
 * カメラ視点を移動させる
 *
 * @param model モデル
 * @param position 移動先座標
 * @return アニメーション
 */
export function moveViewPoint(model: Battle3DCameraModel, position: Position): Animate {
  return tween(model.target, t => t.to(position));
}