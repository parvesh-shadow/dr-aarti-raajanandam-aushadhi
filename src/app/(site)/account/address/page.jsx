"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import AddAddressModal from "@/components/account/AddAddressModal";

const json = { "Content-Type": "application/json" };

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [modal, setModal] = useState({ open: false, item: null });
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    let alive = true;
    fetch("/api/account/addresses", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => alive && setAddresses(d.addresses || []))
      .catch(() => alive && setLoadError("Could not load your addresses. Please refresh."))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, item: null });
    setServerError("");
  }, []);

  const handleSave = async (form) => {
    if (saving) return;
    setSaving(true);
    setServerError("");
    const editing = modal.item;
    try {
      const res = await fetch(editing ? `/api/account/addresses/${editing.id}` : "/api/account/addresses", {
        method: editing ? "PUT" : "POST",
        headers: json,
        body: JSON.stringify({
          label: form.type,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pin,
          fullName: editing?.fullName || "",
          phone: editing?.phone || "",
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) return setServerError(d.error || "Could not save address.");
      setAddresses(d.addresses || []);
      closeModal();
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete this ${item.label} address?`)) return;
    try {
      const res = await fetch(`/api/account/addresses/${item.id}`, { method: "DELETE" });
      const d = await res.json().catch(() => ({}));
      if (res.ok) setAddresses(d.addresses || []);
    } catch {}
  };

  return (
    <div>
      <TitleDescription
        heading="Your delivery addresses"
        description="Choose and manage the places where your Ayurvedic essentials arrive."
      />

      {loadError && <p className="mt-4 text-sm text-[#E3122E]">{loadError}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading && <p className="text-sm text-gray-600">Loading addresses...</p>}

        {addresses.map((item) => (
          <article
            key={item.id}
            className="relative flex min-h-[170px] flex-col border-l-4 border-[#C5A84C] bg-gray-50 p-4"
          >
            <p className="text-xs text-black sm:text-sm">Saved delivery address</p>
            <h3 className="mt-3 text-base font-medium text-black sm:text-lg">{item.label}</h3>
            {item.fullName && (
              <p className="mt-1 text-xs font-medium text-black sm:text-sm">
                {item.fullName}
                {item.phone ? ` · ${item.phone}` : ""}
              </p>
            )}
            <p className="mt-2 max-w-[220px] pr-10 text-xs text-black sm:text-sm">{item.text}</p>
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                type="button"
                aria-label={`Edit ${item.label} address`}
                onClick={() => setModal({ open: true, item })}
                className="text-black transition-colors hover:text-[#C5A84C]"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${item.label} address`}
                onClick={() => handleDelete(item)}
                className="text-black transition-colors hover:text-[#E3122E]"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={() => setModal({ open: true, item: null })}
          className="group flex min-h-[170px] flex-col items-center justify-center border border-[#C5A84C] bg-white p-4 text-center transition-colors hover:bg-gray-50"
        >
          <Plus
            className="h-8 w-8 text-black transition-colors group-hover:text-[#C5A84C]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="mt-2 text-sm font-semibold text-black sm:text-base">Add a new address</span>
          <span className="mt-1 text-xs text-gray-800">Save another delivery location</span>
        </button>
      </div>

      {modal.open && (
        <AddAddressModal
          key={modal.item?.id || "new"}
          initial={modal.item}
          saving={saving}
          serverError={serverError}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
