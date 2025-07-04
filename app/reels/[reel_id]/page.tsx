// app/(your-route)/page.tsx
import ReelPlayer from '@/components/reels/reel-player';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';
import React from 'react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

interface ReelPageProps {
  params: Promise<{ reel_id: string }>;
}

export async function generateMetadata({ params }: ReelPageProps): Promise<Metadata> {
  const { reel_id } = await params;
  const supabase = await createClient();

  let data = null;
  let error = null;

  try {
    const result = await supabase
      .from('challenge_videos')
      .select('thumbnail_url,description')
      .eq('submit_id', reel_id)
      .maybeSingle();

    data = result.data;
    error = result.error;
  } catch (err) {
    error = err;
    console.log("an error:", error);
  }

  // Fallback values
  const fallbackDescription = "Check out this amazing solution on our platform!";
  const fallbackImage = `${defaultUrl}/opengraph-image.png`;

  return {
    title: "Discover My Unique Solution to This Challeng",
    description: data?.description || fallbackDescription,
    openGraph: {
      title: "Discover My Unique Solution to This Challeng",
      description: data?.description || fallbackDescription,
      images: [
        data?.thumbnail_url || fallbackImage,
      ],
      url: new URL(`/reels/${reel_id}`, defaultUrl).toString(),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Discover My Unique Solution to This Challeng",
      description: data?.description || fallbackDescription,
      images: [data?.thumbnail_url || fallbackImage],
    },
  };
}

const page = async ({ params }: ReelPageProps) => {
  const { reel_id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('challenge_videos')
    .select('reel_url')
    .eq('submit_id', reel_id)
    .maybeSingle();

  if (error || !data?.reel_url) {
    console.error('Error fetching video:', error);
    return redirect(
      `/auth/error?error=${encodeURIComponent('Video not available')}`,
      RedirectType.replace
    );
  }

  return (
    <div className="flex justify-center items-start sm:p-2">
      <ReelPlayer reel_id={reel_id} videoUrl={data.reel_url} />
    </div>
  );
};

export default page;
