import { metadataForProject, StaticProjectPage } from '../project-page';

export const dynamic = 'force-static';
export const metadata = metadataForProject('savour-by-meire');

export default function Page() {
  return <StaticProjectPage slug="savour-by-meire" />;
}
