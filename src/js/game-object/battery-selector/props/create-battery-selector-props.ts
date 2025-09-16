import { Group } from "@tweenjs/tween.js";

import { SEPlayerContainer } from "../../../se/se-player";
import { initialValue } from "../model/initial-value";
import { createBatterySelectorSounds } from "../sounds/battery-selector-sounds";
import { BatterySelectorView, BatterySelectorViewOptions } from "../view";
import { BatterySelectorProps } from "./battery-selector-props";

/** バッテリーセレクタプロパティ生成オプション */
export type PropsCreatorOptions = BatterySelectorViewOptions &
  SEPlayerContainer;

/**
 * バッテリーセレクタプロパティを生成する
 * @options options オプション
 * @returns バッテリーセレクタプロパティ
 */
export function createBatterySelectorProps(
  options: PropsCreatorOptions,
): BatterySelectorProps {
  return {
    ...options,
    model: initialValue(),
    disabled: false,
    batteryChangeTween: new Group(),
    batteryMinusTween: new Group(),
    batteryPlusTween: new Group(),
    sounds: createBatterySelectorSounds(options.resources),
    view: new BatterySelectorView(options),
  };
}
