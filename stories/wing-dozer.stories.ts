import { delay } from "../src/js/animation/delay";
import {
  EnemyWingDozer,
  PlayerWingDozer,
} from "../src/js/game-object/armdozer/wing-dozer";
import { WingDozer } from "../src/js/game-object/armdozer/wing-dozer/wing-dozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
export default {
  title: "wing-dozer",
};

/** プレイヤー 立ち */
export const playerStand = () => armdozerSpriteStub(PlayerWingDozer, () => {
  // NOP
});

/** プレイヤー 立ち */
export const playerActiveStand = () => armdozerSpriteStub(PlayerWingDozer, (sprite) => {
  sprite.startActive().play();
});

/** 敵 立ち */
export const enemyStand = () => armdozerSpriteStub(EnemyWingDozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand = () => armdozerSpriteStub(EnemyWingDozer, (sprite) => {
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

/** プレイヤー アッパー */
export const playerUpper = () => armdozerSpriteStub(PlayerWingDozer, upper);

/** 敵 アッパー */
export const enemyUpper = () => armdozerSpriteStub(EnemyWingDozer, upper);

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
export const playerDash = () => armdozerSpriteStub(PlayerWingDozer, dash);

/** プレイヤー アクティブ ダッシュ */
export const playerActiveDash = () => armdozerSpriteStub(PlayerWingDozer, activeDash);

/** 敵 ダッシュ */
export const enemyDash = () => armdozerSpriteStub(EnemyWingDozer, dash);

/** 敵 アクティブ ダッシュ */
export const enemyActiveDash = () => armdozerSpriteStub(EnemyWingDozer, activeDash);

/**
 * ダウン
 * @param sprite スプライト 
 */
const down = (sprite: WingDozer) => {
  sprite.down().chain(delay(2000)).loop();
};

/** プレイヤー ダウン */
export const playerDown = () => armdozerSpriteStub(PlayerWingDozer, down);

/** 敵 ダウン */
export const enemyDown = () => armdozerSpriteStub(EnemyWingDozer, down);

export const activeAvoid = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.avoid())
      .chain(delay(1000))
      .chain(sprite.avoidToStand())
      .loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const activeGuard = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000)
      .chain(sprite.guard())
      .chain(delay(1000))
      .chain(sprite.guardToStand())
      .loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const activeKnockBack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
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
