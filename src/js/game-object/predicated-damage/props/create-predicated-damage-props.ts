import { SEPlayerContainer } from "../../../se/se-player";
import { initialValue } from "../model/initial-value";
import { BattleSimulatorIconPosition } from "../model/predicated-damage-model";
import { createPredicatedDamageSounds } from "../sounds/create-status-icon-sounds";
import {
  PredicatedDamageView,
  PredicatedDamageViewConstructParams,
} from "../view/predicated-damage-view";
import { PredicatedDamageProps } from "./predicated-damage-props";

/** 生成パラメータ */
export type PredicatedDamagePropsCreatorParams =
  PredicatedDamageViewConstructParams &
    SEPlayerContainer & {
      /** バトルシミュレーターアイコンの位置 */
      battleSimulatorIconPosition: BattleSimulatorIconPosition;
    };

/**
 * PredicatedDamagePropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPredicatedDamageProps(
  params: PredicatedDamagePropsCreatorParams,
): PredicatedDamageProps {
  const { battleSimulatorIconPosition } = params;
  return {
    ...params,
    model: initialValue(battleSimulatorIconPosition),
    view: new PredicatedDamageView(params),
    sounds: createPredicatedDamageSounds(params.resources),
    disabled: false,
  };
}
