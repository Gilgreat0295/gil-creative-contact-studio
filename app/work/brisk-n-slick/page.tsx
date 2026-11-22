import { metadataForProject, StaticProjectPage } from '../project-page';

export const dynamic = 'force-static';
export const metadata = metadataForProject('brisk-n-slick');

export default function Page() {
  return <StaticProjectPage slug="brisk-n-slick" />;
}
