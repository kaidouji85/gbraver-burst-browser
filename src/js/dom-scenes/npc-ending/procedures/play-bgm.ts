import { fadeIn, play } from "../../../bgm/bgm-operators";
import { NPCEndingProps } from "../props";

/**
 * BGMの再生開始
 * @param props 画面プロパティ
 * @returns BGM再生が完了したら発火するPromise
 */
export async function playBGM(props: Readonly<NPCEndingProps>): Promise<void> {
  await props.bgm.do(play(props.endingBGM));
  await props.bgm.do(fadeIn);
}
