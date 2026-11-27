import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Translation in context",
  description:
    "A set of biology questions about what happens while a cell makes a protein.",
  alternates: { canonical: "/small-world" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Translation in context"}>
        A set of biology questions about what happens while a cell makes a
        protein.
      </Intro>
      <div className="body">
        <figure className="biology-network">
          <svg
            viewBox="0 0 600 215"
            role="img"
            aria-label="The ribosome reads a message, receives transfer RNA and builds a protein"
          >
            <g stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M115 48L270 106 115 168M315 106H492" />
              <circle cx="285" cy="107" r="46" />
            </g>
            <g fontFamily="monospace" fontSize="18" fill="currentColor">
              <text x="25" y="42">
                Message
              </text>
              <text x="25" y="184">
                tRNA
              </text>
              <text x="285" y="112" textAnchor="middle" fontSize="14">
                Ribosome
              </text>
              <text x="500" y="112">
                Protein
              </text>
            </g>
          </svg>
          <figcaption className="small">
            Translation biology, illustrative, not model output.
          </figcaption>
        </figure>
        <article className="directory-row">
          <h2>Message availability</h2>
          <div>
            <p>How much messenger RNA remains available to the ribosome?</p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Termination</h2>
          <div>
            <p>What happens when the ribosome encounters a premature stop?</p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Quality control</h2>
          <div>
            <p>How does the cell respond to an interrupted message?</p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Protein function</h2>
          <div>
            <p>Can the resulting protein carry out its intended role?</p>
          </div>
        </article>
        <a href="/references#translation">Background reading on translation</a>
      </div>
    </>
  );
}
