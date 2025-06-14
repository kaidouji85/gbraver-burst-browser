import { circlePushDetector } from "../src/js/game-object/push-detector/circle-push-detector";
import { planePushDetector } from "../src/js/game-object/push-detector/square-push-detector";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "push-detector",
};

/** あたり判定 円形 */
export const circle = hudGameObjectStory(({ gameObjectAction }) => {
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

/** あたり判定 平面 */
export const plane = hudGameObjectStory(({ gameObjectAction }) => {
  const pushDetector = planePushDetector({
    width: 64,
    height: 64,
    gameObjectAction,
    visible: true,
  });
  pushDetector.notifyPressed().subscribe((event) => {
    console.log("push start", event);
  });
  return [pushDetector.getObject3D()];
});
