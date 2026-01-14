import { pop } from "../../../dom/pop";
import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { waitTime } from "../../../wait/wait-time";
import { TitleProps } from "../props";

/**
 * アームドーザを非表示にする
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const hidden = (img: HTMLImageElement) =>
  img.animate([{ opacity: 0 }], { duration: 0, fill: "forwards" });

/**
 * 右側のアームドーザを表示する
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const showRight = (img: HTMLImageElement) =>
  img.animate(
    [
      { opacity: 1, transform: "scaleX(-1) translateX(10vh)" },
      { opacity: 1, transform: "scaleX(-1) translateX(0vh)" },
    ],
    {
      duration: 200,
      fill: "forwards",
    },
  );

/**
 * 左側のアームドーザを表示する
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const showLeft = (img: HTMLImageElement) =>
  img.animate(
    [
      { opacity: 1, transform: "translateX(-10vh)" },
      { opacity: 1, transform: "translateX(0vh)" },
    ],
    {
      duration: 200,
      fill: "forwards",
    },
  );

/**
 * タイトルアニメーションをループ再生する
 * @param props タイトルプロパティ
 */
export async function loopTitleAnimation(props: Readonly<TitleProps>) {
  Promise.all([
    waitFinishAnimation(
      props.genesisBraver.animate([{ opacity: 0.5 }], {
        duration: 0,
        fill: "forwards",
      }),
    ),
    waitFinishAnimation(
      props.shinBraver.animate([{ opacity: 0.5 }], {
        duration: 0,
        fill: "forwards",
      }),
    ),
  ]);
  // while(true) {
  //   await pop(props.genesisBraver);
  //   await waitTime(1000);
  // }
}
