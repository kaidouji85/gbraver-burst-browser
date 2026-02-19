import { SignalContainer } from "../../../abort-controller/signal-container";
import { waitFinishAnimation } from "../../../dom/wait-finish-animation";
import { waitTime } from "../../../wait/wait-time";
import { ArmdozerImages, TitleProps } from "../props";

/** アームドーザが出現するまでの時間 */
const appearDuration = 1000;

/** アームドーザが表示されている時間 */
const displayDuration = 5000;

/** アームドーザが消失するまでの時間 */
const disappearDuration = 500;

/** 出現時のx方向移動量 */
const appearDeltaX = "4vh";

/** 消失時のx方向移動量 */
const disappearDeltaX = "2vh";

/** 左側のアームドーザのz-index */
const leftArmdozerZIndex = 1;

/** 右側のアームドーザのz-index */
const rightArmdozerZIndex = 2;

/**
 * アームドーザを非表示にする
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const hidden = (img: HTMLImageElement) =>
  img.animate([{ opacity: 0 }], { duration: 0, fill: "forwards" });

/**
 * 右側のアームドーザを出現させる
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const appearRight = (img: HTMLImageElement) =>
  img.animate(
    [
      {
        opacity: 0,
        left: "var(--offset-x)",
        transform: `scaleX(-1) translateX(${appearDeltaX})`,
      },
      {
        opacity: 1,
        left: "var(--offset-x)",
        transform: "scaleX(-1) translateX(0vh)",
      },
    ],
    {
      duration: appearDuration,
      fill: "forwards",
      easing: "ease",
    },
  );

/**
 * 右側のアームドーザを消失させる
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const disappearRight = (img: HTMLImageElement) =>
  img.animate(
    [
      {
        opacity: 0,
        left: "var(--offset-x)",
        transform: `scaleX(-1) translateX(${disappearDeltaX})`,
      },
    ],
    {
      duration: disappearDuration,
      fill: "forwards",
      easing: "ease",
    },
  );

/**
 * 左側のアームドーザを出現させる
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const appearLeft = (img: HTMLImageElement) =>
  img.animate(
    [
      {
        opacity: 0,
        right: "var(--offset-x)",
        transform: `translateX(${appearDeltaX})`,
      },
      { opacity: 1, right: "var(--offset-x)", transform: "translateX(0vh)" },
    ],
    {
      duration: appearDuration,
      fill: "forwards",
      easing: "ease",
    },
  );

/**
 * 左側のアームドーザを消失させる
 * @param img アームドーザ画像
 * @returns アニメーション
 */
const disappearLeft = (img: HTMLImageElement) =>
  img.animate(
    [
      {
        opacity: 0,
        right: "var(--offset-x)",
        transform: `translateX(${disappearDeltaX})`,
      },
    ],
    {
      duration: disappearDuration,
      fill: "forwards",
      easing: "ease",
    },
  );

/**
 * アームドーザのペアをアニメーションする
 * @param options オプション
 * @param options.left 左側に表示するアームドーザ画像
 * @param options.right 右側に表示するアームドーザ画像
 * @returns アニメーションが完了したら発火するPromise
 */
const animateArmdozerPair = async (
  options: Readonly<SignalContainer> & {
    left: HTMLImageElement;
    right: HTMLImageElement;
  },
) => {
  const { left, right, signal } = options;
  left.style.zIndex = `${leftArmdozerZIndex}`;
  right.style.zIndex = `${rightArmdozerZIndex}`;
  await Promise.all([
    waitFinishAnimation(appearLeft(left), { signal }),
    waitFinishAnimation(appearRight(right), { signal }),
  ]);
  await waitTime(displayDuration, { signal });
  await Promise.all([
    waitFinishAnimation(disappearLeft(left), { signal }),
    waitFinishAnimation(disappearRight(right), { signal }),
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
  while (true) {
    await animateArmdozerPair({
      signal,
      left: genesisBraver,
      right: shinBraver,
    });
    await animateArmdozerPair({
      signal,
      left: granDozer,
      right: wingDozer,
    });
    await animateArmdozerPair({
      signal,
      left: lightningDozer,
      right: neoLandozer,
    });
  }
}
