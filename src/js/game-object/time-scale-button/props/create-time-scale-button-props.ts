import { Group } from "@tweenjs/tween.js";
import { Observable, Subject } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { createTimeScaleButtonSounds } from "../sounds/time-scale-sounds";
import { TimeScaleButtonView } from "../view/time-scale-button-view";
import { TimeScaleButtonProps } from "./time-scale-button-props";

/** TimeScaleButtonProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * TimeScaleButtonPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createTimeScaleButtonProps(
  params: PropsCreatorParams,
): TimeScaleButtonProps {
  const { resources, gameObjectAction } = params;
  return {
    ...params,
    disabled: false,
    model: createInitialValue(),
    view: new TimeScaleButtonView(resources, gameObjectAction),
    sounds: createTimeScaleButtonSounds(resources),
    toggleTween: new Group(),
    toggleNotify: new Subject(),
  };
}
