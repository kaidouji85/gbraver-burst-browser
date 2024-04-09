import { Howl } from "howler";

import { SoundResource } from "./resource";

/**
 * 空の音リソースを生成する
 * @return 生成結果
 */
export function createEmptySoundResource(): SoundResource {
  return {
    id: "EmptyResource",
    type: "SE",
    sound: new Howl({
      src: "",
      mute: true,
    }),
    volume: 1,
    volumeScale: 1,
  };
}
