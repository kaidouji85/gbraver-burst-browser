import { Observable } from "rxjs";

import { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import { GameObjectAction } from "../action/game-object-action";
import { BurstButton } from "./burst-button";
import { GenesisBraverIcon } from "./view/genesis-braver-icon";
import { GranDozerIcon } from "./view/gran-dozer-icon";
import { LightningDozerIcon } from "./view/lightning-dozer-icon";
import { createNeoLandozerIcon } from "./view/neo-landozer-icon";
import { createShinBraverIcon } from "./view/shin-braver-icon";
import { createWingDozerIcon } from "./view/wing-dozer-icon";

/** 生成パラメータ */
export type BurstButtonCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * シンブレイバー バーストボタンを生成する
 * @param params 生成パラメータ
 * @returns バーストボタン
 */
export function shinBraverBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = createShinBraverIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ネオランドーザ バーストボタンを生成する
 * @param params 生成パラメータ
 * @returns バーストボタン
 */
export function neoLandozerBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = createNeoLandozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ライトニングドーザ バーストボタンを生成する
 * @param params 生成パラメータ
 * @returns バーストボタン
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
 * @returns バーストボタン
 */
export function wingDozerBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = createWingDozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * ジェネシスブレイバー バーストボタンを生成する
 * @param params 生成パラメータ
 * @returns バーストボタン
 */
export function genesisBraverBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new GenesisBraverIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}

/**
 * グランドーザ バーストボタンを生成する
 * @param params 生成パラメータ
 * @returns バーストボタン
 */
export function granDozerBurstButton(
  params: BurstButtonCreatorParams,
): BurstButton {
  const { resources } = params;
  const armdozerIcon = new GranDozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}
