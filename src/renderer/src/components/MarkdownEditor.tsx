import { useMarkdownEditor } from "@/hooks/useMarkdownEditor";
import { ChangeCodeMirrorLanguage, codeBlockPlugin, codeMirrorPlugin, ConditionalContents, headingsPlugin, InsertCodeBlock, InsertSandpack, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin, SandpackConfig, sandpackPlugin, ShowSandpackInfo, toolbarPlugin } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css';


export const MarkdownEditor = () => {

    const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()


    if (!selectedNote) return null

    const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

    const simpleSandpackConfig: SandpackConfig = {
        defaultPreset: 'react',
        presets: [
            {
                label: 'React',
                name: 'react',
                meta: 'live react',
                sandpackTemplate: 'react',
                sandpackTheme: 'light',
                snippetFileName: '/App.js',
                snippetLanguage: 'jsx',
                initialSnippetContent: defaultSnippetContent
            },
        ]
    }



    return (
        <div className="px-8 py-5">
            <MDXEditor
                className="dark-theme"
                ref={editorRef}
                key={selectedNote.title}
                markdown={selectedNote.content}
                onChange={(content) => handleAutoSaving(content)}
                onBlur={handleBlur}
                plugins={[linkPlugin({
                    disableAutoLink: false,
                }), headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin(), linkDialogPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
                toolbarPlugin({
                    toolbarContents: () => (
                        <ConditionalContents
                            options={[
                                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                                {
                                    fallback: () => (<>
                                        <InsertCodeBlock />
                                        <InsertSandpack />
                                    </>)
                                }
                            ]}
                        />)
                })
                ]}
                contentEditableClassName="outline-none min-h-screen max-w-none text-lg caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] prose-hr:border-2 prose-hr:border-top-2 font-mono antialized"
            />

        </div>
    )
}