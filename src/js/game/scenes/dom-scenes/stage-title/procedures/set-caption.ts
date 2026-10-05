import { BLOCK } from "../dom/class-name";
import { StageTitleProps } from "../props";

/**
 * キャプションを設定する
 * @param props 画面プロパティ
 * @param caption キャプション
 */
export function setCaption(
  props: Readonly<StageTitleProps>,
  caption: string[],
) {
  props.caption.innerHTML = caption
    .map(
      (v) => `
        <span class="${BLOCK}__caption-clause">
          ${v}
        </span>
      `,
    )
    .reduce((a, b) => a + b);
}
