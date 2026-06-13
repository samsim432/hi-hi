import { useState } from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

function SafetyPopup() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <FaExclamationTriangle className="text-xl" />
        </div>

        <h2 className="mt-4 text-center text-xl font-extrabold text-slate-900">
          Important Safety Notice
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-slate-600">
          Man Ko Saathi is an AI wellness companion only.
        </p>

        <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-bold">It is not:</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <span>• Therapy</span>
            <span>• Treatment</span>
            <span>• Diagnosis</span>
            <span>• Doctor</span>
            <span>• Medical advice</span>
            <span>• Emergency support</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          If you are in immediate danger, contact local emergency services or a
          trusted person now.
        </p>

        <button
          onClick={() => setShow(false)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
        >
          <FaCheckCircle />
          OK, I Understand
        </button>
      </div>
    </div>
  );
}

export default SafetyPopup;