"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { groups } from "@/lib/editorial";

export default function Menu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const path = usePathname();
  useEffect(() => {
    dialog.current?.close();
  }, [path]);
  return (
    <header className="top">
      <Link className="brand" href="/">
        <img src="/kritrna-mark.png" width="33" height="35" alt="" />
        KritRNA<span>™</span>
      </Link>
      <nav aria-label="Primary">
        {groups.map((g) => (
          <Link
            key={g.path}
            href={g.path}
            aria-current={path === g.path ? "page" : undefined}
          >
            {g.name}
          </Link>
        ))}
      </nav>
      <Link className="action nav-action" href="/partners">
        Partner with us
      </Link>
      <button
        className="menu-toggle"
        aria-label="Open full menu"
        onClick={() => dialog.current?.showModal()}
      >
        <i />
        <i />
      </button>
      <dialog ref={dialog}>
        <div className="menu-head">
          <strong>KritRNA™</strong>
          <button onClick={() => dialog.current?.close()}>Close menu</button>
        </div>
        <div className="menu-grid">
          {groups.map((g) => (
            <section key={g.path}>
              <h2>{g.name}</h2>
              {g.links.map(([name, url]) => (
                <Link
                  key={url}
                  href={url}
                  onClick={() => dialog.current?.close()}
                >
                  {name}
                </Link>
              ))}
            </section>
          ))}
        </div>
      </dialog>
    </header>
  );
}
