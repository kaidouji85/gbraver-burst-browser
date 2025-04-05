import { PlainHUDCamera } from "../../../../../../game-object/camera/plain-hud/plain-hud-camera";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { HUDGameObjects } from "../../../../view/hud/game-objects";
import { TDGameObjects } from "../../../../view/td/game-objects";
import { StateAnimationProps } from "../../state-animation-props";

/** その他バーストアニメーションのパラメータ */
export type OtherParam = {
  /** 3Dレイヤーオブジェクト */
  readonly tdObjects: TDGameObjects;
  /** 3Dカメラ */
  readonly tdCamera: TDCamera;
  /** HUDレイヤーオブジェクト */
  readonly hudObjects: HUDGameObjects;
  /** HUDカメラ */
  readonly hudCamera: PlainHUDCamera;
};

/**
 * その他バーストアニメーションパラメータを生成する
 * @param props 戦闘シーンプロパティ
 * @returns その他バーストアニメーションのパラメータ
 */
export const toOtherParam = (props: StateAnimationProps): OtherParam => ({
  tdObjects: props.view.td.gameObjects,
  tdCamera: props.view.td.camera,
  hudObjects: props.view.hud.gameObjects,
  hudCamera: props.view.hud.camera,
});
