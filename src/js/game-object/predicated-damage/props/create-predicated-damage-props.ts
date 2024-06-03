import { initialValue } from "../model/initial-value";
import {
  PredicatedDamageView,
  PredicatedDamageViewConstructParams,
} from "../view/predicated-model-view";
import { PredicatedDamageProps } from "./predicated-damage-props";

/** 生成パラメータ */
export type PredicatedDamagePropsCreatorParams =
  PredicatedDamageViewConstructParams;

/**
 * PredicatedDamagePropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPredicatedDamageProps(
  params: PredicatedDamagePropsCreatorParams,
): PredicatedDamageProps {
  return {
    model: initialValue(),
    view: new PredicatedDamageView(params),
    disabled: false,
  };
}
