import {
  BurstButtonCreatorParams,
  genesisBraverBurstButton,
  lightningDozerBurstButton,
  neoLandozerBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton,
} from "../src/js/game-object/burst-button";
import { BurstButton } from "../src/js/game-object/burst-button/burst-button";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "burst-button",
};

/**
 * バーストボタン生成関数
 * @param params 生成パラメータ
 * @returns バーストボタン
 */
type BurstButtonGenerator = (params: BurstButtonCreatorParams) => BurstButton;

/**
 * バーストボタンストーリー
 * @param generator バーストボタン生成関数
 * @param fn バーストボタンに対する処理
 */
const buttonStory = (
  generator: BurstButtonGenerator,
  fn: (burstButton: BurstButton) => void,
) =>
  hudGameObjectStory((params) => {
    const burstButton = generator(params);
    fn(burstButton);
    return [burstButton.getObject3D()];
  });

/**
 * 操作可能
 * @param burstButton バーストボタン
 */
const operatable = (burstButton: BurstButton) => {
  burstButton.notifyPressed().subscribe(() => {
    burstButton.decide().play();
  });
  burstButton.open(true).play();
};

/** シンブレイバー */
export const shinBraver = buttonStory(shinBraverBurstButton, operatable);

/** ネオランドーザ */
export const neoLandozer = buttonStory(neoLandozerBurstButton, operatable);

/** ライトニングドーザ */
export const lightningDozer = buttonStory(
  lightningDozerBurstButton,
  operatable,
);

/** ウィングドーザ */
export const wingDozer = buttonStory(wingDozerBurstButton, operatable);

/** ジェネシスブレイバー */
export const genesisBraver = buttonStory(genesisBraverBurstButton, operatable);

/**
 * バースト不可能
 * @param burstButton バーストボタン
 */
const canNotBurst = (burstButton: BurstButton) => {
  burstButton.notifyPressed().subscribe(() => {
    burstButton.decide().play();
  });
  burstButton.open(false).play();
};

/** シンブレイバー バースト不可能 */
export const canNotBurstShinBraver = buttonStory(
  shinBraverBurstButton,
  canNotBurst,
);

/**
 * 操作不可能
 * @param burstButton バーストボタン
 */
const disabled = (burstButton: BurstButton) => {
  operatable(burstButton);
  burstButton.disabled(true);
};

/** シンブレイバー 操作不可能 */
export const disabledShinBraver = buttonStory(shinBraverBurstButton, disabled);
