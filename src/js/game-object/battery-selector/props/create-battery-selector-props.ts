import * as TWEEN from "@tweenjs/tween.js";
import { Observable } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { initialValue } from "../model/initial-value";
import { createBatterySelectorSounds } from "../sounds/battery-selector-sounds";
import { BatterySelectorView } from "../view";
import { BatterySelectorProps } from "./battery-selector-props";

/** バッテリーセレクタプロパティ生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * バッテリーセレクタプロパティを生成する
 * @param param パラメータ
 * @returns バッテリーセレクタプロパティ
 */
export function createBatterySelectorProps(
  param: PropsCreatorParams,
): BatterySelectorProps {
  return {
    ...param,
    model: initialValue(),
    batteryChangeTween: new TWEEN.Group(),
    batteryMinusTween: new TWEEN.Group(),
    batteryPlusTween: new TWEEN.Group(),
    sounds: createBatterySelectorSounds(param.resources),
    view: new BatterySelectorView({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
    }),
  };
}
