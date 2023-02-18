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

export const playerStand = () =>
  story(PlayerGenesisBraver, () => {
    // NOP
  });

export const enemyStand = () =>
  story(EnemyGenesisBraver, () => {
    // NOP
  });

const straightPunch = (sprite: GenesisBraver) => {
  return delay(1000)
    .chain(sprite.charge())
    .chain(delay(1000))
    .chain(sprite.straightPunch())
    .chain(delay(1000))
    .chain(sprite.spToStand())
    .chain(delay(1000));
};

export const playerStraightPunch = () =>
  story(PlayerGenesisBraver, straightPunch);
export const enemyStraightPunch = () =>
  story(EnemyGenesisBraver, straightPunch);

const knockBack = (sprite: GenesisBraver) => {
  delay(1000)
    .chain(sprite.knockBack())
    .chain(delay(1000))
    .chain(sprite.knockBackToStand())
    .chain(delay(1000))
    .loop();
};
export const playerKnockBack = () => story(PlayerGenesisBraver, knockBack);
export const enemyKnockBack = () => story(EnemyGenesisBraver, knockBack);
