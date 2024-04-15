import * as TWEEN from "@tweenjs/tween.js";
import { Observable, Subject } from "rxjs";

import { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { GameObjectAction } from "../../action/game-object-action";
import { createInitialValue } from "../model/initial-value";
import { createTimeScaleButtonSounds } from "../sounds/time-scale-sounds";
import { TimeScaleButtonView } from "../view/time-scale-button-view";
import { TimeScaleButtonProps } from "./time-scale-button-props";

/** TimeScaleButtonProps生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * TimeScaleButtonPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createTimeScaleButtonProps(
  params: PropsCreatorParams,
): TimeScaleButtonProps {
  const { resources, gameObjectAction } = params;
  return {
    ...params,
    model: createInitialValue(),
    view: new TimeScaleButtonView(resources, gameObjectAction),
    sounds: createTimeScaleButtonSounds(resources),
    toggleTween: new TWEEN.Group(),
    toggleNotify: new Subject(),
  };
}
