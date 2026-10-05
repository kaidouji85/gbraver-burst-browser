import { NPCEndingProps } from "../props";

/**
 * 各種リソースの読み込みが完了するまで待つ
 * @param props 画面プロパティ
 * @returns 読み込みが完了したら発火するPromise
 */
export async function waitUntilLoaded(
  props: Readonly<NPCEndingProps>,
): Promise<void> {
  await Promise.all([
    props.isEndLoaded,
    props.isEndCardLoaded,
    props.isLogoLoader,
  ]);
}
