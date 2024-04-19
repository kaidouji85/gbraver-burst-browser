import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { BurstButton } from "./burst-button";
import { GenesisBraverIcon } from "./view/genesis-braver-icon";
import { LightningDozerIcon } from "./view/lightning-dozer-icon";
import { NeoLandozerIcon } from "./view/neo-landozer-icon";
import { ShinBraverIcon } from "./view/shin-braver-icon";
import { WingDozerIcon } from "./view/wing-dozer-icon";

/** 生成パラメータ */
export type BurstButtonCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * シンブレイバー バーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function shinBraverBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new ShinBraverIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ネオランドーザ バーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function neoLandozerBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new NeoLandozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ライトニングドーザ バーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function lightningDozerBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new LightningDozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ウィングドーザ バーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function wingDozerBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new WingDozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ジェネシスブレイバー バーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function genesisBraverBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new GenesisBraverIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}
