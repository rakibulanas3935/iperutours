'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      CodeBlock,
      Blockquote,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-invert focus:outline-none min-h-[150px] p-4 text-white',
      },
    },
    autofocus: false,
    injectCSS: false,
    editable: true,
    immediatelyRender: false,
  });

  // Sync prop -> editor if value changes outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const ToolbarButton = ({ command, icon, isActive }) => (
    <button
      onClick={command}
      className={`px-2 py-1 text-sm rounded transition ${
        isActive
          ? 'bg-purple-500 text-black'
          : 'hover:bg-white/10 text-white/80'
      }`}
      type="button"
    >
      {icon}
    </button>
  );

  return (
    <div className="backdrop-blur-md border border-white/20 bg-black rounded-xl shadow-xl">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b text-black border-white/10 p-3 rounded-t-xl bg-white/5">
        <ToolbarButton
          icon="B"
          isActive={editor.isActive('bold')}
          command={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon="I"
          isActive={editor.isActive('italic')}
          command={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon="U"
          isActive={editor.isActive('underline')}
          command={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          icon="S"
          isActive={editor.isActive('strike')}
          command={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          icon="H1"
          isActive={editor.isActive('heading', { level: 1 })}
          command={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <ToolbarButton
          icon="H2"
          isActive={editor.isActive('heading', { level: 2 })}
          command={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          icon="•"
          isActive={editor.isActive('bulletList')}
          command={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon="1."
          isActive={editor.isActive('orderedList')}
          command={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          icon="“”"
          isActive={editor.isActive('blockquote')}
          command={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          icon="{}"
          isActive={editor.isActive('codeBlock')}
          command={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarButton
          icon="↩"
          command={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          icon="↪"
          command={() => editor.chain().focus().redo().run()}
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="px-4 py-4" />
    </div>
  );
}
