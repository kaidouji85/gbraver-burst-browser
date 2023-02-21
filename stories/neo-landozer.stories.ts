import { delay } from "../src/js/animation/delay";
import { EnemyNeoLandozer, PlayerNeoLandozer } from "../src/js/game-object/armdozer/neo-landozer";
import { NeoLandozer } from "../src/js/game-object/armdozer/neo-landozer/neo-landozer";
import { armdozerSpriteStub } from "./stub/armdozer-sprite-stub";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "neo-landozer",
};

/** プレイヤー 立ち */
export const playerStand = () => armdozerSpriteStub(PlayerNeoLandozer, () => {
  // NOP
});

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = () => armdozerSpriteStub(PlayerNeoLandozer, (sprite) => {
  sprite.startActive().play();
});

/** 敵 立ち */
export const enemyStand = () => armdozerSpriteStub(EnemyNeoLandozer, () => {
  // NOP
});

/** 敵 アクティブ 立ち */
export const enemyActiveStand = () => armdozerSpriteStub(EnemyNeoLandozer, (sprite) => {
  sprite.startActive().play();
});

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
export const playerAvoid = () => armdozerSpriteStub(PlayerNeoLandozer, avoid);

/** プレイヤー アクティブ 回避 */
export const playerActiveAvoid = () => armdozerSpriteStub(PlayerNeoLandozer, activeAvoid);

/** 敵 回避 */
export const enemyAvoid = () => armdozerSpriteStub(EnemyNeoLandozer, avoid);

/** 敵 アクティブ 回避 */
export const enemyActiveAvoid = () => armdozerSpriteStub(EnemyNeoLandozer, activeAvoid);

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
}

/** プレイヤー ガード */
export const playerGuard = () => armdozerSpriteStub(PlayerNeoLandozer, guard);

/** プレイヤー アクティブ ガード */
export const playerActiveGuard = () => armdozerSpriteStub(PlayerNeoLandozer, activeGuard);

/** 敵 ガード */
export const enemyGuard = () => armdozerSpriteStub(EnemyNeoLandozer, guard);

/** 敵 アクティブ ガード */
export const enemyActiveGuard = () => armdozerSpriteStub(EnemyNeoLandozer, activeGuard);

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
export const playerKnockBack = () => armdozerSpriteStub(PlayerNeoLandozer, knockBack);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack = () => armdozerSpriteStub(PlayerNeoLandozer, activeKnockBack);

/** 敵 ノックバック */
export const enemyKnockBack = () => armdozerSpriteStub(EnemyNeoLandozer, knockBack);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack = () => armdozerSpriteStub(EnemyNeoLandozer, activeKnockBack);

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
}

/** プレイヤー ガッツ */
export const playerGuts = () => armdozerSpriteStub(PlayerNeoLandozer, guts);

/** プレイヤー アクティブ ガッツ */
export const playerActiveGuts = () => armdozerSpriteStub(PlayerNeoLandozer, activeGuts);

/** 敵 ガッツ */
export const enemyGuts = () => armdozerSpriteStub(EnemyNeoLandozer, guts);

/** 敵 アクティブ ガッツ */
export const enemyActiveGuts = () => armdozerSpriteStub(EnemyNeoLandozer, activeGuts);

export const armHammer = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    delay(1000)
      .chain(sprite.charge())
      .chain(delay(1000))
      .chain(sprite.armHammer())
      .chain(delay(1000))
      .chain(sprite.hmToStand())
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
    const sprite = PlayerNeoLandozer(resources, gameObjectAction);
    delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
