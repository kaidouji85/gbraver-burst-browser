import { delay } from "../src/js/animation/delay";
import { EnemyLightningDozer, PlayerLightningDozer } from "../src/js/game-object/armdozer/lightning-dozer";
import { LightningDozer } from "../src/js/game-object/armdozer/lightning-dozer/lightning-dozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "lightning-dozer",
};

/** プレイヤー 立ち */
export const playerStand = () => armdozerSpriteStub(PlayerLightningDozer, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = () => armdozerSpriteStub(PlayerLightningDozer, (sprite) => {
  sprite.startActive().play();
});

/** 敵 立ち */
export const enemyStand = () => armdozerSpriteStub(EnemyLightningDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand = () => armdozerSpriteStub(EnemyLightningDozer, (sprite) => {
  sprite.startActive().play();
});

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

/** プレイヤー アームハンマー */
export const playerArmHammer = () => armdozerSpriteStub(PlayerLightningDozer, armHammer);

/** 敵 アームハンマー */
export const enemyArmHammer = () => armdozerSpriteStub(EnemyLightningDozer, armHammer);

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
export const playerAvoid = () => armdozerSpriteStub(PlayerLightningDozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid = () => armdozerSpriteStub(PlayerLightningDozer, activeAvoid);

/** 敵 回避 */
export const enemyAvoid = () => armdozerSpriteStub(EnemyLightningDozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid = () => armdozerSpriteStub(EnemyLightningDozer, activeAvoid);

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
export const playerGuard = () => armdozerSpriteStub(PlayerLightningDozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard = () => armdozerSpriteStub(PlayerLightningDozer, activeGuard);

/** 敵 ガード */
export const enemyGuard = () => armdozerSpriteStub(EnemyLightningDozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard = () => armdozerSpriteStub(EnemyLightningDozer, activeGuard);

export const activeKnockBack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.knockBack())
      .chain(delay(1000))
      .chain(sprite.knockBackToStand())
      .loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeGuts = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.guts())
      .chain(delay(1000))
      .chain(sprite.gutsToStand())
      .loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const down = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
