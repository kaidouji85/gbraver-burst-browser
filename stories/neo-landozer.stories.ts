import { StoryFn } from "@storybook/html";

import { delay } from "../src/js/animation/delay";
import {
  EnemyNeoLandozer,
  PlayerNeoLandozer,
} from "../src/js/game-object/armdozer/neo-landozer";
import { NeoLandozer } from "../src/js/game-object/armdozer/neo-landozer/neo-landozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";

export default {
  title: "neo-landozer",
};

/** プレイヤー 立ち */
export const playerStand: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  () => {
    // NOP
  },
);

/** プレイヤー アクティブ 立ち */
export const playerActiveStand: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand: StoryFn = armdozerSpriteStub(EnemyNeoLandozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/**
 * 回避
 * @param sprite スプライト
 */
const avoid = (sprite: NeoLandozer) => {
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
const activeAvoid = (sprite: NeoLandozer) => {
  avoid(sprite);
  sprite.startActive().play();
};

/** プレイヤー 回避 */
export const playerAvoid: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  avoid,
);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid: StoryFn = armdozerSpriteStub(EnemyNeoLandozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeAvoid,
);

/**
 * ガード
 * @param sprite スプライト
 */
const guard = (sprite: NeoLandozer) => {
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
const activeGuard = (sprite: NeoLandozer) => {
  guard(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガード */
export const playerGuard: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  guard,
);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard: StoryFn = armdozerSpriteStub(EnemyNeoLandozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeGuard,
);

/**
 * ノックバック
 * @param sprite スプライト
 */
const knockBack = (sprite: NeoLandozer) => {
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
const activeKnockBack = (sprite: NeoLandozer) => {
  knockBack(sprite);
  sprite.startActive().play();
};

/** プレイヤー ノックバック */
export const playerKnockBack: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  knockBack,
);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  knockBack,
);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeKnockBack,
);

/**
 * ガッツ
 * @param sprite スプライト
 */
const guts = (sprite: NeoLandozer) => {
  delay(1000)
    .chain(sprite.guts())
    .chain(delay(1000))
    .chain(sprite.gutsToStand())
    .loop();
};

/**
 * アクティブ ガッツ
 * @param sprite スプライト
 */
const activeGuts = (sprite: NeoLandozer) => {
  guts(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガッツ */
export const playerGuts: StoryFn = armdozerSpriteStub(PlayerNeoLandozer, guts);

/** プレイヤー アクティブ ガッツ */
export const playerActiveGuts: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeGuts,
);

/** 敵 ガッツ */
export const enemyGuts: StoryFn = armdozerSpriteStub(EnemyNeoLandozer, guts);

/** 敵 アクティブ ガッツ */
export const enemyActiveGuts: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeGuts,
);

/**
 * アームハンマー
 * @param sprite スプライト
 */
const armHammer = (sprite: NeoLandozer) => {
  delay(1000)
    .chain(sprite.charge())
    .chain(delay(1000))
    .chain(sprite.armHammer())
    .chain(delay(1000))
    .chain(sprite.hmToStand())
    .loop();
};

/**
 * アクティブ アームハンマー
 * @param sprite スプライト
 */
const activeArmHammer = (sprite: NeoLandozer) => {
  armHammer(sprite);
  sprite.startActive().play();
};

/** プレイヤー アームハンマー */
export const playerArmHammer: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  armHammer,
);

/** プレイヤー アクティブ アームハンマー */
export const playerActiveArmHammer: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeArmHammer,
);

/** 敵 アームハンマー */
export const enemyArmHammer: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  armHammer,
);

/** 敵 アクティブ アームハンマー */
export const enemyActiveAtmHammer: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeArmHammer,
);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: NeoLandozer) => {
  delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
};

/**
 * アクティブ ダウン
 * @param sprite スプライト
 */
const activeDown = (sprite: NeoLandozer) => {
  down(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダウン */
export const playerDown: StoryFn = armdozerSpriteStub(PlayerNeoLandozer, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown: StoryFn = armdozerSpriteStub(EnemyNeoLandozer, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeDown,
);

/**
 * 気をつけ、礼
 * @param sprite スプライト
 */
const uprightBow = (sprite: NeoLandozer) => {
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
  PlayerNeoLandozer,
  uprightBow,
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  uprightBow,
);

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: NeoLandozer) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow: StoryFn = armdozerSpriteStub(
  PlayerNeoLandozer,
  activeUprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow: StoryFn = armdozerSpriteStub(
  EnemyNeoLandozer,
  activeUprightBow,
);
