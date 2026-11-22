import { metadataForProject, StaticProjectPage } from '../project-page';

export const dynamic = 'force-static';
export const metadata = metadataForProject('nourri-food-and-drinks');

export default function Page() {
  return <StaticProjectPage slug="nourri-food-and-drinks" />;
}
