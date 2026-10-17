import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../sounds/se/se-player";

/** イースターエッグのプロパティ */
export type EasterEggProps =  SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** コンテンツ */
  content: HTMLElement;

  /** 効果音 */
  sound: SoundResource;
};
