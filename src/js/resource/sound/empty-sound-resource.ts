import { Howl } from "howler";

import { SoundResource } from "./resource";

/**
 * 空の音リソースを生成する
 * @returns 生成結果
 */
export function createEmptySoundResource(): SoundResource {
  return {
    type: "Shared",
    id: "EmptyResource",
    sound: new Howl({ src: "", mute: true }),
    volumeScale: 1,
  };
}
