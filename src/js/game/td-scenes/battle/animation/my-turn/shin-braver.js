// @flow

import type {MyTurnAnimationParam, MyTurnAnimationParamX} from "./animation-param";
import {ShinBraverTD} from "../../view/td/armdozer-objects/shin-braver";
import {ShinBraverHUD} from "../../view/hud/armdozer-objects/shin-braver";
import {attentionArmDozer, toInitial} from "../td-camera";
import {delay} from "../../../../../animation/delay";
import {Animate} from "../../../../../animation/animate";
import {all} from "../../../../../animation/all";

/**
 * シンブレイバー マイターン パラメータ
 */
export type ShinBraverMyTurn = MyTurnAnimationParamX<ShinBraverTD, ShinBraverHUD>;

/**
 * シンブレイバー マイターン パラメータ にキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castShinBraverMyTUrn(origin: MyTurnAnimationParam): ?ShinBraverMyTurn {
  if ((origin.tdArmdozer instanceof ShinBraverTD) && (origin.hudArmdozer instanceof ShinBraverHUD)) {
    const td: ShinBraverTD = origin.tdArmdozer;
    const hud: ShinBraverHUD = origin.hudArmdozer;
    return ((origin: any): MyTurnAnimationParamX<typeof td, typeof hud>);
  }
  return null;
}

/**
 * シンブレイバー マイターン
 *
 * @param param パラメータ
 * @param effects 発生する効果のアニメーション
 * @return アニメーション
 */
export function shinBraverMyTurn(param: ShinBraverMyTurn, effects: Animate): Animate {
  return all(
    all(
      attentionArmDozer(param.tdCamera, param.tdArmdozer.sprite(), 500),
      param.tdArmdozer.shinBraver.guts()
        .chain(delay(1000)),
      param.hudPlayer.turnStart.show(),
    )
      .chain(all(
        toInitial(param.tdCamera, 500),
        param.tdArmdozer.shinBraver.gutsToStand(),
        param.hudPlayer.turnStart.hidden(),
      ))
      .chain(delay(500)),

    delay(700)
      .chain(effects),
  );
}
