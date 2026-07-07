import { Mark, mergeAttributes } from '@tiptap/core';

/** 重点内容高亮标记。真正的样式在导出序列化阶段由主题 highlight 决定。 */
export const Highlight = Mark.create({
  name: 'highlight',
  parseHTML() {
    return [{ tag: 'mark[data-type="highlight"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(HTMLAttributes, { 'data-type': 'highlight' })];
  },
});
