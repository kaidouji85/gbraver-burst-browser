import { SEPlayerContainer } from "../../../se/se-player";
import { BattleSceneSounds } from "../sounds";
import { BattleSceneView } from "../view";

/** BattleScenePropsからデスアラートで利用するプロパティを抽出したもの */
type DeathAlertProps = Readonly<SEPlayerContainer> & {
  /** 戦闘シーンビュー */
  readonly view: BattleSceneView;
  /** 戦闘シーン音素材 */
  readonly sounds: BattleSceneSounds;
};

/** フェード時間（ミリ秒） */
const fadeDuration = 200;

/**
 * プレイヤーのデスアラートを開始する
 * @param props ゲームプロパティ
 */
export const startPlayerDeathAlert = (props: Readonly<DeathAlertProps>) => {
  const { deathAlert } = props.view.hud.gameObjects;
  if (deathAlert.isPlaying()) {
    return;
  }

  const { illumination, skyBrightness } = props.view.td.gameObjects;
  deathAlert.play(fadeDuration);
  illumination.interruptToIntensity(0.25, fadeDuration);
  skyBrightness.interruptToBrightness(0.25, fadeDuration);
};

/**
 * デスアラートを停止する
 * @param props ゲームプロパティ
 */
export const stopDeathAlert = (props: Readonly<DeathAlertProps>) => {
  const { deathAlert } = props.view.hud.gameObjects;
  if (!deathAlert.isPlaying()) {
    return;
  }

  const { illumination, skyBrightness } = props.view.td.gameObjects;
  deathAlert.stop(fadeDuration);
  illumination.interruptToIntensity(1, fadeDuration);
  skyBrightness.interruptToBrightness(1, fadeDuration);
};
