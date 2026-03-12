import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, List, ListOrdered, Quote, Heading2, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor) {
        return null;
    }

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
        }
        setShowLinkInput(false);
        setLinkUrl('');
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const ext = file.type.split('/')[1] || 'png';
            const fileName = `editor_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

            const { data, error } = await supabase.storage
                .from('media')
                .upload(fileName, file, { contentType: file.type });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from('media')
                .getPublicUrl(data.path);

            editor.chain().focus().setImage({ src: publicUrlData.publicUrl }).run();
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Falha ao fazer upload da imagem.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-card/50 relative">
            <ActionBtn
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                icon={<Bold className="w-4 h-4" />}
                title="Bold"
            />
            <ActionBtn
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                icon={<Italic className="w-4 h-4" />}
                title="Italic"
            />
            <div className="w-px h-5 bg-border mx-1" />
            <ActionBtn
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                icon={<Heading2 className="w-4 h-4" />}
                title="Heading 2"
            />
            <div className="w-px h-5 bg-border mx-1" />
            <ActionBtn
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                icon={<List className="w-4 h-4" />}
                title="Bullet List"
            />
            <ActionBtn
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                icon={<ListOrdered className="w-4 h-4" />}
                title="Ordered List"
            />
            <ActionBtn
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                icon={<Quote className="w-4 h-4" />}
                title="Quote"
            />
            <div className="w-px h-5 bg-border mx-1" />

            <div className="relative">
                <ActionBtn
                    onClick={() => {
                        const previousUrl = editor.getAttributes('link').href;
                        setLinkUrl(previousUrl || '');
                        setShowLinkInput(!showLinkInput);
                    }}
                    isActive={editor.isActive('link')}
                    icon={<LinkIcon className="w-4 h-4" />}
                    title="Link"
                />
                {showLinkInput && (
                    <form onSubmit={handleLinkSubmit} className="absolute top-full left-0 mt-2 p-2 bg-popover border border-border rounded-lg shadow-lg z-50 flex gap-2 w-64">
                        <input
                            type="url"
                            placeholder="https://..."
                            value={linkUrl}
                            onChange={e => setLinkUrl(e.target.value)}
                            className="flex-1 px-2 py-1 text-sm bg-transparent border border-white/10 rounded focus:outline-none focus:border-primary text-foreground"
                            autoFocus
                        />
                        <button type="submit" className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 transition-colors">OK</button>
                    </form>
                )}
            </div>

            <ActionBtn
                onClick={() => fileInputRef.current?.click()}
                isActive={false}
                icon={uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                title="Upload Imagem"
                disabled={uploading}
            />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};

const ActionBtn = ({ onClick, isActive, icon, title, disabled = false }: { onClick: () => void, isActive: boolean, icon: React.ReactNode, title: string, disabled?: boolean }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        disabled={disabled}
        className={`p-1.5 rounded-md transition-colors ${isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {icon}
    </button>
);

export const RichTextEditor = ({ content, onChange, placeholder = 'Escreva aqui...' }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'cursor-pointer text-primary underline hover:text-primary/80 transition-colors'
                }
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 text-foreground prose-p:font-body max-w-none prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4',
            },
        },
    });

    if (editor && content !== editor.getHTML() && !editor.isFocused) {
        editor.commands.setContent(content);
    }

    return (
        <div className="border border-border rounded-xl bg-background focus-within:ring-1 focus-within:ring-primary transition-all flex flex-col">
            <MenuBar editor={editor} />
            <div className="flex-1 overflow-y-auto max-h-[600px]">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};
