'use client'

import React, { useState } from 'react'
import AadhaarVerifyForm from './aadhaar-verify-form'
import AadhaarDetailsForm from './aadhaar-details-form'
import ParentConsent from './parent-consent'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ParentDetailsProps {
  child_id: string
  hasGivenConsentBefore: boolean
  previousIsBiological?: boolean,
  previousGuardianCertUrl?: string | null,
}

const ParentDetails = ({ 
  child_id,
  hasGivenConsentBefore,
  previousIsBiological = true,
  previousGuardianCertUrl = null
 }: ParentDetailsProps) => {
  const [aadhaar, setAadhaar] = useState("")
  const [parentId, setParentId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [verified, setVerified] = useState(false)

  return (
    <div className="flex flex-col gap-6 sm:mx-96 mx-1 my-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Parent Consent</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <hr />
          {!verified && (
            <AadhaarVerifyForm
              aadhaar={aadhaar}
              setAadhaar={setAadhaar}
              setParentId={setParentId}
              setShowForm={setShowForm}
              setVerified={setVerified}
            />
          )}

          {!verified && showForm && (
            <AadhaarDetailsForm
              aadhar_num={aadhaar}
              setParentId={(id: string) => {
                setParentId(id)
                setVerified(true)
              }}
            />
          )}

          {verified && parentId && (
            <ParentConsent
              parentId={parentId}
              childId={child_id}
              hasGivenConsentBefore={hasGivenConsentBefore}
              previousGuardianCertUrl={previousGuardianCertUrl}
              previousIsBiological={previousIsBiological}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ParentDetails
