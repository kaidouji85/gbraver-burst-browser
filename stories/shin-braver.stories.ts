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
export const playerStand = armdozerSpriteStub(PlayerShinBraver, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = armdozerSpriteStub(
  PlayerShinBraver,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand = armdozerSpriteStub(EnemyShinBraver, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand = armdozerSpriteStub(
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
export const playerStraightPunch = armdozerSpriteStub(
  PlayerShinBraver,
  straightPunch,
);

/** プレイヤー アクティブ ストレートパンチ */
export const playerActiveStraightPunch = armdozerSpriteStub(
  PlayerShinBraver,
  activeStraightPunch,
);

/** 敵 ストレートパンチ */
export const enemyStraightPunch = armdozerSpriteStub(
  EnemyShinBraver,
  straightPunch,
);

/** 敵 アクティブ ストレートパンチ */
export const enemyActiveStraightPunch = armdozerSpriteStub(
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
export const playerGuts = armdozerSpriteStub(PlayerShinBraver, guts);

/** プレイヤー アクティブ ガッツ */
export const playerActiveGuts = armdozerSpriteStub(
  PlayerShinBraver,
  activeGuts,
);

/** 敵 ガッツ */
export const enemyGuts = armdozerSpriteStub(EnemyShinBraver, guts);

/** 敵 アクティブ ガッツ */
export const enemyActiveGuts = armdozerSpriteStub(EnemyShinBraver, activeGuts);

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
export const playerBurst = armdozerSpriteStub(PlayerShinBraver, burst);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst = armdozerSpriteStub(
  PlayerShinBraver,
  activeBurst,
);

/** 敵 バースト */
export const enemyBurst = armdozerSpriteStub(EnemyShinBraver, burst);

/** 敵 アクティブ バースト */
export const enemyActiveBurst = armdozerSpriteStub(
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
export const playerKnockBack = armdozerSpriteStub(PlayerShinBraver, knockBack);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack = armdozerSpriteStub(
  PlayerShinBraver,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack = armdozerSpriteStub(EnemyShinBraver, knockBack);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack = armdozerSpriteStub(
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
export const playerGuard = armdozerSpriteStub(PlayerShinBraver, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard = armdozerSpriteStub(
  PlayerShinBraver,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard = armdozerSpriteStub(EnemyShinBraver, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard = armdozerSpriteStub(
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
export const playerAvoid = armdozerSpriteStub(PlayerShinBraver, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid = armdozerSpriteStub(
  PlayerShinBraver,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid = armdozerSpriteStub(EnemyShinBraver, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid = armdozerSpriteStub(
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
export const playerDown = armdozerSpriteStub(PlayerShinBraver, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown = armdozerSpriteStub(
  PlayerShinBraver,
  activeDown,
);

/** 敵 ダウン */
export const enemyDown = armdozerSpriteStub(EnemyShinBraver, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown = armdozerSpriteStub(EnemyShinBraver, activeDown);

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
export const playerUprightBow = armdozerSpriteStub(
  PlayerShinBraver,
  uprightBow,
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow = armdozerSpriteStub(EnemyShinBraver, uprightBow);

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: ShinBraver) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow = armdozerSpriteStub(
  PlayerShinBraver,
  activeUprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow = armdozerSpriteStub(
  EnemyShinBraver,
  activeUprightBow,
);
