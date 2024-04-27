import { delay } from "../src/js/animation/delay";
import {
  enemyRaitoCutIn,
  playerRaitoCutIn,
} from "../src/js/game-object/cut-in/raito";
import { RaitoCutIn } from "../src/js/game-object/cut-in/raito/raito";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "raito-cutin",
};

const cutinAnimation = (pilot: RaitoCutIn) => {
  pilot
    .show()
    .chain(delay(2000))
    .chain(pilot.hidden())
    .chain(delay(2000))
    .loop();
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const pilot = playerRaitoCutIn(params);
    cutinAnimation(pilot);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const pilot = enemyRaitoCutIn(params);
    cutinAnimation(pilot);
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
