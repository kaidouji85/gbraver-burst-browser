import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { createPrinceOfFallenSunProps } from "./procedure/create-prince-of-fallen-sun-props";
import { PrinceOfFallenSunProps } from "./props";

/** 落日の王子 イベント */
class PrinceOfFallenSun extends EmptyCustomBattleEvent {
  /** イベントプロパティ */
  #props: PrinceOfFallenSunProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#props = createPrinceOfFallenSunProps();
  }
}

/**
 * 落日の王子イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createPrinceOfFallenSun(): CustomBattleEvent {
  return new PrinceOfFallenSun();
}
