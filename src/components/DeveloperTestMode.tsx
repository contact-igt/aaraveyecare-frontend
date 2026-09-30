import { CLARITY_ENV } from '../lib/clarity';
import { useClarityEnvironment } from '../hooks/useClarityEnvironment';

/** Hidden route UI for developers to label sessions without changing lead data. */
export default function DeveloperTestMode() {
  const { environment, setEnvironment } = useClarityEnvironment();
  const isTestMode = environment === CLARITY_ENV.TEST;

  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-16 sm:py-20">
      <section className="mx-auto max-w-[700px] rounded-[22px] border border-slate-200 bg-white p-8 shadow-[0_2px_4px_rgba(15,23,42,0.08)] sm:p-11">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Developer Test Mode</h1>
        <p className="mt-4 max-w-[590px] text-lg leading-8 text-slate-600">
          Enable Test Mode to mark all Microsoft Clarity sessions from this browser as Internal Test.
        </p>

        <div className="mt-10 rounded-2xl bg-slate-50 px-5 py-6">
          <p className="text-base font-medium text-slate-500">Current Status</p>
          <p aria-live="polite" className="mt-2 text-2xl font-bold text-slate-950">{environment}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setEnvironment(CLARITY_ENV.TEST)}
            aria-pressed={isTestMode}
            className={`rounded-xl px-5 py-4 text-lg font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
              isTestMode
                ? 'bg-teal-800 text-white ring-2 ring-teal-200'
                : 'bg-teal-700 text-white hover:bg-teal-800'
            }`}
          >
            Enable Test Mode
          </button>
          <button
            type="button"
            onClick={() => setEnvironment(CLARITY_ENV.PRODUCTION)}
            aria-pressed={!isTestMode}
            className={`rounded-xl border px-5 py-4 text-lg font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
              !isTestMode
                ? 'border-teal-700 bg-teal-50 text-teal-800 ring-2 ring-teal-100'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Disable Test Mode
          </button>
        </div>
      </section>
    </main>
  );
}
