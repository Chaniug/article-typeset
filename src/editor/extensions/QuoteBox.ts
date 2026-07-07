import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { QuoteBoxView } from './QuoteBoxView';

export const QuoteBox = Node.create({
  name: 'quoteBox',
  group: 'block',
  atom: true,
  addAttributes() {
    return { text: { default: '' } };
  },
  parseHTML() {
    return [{ tag: 'blockquote[data-type="quoteBox"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(HTMLAttributes, { 'data-type': 'quoteBox' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(QuoteBoxView);
  },
});
