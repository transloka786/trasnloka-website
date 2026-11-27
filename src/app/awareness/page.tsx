import { Intro } from "@/components/Editorial";
import { Conversations, type Video } from "@/components/Conversations";
import videos from "../../../content/videos.json";
export const metadata = {
  title: "Anuvad by KritRNA",
  description:
    "Rare-disease science in everyday language, hosted by Pragati Bhaisora.",
};
const subjects = [
  [
    "Does rare mean one particular illness?",
    "Rare disease is a broad term for many different conditions. Each condition affects relatively few people.",
  ],
  [
    "Does every gene change cause illness?",
    "Many changes have little or no effect. Their consequences depend on the change and where it occurs.",
  ],
  [
    "Is an early stop the end of the gene?",
    "The stop affects how the message is read. It can tell the cell to finish making a protein too soon.",
  ],
  [
    "Is every shortened protein the same?",
    "What the missing part normally does matters. Different changes can have different effects.",
  ],
  [
    "Does a research goal describe a result?",
    "A research goal describes the question scientists want to test.",
  ],
];
export default function Awareness() {
  const approved = (videos as Video[])
    .filter(
      (v) =>
        v.consentConfirmed === true &&
        v.founderApproved === true &&
        /^[\w-]{11}$/.test(v.youtubeId),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Intro title="Anuvad by KritRNA">
        Rare-disease science in words you can take into a conversation.
      </Intro>
      <div className="body">
        <h2>What makes a disease rare?</h2>
        <p>
          A rare disease affects a small share of the population. Definitions
          vary between countries.
        </p>
        <p>
          Recognising a rare condition can take time. Families may meet several
          specialists before the pieces fit together.
        </p>
        <p>
          India’s{" "}
          <a href="/references#policy">National Policy for Rare Diseases</a>{" "}
          describes the country’s approach to rare diseases and its Centres of
          Excellence.
        </p>
        <h2>A stop sign in the middle of the road</h2>
        <p>
          Picture a car following a route. An early stop sign brings it to a
          halt before the destination. In a cell, a nonsense mutation can put an
          early stop in the instructions for making a protein.
        </p>
        <figure className="road">
          <svg viewBox="0 0 420 75" aria-hidden="true">
            <path d="M12 47H405" stroke="currentColor" strokeWidth="3" />
            <circle cx="16" cy="42" r="8" fill="#0d0d0d" />
            <path d="M201 47V16" stroke="currentColor" strokeWidth="3" />
            <path d="M192 3h17l6 6v12l-6 6h-17l-6-6V9z" fill="#e91e63" />
          </svg>
          <figcaption className="small">
            Educational illustration of an early stop.
          </figcaption>
        </figure>
        <h2>Questions families ask</h2>
        <div className="faq">
          {subjects.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <a href="/references#variants">Read the genetics sources</a>
        <h2>Where to find support</h2>
        <p>
          Visit the{" "}
          <a href="https://rarediseases.mohfw.gov.in/">
            Government of India rare-diseases portal
          </a>{" "}
          for official resources. A clinician or genetic counsellor can discuss
          personal health questions.
        </p>
        <h2>About Anuvad</h2>
        <p>
          Anuvad means translation. Pragati Bhaisora hosts the initiative to
          make rare-disease science and lived experience easier to talk about.
        </p>
        <a href="mailto:pragati@hellokritrna.com">Suggest a conversation</a>
        <Conversations videos={approved} />
      </div>
    </>
  );
}
