import { metadataForProject, StaticProjectPage } from '../project-page';

export const dynamic = 'force-static';
export const metadata = metadataForProject('storgetech-solutions');

export default function Page() {
  return <StaticProjectPage slug="storgetech-solutions" />;
}
