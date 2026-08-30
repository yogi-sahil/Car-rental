import { ArrowIcon } from "./icons";
import { businessDetails } from "@/lib/data";

const selectedReels = [
  { id: "DVTTmb7EjKp", label: "Instagram reel 1" },
  { id: "DOVTvXukrYv", label: "Instagram reel 2" },
  { id: "DLhv4J5y_Kb", label: "Instagram reel 3" },
  { id: "DLetDmDtp8C", label: "Instagram reel 4" },
] as const;

export function InstagramReels() {
  return (
    <section className="section instagram-section" aria-labelledby="instagram-heading">
      <div className="container">
        <div className="instagram-head">
          <div><span className="kicker">ON INSTAGRAM</span><h2 id="instagram-heading">Road moments.<br /><em>Real reels.</em></h2></div>
          <div><p>Follow our Instagram stream for drive inspiration, local moments and new updates.</p><a className="button button-outline" href={businessDetails.instagramUrl} target="_blank" rel="noreferrer">@say_dev_vicky <ArrowIcon /></a></div>
        </div>
        <div className="instagram-reel-grid">
          {selectedReels.map((reel) => (
            <article className="instagram-reel" key={reel.id}>
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                title={`${reel.label} from @say_dev_vicky`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </article>
          ))}
        </div>
        <p className="instagram-note">Instagram content is loaded from Meta only when this section approaches the screen.</p>
      </div>
    </section>
  );
}
