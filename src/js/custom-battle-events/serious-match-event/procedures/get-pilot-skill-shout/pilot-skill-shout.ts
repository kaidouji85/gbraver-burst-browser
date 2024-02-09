import { FaceType } from "../../../../game-dom/message-window/face-graphic";

/** パイロット叫び情報 */
export type PilotSkillShout = {
  /** 顔グラフィック */
  face: FaceType;
  /** メッセージ */
  message: string;
};
