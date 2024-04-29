import { StoryFn } from "@storybook/html";

import { TimeScaleButton } from "../src/js/game-object/time-scale-button/time-scale-button";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "time-scale-button",
};

/**
 * タイムスケールボタンのストーリー
 * @param fn タイムスケールボタン操作関数
 * @returns story
 */
const timeScaleButtonStory = (fn: (timeScaleButton: TimeScaleButton) => void) =>
  hudGameObjectStory((params) => {
    const timeScaleButton: TimeScaleButton = new TimeScaleButton(params);
    fn(timeScaleButton);
    return [timeScaleButton.getObject3D()];
  });

/**
 * 操作可能なタイムスケールボタン
 * @param timeScaleButton タイムスケールボタン
 */
const operable = (timeScaleButton: TimeScaleButton) => {
  timeScaleButton.notifyToggled().subscribe((timeScale) => {
    console.log("push", timeScale);
  });
  timeScaleButton.open(1).play();
};

/** 操作可能 タイムスケールボタン */
export const operableButton: StoryFn = timeScaleButtonStory(operable);

/**
 * 操作不可能なタイムスケールボタン
 * @param timeScaleButton タイムスケールボタン
 */
const disabled = (timeScaleButton: TimeScaleButton) => {
  timeScaleButton.disabled(true);
  operable(timeScaleButton);
};

/** 操作不可能 タイムスケールボタン */
export const disabledButton: StoryFn = timeScaleButtonStory(disabled);
