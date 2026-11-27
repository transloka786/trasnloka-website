import Link from "next/link";
import Fold from "@/components/Fold";
import { People, Programmes, Reference } from "@/components/Editorial";
import { UpdatesList } from "@/components/UpdatesList";
import { readUpdates } from "@/lib/updates";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Reading
            <br />
            through
            <br />
            <span>silence.</span>
          </h1>
          <p>Restoring the protein.</p>
          <p className="standfirst">
            We study whether suppressor tRNA can help cells read past a
            premature stop and make a full-length protein.
          </p>
          <Link className="action" href="/science">
            Explore the science
          </Link>
        </div>
        <Fold />
      </section>
      <section className="stripe">
        <h2>What we’re doing now</h2>
        <UpdatesList entries={readUpdates().slice(0, 3)} />
        <Link href="/updates">All updates</Link>
      </section>
      <section className="band accent">
        <h2>When a message stops early</h2>
        <div>
          <p>
            A cell reads a message to build a protein. A premature stop can cut
            that process short. Our research asks what it would take for
            translation to continue.
          </p>
          <Reference id="variants" label="Read the biology" />
        </div>
      </section>
      <section className="section">
        <h2>Research programmes</h2>
        <Programmes />
        <Link href="/pipeline">Explore the programmes</Link>
      </section>
      <section className="band">
        <h2>AI-guided design</h2>
        <div>
          <p>
            We are developing suppressor tRNA for nonsense-mutation diseases.
            Whether a molecule reaches the intended cells and supports useful
            protein function are experimental questions.
          </p>
          <Link href="/platform">Our research approach</Link>
        </div>
      </section>
      <section className="section">
        <h2>The founders</h2>
        <People />
      </section>
      <section className="band cyan">
        <h2>Anuvad by KritRNA</h2>
        <div>
          <p>
            Rare-disease science in everyday language, hosted by Pragati
            Bhaisora.
          </p>
          <Link href="/awareness">Explore Anuvad</Link>
        </div>
      </section>
    </>
  );
}
