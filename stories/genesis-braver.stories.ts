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
export const playerStand = () =>
  armdozerSpriteStub(PlayerGenesisBraver, () => {
    // NOP
  });

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = () =>
  armdozerSpriteStub(PlayerGenesisBraver, (sprite) => {
    sprite.startActive().play();
  });

/** 敵 立ち */
export const enemyStand = () =>
  armdozerSpriteStub(EnemyGenesisBraver, () => {
    // NOP
  });

/** 敵 アクティブ 立ち */
export const enemyActiveStand = () =>
  armdozerSpriteStub(EnemyGenesisBraver, (sprite) => {
    sprite.startActive().play();
  });

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

/** プレイヤー ストレートパンチ */
export const playerStraightPunch = () =>
  armdozerSpriteStub(PlayerGenesisBraver, straightPunch);

/** 敵 ストレートパンチ */
export const enemyStraightPunch = () =>
  armdozerSpriteStub(EnemyGenesisBraver, straightPunch);

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
export const playerKnockBack = () =>
  armdozerSpriteStub(PlayerGenesisBraver, knockBack);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack = () =>
  armdozerSpriteStub(PlayerGenesisBraver, activeKnockBack);

/** 敵 ノックバック */
export const enemyKnockBack = () =>
  armdozerSpriteStub(EnemyGenesisBraver, knockBack);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack = () =>
  armdozerSpriteStub(EnemyGenesisBraver, activeKnockBack);

/**
 * ダウン
 * @param sprite スプライト
 */
const down = (sprite: GenesisBraver) => {
  delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
};

/** プレイヤー ダウン */
export const playerDown = () => armdozerSpriteStub(PlayerGenesisBraver, down);

/** 敵 ダウン */
export const enemyDown = () => armdozerSpriteStub(EnemyGenesisBraver, down);

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
export const playerAvoid = () => armdozerSpriteStub(PlayerGenesisBraver, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid = () =>
  armdozerSpriteStub(PlayerGenesisBraver, activeAvoid);

/** 敵 回避 */
export const enemyAvoid = () => armdozerSpriteStub(EnemyGenesisBraver, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid = () =>
  armdozerSpriteStub(EnemyGenesisBraver, activeAvoid);

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
export const playerBurst = () => armdozerSpriteStub(PlayerGenesisBraver, burst);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst = () => armdozerSpriteStub(PlayerGenesisBraver, activeBurst);

/** 敵 バースト */
export const enemyBurst = () => armdozerSpriteStub(EnemyGenesisBraver, burst);

/** 敵 アクティブ バースト */
export const enemyActiveBurst = () => armdozerSpriteStub(EnemyGenesisBraver, activeBurst);
