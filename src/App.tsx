import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';
import rehypeRaw from 'rehype-raw';

const App = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/content.md')
      .then((res) => res.text())
      .then((text) => setData(fm(text)));
  }, []);

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center text-slate-400 animate-pulse font-mono text-sm">
        LOADING...
      </div>
    );

  const { attributes: attr, body } = data;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <div className="h-1.5 bg-indigo-600 w-full" />

      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* ヘッダー：画像とテキストを横並び、またはレスポンシブで調整 */}
        <header className="mb-16 flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-6xl font-black tracking-tighter text-slate-950 sm:text-7xl mb-4">
              {attr.name}
            </h1>
            <p className="text-xl font-medium text-slate-500 tracking-tight">
              {attr.role}
            </p>

            <nav className="mt-8 flex gap-6">
              <ContactLink href={`mailto:${attr.email}`} label="Email" />
              <ContactLink
                href={`https://github.com/${attr.github}`}
                label="GitHub"
              />
              {attr.linkedin && (
                <ContactLink
                  href={`https://linkedin.com/in/${attr.linkedin}`}
                  label="LinkedIn"
                />
              )}
            </nav>
          </div>

          {/* 自画像部分：Tailwind v4のユーティリティで装飾 */}
          <div className="flex-shrink-0">
            <img
              src={attr.avatar}
              alt={attr.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-2xl shadow-indigo-200 ring-4 ring-white transition-transform duration-500 hover:scale-105"
            />
          </div>
        </header>

        <main className="bg-white border border-slate-200/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-14 overflow-hidden">
          <article
            className="prose prose-slate prose-lg max-w-none 
            prose-headings:text-slate-950 prose-headings:font-bold prose-headings:tracking-tight
            prose-strong:text-indigo-600 prose-strong:font-semibold
            prose-a:text-indigo-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-lg"
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
          </article>
        </main>

        <footer className="mt-20 pb-12 text-center text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} — {attr.name}
        </footer>
      </div>
    </div>
  );
};

const ContactLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[11px] font-black tracking-[0.15em] uppercase text-slate-400 hover:text-indigo-600 transition-all duration-300"
  >
    {label}
  </a>
);

export default App;
