import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  EnemyGenesisBraver,
  PlayerGenesisBraver,
} from "../src/js/game-object/armdozer/genesis-braver";
import { GenesisBraver } from "../src/js/game-object/armdozer/genesis-braver/genesis-braver";
import { Resources } from "../src/js/resource";
import { Stream } from "../src/js/stream/stream";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "genesis-braver",
};

/**
 * ジェネシスブレイバー ストーリー ボイラープレート
 * @param generator ジェネシスブレイバー生成関数
 * @param fn ジェネシスブレイバーを操作する関数
 * @return スタブのHTML要素
 */
const story = (
  generator: (
    resources: Resources,
    gameObjectAction: Stream<GameObjectAction>
  ) => GenesisBraver,
  fn: (sprite: GenesisBraver) => void
): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = generator(resources, gameObjectAction);
    fn(sprite);
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

/** プレイヤー 立ち */
export const playerStand = () =>
  story(PlayerGenesisBraver, () => {
    // NOP
  });

/** プレイヤー アクティブ 立ち */
export const playerActiveStand = () =>
  story(PlayerGenesisBraver, (sprite) => {
    sprite.startActive().play();
  });

/** 敵 立ち */
export const enemyStand = () =>
  story(EnemyGenesisBraver, () => {
    // NOP
  });

/** 敵 アクティブ 立ち */
export const enemyActiveStand = () =>
  story(EnemyGenesisBraver, (sprite) => {
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
  story(PlayerGenesisBraver, straightPunch);

/** 敵 ストレートパンチ */
export const enemyStraightPunch = () =>
  story(EnemyGenesisBraver, straightPunch);

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
export const playerKnockBack = () => story(PlayerGenesisBraver, knockBack);

/** プレイヤー アクティブ ノックバック */
export const playerActiveKnockBack = () =>
  story(PlayerGenesisBraver, activeKnockBack);

/** 敵 ノックバック */
export const enemyKnockBack = () => story(EnemyGenesisBraver, knockBack);

/** 敵 アクティブ ノックバック */
export const enemyActiveKnockBack = () =>
  story(EnemyGenesisBraver, activeKnockBack);
