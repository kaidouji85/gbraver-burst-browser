import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../src/js/game-object/armdozer/shin-braver";
import { ShinBraver } from "../src/js/game-object/armdozer/shin-braver/shin-braver";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";

export default {
  title: "shin-braver",
};

/** プレイヤー 立ち */
export const playerStand: StoryFn = armdozerSpriteStub(PlayerShinBraver, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand: StoryFn = armdozerSpriteStub(EnemyShinBraver, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  (sprite) => {
    sprite.startActive().play();
  },
);

/**
 * ストレートパンチ
 * @param sprite スプライト
 */
const straightPunch = (sprite: ShinBraver) => {
  delay(1000)
    .chain(sprite.charge())
    .chain(delay(1000))
    .chain(sprite.straightPunch())
    .chain(delay(1000))
    .chain(sprite.punchToStand())
    .loop();
};

/**
 * アクティブ ストレートパンチ
 * @param sprite スプライト
 */
const activeStraightPunch = (sprite: ShinBraver) => {
  straightPunch(sprite);
  sprite.startActive().play();
};

/** プレイヤー ストレートパンチ */
export const playerStraightPunch: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  straightPunch,
);

/** プレイヤー アクティブ ストレートパンチ */
export const playerActiveStraightPunch: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeStraightPunch,
);

/** 敵 ストレートパンチ */
export const enemyStraightPunch: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  straightPunch,
);

/** 敵 アクティブ ストレートパンチ */
export const enemyActiveStraightPunch: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeStraightPunch,
);

/**
 * ガッツ
 * @param sprite スプライト
 */
const guts = (sprite: ShinBraver) => {
  sprite
    .guts()
    .chain(delay(2000))
    .chain(sprite.gutsToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ ガッツ
 * @param sprite スプライト
 */
const activeGuts = (sprite: ShinBraver) => {
  guts(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガッツ */
export const playerGuts: StoryFn = armdozerSpriteStub(PlayerShinBraver, guts);

/** プレイヤー アクティブ ガッツ */
export const playerActiveGuts: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeGuts,
);

/** 敵 ガッツ */
export const enemyGuts: StoryFn = armdozerSpriteStub(EnemyShinBraver, guts);

/** 敵 アクティブ ガッツ */
export const enemyActiveGuts: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeGuts,
);

/**
 * バースト
 * @param sprite スプライト
 */
const burst = (sprite: ShinBraver) => {
  sprite
    .burst()
    .chain(delay(2000))
    .chain(sprite.burstToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ バースト
 * @param sprite スプライト
 */
const activeBurst = (sprite: ShinBraver) => {
  burst(sprite);
  sprite.startActive().play();
};

/** プレイヤー バースト */
export const playerBurst: StoryFn = armdozerSpriteStub(PlayerShinBraver, burst);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeBurst,
);

/** 敵 バースト */
export const enemyBurst: StoryFn = armdozerSpriteStub(EnemyShinBraver, burst);

/** 敵 アクティブ バースト */
export const enemyActiveBurst: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeBurst,
);

/**
 * ノックバック
 * @param sprite スプライト
 */
const knockBack = (sprite: ShinBraver) => {
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
const activeKnockBack = (sprite: ShinBraver) => {
  knockBack(sprite);
  sprite.startActive().play();
};

/** プレイヤー ノックバック */
export const playerKnockBack: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  knockBack,
);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  knockBack,
);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeKnockBack,
);

/**
 * ガード
 * @param sprite スプライト
 */
const guard = (sprite: ShinBraver) => {
  sprite
    .guard()
    .chain(delay(2000))
    .chain(sprite.guardToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ ガード
 * @param sprite スプライト
 */
const activeGuard = (sprite: ShinBraver) => {
  guard(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガード */
export const playerGuard: StoryFn = armdozerSpriteStub(PlayerShinBraver, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard: StoryFn = armdozerSpriteStub(EnemyShinBraver, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeGuard,
);

/**
 * 回避
 * @param sprite スプライト
 */
const avoid = (sprite: ShinBraver) => {
  sprite
    .avoid()
    .chain(delay(2000))
    .chain(sprite.avoidToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ 回避
 * @param sprite スプライト
 */
const activeAvoid = (sprite: ShinBraver) => {
  avoid(sprite);
  sprite.startActive().play();
};

/** プレイヤー 回避 */
export const playerAvoid: StoryFn = armdozerSpriteStub(PlayerShinBraver, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid: StoryFn = armdozerSpriteStub(EnemyShinBraver, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeAvoid,
);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: ShinBraver) => {
  delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
};

/**
 * アクティブ ダウン
 * @param sprite スプライト
 */
const activeDown = (sprite: ShinBraver) => {
  down(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダウン */
export const playerDown: StoryFn = armdozerSpriteStub(PlayerShinBraver, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown: StoryFn = armdozerSpriteStub(EnemyShinBraver, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeDown,
);

/**
 * 気をつけ、礼
 * @param sprite スプライト
 */
const uprightBow = (sprite: ShinBraver) => {
  delay(1000)
    .chain(sprite.upright())
    .chain(delay(500))
    .chain(sprite.bowDown())
    .chain(delay(200))
    .chain(sprite.bowUp())
    .chain(delay(500))
    .chain(sprite.uprightToStand())
    .loop();
};

/** プレイヤー 気をつけ、礼 */
export const playerUprightBow: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  uprightBow,
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  uprightBow,
);

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: ShinBraver) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow: StoryFn = armdozerSpriteStub(
  PlayerShinBraver,
  activeUprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow: StoryFn = armdozerSpriteStub(
  EnemyShinBraver,
  activeUprightBow,
);
