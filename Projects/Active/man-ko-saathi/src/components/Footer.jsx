import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/60 bg-slate-950/95 px-4 py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="font-bold text-sky-400">Man Ko Saathi</h2>
          <p className="text-sm text-slate-400">
            AI wellness companion. Not therapy, diagnosis, or emergency support.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-300">
          <Link to="/about">About</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/emergency-help">Emergency</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;