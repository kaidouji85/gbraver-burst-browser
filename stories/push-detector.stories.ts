import { StoryFn } from "@storybook/html";

import { circlePushDetector } from "../src/js/game-object/push-detector/push-detector";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "push-detector",
};

/** あたり判定 円形 */
export const circle: StoryFn = hudGameObjectStory(({ gameObjectAction }) => {
  const pushDetector = circlePushDetector({
    radius: 32,
    segments: 32,
    gameObjectAction,
    visible: true,
  });
  pushDetector.notifyPressed().subscribe((event) => {
    console.log("push start", event);
  });
  return [pushDetector.getObject3D()];
});
