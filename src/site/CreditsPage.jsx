import { PageIntro } from './Layout';

export default function CreditsPage() {
  return <>
    <PageIntro label="WEBSITE CREDITS" title="Creative contributions." description="The sources behind the illustrative manufacturing explorer." />
    <section className="credits-content site-width">
      <h2>Vehicle model</h2>
      <p>Ferrari 458 Italia by <a href="https://sketchfab.com/models/57bf6cc56931426e87494f554df1dab6" target="_blank" rel="noreferrer">vicent091036</a>, distributed with the Three.js examples under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">Creative Commons Attribution 4.0</a>.</p>
      <p>Modified for this presentation: materials, body sectioning, component positions and process highlighting. The added manufacturing components are original illustrative studies created for this website.</p>
      <p>The vehicle illustrates manufacturing applications and does not imply a supply relationship with its manufacturer.</p>
    </section>
  </>;
}
