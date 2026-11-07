import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s",
  "ul", "ol", "li", "blockquote", "a", "img",
];

// Editor ka HTML server par hamesha sanitize hota hai (XSS se bachne ke liye).
export function sanitizeBlogHtml(html) {
  return sanitizeHtml(typeof html === "string" ? html : "", {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      p: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
    },
    allowedStyles: {
      "*": { "text-align": [/^(left|center|right|justify)$/] },
    },
    allowedSchemes: ["https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tag, attribs) => ({
        tagName: "a",
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });
}

export const htmlToText = (html) =>
  sanitizeHtml(html || "", { allowedTags: [], allowedAttributes: {} })
    .replace(/&[a-z#0-9]+;/gi, " ")
    .trim();

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Purane blogs (heading/paragraph sections) ko HTML me badalta hai
export function sectionsToHtml(content = []) {
  return content
    .map((s) => {
      let out = "";
      if (s.heading) out += `<h2>${esc(s.heading)}</h2>`;
      (s.paragraphs || []).forEach((p) => (out += `<p>${esc(p)}</p>`));
      if (s.listIntro) out += `<p>${esc(s.listIntro)}</p>`;
      if (s.list?.length) out += `<ul>${s.list.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      return out;
    })
    .join("");
}
