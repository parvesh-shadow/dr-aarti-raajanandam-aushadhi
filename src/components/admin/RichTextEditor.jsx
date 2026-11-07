"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {
  AlignCenter, AlignLeft, AlignRight, Bold, ImageIcon, Italic, Link2, List, ListOrdered,
  Minus, Quote, Redo2, RemoveFormatting, Strikethrough, Underline as UnderlineIcon, Undo2,
} from "lucide-react";

async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url;
}

// Toolbar button (component ke bahar declare)
function Btn({ onClick, active, disabled, label, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // editor ka selection na tute
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`grid h-8 w-8 place-items-center rounded text-gray-700 hover:bg-gray-200 disabled:opacity-40 ${
        active ? "bg-gray-200 text-black" : ""
      }`}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-5 w-px bg-gray-300" aria-hidden="true" />;

export default function RichTextEditor({ value = "", onChange, onError }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false, // Next.js SSR hydration error se bachne ke liye
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: false }),
      ImageExt.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editorProps: {
      attributes: { "aria-label": "Article content", role: "textbox", "aria-multiline": "true" },
    },
    onUpdate: ({ editor: ed }) => onChange?.(ed.isEmpty ? "" : ed.getHTML()),
  });

  if (!editor) return <div className="h-80 border border-gray-200 bg-gray-50" />;

  const setLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Link URL (https://...)", prev);
    if (url === null) return;
    const clean = url.trim();
    if (!clean) return editor.chain().focus().extendMarkRange("link").unsetLink().run();
    let okUrl = false;
    try {
      okUrl = ["https:", "mailto:", "tel:"].includes(new URL(clean).protocol);
    } catch {}
    if (!okUrl) return onError?.("Link https://, mailto: ya tel: se shuru hona chahiye.");
    editor.chain().focus().extendMarkRange("link").setLink({ href: clean }).run();
  };

  const onPickImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const src = await uploadImage(file);
      const alt = window.prompt("Image description (alt text, optional)", "") || "";
      editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    } catch (err) {
      onError?.(err instanceof TypeError ? "Network error. Check your connection." : err.message);
    } finally {
      setUploading(false);
    }
  };

  const headingValue = [2, 3, 4].find((l) => editor.isActive("heading", { level: l })) || 0;

  return (
    <div className="border border-gray-300 bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 p-1.5">
        <select
          aria-label="Text style"
          value={headingValue}
          onChange={(e) => {
            const l = Number(e.target.value);
            if (l) editor.chain().focus().toggleHeading({ level: l }).run();
            else editor.chain().focus().setParagraph().run();
          }}
          className="mr-1 h-8 border border-gray-300 bg-white px-2 text-sm"
        >
          <option value={0}>Paragraph</option>
          <option value={2}>Heading 2</option>
          <option value={3}>Heading 3</option>
          <option value={4}>Heading 4</option>
        </select>

        <Btn label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></Btn>
        <Btn label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></Btn>
        <Btn label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></Btn>
        <Btn label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></Btn>
        <Sep />
        <Btn label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></Btn>
        <Btn label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
        <Btn label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></Btn>
        <Sep />
        <Btn label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16} /></Btn>
        <Btn label="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16} /></Btn>
        <Btn label="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16} /></Btn>
        <Sep />
        <Btn label="Add / edit link" active={editor.isActive("link")} onClick={setLink}><Link2 size={16} /></Btn>
        <Btn label={uploading ? "Uploading image..." : "Insert image"} disabled={uploading} onClick={() => fileRef.current?.click()}><ImageIcon size={16} /></Btn>
        <Btn label="Horizontal line" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></Btn>
        <Sep />
        <Btn label="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><RemoveFormatting size={16} /></Btn>
        <Btn label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={16} /></Btn>
        <Btn label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={16} /></Btn>

        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onPickImage} className="hidden" />
      </div>

      <div className="blog-content max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
      {uploading && <p className="border-t border-gray-200 px-3 py-1.5 text-xs text-gray-500">Uploading image...</p>}
    </div>
  );
}
