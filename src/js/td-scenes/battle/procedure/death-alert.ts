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

  props.se.loop(props.sounds.deathAlert);
  props.view.hud.gameObjects.deathAlertVignette.fadeOut().play();
};

/**
 * デスアラートを停止する
 * @param props ゲームプロパティ
 */
export const stopDeathAlert = (props: Readonly<DeathAlertProps>) => {
  if (!isDeathAlertAlreadyPlaying(props)) {
    return;
  }

  props.sounds.deathAlert.sound.stop();
  props.view.hud.gameObjects.deathAlertVignette.fadeIn().play();
};
