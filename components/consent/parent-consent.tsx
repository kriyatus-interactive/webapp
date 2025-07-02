'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { uploadImage } from '@/utils/upload-image'
import TermsAndConditions from './terms-and-conditions'

interface ParentConsentProps {
  parentId: string,
  childId: string,
  previousGuardianCertUrl?: string | null,
  hasGivenConsentBefore?: boolean,
  previousIsBiological?: boolean
}

const ParentConsent: React.FC<ParentConsentProps> = ({ 
  parentId,
  childId,
  hasGivenConsentBefore = false,
  previousIsBiological = true,
  previousGuardianCertUrl = null,
}) => {
  const [relationship, setRelationship] = useState<'biological' | 'guardian' | ''>(
    hasGivenConsentBefore ? (previousIsBiological ? 'biological' : 'guardian') : ''
  )
  const [guardianCert, setGuardianCert] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleConsent = async (is_consented: boolean) => {
    setUploading(true)
    setError('')

    try {
      if (!relationship) {
        setError('Please select relationship type.')
        return
      }

      let certUrl: string | null = previousGuardianCertUrl
      const is_parent = relationship === 'biological'

      if (!is_parent) {
        if (!previousGuardianCertUrl && !guardianCert) {
          setError('Please upload guardian certificate.')
          return
        }

        if (guardianCert) {
          const uploadedUrl = await uploadImage(
            guardianCert,
            'images/guardian_certificates'
          )
          if (!uploadedUrl) throw new Error('Failed to upload guardian certificate.')
          certUrl = uploadedUrl
        }
      } else {
        certUrl = null
      }

      const supabase = createClient()
      const { error: upsertError } = await supabase
        .from('parent_user')
        .upsert(
          {
            parent_id: parentId,
            user_id: childId,
            is_consented,
            is_biological_parent: is_parent,
            guardian_certificate_img_url: certUrl,
          },
          { onConflict: 'parent_id, user_id' }
        )

      if (upsertError) throw new Error(upsertError.message)

      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Relationship selection */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Are you the biological parent or a guardian?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="relationship"
              value="biological"
              checked={relationship === 'biological'}
              onChange={() => setRelationship('biological')}
            />
            Biological Parent
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="relationship"
              value="guardian"
              checked={relationship === 'guardian'}
              onChange={() => setRelationship('guardian')}
            />
            Guardian
          </label>
        </div>
      </div>

      {/* Guardian certificate upload */}
      {relationship === 'guardian' && !previousGuardianCertUrl && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            Upload Guardian Certificate
          </label>
          <Input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setGuardianCert(e.target.files?.[0] || null)}
            disabled={uploading}
          />
        </div>
      )}

      <hr />

      <TermsAndConditions />
      {hasGivenConsentBefore && <p className='font-semibold text-gray-700'>You had previously submitted consent and are now updating it.</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {success && (
        <div className="p-3 bg-green-100 text-green-800 rounded">
          {hasGivenConsentBefore ? 'Consent updated!' : 'Consent submitted successfully!'}
        </div>
      )}

      {/* Buttons */}
      <div className="pt-4 flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => handleConsent(false)}
          disabled={uploading || success}
        >
          {'I Do Not Consent'}
        </Button>
        <Button
          variant="default"
          disabled={
            !relationship ||
            (relationship === 'guardian' && !previousGuardianCertUrl && !guardianCert) ||
            uploading || success
          }
          onClick={() => handleConsent(true)}
        >
          {uploading
            ? 'Submitting...'
            : 'Give Consent'}
        </Button>
      </div>
    </div>
  )
}

export default ParentConsent
