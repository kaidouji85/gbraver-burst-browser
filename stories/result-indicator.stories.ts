import { StoryFn } from "@storybook/html";
import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  drawIndicator,
  loseIndicator,
  winIndicator,
} from "../src/js/game-object/result-indicator";
import { ResultIndicator } from "../src/js/game-object/result-indicator/result-indicator";
import { Resources } from "../src/js/resource";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "result-indicator",
};

/**
 * リザルトインジケータのストーリー
 * @param generator リザルトインジケータ生成関数
 * @param fn リザルトインジケータ操作関数
 * @returns story
 */
const resultIndicatorStory = (
  generator: (
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) => ResultIndicator,
  fn: (indicator: ResultIndicator) => void,
) =>
  hudGameObjectStory(({ resources, gameObjectAction }) => {
    const indicator = generator(resources, gameObjectAction);
    fn(indicator);
    return [indicator.getObject3D()];
  });

/**
 * 表示
 * @param indicator リザルトインジケータ
 */
const visible = (indicator: ResultIndicator) => {
  delay(1000)
    .chain(indicator.slideIn())
    .chain(delay(1000))
    .chain(indicator.moveToEdge())
    .chain(delay(1000))
    .chain(indicator.hidden())
    .loop();
};

/** win 表示 */
export const winVisible: StoryFn = resultIndicatorStory(winIndicator, visible);

/** lose 表示 */
export const loseVisible: StoryFn = resultIndicatorStory(
  loseIndicator,
  visible,
);

/** draw 表示 */
export const drawVisible: StoryFn = resultIndicatorStory(
  drawIndicator,
  visible,
);
