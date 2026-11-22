import { metadataForProject, StaticProjectPage } from '../project-page';

export const dynamic = 'force-static';
export const metadata = metadataForProject('ba-sam-global-furniture');

export default function Page() {
  return <StaticProjectPage slug="ba-sam-global-furniture" />;
}
