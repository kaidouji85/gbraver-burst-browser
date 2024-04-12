import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Subject } from "rxjs";

import { Resources } from "../../../resource";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { createTimeScaleButtonSounds } from "../sounds/time-scale-sounds";
import { TimeScaleButtonView } from "../view/time-scale-button-view";
import { TimeScaleButtonProps } from "./time-scale-button-props";

/** TimeScaleButtonProps生成パラメータ */
export type GenerateTimeScaleButtonPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * TimeScaleButtonPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createTimeScaleButtonProps(
  params: GenerateTimeScaleButtonPropsParams,
): TimeScaleButtonProps {
  const { resources, gameObjectAction } = params;
  return {
    model: createInitialValue(),
    view: new TimeScaleButtonView(resources, gameObjectAction),
    sounds: createTimeScaleButtonSounds(resources),
    toggleTween: new TWEEN.Group(),
    toggle: new Subject(),
  };
}
