// @flow

import type {MyTurnAnimationParam, MyTurnAnimationParamX} from "./animation-param";
import {WingDozerHUD} from "../../view/hud/armdozer-objects/wing-dozer";
import {WingDozerTD} from "../../view/td/armdozer-objects/wing-dozer";
import {Animate} from "../../../../../animation/animate";
import {all} from "../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../td-camera";
import {delay} from "../../../../../animation/delay";

/**
 * ウィングドーザ マイターン パラメータ
 */
export type WingDozerMyTurnParam = MyTurnAnimationParamX<WingDozerTD, WingDozerHUD>;

/**
 * ウィングドーザ マイターン パラメータ にキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castWingDozerMyTurnParam(origin: MyTurnAnimationParam): ?WingDozerMyTurnParam {
  if ((origin.tdArmdozer instanceof WingDozerTD) && (origin.hudArmdozer instanceof WingDozerHUD)) {
    const td: WingDozerTD = origin.tdArmdozer;
    const hud: WingDozerHUD = origin.hudArmdozer;
    return ((origin: any): MyTurnAnimationParamX<typeof td, typeof hud>);
  }
  return null;
}

/**
 * ウィングドーザ マイターン
 *
 * @param param パラメータ
 * @param effects 発生する効果のアニメーション
 * @return アニメーション
 */
export function wingDozerMyTurn(param: WingDozerMyTurnParam, effects: Animate): Animate {
  return all(all(
    attentionArmDozer(param.tdCamera, param.tdArmdozer.sprite(), 500),
    param.tdArmdozer.wingDozer.dash()
      .chain(delay(1000)),
    param.hudPlayer.turnStart.show(),
    )
      .chain(all(
        toInitial(param.tdCamera, 500),
        param.tdArmdozer.wingDozer.dashToStand(),
        param.hudPlayer.turnStart.hidden(),
      ))
      .chain(delay(500)),

    delay(800)
      .chain(effects),
  );
}
