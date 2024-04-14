import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import {
  enemyShinBraverCutIn,
  playerShinBraverCutIn,
} from "../src/js/game-object/cut-in/shin-braver";
import { ShinBraverCutIn } from "../src/js/game-object/cut-in/shin-braver/shin-braver-cutin";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "shin-braver-cutin",
};

function cutInAnimation(cutIn: ShinBraverCutIn): Animate {
  return cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000));
}

export const Player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = playerShinBraverCutIn(params);
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const Enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const cutIn = enemyShinBraverCutIn(params);
    cutInAnimation(cutIn).loop();
    return [cutIn.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
