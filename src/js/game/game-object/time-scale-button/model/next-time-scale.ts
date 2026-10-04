/** トグル後のタイムスケール */
type NextTimeScale = {
  /** 現在値 */
  current: number;

  /** トグル後の値 */
  next: number;
};

/** トグル後のタイムスケールを集めたもの */
const nextTimeScales: NextTimeScale[] = [
  {
    current: 1,
    next: 0.5,
  },
  {
    current: 0.5,
    next: 0.25,
  },
  {
    current: 0.25,
    next: 1,
  },
];

/**
 * タイムスケールの現在値からトグル後の値を取得する
 *
 * @param timeScale 現在値
 * @returns トグル後の値
 */
export function getNextTimeScale(timeScale: number): number {
  return nextTimeScales.find((v) => v.current === timeScale)?.next ?? 1;
}
