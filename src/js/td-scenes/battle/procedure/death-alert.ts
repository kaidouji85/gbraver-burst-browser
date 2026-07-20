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
 * デスアラートがすでに再生中かどうかを判定する
 * @param props ゲームプロパティ
 * @returns 判定結果、trueなら再生中
 */
const isDeathAlertAlreadyPlaying = (props: Readonly<DeathAlertProps>) =>
  // デスアラートの効果音が再生されていれば、デスアラートは再生中と判定する
  // デスアラート音はループ再生されるので、再生中かどうかの判定はこの条件で十分である
  props.sounds.deathAlert.sound.playing();

/**
 * プレイヤーのデスアラートを開始する
 * @param props ゲームプロパティ
 */
export const startPlayerDeathAlert = (props: Readonly<DeathAlertProps>) => {
  if (isDeathAlertAlreadyPlaying(props)) {
    return;
  }

  const { deathAlertVignette } = props.view.hud.gameObjects;
  const { illumination, skyBrightness } = props.view.td.gameObjects;
  props.se.loop(props.sounds.deathAlert);
  deathAlertVignette.play(fadeDuration);
  illumination.interruptToIntensity(0.25, fadeDuration);
  skyBrightness.interruptToBrightness(0.25, fadeDuration);
};

/**
 * デスアラートを停止する
 * @param props ゲームプロパティ
 */
export const stopDeathAlert = (props: Readonly<DeathAlertProps>) => {
  if (!isDeathAlertAlreadyPlaying(props)) {
    return;
  }

  const { deathAlertVignette } = props.view.hud.gameObjects;
  const { illumination, skyBrightness } = props.view.td.gameObjects;
  props.sounds.deathAlert.sound.stop();
  deathAlertVignette.stop(fadeDuration);
  illumination.interruptToIntensity(1, fadeDuration);
  skyBrightness.interruptToBrightness(1, fadeDuration);
};
