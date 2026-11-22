"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import { Eye, Pencil, Trash2 } from "lucide-react";

const MSG = { created: "Blog created successfully.", updated: "Blog updated successfully." };
const netMsg = (e, fallback) =>
  e instanceof TypeError ? "Network error. Check your connection." : e?.message || fallback;

export default function AdminBlogsPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState({ blogs: [], pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const msg = MSG[new URLSearchParams(window.location.search).get("msg")];
    if (msg) {
      setNotice({ type: "success", text: msg });
      window.history.replaceState(null, "", "/admin/blogs");
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const sp = new URLSearchParams({ page: String(page), limit: "20", q });
        const res = await fetch(`/api/admin/blogs?${sp}`, { cache: "no-store", signal: ctrl.signal });
        if (res.status === 401) return router.replace("/admin/login");
        const d = await res.json().catch(() => ({}));
        if (!res.ok || !d.ok) throw new Error(d.error || "Could not load blogs.");
        setData(d);
      } catch (e) {
        if (e.name !== "AbortError") setError(netMsg(e, "Could not load blogs."));
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, page, reload, router]);

  useEffect(() => {
    if (!target) return;
    const onKey = (e) => e.key === "Escape" && !deleting && setTarget(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, deleting]);

  async function confirmDelete() {
    if (!target || deleting) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${target.id}`, { method: "DELETE" });
      if (res.status === 401) return router.replace("/admin/login");
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) throw new Error(d.error || "Could not delete blog.");
      setNotice({ type: "success", text: `"${target.title}" deleted.` });
      if (data.blogs.length === 1 && page > 1) setPage((p) => p - 1);
      else setReload((n) => n + 1);
    } catch (e) {
      setNotice({ type: "error", text: netMsg(e, "Could not delete blog.") });
    } finally {
      setDeleting(false);
      setTarget(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link href="/admin/blogs/new" className="bg-[#C5A84C] px-4 py-2 text-sm text-white hover:bg-[#A88C35]">
          Add Blog
        </Link>
      </div>

      {notice && (
        <div
          role="status"
          className={`mt-4 flex items-start justify-between gap-3 border px-4 py-3 text-sm ${
            notice.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <span>{notice.text}</span>
          <button onClick={() => setNotice(null)} aria-label="Dismiss" className="leading-none">×</button>
        </div>
      )}

      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setPage(1); }}
        placeholder="Search by title"
        className="mt-4 w-full max-w-xs border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#C5A84C]"
      />

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-4 overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-3">Blog</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">Loading…</td></tr>
            ) : data.blogs.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">No blogs found.</td></tr>
            ) : (
              data.blogs.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" className="h-10 w-14 rounded border border-gray-200 object-cover" />
                      ) : (
                        <div className="h-10 w-14 rounded border border-gray-200 bg-gray-100" />
                      )}
                      <div>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-gray-500">/blogs/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{p.category || "—"}</td>
                  <td className="p-3 text-gray-600">
                    {new Date(p.publishedAt || p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs ${p.isPublished ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                 {p.isPublished && (
  <Link href={`/blogs/${p.slug}`} target="_blank" title="View" aria-label="View" className="mr-4 inline-flex items-center text-gray-600 transition-colors hover:text-black"><Eye size={18} /></Link>
)}
<Link href={`/admin/blogs/${p.id}`} title="Edit" aria-label="Edit" className="mr-4 inline-flex items-center text-[#A88C35] transition-colors hover:text-[#8A7229]"><Pencil size={18} /></Link>
<button onClick={() => setTarget(p)} title="Delete" aria-label="Delete" className="inline-flex items-center text-[#E3122E] transition-colors hover:text-red-700"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination className="mt-4" page={page} pages={data.pages} total={data.total} limit={20} onChange={setPage} disabled={loading} />


      {target && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => !deleting && setTarget(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="del-title"
            className="w-full max-w-sm rounded bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="del-title" className="text-lg font-semibold">Delete blog?</h2>
            <p className="mt-2 text-sm text-gray-600">
              “{target.title}” will be permanently deleted. This cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setTarget(null)} disabled={deleting} className="border border-black px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-60">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting} className="bg-[#E3122E] px-4 py-2 text-sm text-white disabled:opacity-60">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
