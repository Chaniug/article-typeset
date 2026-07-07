import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { CardView } from './CardView';

export const Card = Node.create({
  name: 'card',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      title: { default: '提示' },
      body: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-type="card"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['section', mergeAttributes(HTMLAttributes, { 'data-type': 'card' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CardView);
  },
});
