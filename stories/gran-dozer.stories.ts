import { StoryFn } from "@storybook/html";

import {
  EnemyGranDozer,
  PlayerGranDozer,
} from "../src/js/game-object/armdozer/gran-dozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";

export default {
  title: "gran-dozer",
};

/** プレイヤー 立ち */
export const playerStand: StoryFn = armdozerSpriteStub(PlayerGranDozer, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand: StoryFn = armdozerSpriteStub(EnemyGranDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);
