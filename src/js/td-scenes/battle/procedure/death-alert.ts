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
 * プレイヤーのデスアラートを開始する
 * @param props ゲームプロパティ
 */
export const startPlayerDeathAlert = (props: Readonly<DeathAlertProps>) => {
  const isDeathAlertAlreadyPlaying = props.sounds.deathAlert.sound.playing();
  if (isDeathAlertAlreadyPlaying) {
    return;
  }

  props.se.loop(props.sounds.deathAlert);
  //props.view.hud.gameObjects.deathAlertVignette.fadeOut().play();
};

/**
 * デスアラートを停止する
 * @param props ゲームプロパティ
 */
export const stopDeathAlert = (props: Readonly<DeathAlertProps>) => {
  props.sounds.deathAlert.sound.stop();
  //props.view.hud.gameObjects.deathAlertVignette.fadeIn().play();
};
