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
 * アームハンマー
 * @param sprite スプライト
 */
const armHammer = (sprite: GranDozer) => {
  delay(1000)
    .chain(sprite.hmCharge())
    .chain(delay(1000))
    .chain(sprite.hmAttack())
    .chain(delay(1000))
    .chain(sprite.hmToStand())
    .loop();
};

/**
 * アクティブ アームハンマー
 * @param sprite スプライト
 */
const activeArmHammer = (sprite: GranDozer) => {
  armHammer(sprite);
  sprite.startActive().play();
};

/** プレイヤー アームハンマー */
export const playerArmHammer: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  armHammer,
);

/** プレイヤー アクティブ アームハンマー */
export const playerActiveArmHammer: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  activeArmHammer,
);

/** 敵 アームハンマー */
export const enemyArmHammer: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  armHammer,
);

/** 敵 アクティブ アームハンマー */
export const enemyActiveArmHammer: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  activeArmHammer,
);
