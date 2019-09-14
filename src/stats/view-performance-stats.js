import Stats from 'stats.js';

/**
 * パフォーマンス情報を表示する
 *
 * @param dom パフォーマンス情報をアペンドするHTML要素
 */
export function viewPerformanceStats(dom: HTMLElement): void {
  const stats = new Stats();
  stats.dom.style.position = "absolute";
  stats.dom.style.top = "1em";
  stats.dom.style.left = "1em";
  dom.appendChild(stats.dom);

  const update = time => {
    requestAnimationFrame(update);
    stats.update();
  };
  requestAnimationFrame(update);
}