import { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { BurstButton } from "./burst-button";
import { createGenesisBraverIcon } from "./view/genesis-braver-icon";
import { createGranDozerIcon } from "./view/gran-dozer-icon";
import { createLightningDozerIcon } from "./view/lightning-dozer-icon";
import { createNeoLandozerIcon } from "./view/neo-landozer-icon";
import { createShinBraverIcon } from "./view/shin-braver-icon";
import { createWingDozerIcon } from "./view/wing-dozer-icon";

/** 生成パラメータ */
export type BurstButtonCreatorParams = ResourcesContainer &
  SEPlayerContainer &
  GameObjectActionContainer;

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
  const armdozerIcon = createLightningDozerIcon(resources);
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
  const armdozerIcon = createGenesisBraverIcon(resources);
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
  const armdozerIcon = createGranDozerIcon(resources);
  return new BurstButton({ ...params, armdozerIcon });
}
