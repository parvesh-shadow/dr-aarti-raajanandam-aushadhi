// Appointment ko client ke liye safe object me badalna (user id / __v bahar nahi jaate)
export function serializeAppointment(doc) {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    mobile: doc.mobile,
    appointmentType: doc.appointmentType,
    date: doc.date,
    time: doc.time,
    reason: doc.reason,
    message: doc.message || "",
    status: doc.status,
    createdAt: doc.createdAt,
  };
}
