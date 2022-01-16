// @flow

import {escapeHTML} from "../../../../src/js/dom/escape/escape-html";

test('HTML特殊文字をエスケープできる', () => {
  const data = `<script>alert("danger")</script><span onclick='alert("trap")'>テスト&文言</span>`;
  const result = escapeHTML(data);
  expect(result).toBe('&lt;script&gt;alert(&quot;danger&quot;)&lt;/script&gt;&lt;span onclick=&#039;alert(&quot;trap&quot;)&#039;&gt;テスト&amp;文言&lt;/span&gt;');
});

test('HTML特殊文字が含まれないと変換前を変わらない', () => {
  const data = 'HTML特殊文字を含まない文言';
  const result = escapeHTML(data);
  expect(result).toBe('HTML特殊文字を含まない文言');
});

test('空文字でもエラーにならない', () => {
  const data = '';
  const result = escapeHTML(data);
  expect(result).toBe('');
});