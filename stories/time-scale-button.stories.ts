import { TimeScaleButton } from "../src/js/game-object/time-scale-button/time-scale-button";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "time-scale-button",
};

/**
 * タイムスケールボタンのストーリー
 * @param fn タイムスケールボタン操作関数
 * @return story
 */
const timeScaleButtonStory =
  (fn: (timeScaleButton: TimeScaleButton) => void) => () => {
    const stub = new HUDGameObjectStub((params) => {
      const timeScaleButton: TimeScaleButton = new TimeScaleButton(params);
      fn(timeScaleButton);
      return [timeScaleButton.getObject3D()];
    });
    stub.start();
    return stub.domElement();
  };

/**
 * 操作可能なタイムスケールボタン
 * @param timeScaleButton タイムスケールボタン
 */
const operatable = (timeScaleButton: TimeScaleButton) => {
  timeScaleButton.notifyToggled().subscribe((timeScale) => {
    console.log("push", timeScale);
  });
  timeScaleButton.open(1).play();
};

/** 操作可能 タイムスケールボタン */
export const operatableButton = timeScaleButtonStory(operatable);

/**
 * 操作不可能なタイムスケールボタン
 * @param timeScaleButton タイムスケールボタン
 */
const disabled = (timeScaleButton: TimeScaleButton) => {
  timeScaleButton.disabled(true);
  operatable(timeScaleButton);
};

/** 操作不可能 タイムスケールボタン */
export const disabledButton = timeScaleButtonStory(disabled);
