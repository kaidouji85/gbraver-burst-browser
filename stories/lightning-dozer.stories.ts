import { delay } from "../src/js/animation/delay";
import {
  EnemyLightningDozer,
  PlayerLightningDozer,
} from "../src/js/game-object/armdozer/lightning-dozer";
import { LightningDozer } from "../src/js/game-object/armdozer/lightning-dozer/lightning-dozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";
import {StoryFn} from "@storybook/html";

export default {
  title: "lightning-dozer",
};

/** プレイヤー 立ち */
export const playerStand: StoryFn = armdozerSpriteStub(PlayerLightningDozer, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand: StoryFn = armdozerSpriteStub(EnemyLightningDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/**
 * アームハンマー
 * @param sprite スプライト
 */
const armHammer = (sprite: LightningDozer) => {
  sprite
    .charge()
    .chain(delay(1000))
    .chain(sprite.armHammer())
    .chain(delay(2000))
    .chain(sprite.hmToStand())
    .chain(delay(2000))
    .loop();
};

/**
 * アクティブ アームハンマー
 * @param sprite スプライト
 */
const activeArmHammer = (sprite: LightningDozer) => {
  armHammer(sprite);
  sprite.startActive().play();
};

/** プレイヤー アームハンマー */
export const playerArmHammer: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  armHammer,
);

/** プレイヤー アクティブ アームハンマー */
export const playerActiveArmHammer: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeArmHammer,
);

/** 敵 アームハンマー */
export const enemyArmHammer: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  armHammer,
);

/** 敵 アクティブ アームハンマー */
export const enemyActiveAtmHammer: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeArmHammer,
);

/**
 * 回避
 * @param sprite スプライト
 */
const avoid = (sprite: LightningDozer) => {
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
const activeAvoid = (sprite: LightningDozer) => {
  avoid(sprite);
  sprite.startActive().play();
};

/** プレイヤー 回避 */
export const playerAvoid: StoryFn = armdozerSpriteStub(PlayerLightningDozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid: StoryFn = armdozerSpriteStub(EnemyLightningDozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeAvoid,
);

/**
 * ガード
 * @param sprite スプライト
 */
const guard = (sprite: LightningDozer) => {
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
const activeGuard = (sprite: LightningDozer) => {
  guard(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガード */
export const playerGuard: StoryFn = armdozerSpriteStub(PlayerLightningDozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard: StoryFn = armdozerSpriteStub(EnemyLightningDozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeGuard,
);

/**
 * ノックバック
 * @param sprite スプライト
 */
const knockBack = (sprite: LightningDozer) => {
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
const activeKnockBack = (sprite: LightningDozer) => {
  knockBack(sprite);
  sprite.startActive().play();
};

/** プレイヤー ノックバック */
export const playerKnockBack: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  knockBack,
);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  knockBack,
);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeKnockBack,
);

/**
 * ガッツ
 * @param sprite スプライト
 */
const guts = (sprite: LightningDozer) => {
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
const activeGuts = (sprite: LightningDozer) => {
  guts(sprite);
  sprite.startActive().play();
};

/** プレイヤー ガッツ */
export const playerGuts: StoryFn = armdozerSpriteStub(PlayerLightningDozer, guts);

/** プレイヤー アクティブ ガッツ */
export const playerActiveGuts: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeGuts,
);

/** 敵 ガッツ */
export const enemyGuts: StoryFn = armdozerSpriteStub(EnemyLightningDozer, guts);

/** 敵 アクティブ ガッツ */
export const enemyActiveGuts: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeGuts,
);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: LightningDozer) => {
  delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
};

/**
 * アクティブ ダウン
 * @param sprite スプライト
 */
const activeDown = (sprite: LightningDozer) => {
  down(sprite);
  sprite.startActive().play();
};

/** プレイヤー ダウン */
export const playerDown: StoryFn = armdozerSpriteStub(PlayerLightningDozer, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown: StoryFn = armdozerSpriteStub(EnemyLightningDozer, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeDown,
);

/**
 * 気をつけ、礼
 * @param sprite スプライト
 */
const uprightBow = (sprite: LightningDozer) => {
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
  PlayerLightningDozer,
  uprightBow,
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  uprightBow,
);

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: LightningDozer) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow: StoryFn = armdozerSpriteStub(
  PlayerLightningDozer,
  activeUprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow: StoryFn = armdozerSpriteStub(
  EnemyLightningDozer,
  activeUprightBow,
);
