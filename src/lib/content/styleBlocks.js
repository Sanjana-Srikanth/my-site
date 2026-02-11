export function applyStyleBlocks(html) {
    if (!html || typeof html !== "string") return html;
  
    let out = html;
  
    // inline highlight ==like this==
    out = out.replace(/==([\s\S]+?)==/g, '<mark class="st-mark">$1</mark>');

    // badges: [[badge:variant|Text Here]]
    out = out.replace(
    /\[\[badge:([^|\]]+)\|?([^\]]*)\]\]/gi,
    (_m, variant, text) => {
      const cleanVariant = variant.trim().toLowerCase();
      const label = text ? text.trim() : cleanVariant;
  
      return `<span class="st-badge" data-variant="${cleanVariant}">${label}</span>`;
    }
  );
  

    // <blockquote><p>[!info] ...</p></blockquote> - boxed element
    out = out.replace(
      /<blockquote>\s*<p>\s*\[!([a-zA-Z]+)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/g,
      (_match, variant, inner) =>
        `<div class="st-callout" data-variant="${variant.toLowerCase()}"><p>${inner.trim()}</p></div>`
    );
  
    return out;
  }