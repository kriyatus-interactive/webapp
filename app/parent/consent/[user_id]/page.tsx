import ParentDetails from '@/components/consent/parent-details';
import { createClient } from '@/lib/supabase/server';
import React from 'react'
import { redirect, RedirectType } from 'next/navigation';

interface ParentConsentProps {
  params: Promise<{ user_id: string }>
}

const page = async ({ params }: ParentConsentProps) => {
  const { user_id } = await params;
  const supabase = await createClient();

  const { data: consentRecord, error: consentError } = await supabase
    .from('parent_user')
    .select('is_consented, is_biological_parent, guardian_certificate_img_url')
    .eq('user_id', user_id)
    .limit(1)
    .maybeSingle()

  if (consentError) {
    console.error('Error fetching consent:', consentError)
    return redirect(
      `/auth/error?error=${encodeURIComponent('DB error checking consent')}`,
      RedirectType.replace
    )
  }

  const { data: userRecord, error: userError } = await supabase
    .from('users')
    .select('is_aadhar_verified')
    .eq('user_id', user_id)
    .limit(1)
    .maybeSingle()

  if (userError || !userRecord) {
    console.error('Error fetching user:', userError)
    return redirect(
      `/auth/error?error=${encodeURIComponent('User not found or not verified')}`,
      RedirectType.replace
    )
  }

  if (userRecord.is_aadhar_verified && consentRecord) {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2l4 -4M12 22c5.523 0 10 -4.477 10 -10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        </svg>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Consent Approved
        </h1>
        <p className="mt-2 text-gray-600">
          Your response has been recorded and cannot be updated now. Thank you!
        </p>
      </div>
    </div>
  )
}

  const hasGivenConsentBefore = !!consentRecord

  return (
    <div className='flex justify-center sm:items-center items-start sm:py-4'>
    <ParentDetails
      child_id={user_id}
      hasGivenConsentBefore={hasGivenConsentBefore}
      previousIsBiological={consentRecord?.is_biological_parent}
      previousGuardianCertUrl={consentRecord?.guardian_certificate_img_url}
      />
      </div>
  )
}

export default page