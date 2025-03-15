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

/**
 * ノックバック
 * @param sprite スプライト
 */
const knockBack = (sprite: GranDozer) => {
  sprite
    .knockBack()
    .chain(delay(2000))
    .chain(sprite.knockBackToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ ノックバック
 * @param sprite スプライト
 */
const activeKnockBack = (sprite: GranDozer) => {
  knockBack(sprite);
  sprite.startActive().play();
};

/** プレイヤー ノックバック */
export const playerKnockBack: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  knockBack,
);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  knockBack,
);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  activeKnockBack,
);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: GranDozer) => {
  sprite.down().chain(delay(2000)).loop();
};

/**
 * アクティブ ダウン
 * @param sprite スプライト
 */
const activeDown = (sprite: GranDozer) => {
  down(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダウン */
export const playerDown: StoryFn = armdozerSpriteStub(PlayerGranDozer, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown: StoryFn = armdozerSpriteStub(EnemyGranDozer, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  activeDown,
);

/** ガード */
const guard = (sprite: GranDozer) => {
  sprite
    .guard()
    .chain(delay(2000))
    .chain(sprite.guardToStand())
    .chain(delay(2000))
    .loop();
};

/** アクティブ ガード */
const activeGuard = (sprite: GranDozer) => {
  guard(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガード */
export const playerGuard: StoryFn = armdozerSpriteStub(PlayerGranDozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard: StoryFn = armdozerSpriteStub(EnemyGranDozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  activeGuard,
);

/** バースト */
const burst = (sprite: GranDozer) => {
  sprite
    .burst()
    .chain(delay(2000))
    .chain(sprite.burstToStand())
    .chain(delay(2000))
    .loop();
};

/** アクティブ バースト */
const activeBurst = (sprite: GranDozer) => {
  burst(sprite);
  sprite.startActive().play();
};

/** プレイヤー バースト */
export const playerBurst: StoryFn = armdozerSpriteStub(PlayerGranDozer, burst);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst: StoryFn = armdozerSpriteStub(
  PlayerGranDozer,
  activeBurst,
);

/** 敵 バースト */
export const enemyBurst: StoryFn = armdozerSpriteStub(EnemyGranDozer, burst);

/** 敵 アクティブ バースト */
export const enemyActiveBurst: StoryFn = armdozerSpriteStub(
  EnemyGranDozer,
  activeBurst,
);
