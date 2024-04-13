import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { BurstButton } from "./burst-button";
import { GenesisBraverIcon } from "./view/genesis-braver-icon";
import { LightningDozerIcon } from "./view/lightning-dozer-icon";
import { NeoLandozerIcon } from "./view/neo-landozer-icon";
import { ShinBraverIcon } from "./view/shin-braver-icon";
import { WingDozerIcon } from "./view/wing-dozer-icon";

/** 生成パラメータ */
export type GenerateBurstButtonParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * シンブレイバー バーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function shinBraverBurstButton(
  params: GenerateBurstButtonParams,
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
  params: GenerateBurstButtonParams,
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
  params: GenerateBurstButtonParams,
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
  params: GenerateBurstButtonParams,
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
  params: GenerateBurstButtonParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new GenesisBraverIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}
