import bcrypt from "bcryptjs";

const LOCK_MS = 15 * 60 * 1000;

// options.maxAttempts: itne galat attempts ke baad 15 min ka lock (default 10)
export default function authPlugin(schema, options = {}) {
  const MAX_ATTEMPTS = options.maxAttempts || 10;

  schema.add({
    password: { type: String, required: true, select: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    passwordChangedAt: { type: Date, default: null },
  });

  schema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
    // purane tokens/sessions invalid (second tak round, taaki naya token valid rahe)
    if (!this.isNew) this.passwordChangedAt = new Date(Math.floor(Date.now() / 1000) * 1000);
  });

  schema.methods.isLocked = function () {
    return !!(this.lockUntil && this.lockUntil.getTime() > Date.now());
  };

  // Atomic: parallel requests se bhi counter sahi badhta hai (brute-force limit bypass nahi hota)
  schema.methods.registerFailedLogin = async function () {
    const Model = this.constructor;
    const now = new Date();

    // Purana lock expire ho chuka ho to counter fresh start
    await Model.updateOne(
      { _id: this._id, lockUntil: { $ne: null, $lte: now } },
      { $set: { loginAttempts: 0, lockUntil: null } }
    );
    const doc = await Model.findOneAndUpdate(
      { _id: this._id },
      { $inc: { loginAttempts: 1 } },
      { new: true, projection: { loginAttempts: 1 } }
    );
    if (doc && doc.loginAttempts >= MAX_ATTEMPTS) {
      await Model.updateOne({ _id: this._id }, { $set: { lockUntil: new Date(Date.now() + LOCK_MS) } });
    }
  };

  schema.methods.resetLoginAttempts = async function () {
    if (this.loginAttempts === 0 && !this.lockUntil) return;
    await this.constructor.updateOne({ _id: this._id }, { $set: { loginAttempts: 0, lockUntil: null } });
  };
}
