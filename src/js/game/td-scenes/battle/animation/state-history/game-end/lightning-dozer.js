// @flow

import {Animate} from "../../../../../../animation/animate";
import type {GameOverParam, GameOverParamX} from "./animation-param";
import {LightningDozerTD} from "../../../view/td/armdozer-objects/lightning-dozer";
import {all} from "../../../../../../animation/all";
import {dolly, track} from "../../td-camera";

/**
 * ライトニングドーザ ゲームオーバ
 */
export type LightningDozerGameOver = GameOverParamX<LightningDozerTD>;

/**
 * ライトニングドーザ ゲームオーバにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castLightningDozerGameOver(origin: GameOverParam): ?LightningDozerGameOver {
  if (origin.winnerTdArmdozer instanceof LightningDozerTD) {
    const td: LightningDozerTD = origin.winnerTdArmdozer;
    return ((origin: any): GameOverParamX<typeof td>);
  }

  return null;
}

/**
 * ライトニングドーザ  勝利
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function lightningDozerWin(param: LightningDozerGameOver): Animate {
  return all(
    param.winnerTdArmdozer.lightningDozer.guts(),
    track(param.tdCamera, param.winnerTdArmdozer.lightningDozer.getObject3D().position.x, 400),
    dolly(param.tdCamera, '-60', 400)
  );
}