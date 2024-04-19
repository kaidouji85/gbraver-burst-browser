import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { PilotButton } from "./pilot-button";
import { GaiIcon } from "./view/gai";
import { RaitoIcon } from "./view/raito";
import { ShinyaIcon } from "./view/shinya";
import { TsubasaIcon } from "./view/tsubasa";
import { YuuyaIcon } from "./view/yuuya";

/** 生成パラメータ */
export type PilotButtonCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * シンヤ パイロットボタン を生成する
 * @param params 生成パラメータ
 * @return パイロットボタン
 */
export function shinyaPilotButton(
  params: PilotButtonCreatorParams,
): PilotButton {
  const { resources } = params;
  const pilotIcon = new ShinyaIcon(resources);
  return new PilotButton({ ...params, pilotIcon });
}

/**
 * ガイ パイロットボタン を生成する
 * @param params 生成パラメータ
 * @return パイロットボタン
 */
export function gaiPilotButton(params: PilotButtonCreatorParams): PilotButton {
  const { resources } = params;
  const pilotIcon = new GaiIcon(resources);
  return new PilotButton({ ...params, pilotIcon });
}

/**
 * ライト パイロットボタン を生成する
 * @param params 生成パラメータ
 * @return パイロットボタン
 */
export function raitoPilotButton(
  params: PilotButtonCreatorParams,
): PilotButton {
  const { resources } = params;
  const pilotIcon = new RaitoIcon(resources);
  return new PilotButton({ ...params, pilotIcon });
}

/**
 * ツバサ パイロットボタン を生成する
 * @param params 生成パラメータ
 * @return パイロットボタン
 */
export function tsubasaPilotButton(
  params: PilotButtonCreatorParams,
): PilotButton {
  const { resources } = params;
  const pilotIcon = new TsubasaIcon(resources);
  return new PilotButton({ ...params, pilotIcon });
}

/**
 * ユウヤ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function yuuyaPilotButton(
  params: PilotButtonCreatorParams,
): PilotButton {
  const { resources } = params;
  const pilotIcon = new YuuyaIcon(resources);
  return new PilotButton({ ...params, pilotIcon });
}
