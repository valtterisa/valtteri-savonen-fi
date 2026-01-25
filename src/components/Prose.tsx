type ProseProps = {
  html: string;
  className?: string;
};

export function Prose({ html, className = "" }: ProseProps) {
  return (
    <div
      className={`prose prose-invert prose-base max-w-none
        prose-headings:text-white prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
        prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-10 prose-h1:mb-5
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-white prose-strong:font-semibold
        prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg prose-pre:p-3 prose-pre:overflow-x-auto prose-pre:my-4
        prose-blockquote:border-l-4 prose-blockquote:border-l-gray-700 prose-blockquote:text-gray-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
        prose-img:rounded-lg prose-img:my-5 prose-img:w-full prose-img:h-auto
        prose-ul:text-gray-300 prose-ul:my-4 prose-ul:pl-5
        prose-ol:text-gray-300 prose-ol:my-4 prose-ol:pl-5
        prose-li:text-gray-300 prose-li:my-1.5 prose-li:leading-relaxed
        prose-hr:border-gray-800 prose-hr:my-5 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
