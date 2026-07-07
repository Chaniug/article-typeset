import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageFrameView } from './ImageFrameView';

export const ImageFrame = Node.create({
  name: 'imageFrame',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      caption: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'figure[data-type="imageFrame"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': 'imageFrame' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageFrameView);
  },
});
