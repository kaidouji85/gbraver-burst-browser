import { delay } from "../src/js/animation/delay";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../src/js/game-object/armdozer/shin-braver";
import { ShinBraver } from "../src/js/game-object/armdozer/shin-braver/shin-braver";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "shin-braver",
};

/** プレイヤー 立ち */
export const playerStand = () =>
  armdozerSpriteStub(PlayerShinBraver, () => {
    // NOP
  });

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = () =>
  armdozerSpriteStub(PlayerShinBraver, (sprite) => {
    sprite.startActive().play();
  });

/** 敵 立ち */
export const enemyStand = () =>
  armdozerSpriteStub(EnemyShinBraver, () => {
    // NOP
  });

/** 敵 アクティブ 立ち */
export const enemyActiveStand = () =>
  armdozerSpriteStub(EnemyShinBraver, (sprite) => {
    sprite.startActive().play();
  });

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

/** プレイヤー ストレートパンチ */
export const playerStraightPunch = () =>
  armdozerSpriteStub(PlayerShinBraver, straightPunch);

/** 敵 ストレートパンチ */
export const enemyStraightPunch = () =>
  armdozerSpriteStub(EnemyShinBraver, straightPunch);

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

/** プレイヤー ガッツ */
export const playerGuts = () => armdozerSpriteStub(PlayerShinBraver, guts);

/** 敵 ガッツ */
export const enemyGuts = () => armdozerSpriteStub(EnemyShinBraver, guts);

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
export const playerBurst = () => armdozerSpriteStub(PlayerShinBraver, burst);

/** プレイヤー アクティブ バースト */
export const playerActiveBurst = () =>
  armdozerSpriteStub(PlayerShinBraver, activeBurst);

/** 敵 バースト */
export const enemyBurst = () => armdozerSpriteStub(EnemyShinBraver, burst);

/** 敵 アクティブ バースト */
export const enemyActiveBurst = () =>
  armdozerSpriteStub(EnemyShinBraver, activeBurst);

export const activeKnockBack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .knockBack()
      .chain(delay(2000))
      .chain(sprite.knockBackToStand())
      .chain(delay(2000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeGuard = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .guard()
      .chain(delay(2000))
      .chain(sprite.guardToStand())
      .chain(delay(2000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeAvoid = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .avoid()
      .chain(delay(2000))
      .chain(sprite.avoidToStand())
      .chain(delay(2000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const down = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
