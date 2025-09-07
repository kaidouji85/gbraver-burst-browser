import { StatusIcon } from "../src/js/game-object/status-icon";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "status-icon",
};

/** ステータスアイコンのストーリー */
export const statusIcon = hudGameObjectStory((options) => {
  const icon = new StatusIcon(options);
  return [icon.getObject3D()];
});
