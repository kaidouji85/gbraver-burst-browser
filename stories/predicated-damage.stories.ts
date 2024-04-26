import { PredicatedDamage } from "../src/js/game-object/predicated-damage";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "predicated-damage",
};

/** ダメージ予想の表示 */
export const predicatedDamage = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const predicatedDamage = new PredicatedDamage(params);
    return [predicatedDamage.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};