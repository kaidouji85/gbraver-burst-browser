import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  EnemyGenesisBraver,
  PlayerGenesisBraver,
} from "../src/js/game-object/armdozer/genesis-braver";
import { GenesisBraver } from "../src/js/game-object/armdozer/genesis-braver/genesis-braver";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";

export default {
  title: "genesis-braver",
};

/** プレイヤー 立ち */
export const playerStand: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  () => {
    // NOP
  },
);

/** プレイヤー アクティブ 立ち */
export const playerActiveStand: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  () => {
    // NOP
  },
);

/** 敵 アクティブ 立ち */
export const enemyActiveStand: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  (sprite) => {
    sprite.startActive().play();
  },
);

/**
 * ストレートパンチ
 * @param sprite スプライト
 */
const straightPunch = (sprite: GenesisBraver) => {
  delay(1000)
    .chain(sprite.charge())
    .chain(delay(1000))
    .chain(sprite.straightPunch())
    .chain(delay(1000))
    .chain(sprite.spToStand())
    .chain(delay(1000))
    .loop();
};

/**
 * アクティブ ストレートパンチ
 * @param sprite スプライト
 */
const activeStraightPunch = (sprite: GenesisBraver) => {
  straightPunch(sprite);
  sprite.startActive().loop();
};

/** プレイヤー ストレートパンチ */
export const playerStraightPunch: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  straightPunch,
);

/** プレイヤー アクティブ ストレートパンチ */
export const playerActiveStraightPunch: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeStraightPunch,
);

/** 敵 ストレートパンチ */
export const enemyStraightPunch: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  straightPunch,
);

/** 敵 アクティブ ストレートパンチ */
export const enemyActiveStraightPunch: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeStraightPunch,
);

/**
 * ノックバック
 * @param sprite スプライト
 */
const knockBack = (sprite: GenesisBraver) => {
  delay(1000)
    .chain(sprite.knockBack())
    .chain(delay(1000))
    .chain(sprite.knockBackToStand())
    .chain(delay(1000))
    .loop();
};

/**
 * アクティブ ノックバック
 * @param sprite スプライト
 */
const activeKnockBack = (sprite: GenesisBraver) => {
  knockBack(sprite);
  sprite.startActive().loop();
};

/** プレイヤー ノックバック */
export const playerKnockBack: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  knockBack,
);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  knockBack,
);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeKnockBack,
);

/**
 * ガード
 * @param sprite スプライト
 */
const guard = (sprite: GenesisBraver) => {
  delay(1000)
    .chain(sprite.guard())
    .chain(delay(1000))
    .chain(sprite.guardToStand())
    .chain(delay(1000))
    .loop();
};

/**
 * アクティブ ガード
 * @param sprite スプライト
 */
const activeGuard = (sprite: GenesisBraver) => {
  guard(sprite);
  sprite.startActive().loop();
};

/** プレイヤー ガード */
export const playerGuard: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  guard,
);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  guard,
);

/** 敵 アクティブ ガード */
export const enemyActiveGuard: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeGuard,
);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: GenesisBraver) => {
  delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
};

/**
 * アクティブ ダウン
 * @param sprite スプライト
 */
const activeDown = (sprite: GenesisBraver) => {
  down(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダウン */
export const playerDown: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  down,
);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown: StoryFn = armdozerSpriteStub(EnemyGenesisBraver, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeDown,
);

/**
 * 回避
 * @param sprite スプライト
 */
const avoid = (sprite: GenesisBraver) => {
  delay(1000)
    .chain(sprite.avoid())
    .chain(delay(1000))
    .chain(sprite.avoidToStand())
    .chain(delay(1000))
    .loop();
};

const activeAvoid = (sprite: GenesisBraver) => {
  avoid(sprite);
  sprite.startActive().play();
};

/** プレイヤー 回避 */
export const playerAvoid: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  avoid,
);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  avoid,
);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeAvoid,
);

/**
 * バースト
 * @param sprite スプライト
 */
const burst = (sprite: GenesisBraver) => {
  delay(1000)
    .chain(sprite.burst())
    .chain(delay(1000))
    .chain(sprite.burstToStand())
    .chain(delay(1000))
    .loop();
};

/**
 * アクティブ バースト
 * @param sprite スプライト
 */
const activeBurst = (sprite: GenesisBraver) => {
  burst(sprite);
  sprite.startActive().play();
};

/** プレイヤー バースト */
export const playerBurst: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  burst,
);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeBurst,
);

/** 敵 バースト */
export const enemyBurst: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  burst,
);

/** 敵 アクティブ バースト */
export const enemyActiveBurst: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeBurst,
);

/**
 * 気をつけ、礼
 * @param sprite スプライト
 */
const uprightBow = (sprite: GenesisBraver) => {
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

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: GenesisBraver) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー 気をつけ、礼 */
export const playerUprightBow: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  uprightBow,
);

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow: StoryFn = armdozerSpriteStub(
  PlayerGenesisBraver,
  activeUprightBow,
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  uprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow: StoryFn = armdozerSpriteStub(
  EnemyGenesisBraver,
  activeUprightBow,
);
