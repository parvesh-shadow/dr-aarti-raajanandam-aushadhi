import User from "@/models/User";
import Order from "@/models/Order";

const s = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const MAX_ADDRESSES = 10;

export const toAddress = (a) => ({
  id: String(a._id),
  label: a.label || "Home",
  fullName: a.fullName || "",
  phone: a.phone || "",
  address: a.address,
  city: a.city,
  state: a.state,
  pincode: a.pincode,
  text: `${a.address}, ${a.city}, ${a.state} ${a.pincode}`,
});

// body: { label, address, city, state, pincode (ya pin) }
export function parseAddress(x) {
  const data = {
    label: x?.label === "Work" ? "Work" : "Home",
    fullName: s(x?.fullName, 100),
    phone: s(x?.phone, 15),
    address: s(x?.address, 300),
    city: s(x?.city, 100),
    state: s(x?.state, 100),
    pincode: s(x?.pincode ?? x?.pin, 6),
  };
  let error = "";
  if (data.address.length < 5) error = "Enter your full address.";
  else if (!data.city) error = "Enter your city.";
  else if (!data.state) error = "Select your state.";
  else if (!/^\d{6}$/.test(data.pincode)) error = "Enter a valid 6-digit PIN code.";
  return { data, error };
}

// Order place hone par address user ke saved addresses me add (duplicate nahi)
export async function saveOrderAddress(userId, sh, label = "Home") {
  if (!userId) return;
  try {
    await User.updateOne(
      {
        _id: userId,
        addresses: { $not: { $elemMatch: { address: sh.address, pincode: sh.pincode } } },
        [`addresses.${MAX_ADDRESSES - 1}`]: { $exists: false },
      },
      {
        $push: {
          addresses: {
            label: label === "Work" ? "Work" : "Home",
            fullName: sh.fullName,
            phone: sh.phone,
            address: sh.address,
            city: sh.city,
            state: sh.state,
            pincode: sh.pincode,
          },
        },
      }
    );
  } catch (e) {
    console.error("saveOrderAddress", e?.message || e); // order fail nahi hona chahiye
  }
}

const keyOf = (a) => `${String(a.address || "").trim().toLowerCase()}|${a.pincode}`;

// Ek baar: purane orders ke addresses bhi saved addresses me le aao.
// Flag pehle atomically claim hota hai, isliye baad me delete kiya address wapas nahi aata.
export async function backfillAddresses(userId) {
  try {
    const u = await User.findOneAndUpdate(
      { _id: userId, addressesBackfilled: { $ne: true } },
      { $set: { addressesBackfilled: true } },
      { projection: { addresses: 1 } }
    ).lean();
    if (!u) return;
    const have = new Set((u.addresses || []).map(keyOf));
    const room = MAX_ADDRESSES - have.size;
    if (room <= 0) return;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(50).select("shipping").lean();
    const add = [];
    for (const o of orders) {
      const sh = o.shipping || {};
      if (!sh.address || !sh.city || !sh.state || !/^\d{6}$/.test(sh.pincode || "")) continue;
      const k = keyOf(sh);
      if (have.has(k)) continue;
      have.add(k);
      add.push({ label: "Home", fullName: sh.fullName || "", phone: sh.phone || "", address: sh.address, city: sh.city, state: sh.state, pincode: sh.pincode });
      if (add.length >= room) break;
    }
    if (add.length) await User.updateOne({ _id: userId }, { $push: { addresses: { $each: add.reverse() } } });
  } catch (e) {
    console.error("backfillAddresses", e?.message || e);
  }
}
