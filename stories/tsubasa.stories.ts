import { delay } from "../src/js/animation/delay";
import {
  enemyTsubasaCutIn,
  playerTsubasaCutIn,
} from "../src/js/game-object/cut-in/tsubasa";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "tsubasa-cutin",
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const pilot = playerTsubasaCutIn(params);
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
    const pilot = enemyTsubasaCutIn(params);
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
