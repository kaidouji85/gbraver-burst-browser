import { EPISODE_TYPE_SELECTED } from "../dom/class-name";
import { EpisodeSelectorProps } from "../props";

/**
 * 指定したタブが選択されているか否かを判定する
 * @param tab 判定対象のタブ
 * @returns trueで選択されている
 */
function isEpisodeTabSelected(tab: HTMLElement): boolean {
  return tab.className === EPISODE_TYPE_SELECTED;
}

/**
 * メインエピソードタブが選択されているか否かを判定する
 * @param props 画面プロパティ
 * @returns trueで選択されている
 */
export function isMainEpisodeTabSelected(
  props: Readonly<EpisodeSelectorProps>,
): boolean {
  return isEpisodeTabSelected(props.mainEpisodeTab);
}

/**
 * サイドエピソードタブが選択されているか否かを判定する
 * @param props 画面プロパティ
 * @returns trueで選択されている
 */
export function isSideEpisodeTabSelected(
  props: Readonly<EpisodeSelectorProps>,
): boolean {
  return isEpisodeTabSelected(props.sideEpisodeTab);
}
