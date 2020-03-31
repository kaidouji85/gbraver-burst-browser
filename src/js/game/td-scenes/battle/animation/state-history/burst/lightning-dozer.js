// @flow

import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import type {HUDArmdozer} from "../../../view/hud/armdozer";
import {LightningDozerTD} from "../../../view/td/armdozer/lightning-dozer";

/**
 * ライトニングドーザ バーストアニメーションパラメータ
 *
 * @type BURST バースト
 */
export type LightningDozerBurstAnimationParam<BURST> = BurstAnimationParamX<LightningDozer, HUDArmdozer, LightningDozerTD, BURST>;
