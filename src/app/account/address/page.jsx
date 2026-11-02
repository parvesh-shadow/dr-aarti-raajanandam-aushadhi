"use client";

import { useCallback, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import AddAddressModal from "@/components/account/AddAddressModal";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    address: "24 C-Scheme, Ashok Marg, Jaipur, Rajasthan 302001",
  },
];

export default function AddressPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleSave = (form) => {
    // TODO: yahan API call aayegi, response ke baad list update karo
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: form.type,
        address: `${form.address}, ${form.city}, ${form.state} ${form.pin}`,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div>
      <TitleDescription
        heading="Your delivery addresses"
        description="Choose and manage the places where your Ayurvedic essentials arrive."
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Saved addresses */}
        {addresses.map((item) => (
          <article
            key={item.id}
            className="relative flex min-h-[170px] flex-col border-l-4 border-[#C5A84C] bg-gray-50 p-4"
          >
            <p className="text-xs text-black sm:text-sm">Saved delivery address</p>
            <h3 className="mt-3 text-base font-medium text-black sm:text-lg">
              {item.label}
            </h3>
            <p className="mt-2 max-w-[200px] text-xs text-black sm:text-sm">
              {item.address}
            </p>

            <button
              type="button"
              aria-label={`Edit ${item.label} address`}
              className="absolute bottom-4 right-4 text-black transition-colors hover:text-[#C5A84C]"
            >
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </button>
          </article>
        ))}

        {/* Add new */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="group flex min-h-[170px] flex-col items-center justify-center border border-[#C5A84C] bg-white p-4 text-center transition-colors hover:bg-gray-50"
        >
          <Plus
            className="h-8 w-8 text-black transition-colors group-hover:text-[#C5A84C]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="mt-2 text-sm font-semibold text-black sm:text-base">
            Add a new address
          </span>
          <span className="mt-1 text-xs text-gray-800">
            Save another delivery location
          </span>
        </button>
      </div>

      {modalOpen && (
        <AddAddressModal onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
}