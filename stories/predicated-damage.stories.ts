import { delay } from "../src/js/animation/delay";
import { PredicatedDamage } from "../src/js/game-object/predicated-damage";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "predicated-damage",
};

/**
 * 点滅
 * @param predicatedDamage ダメージ予想
 * @param damage 表示ダメージ
 */
const flash = (predicatedDamage: PredicatedDamage, damage: number) => {
  predicatedDamage.show(damage)
    .chain(delay(2000))
    .chain(predicatedDamage.hidden())
    .chain(delay(2000))
    .loop();
}

/** ダメージ予想の表示 */
export const predicatedDamage = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => {
    const predicatedDamage = new PredicatedDamage(params);
    flash(predicatedDamage, 2000);
    return [predicatedDamage.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
