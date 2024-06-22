import { ArmdozerId, PilotId } from "gbraver-burst-core";

import { PlayerSelect } from "../../dom-scenes/player-select";
import { SecretPlayerSelect } from "../../dom-scenes/secret-player-select";
import { secretPlayerSelectConnector } from "../action-connector/secret-player-select-connector";
import { PlayerSelectorType } from "../config/browser-config";
import { GameProps } from "../game-props";
import { getPlayableArmdozers } from "../playable-amdozers";
import { getPlayablePilots } from "../playable-pilots";
import { switchPlayerSelect } from "./switch-scene/switch-player-select";

/** シーンバインダーのパラメータ */
type SceneBinderParams = GameProps & {
  /** 選択可能なアームドーザID */
  armdozerIds: ArmdozerId[];
  /** 選択可能なパイロットID */
  pilotIds: PilotId[];
};

/**
 * シーンバインダー
 * @param params パラメータ
 * @returns 画面の素材読み込みまで完了したら発火するPromise
 */
type SceneBinder = (params: SceneBinderParams) => Promise<void>;

/**
 * プレイヤー選択画面をバインドする
 * @param params パラメータ
 * @returns 画面の素材読み込みまで完了したら発火するPromise
 */
const bindPlayerSelect: SceneBinder = async (params) => {
  const scene = new PlayerSelect(params);
  switchPlayerSelect(params, scene);
  await scene.waitUntilLoaded();
};

/**
 * シークレットプレイヤー選択画面をバインドする
 * @param params パラメータ
 * @returns 画面の素材読み込みまで完了したら発火するPromise
 */
const bindSecretPlayerSelect: SceneBinder = async (params) => {
  const { domSceneBinder } = params;
  const scene = new SecretPlayerSelect(params);
  domSceneBinder.bind(scene, secretPlayerSelectConnector(params));
  await scene.waitUntilLoaded();
};

/** バインダーをあつめたもの */
const binders: { [key in PlayerSelectorType]: SceneBinder } = {
  open: bindPlayerSelect,
  secret: bindSecretPlayerSelect,
};

/**
 * 設定値に応じたプレイヤー選択画面をバインドする
 * @param props ゲームプロパティ
 * @param playerSelectorType ロボ、パイロット選択タイプ
 * @returns 画面の素材読み込みまで完了したら発火するPromise
 */
export async function bindPlayerSelectAccordingToConfig(
  props: GameProps,
  playerSelectorType: PlayerSelectorType,
): Promise<void> {
  const binder = binders[playerSelectorType] ?? binders.open;
  await binder({
    ...props,
    armdozerIds: getPlayableArmdozers(props),
    pilotIds: getPlayablePilots(props),
  });
}
