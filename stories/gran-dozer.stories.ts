import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  EnemyGranDozer,
  PlayerGranDozer,
} from "../src/js/game-object/armdozer/gran-dozer";
import { GranDozer } from "../src/js/game-object/armdozer/gran-dozer/gran-dozer";
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

/**
 * タックル
 * @param sprite スプライト
 */
const tackle = (sprite: GranDozer) => {
  delay(1000)
    .chain(sprite.charge())
    .chain(delay(1000))
    .chain(sprite.tackle())
    .chain(delay(1000))
    .chain(sprite.tackleToStand())
    .loop();
};

/** プレイヤー タックル */
export const playerTackle: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  tackle,
);

/** プレイヤー アクティブ タックル */
export const playerActiveTackle: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    tackle(sprite);
    sprite.startActive().play();
  },
);

/** 敵 タックル */
export const enemyTackle: StoryFn = armdozerSpriteStub(EnemyGranDozer, tackle);

/** 敵 アクティブ タックル */
export const enemyActiveTackle: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  (sprite) => {
    tackle(sprite);
    sprite.startActive().play();
  },
);

/**
 * 回避
 * @param sprite スプライト
 */
const avoid = (sprite: GranDozer) => {
  delay(1000)
    .chain(sprite.avoid())
    .chain(delay(1000))
    .chain(sprite.avoidToStand())
    .chain(delay(1000))
    .loop();
};

/** プレイヤー 回避 */
export const playerAvoid: StoryFn = armdozerSpriteStub(PlayerGranDozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    avoid(sprite);
    sprite.startActive().play();
  },
);

/** 敵 回避 */
export const enemyAvoid: StoryFn = armdozerSpriteStub(EnemyGranDozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  (sprite) => {
    avoid(sprite);
    sprite.startActive().play();
  },
);
