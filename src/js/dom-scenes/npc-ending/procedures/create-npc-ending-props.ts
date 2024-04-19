import { Subject } from "rxjs";

import { BGMManagerContainer } from "../../../bgm/bgm-manager";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { domUuid } from "../../../uuid/dom-uuid";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { ROOT_CLASS } from "../dom/class-name";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { NPCEndingProps } from "../props";

/** NPCEndingProps生成パラメータ */
export type PropsCreatorParams = BGMManagerContainer &
  ResourcesContainer &
  SEPlayerContainer;

/**
 * NPCEndingPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createNPCEndingProps(
  params: PropsCreatorParams,
): NPCEndingProps {
  const { resources } = params;
  const ids = {
    end: domUuid(),
    logo: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids);
  const elements = extractElements(root, ids);
  const titleBackImage = new Image();
  titleBackImage.src =
    resources.paths.find((v) => v.id === PathIds.END_CARD)?.path ?? "";
  const isEndCardLoaded = waitElementLoaded(titleBackImage).then(() => {
    root.style.backgroundImage = `url(${titleBackImage.src})`;
  });
  const isEndLoaded = waitElementLoaded(elements.end);
  elements.end.src =
    resources.paths.find((v) => v.id === PathIds.END)?.path ?? "";
  const isLogoLoader = waitElementLoaded(elements.logo);
  elements.logo.src =
    resources.paths.find((v) => v.id === PathIds.LOGO)?.path ?? "";
  const pushButtonSound =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const endingBGM =
    resources.sounds.find((v) => v.id === SOUND_IDS.NPC_ENDING) ??
    createEmptySoundResource();
  return {
    ...params,
    root,
    isEndCardLoaded,
    isEndLoaded,
    isLogoLoader,
    pushButtonSound,
    endingBGM,
    canOperation: true,
    endNPCEnding: new Subject<void>(),
  };
}
