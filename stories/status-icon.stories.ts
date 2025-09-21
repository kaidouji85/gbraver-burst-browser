import { delay } from "../src/js/animation/delay";
import { StatusIcon } from "../src/js/game-object/status-icon";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "status-icon",
};

/** ステータスアイコンのストーリー */
export const statusIcon = hudGameObjectStory((options) => {
  const icon = new StatusIcon(options);
  icon.open().play();
  icon.notifyPushed().subscribe(() => {
    console.log("pushed");
    icon
      .decide()
      .chain(delay(1000))
      .chain(icon.close())
      .chain(delay(1000))
      .chain(icon.open())
      .play();
  });
  return [icon.getObject3D()];
});

/** 操作不可能なステータスアイコンのストーリー */
export const disabledStatusIcon = hudGameObjectStory((options) => {
  const icon = new StatusIcon(options);
  icon.open().play();
  icon.disabled(true);
  icon.notifyPushed().subscribe(() => {
    console.log("pushed");
    icon
      .decide()
      .chain(delay(1000))
      .chain(icon.close())
      .chain(delay(1000))
      .chain(icon.open())
      .play();
  });
  return [icon.getObject3D()];
});
