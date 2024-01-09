import { waitElementLoaded } from "../../wait/wait-element-loaded";
import { ROOT_CLASS } from "./dom/class-name";
import { extractBustShot, extractStand } from "./dom/elements";
import { RootInnerHTMLParams } from "./dom/root-inner-html";
import { rootInnerHtml } from "./dom/root-inner-html";

/** エピソードタイトル画面プロパティ */
export type EpisodeTitleProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 立ち画像を読み込んだら発火するPromise */
  isStandLoaded: Promise<void>;
  /** バストショット画像を読み込んだら発火するPromise */
  isBustShotLoaded: Promise<void>;
};

/** プロパティ生成パラメータ */
export type CreatePropsParams = RootInnerHTMLParams;

/**
 * エピソードタイトル画面プロパティを生成する
 * @param params パラメータ
 * @return 生成した画面プロパティ
 */
export function createEpisodeTitleProps(
  params: CreatePropsParams,
): EpisodeTitleProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml(params);
  const stand = extractStand(root);
  const bustShot = extractBustShot(root);
  const isStandLoaded = waitElementLoaded(stand);
  const isBustShotLoaded = waitElementLoaded(bustShot);
  return {
    root,
    isStandLoaded,
    isBustShotLoaded,
  };
}
