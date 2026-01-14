import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { waitTime } from "../../../wait/wait-time";
import { ArmdozerImages, TitleProps } from "../props";

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
      { opacity: 1, transform: "scaleX(-1) translateX(-10vh)" },
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
  while (true) {
    await waitTime(5000);
    await switchArmdozer(granDozer, wingDozer, armdozerImages);
    await waitTime(5000);
    await switchArmdozer(genesisBraver, shinBraver, armdozerImages);
  }
}
