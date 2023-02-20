import { delay } from "../src/js/animation/delay";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../src/js/game-object/armdozer/shin-braver";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
import {ShinBraver} from "../src/js/game-object/armdozer/shin-braver/shin-braver";

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
export const playerStraightPunch = () => armdozerSpriteStub(PlayerShinBraver, straightPunch);

/** 敵 ストレートパンチ */
export const enemyStraightPunch = () => armdozerSpriteStub(EnemyShinBraver, straightPunch);

export const guts = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    const animation = sprite
      .guts()
      .chain(delay(2000))
      .chain(sprite.gutsToStand())
      .chain(delay(2000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeBurst = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerShinBraver(resources, gameObjectAction);
    sprite.startActive().play();
    const animation = sprite
      .burst()
      .chain(delay(2000))
      .chain(sprite.burstToStand())
      .chain(delay(2000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
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
