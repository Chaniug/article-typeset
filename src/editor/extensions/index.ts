import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import type { Extensions } from '@tiptap/core';
import { Card } from './Card';
import { QuoteBox } from './QuoteBox';
import { Divider } from './Divider';
import { ImageFrame } from './ImageFrame';

export function buildExtensions(): Extensions {
  return [
    StarterKit,
    Underline,
    Link.configure({ openOnClick: false, autolink: true }),
    Image,
    Placeholder.configure({ placeholder: '在此输入正文，或从左栏导入内容…' }),
    Card,
    QuoteBox,
    Divider,
    ImageFrame,
  ];
}

export const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: '欢迎使用文章排版工具' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '在左侧导入或在此直接撰写，右侧选择主题并一键复制到公众号。',
        },
      ],
    },
  ],
};

export { Card, QuoteBox, Divider, ImageFrame };
