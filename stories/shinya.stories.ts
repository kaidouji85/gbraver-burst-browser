import { delay } from "../src/js/animation/delay";
import {
  enemyShinyaCutIn,
  playerShinyaCutIn,
} from "../src/js/game-object/cut-in/shinya";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "shinya-cutin",
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const pilot = playerShinyaCutIn(params);
    pilot
      .show()
      .chain(delay(2000))
      .chain(pilot.hidden())
      .chain(delay(2000))
      .loop();
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const pilot = enemyShinyaCutIn(params);
    pilot
      .show()
      .chain(delay(2000))
      .chain(pilot.hidden())
      .chain(delay(2000))
      .loop();
    return [pilot.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
