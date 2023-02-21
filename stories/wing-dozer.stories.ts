import { delay } from "../src/js/animation/delay";
import {
  EnemyWingDozer,
  PlayerWingDozer,
} from "../src/js/game-object/armdozer/wing-dozer";
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

export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = EnemyWingDozer(resources, gameObjectAction);
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const activeStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    sprite.startActive().play();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const upper = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    const animation = sprite
      .charge()
      .chain(delay(500))
      .chain(sprite.upper())
      .chain(delay(500))
      .chain(sprite.upperToStand())
      .chain(delay(1000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const activeDash = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    sprite.startActive().play();
    sprite
      .dash()
      .chain(delay(2000))
      .chain(sprite.dashToStand())
      .chain(delay(2000))
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
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    const animation = sprite.down().chain(delay(2000));
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
