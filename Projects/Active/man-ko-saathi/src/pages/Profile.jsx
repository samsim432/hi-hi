import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";

function Profile() {
  const { user } = useAuth();

  const firstName = user?.user_metadata?.first_name || "Not set";
  const surname = user?.user_metadata?.surname || "Not set";
  const displayName = user?.user_metadata?.display_name || "Not set";
  const email = user?.email || "Not available";

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/60 bg-white/40 p-6 shadow-xl backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500 text-2xl text-white shadow-lg">
              <FaUser />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
              <p className="mt-1 text-slate-600">
                Manage your Man Ko Saathi account details.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/60 bg-white/40 p-5 shadow-lg backdrop-blur-2xl">
            <FaIdBadge className="text-2xl text-sky-600" />
            <p className="mt-3 text-sm font-semibold text-slate-500">
              Display Name
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {displayName}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/40 p-5 shadow-lg backdrop-blur-2xl">
            <FaEnvelope className="text-2xl text-sky-600" />
            <p className="mt-3 text-sm font-semibold text-slate-500">Email</p>
            <h2 className="mt-1 break-all text-xl font-bold text-slate-900">
              {email}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/40 p-5 shadow-lg backdrop-blur-2xl">
            <p className="text-sm font-semibold text-slate-500">First Name</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {firstName}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/40 p-5 shadow-lg backdrop-blur-2xl">
            <p className="text-sm font-semibold text-slate-500">Surname</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {surname}
            </h2>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/80 p-5 backdrop-blur-xl">
          <h3 className="font-bold text-amber-800">Privacy Reminder</h3>
          <p className="mt-2 text-sm text-amber-700">
            Man Ko Saathi does not ask for your address, ID documents, medical
            history, or emergency location in this MVP.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;