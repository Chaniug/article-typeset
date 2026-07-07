import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageGridView } from './ImageGridView';

export interface GridImage {
  src: string;
  caption: string;
}

export const ImageGrid = Node.create({
  name: 'imageGrid',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      images: {
        default: [
          { src: '', caption: '' },
          { src: '', caption: '' },
        ] as GridImage[],
      },
      radius: { default: '12px' },
      gap: { default: '8px' },
    };
  },
  parseHTML() {
    return [{ tag: 'section[data-type="imageGrid"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['section', mergeAttributes(HTMLAttributes, { 'data-type': 'imageGrid' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageGridView);
  },
});
