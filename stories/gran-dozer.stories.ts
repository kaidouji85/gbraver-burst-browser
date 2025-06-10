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
export const playerStand = armdozerSpriteStub(PlayerGranDozer, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand = armdozerSpriteStub(EnemyGranDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand = armdozerSpriteStub(EnemyGranDozer, (sprite) => {
  sprite.startActive().play();
});

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
export const playerTackle = armdozerSpriteStub(PlayerGranDozer, tackle);

/** プレイヤー アクティブ タックル */
export const playerActiveTackle = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    tackle(sprite);
    sprite.startActive().play();
  },
);

/** 敵 タックル */
export const enemyTackle = armdozerSpriteStub(EnemyGranDozer, tackle);

/** 敵 アクティブ タックル */
export const enemyActiveTackle = armdozerSpriteStub(
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
export const playerAvoid = armdozerSpriteStub(PlayerGranDozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    avoid(sprite);
    sprite.startActive().play();
  },
);

/** 敵 回避 */
export const enemyAvoid = armdozerSpriteStub(EnemyGranDozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid = armdozerSpriteStub(EnemyGranDozer, (sprite) => {
  avoid(sprite);
  sprite.startActive().play();
});

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
export const playerKnockBack = armdozerSpriteStub(PlayerGranDozer, knockBack);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack = armdozerSpriteStub(
  PlayerGranDozer,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack = armdozerSpriteStub(EnemyGranDozer, knockBack);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack = armdozerSpriteStub(
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
export const playerDown = armdozerSpriteStub(PlayerGranDozer, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown = armdozerSpriteStub(PlayerGranDozer, activeDown);

/** 敵 ダウン */
export const enemyDown = armdozerSpriteStub(EnemyGranDozer, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown = armdozerSpriteStub(EnemyGranDozer, activeDown);

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
export const playerGuard = armdozerSpriteStub(PlayerGranDozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard = armdozerSpriteStub(
  PlayerGranDozer,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard = armdozerSpriteStub(EnemyGranDozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard = armdozerSpriteStub(EnemyGranDozer, activeGuard);

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
export const playerBurst = armdozerSpriteStub(PlayerGranDozer, burst);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst = armdozerSpriteStub(
  PlayerGranDozer,
  activeBurst,
);

/** 敵 バースト */
export const enemyBurst = armdozerSpriteStub(EnemyGranDozer, burst);

/** 敵 アクティブ バースト */
export const enemyActiveBurst = armdozerSpriteStub(EnemyGranDozer, activeBurst);

/**
 * 気をつけ、礼
 * @param sprite スプライト
 */
const uprightBow = (sprite: GranDozer) => {
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
export const playerUprightBow = armdozerSpriteStub(PlayerGranDozer, uprightBow);

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow = armdozerSpriteStub(
  PlayerGranDozer,
  (sprite) => {
    uprightBow(sprite);
    sprite.startActive().play();
  },
);

/** 敵 気をつけ、礼 */
export const enemyUprightBow = armdozerSpriteStub(EnemyGranDozer, uprightBow);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow = armdozerSpriteStub(
  EnemyGranDozer,
  (sprite) => {
    uprightBow(sprite);
    sprite.startActive().play();
  },
);
