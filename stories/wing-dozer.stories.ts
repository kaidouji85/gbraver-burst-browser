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
export const playerStand = armdozerSpriteStub(PlayerWingDozer, () => {
  // NOP
});

/** プレイヤー 立ち */
export const playerActiveStand = armdozerSpriteStub(
  PlayerWingDozer,
  (sprite) => {
    sprite.startActive().play();
  },
);

/** 敵 立ち */
export const enemyStand = armdozerSpriteStub(EnemyWingDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand = armdozerSpriteStub(EnemyWingDozer, (sprite) => {
  sprite.startActive().play();
});

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
export const playerUpper = armdozerSpriteStub(PlayerWingDozer, upper);

/** プレイヤー アクティブ アッパー */
export const playerActiveUpper = armdozerSpriteStub(
  PlayerWingDozer,
  activeUpper,
);

/** 敵 アッパー */
export const enemyUpper = armdozerSpriteStub(EnemyWingDozer, upper);

/** 敵 アクティブ アッパー */
export const enemyActiveUpper = armdozerSpriteStub(EnemyWingDozer, activeUpper);

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
export const playerDash = armdozerSpriteStub(PlayerWingDozer, dash);

/** プレイヤー アクティブ ダッシュ */
export const playerActiveDash = armdozerSpriteStub(PlayerWingDozer, activeDash);

/** 敵 ダッシュ */
export const enemyDash = armdozerSpriteStub(EnemyWingDozer, dash);

/** 敵 アクティブ ダッシュ */
export const enemyActiveDash = armdozerSpriteStub(EnemyWingDozer, activeDash);

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
export const playerDown = armdozerSpriteStub(PlayerWingDozer, down);

/** プレイヤー アクティブ ダウン */
export const playerActiveDown = armdozerSpriteStub(PlayerWingDozer, activeDown);

/** 敵 ダウン */
export const enemyDown = armdozerSpriteStub(EnemyWingDozer, down);

/** 敵 アクティブ ダウン */
export const enemyActiveDown = armdozerSpriteStub(EnemyWingDozer, activeDown);

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
export const playerAvoid = armdozerSpriteStub(PlayerWingDozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid = armdozerSpriteStub(
  PlayerWingDozer,
  activeAvoid,
);

/** 敵 回避 */
export const enemyAvoid = armdozerSpriteStub(EnemyWingDozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid = armdozerSpriteStub(EnemyWingDozer, activeAvoid);

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
export const playerGuard = armdozerSpriteStub(PlayerWingDozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard = armdozerSpriteStub(
  PlayerWingDozer,
  activeGuard,
);

/** 敵 ガード */
export const enemyGuard = armdozerSpriteStub(EnemyWingDozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard = armdozerSpriteStub(EnemyWingDozer, activeGuard);

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
export const playerKnockBack = armdozerSpriteStub(PlayerWingDozer, knockBack);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack = armdozerSpriteStub(
  PlayerWingDozer,
  activeKnockBack,
);

/** 敵 ノックバック */
export const enemyKnockBack = armdozerSpriteStub(EnemyWingDozer, knockBack);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack = armdozerSpriteStub(
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
export const playerUprightBow = armdozerSpriteStub(PlayerWingDozer, uprightBow);

/** 敵 気をつけ、礼 */
export const enemyUprightBow = armdozerSpriteStub(EnemyWingDozer, uprightBow);

/**
 * アクティブ 気をつけ、礼
 * @param sprite スプライト
 */
const activeUprightBow = (sprite: WingDozer) => {
  uprightBow(sprite);
  sprite.startActive().play();
};

/** プレイヤー アクティブ 気をつけ、礼 */
export const playerActiveUprightBow = armdozerSpriteStub(
  PlayerWingDozer,
  activeUprightBow,
);

/** 敵 アクティブ 気をつけ、礼 */
export const enemyActiveUprightBow = armdozerSpriteStub(
  EnemyWingDozer,
  activeUprightBow,
);
