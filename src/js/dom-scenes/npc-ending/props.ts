import {Howl} from "howler";

import {BGMManager} from "../../bgm/bgm-manager";
import {createEmptySoundResource, SOUND_IDS, SoundResource} from "../../resource/sound";
import {Subject} from "rxjs";
import {Resources} from "../../resource";
import {domUuid} from "../../uuid/dom-uuid";
import {PathIds} from "../../resource/path";
import {waitElementLoaded} from "../../wait/wait-element-loaded";
import {ROOT_CLASS} from "./dom/class-name";
import {rootInnerHTML} from "./dom/root-inner-html";
import {extractElements} from "./dom/elements";

/** NPCルート エンディング画面 プロパティ */
export type NPCEndingProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** エンドカードが読み込み完了したら発火するPromise */
  isEndCardLoaded: Promise<void>;
  /** 終了文言が読み込み完了したら発火するPromise */
  isEndLoaded: Promise<void>;
  /** ロゴが読み込み完了したら発火するPromise */
  isLogoLoader: Promise<void>;
  /** 効果音 ボタンプッシュ */
  pushButtonSound: Howl;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
  /** エンディングBGM */
  endingBGM: SoundResource;
  /** 操作可能であるか否かのフラグ、trueで操作可能 */
  canOperation: boolean;
  /** エンディング終了通知ストリーム */
  endNPCEnding: Subject<void>;
};

/**
 * NPCEndingPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param bgm BGM管理オブジェクト
 * @return 生成結果
 */
export function createNPCEndingProps(resources: Resources, bgm: BGMManager): NPCEndingProps {
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
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
    new Howl({ src: "" });
  const endingBGM =
    resources.sounds.find((v) => v.id === SOUND_IDS.NPC_ENDING) ??
    createEmptySoundResource();
  return {
    root,
    isEndCardLoaded,
    isEndLoaded,
    isLogoLoader,
    pushButtonSound,
    bgm,
    endingBGM,
    canOperation: true,
    endNPCEnding: new Subject<void>(),
  }
}