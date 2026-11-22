import type { Metadata } from 'next';
import { HomePage } from '@/components/site/HomeSections';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Gil Creative Co. — Design with a point of view',
  description:
    'Branding, campaigns, motion, video and digital design by Gilbert Gospel Jacob in Port Harcourt, Nigeria.',
};

export default function Home() {
  return <HomePage />;
}
