import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Subject } from "rxjs";

import { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { initialValue } from "../model/initial-value";
import { createBatterySelectorSounds } from "../sounds/battery-selector-sounds";
import { BatterySelectorView } from "../view";
import { BatterySelectorProps } from "./battery-selector-props";

/** バッテリーセレクタプロパティ生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * バッテリーセレクタプロパティを生成する
 * @param param パラメータ
 * @return バッテリーセレクタプロパティ
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
    decidePush: new Subject(),
    batteryMinusPush: new Subject(),
    batteryPlusPush: new Subject(),
    sounds: createBatterySelectorSounds(param.resources),
    view: new BatterySelectorView({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
    }),
  };
}
