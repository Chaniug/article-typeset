import { Node, mergeAttributes } from '@tiptap/core';

export const Divider = Node.create({
  name: 'divider',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      variant: { default: 'line' },
    };
  },
  parseHTML() {
    return [{ tag: 'hr[data-type="divider"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(HTMLAttributes, { 'data-type': 'divider' })];
  },
});
