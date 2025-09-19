export function renderMarkdown(md: string): string {
  let html = md;
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  html = html.replace(
    /^###\s+(.*)$/gm,
    '<h3 class="text-lg sm:text-xl font-semibold mt-6 mb-2">$1<\/h3>'
  );
  html = html.replace(
    /^##\s+(.*)$/gm,
    '<h2 class="text-xl sm:text-2xl font-bold mt-8 mb-3">$1<\/h2>'
  );
  html = html.replace(
    /^#\s+(.*)$/gm,
    '<h1 class="text-2xl sm:text-3xl font-bold mt-10 mb-4">$1<\/h1>'
  );
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1<\/strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1<\/em>");
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-zinc-900/70 border border-zinc-800 rounded px-1 py-0.5">$1<\/code>'
  );
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a class="text-blue-400 hover:text-blue-300 underline" href="$2">$1<\/a>'
  );
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li class="my-1">$1<\/li>');
  html = html.replace(
    /(<li[\s\S]*?<\/li>)(\n(?!<li))/g,
    '<ul class="list-disc pl-12 my-4">$1<\/ul>\n'
  );
  html = html
    .split(/\n{2,}/)
    .map((para) => {
      if (/^\s*<(h1|h2|h3|ul)/.test(para)) return para;
      if (/^\s*<li/.test(para))
        return `<ul class=\"list-disc pl-6 my-4\">${para}<\/ul>`;
      return `<p class=\"text-gray-300 leading-7\">${para.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
  return html;
}
