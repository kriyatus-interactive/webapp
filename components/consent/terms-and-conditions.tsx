import Link from 'next/link'
import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className='space-y-6'>
        <p className="text-gray-700">
        To continue, we need your permission for your child to use the <span className="font-semibold">Kriyatus</span> game and app.{' '}
        <br></br>
        <Link
          href="https://kriyatus.com"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          Find out more about Kriyatus
        </Link>
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Collect basic information about your child such as name & age.</li>
        <li>Collect Aadhaar details to confirm your child’s age and verify that you are their parent.</li>
        <li>Track gameplay activity and project submissions.</li>
      </ul>

      <div className='space-y-1'>
      <p className="text-gray-700">
        We do <span className="font-semibold">not</span> share Aadhaar details with anyone, and all data is handled securely.
      </p>

      <p className="text-gray-700">
        You and your child’s Aadhaar data will be permanently deleted after the hackathon.
      </p>

      <p className="text-red-600 font-medium">
        Your child cannot use Kriyatus without your consent.
      </p>
      </div>
    </div>
  )
}

export default TermsAndConditions