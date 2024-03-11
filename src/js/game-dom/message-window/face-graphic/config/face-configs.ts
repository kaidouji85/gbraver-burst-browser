import { PathIds } from "../../../../resource/path/ids";
import { ROOT_CLASS } from "../dom/class-name";
import { FaceConfig } from "./face-config";

/** 顔画像設定をあつめたもの */
export const faceConfigs: FaceConfig[] = [
  {
    type: "Shinya",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.SHINYA_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__shinya`,
    rightwardClassName: `${ROOT_CLASS}__shinya--right`,
    invisibleClassName: `${ROOT_CLASS}__shinya--invisible`,
  },
  {
    type: "Gai",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.GAI_SKILL_CUTIN)?.path ?? "",
    className: `${ROOT_CLASS}__gai`,
    rightwardClassName: `${ROOT_CLASS}__gai--right`,
    invisibleClassName: `${ROOT_CLASS}__gai--invisible`,
  },
  {
    type: "Raito",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.RAITO_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__raito`,
    rightwardClassName: `${ROOT_CLASS}__raito--right`,
    invisibleClassName: `${ROOT_CLASS}__raito--invisible`,
  },
  {
    type: "Tsubasa",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.TSUBASA_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__tsubasa`,
    rightwardClassName: `${ROOT_CLASS}__tsubasa--right`,
    invisibleClassName: `${ROOT_CLASS}__tsubasa--invisible`,
  },
  {
    type: "Yuuya",
    src: (resources) =>
      resources.paths.find((v) => v.id === PathIds.YUUYA_SKILL_CUTIN)?.path ??
      "",
    className: `${ROOT_CLASS}__yuuya`,
    rightwardClassName: `${ROOT_CLASS}__yuuya--right`,
    invisibleClassName: `${ROOT_CLASS}__yuuya--invisible`,
  },
];
