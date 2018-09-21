import Stats from 'stats.js';

/**
 * パフォーマンス情報を表示する
 *
 * @param dom パフォーマンス情報をアペンドするHTML要素
 */
export function viewPerformanceStatics(dom: HTMLElement): void {
  const stats = new Stats();
  dom.appendChild(stats.dom);

  const update = time => {
    requestAnimationFrame(update);
    stats.update();
  };
  requestAnimationFrame(update);
}