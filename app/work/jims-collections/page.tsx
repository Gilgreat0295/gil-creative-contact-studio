import { metadataForProject, StaticProjectPage } from '../project-page';

export const dynamic = 'force-static';
export const metadata = metadataForProject('jims-collections');

export default function Page() {
  return <StaticProjectPage slug="jims-collections" />;
}
