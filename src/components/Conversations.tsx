"use client";
import { useState } from "react";
type Video = {
  youtubeId: string;
  title: string;
  guestName: string;
  guestHandle: string;
  date: string;
  duration?: string;
  consentConfirmed: boolean;
  founderApproved: boolean;
};
export function Conversations({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState("");
  if (!videos.length) return null;
  return (
    <section>
      <h2>Anuvad conversations</h2>
      {videos.map((v) => (
        <article key={v.youtubeId}>
          <h3>{v.title}</h3>
          <p>
            With {v.guestName} {v.guestHandle} {v.duration}
          </p>
          {playing === v.youtubeId ? (
            <iframe
              width="560"
              height="315"
              style={{ maxWidth: "100%" }}
              title={v.title}
              src={
                "https://www.youtube-nocookie.com/embed/" +
                v.youtubeId +
                "?cc_load_policy=1&autoplay=1"
              }
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <button className="action" onClick={() => setPlaying(v.youtubeId)}>
              Play conversation
            </button>
          )}
        </article>
      ))}
    </section>
  );
}
export type { Video };
