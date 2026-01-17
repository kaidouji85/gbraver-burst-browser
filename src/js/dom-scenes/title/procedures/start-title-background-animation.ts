import { SignalContainer } from "../../../abort-controller/signal-container";
import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { waitTime } from "../../../wait/wait-time";
import { ArmdozerImages, TitleProps } from "../props";

/** アームドーザを表示するまでの時間 */
const showDuration = 600;

/** アームドーザが消えるまでの時間 */
const hiddenDuration = 600;

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
        opacity: 0,
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
 * 右側のアームドーザを非表示にする
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const hiddenRight = (img: HTMLImageElement) =>
  img.animate(
    [
      {
        opacity: 0,
        left: "var(--offset-x)",
        transform: `scaleX(-1) translateX(${deltaX})`,
      },
    ],
    {
      duration: hiddenDuration,
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
        opacity: 0,
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
 * 左側のアームドーザを非表示にする
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const hiddenLeft = (img: HTMLImageElement) =>
  img.animate(
    [
      {
        opacity: 0,
        right: "var(--offset-x)",
        transform: `translateX(${deltaX})`,
      },
    ],
    {
      duration: hiddenDuration,
      fill: "forwards",
      easing: "ease",
    },
  );

/**
 * アームドーザのペアをアニメーションする
 * @param options オプション
 * @param options.left 左側に表示するアームドーザ画像
 * @param options.right 右側に表示するアームドーザ画像
 * @param options.armdozerImages アームドーザ画像をあつめたもの
 * @returns アニメーションが完了したら発火するPromise
 */
const animateArmdozerPair = async (
  options: Readonly<SignalContainer> & {
    left: HTMLImageElement;
    right: HTMLImageElement;
    armdozerImages: ArmdozerImages;
  },
) => {
  const { left, right, armdozerImages, signal } = options;
  const otherArmdozerImages = Object.values(armdozerImages).filter(
    (img) => img !== left && img !== right,
  );
  await Promise.all([
    waitFinishAnimation(showLeft(left), { signal }),
    waitFinishAnimation(showRight(right), { signal }),
    ...otherArmdozerImages.map((img) =>
      waitFinishAnimation(hidden(img), { signal }),
    ),
  ]);
  await waitTime(3000, { signal });
  await Promise.all([
    waitFinishAnimation(hiddenLeft(left), { signal }),
    waitFinishAnimation(hiddenRight(right), { signal }),
  ]);
};

/**
 * タイトル背景アニメーションのループを開始する
 * @param props タイトルプロパティ
 */
export async function startTitleBackgroundLoop(props: Readonly<TitleProps>) {
  const { armdozerImages, abort } = props;
  const {
    genesisBraver,
    shinBraver,
    granDozer,
    wingDozer,
    neoLandozer,
    lightningDozer,
  } = armdozerImages;
  const { signal } = abort.getAbortController();
  const sharedOptions = { signal, armdozerImages };
  while (true) {
    await animateArmdozerPair({
      ...sharedOptions,
      left: genesisBraver,
      right: shinBraver,
    });
    await animateArmdozerPair({
      ...sharedOptions,
      left: granDozer,
      right: wingDozer,
    });
    await animateArmdozerPair({
      ...sharedOptions,
      left: neoLandozer,
      right: lightningDozer,
    });
  }
}
