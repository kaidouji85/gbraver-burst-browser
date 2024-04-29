import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  EnemyWingDozer,
  PlayerWingDozer,
} from "../src/js/game-object/armdozer/wing-dozer";
import { WingDozer } from "../src/js/game-object/armdozer/wing-dozer/wing-dozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";

export default {
  title: "wing-dozer",
};

/** プレイヤー 立ち */
export const playerStand: StoryFn = armdozerSpriteStub(PlayerWingDozer, () => {
  // NOP
});

/** プレイヤー 立ち */
export const playerActiveStand: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand: StoryFn = armdozerSpriteStub(EnemyWingDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/**
 * アッパー
 * @param sprite スプライト
 */
const upper = (sprite: WingDozer) => {
  sprite
    .charge()
    .chain(delay(500))
    .chain(sprite.upper())
    .chain(delay(500))
    .chain(sprite.upperToStand())
    .chain(delay(1000))
    .loop();
};

/**
 * アクティブ アッパー
 * @param sprite スプライト
 */
const activeUpper = (sprite: WingDozer) => {
  upper(sprite);
  sprite.startActive().play();
};

/** プレイヤー アッパー */
export const playerUpper: StoryFn = armdozerSpriteStub(PlayerWingDozer, upper);

/** プレイヤー アクティブ アッパー */
export const playerActiveUpper: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeUpper,
);

/** 敵 アッパー */
export const enemyUpper: StoryFn = armdozerSpriteStub(EnemyWingDozer, upper);

/** 敵 アクティブ アッパー */
export const enemyActiveUpper: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeUpper,
);

/**
 * ダッシュ
 * @param sprite スプライト
 */
const dash = (sprite: WingDozer) => {
  sprite
    .dash()
    .chain(delay(2000))
    .chain(sprite.dashToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ ダッシュ
 * @param sprite スプライト
 */
const activeDash = (sprite: WingDozer) => {
  dash(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダッシュ */
export const playerDash: StoryFn = armdozerSpriteStub(PlayerWingDozer, dash);

/** プレイヤー アクティブ ダッシュ */
export const playerActiveDash: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeDash,
);

/** 敵 ダッシュ */
export const enemyDash: StoryFn = armdozerSpriteStub(EnemyWingDozer, dash);

/** 敵 アクティブ ダッシュ */
export const enemyActiveDash: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeDash,
);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: WingDozer) => {
  sprite.down().chain(delay(2000)).loop();
};

/**
 * アクティブ ダウン
 * @param sprite スプライト
 */
const activeDown = (sprite: WingDozer) => {
  down(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダウン */
export const playerDown: StoryFn = armdozerSpriteStub(PlayerWingDozer, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown: StoryFn = armdozerSpriteStub(EnemyWingDozer, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeDown,
);

/**
 * 回避
 * @param sprite スプライト
 */
const avoid = (sprite: WingDozer) => {
  delay(1000)
    .chain(sprite.avoid())
    .chain(delay(1000))
    .chain(sprite.avoidToStand())
    .loop();
};

/**
 * アクティブ 回避
 * @param sprite スプライト
 */
const activeAvoid = (sprite: WingDozer) => {
  avoid(sprite);
  sprite.startActive().play();
};

/** プレイヤー 回避 */
export const playerAvoid: StoryFn = armdozerSpriteStub(PlayerWingDozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid: StoryFn = armdozerSpriteStub(EnemyWingDozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeAvoid,
);

/**
 * ガード
 * @param sprite スプライト
 */
const guard = (sprite: WingDozer) => {
  delay(1000)
    .chain(sprite.guard())
    .chain(delay(1000))
    .chain(sprite.guardToStand())
    .loop();
};

/**
 * アクティブ ガード
 * @param sprite スプライト
 */
const activeGuard = (sprite: WingDozer) => {
  guard(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガード */
export const playerGuard: StoryFn = armdozerSpriteStub(PlayerWingDozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard: StoryFn = armdozerSpriteStub(EnemyWingDozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeGuard,
);

/**
 * ノックバック
 * @param sprite スプライト
 */
const knockBack = (sprite: WingDozer) => {
  delay(1000)
    .chain(sprite.knockBack())
    .chain(delay(1000))
    .chain(sprite.knockBackToStand())
    .loop();
};

/**
 * アクティブ ノックバック
 * @param sprite スプライト
 */
const activeKnockBack = (sprite: WingDozer) => {
  knockBack(sprite);
  sprite.startActive().play();
};

/** プレイヤー ノックバック */
export const playerKnockBack: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  knockBack,
);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  knockBack,
);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeKnockBack,
);

/**
 * 気をつけ、礼
 * @param sprite スプライト
 */
const uprightBow = (sprite: WingDozer) => {
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
  PlayerWingDozer,
  uprightBow,
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  uprightBow,
);

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: WingDozer) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow: StoryFn = armdozerSpriteStub(
  PlayerWingDozer,
  activeUprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow: StoryFn = armdozerSpriteStub(
  EnemyWingDozer,
  activeUprightBow,
);
