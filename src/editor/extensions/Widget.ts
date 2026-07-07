import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { WidgetView } from './WidgetView';

export const Widget = Node.create({
  name: 'widget',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      variant: { default: 'follow' },
      text: { default: '' },
      src: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-type="widget"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['section', mergeAttributes(HTMLAttributes, { 'data-type': 'widget' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(WidgetView);
  },
});
