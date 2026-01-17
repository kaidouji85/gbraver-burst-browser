import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { waitTime } from "../../../wait/wait-time";
import { ArmdozerImages, TitleProps } from "../props";

/** アームドーザを表示するまでの時間 */
const showDuration = 600;

/** x方向の移動量 */
const deltaX = "4vh";

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
      {
        opacity: 1,
        left: "var(--offset-x)",
        transform: `scaleX(-1) translateX(${deltaX})`,
      },
      {
        opacity: 1,
        left: "var(--offset-x)",
        transform: "scaleX(-1) translateX(0vh)",
      },
    ],
    {
      duration: showDuration,
      fill: "forwards",
      easing: "ease",
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
      {
        opacity: 1,
        right: "var(--offset-x)",
        transform: `translateX(${deltaX})`,
      },
      { opacity: 1, right: "var(--offset-x)", transform: "translateX(0vh)" },
    ],
    {
      duration: showDuration,
      fill: "forwards",
      easing: "ease",
    },
  );

/**
 * アームドーザ画像を切り替える
 * @param left 左側に表示するアームドーザ画像
 * @param right 右側に表示するアームドーザ画像
 * @param armdozerImages アームドーザ画像をあつめたもの
 * @returns アニメーションが完了したら発火するPromise
 */
const switchArmdozer = (
  left: HTMLImageElement,
  right: HTMLImageElement,
  armdozerImages: ArmdozerImages,
) => {
  const otherArmdozerImages = Object.values(armdozerImages).filter(
    (img) => img !== left && img !== right,
  );
  return Promise.all([
    waitFinishAnimation(showLeft(left)),
    waitFinishAnimation(showRight(right)),
    ...otherArmdozerImages.map((img) => waitFinishAnimation(hidden(img))),
  ]);
};

/**
 * タイトルアニメーションをループ再生する
 * @param props タイトルプロパティ
 */
export async function loopTitleAnimation(props: Readonly<TitleProps>) {
  const { armdozerImages } = props;
  const { genesisBraver, shinBraver, granDozer, wingDozer } = armdozerImages;
  const interval = 5000;
  while (true) {
    await switchArmdozer(genesisBraver, shinBraver, armdozerImages);
    await waitTime(interval);
    await switchArmdozer(granDozer, wingDozer, armdozerImages);
    await waitTime(interval);
  }
}
