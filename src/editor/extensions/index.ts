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
import { Highlight } from './Highlight';
import { ImageGrid } from './ImageGrid';
import { Widget } from './Widget';

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
    Highlight,
    ImageGrid,
    Widget,
  ];
}

const SAMPLE_IMG =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='300'%3E%3Crect%20width='600'%20height='300'%20fill='%23ffe3ec'/%3E%3Ctext%20x='50%25'%20y='50%25'%20font-family='sans-serif'%20font-size='28'%20text-anchor='middle'%20dominant-baseline='middle'%20fill='%23ff5d8f'%3ESample%20Image%3C/text%3E%3C/svg%3E";

export const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: '🎯 一键排版，惊艳上线' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '选一个模板，粘贴你的内容，点一下就能把文章变成',
        },
        { type: 'text', marks: [{ type: 'highlight' }], text: '吸睛的版面' },
        { type: 'text', text: '。' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: '为什么好排版这么重要' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '好的排版能提升读者的读完率与信任感——内容再好，也需要被「看见」。',
        },
      ],
    },
    {
      type: 'card',
      attrs: { variant: 'quote', title: '', body: '排版不是装饰，而是内容呼吸的节奏。' },
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: '三步搞定' }],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '左侧导入或粘贴你的内容' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: '右侧挑选喜欢的模板，一键套用' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: '点「复制排版」，粘到公众号 / 小红书 / B站' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'imageGrid',
      attrs: {
        images: [
          { src: SAMPLE_IMG, caption: '图一' },
          { src: SAMPLE_IMG, caption: '图二' },
          { src: SAMPLE_IMG, caption: '图三' },
        ],
      },
    },
    {
      type: 'card',
      attrs: { variant: 'icon', icon: '💡', title: '小贴士', body: '切换平台按钮，即可看到对应平台的模板库。' },
    },
    {
      type: 'divider',
    },
    {
      type: 'card',
      attrs: { variant: 'note', icon: '📌', title: '便签', body: '多图并排、字框、动态组件都已就位，挑模板即可一键套用。' },
    },
    {
      type: 'widget',
      attrs: { variant: 'follow' },
    },
    {
      type: 'widget',
      attrs: { variant: 'like' },
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: '现在就试试' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: '换几个模板看看效果，总有一款击中你的读者。' },
      ],
    },
  ],
};

export { Card, QuoteBox, Divider, ImageFrame, Highlight, ImageGrid, Widget };
