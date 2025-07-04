'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/utils/upload-image"
import { getAadhaarData } from "@/utils/get-aadhaar-data"
import { createClient } from "@/lib/supabase/client"

interface AadhaarDetailsFormProps {
  aadhar_num: string
  setParentId: (id: string) => void
}

const AadhaarDetailsForm: React.FC<AadhaarDetailsFormProps> = ({
  aadhar_num,
  setParentId,
}) => {
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [statusMsg, setStatusMsg] = useState("Upload")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setStatusMsg("Uploading images...")

    try {
      if (!frontImage || !backImage) throw new Error("Both images required")

      const supabase = createClient()

      // Upload both images
      const frontUrl = await uploadImage(frontImage)
      const backUrl = await uploadImage(backImage)

      if (!frontUrl || !backUrl) throw new Error("Image upload failed")

      // Extract Aadhaar data
      setStatusMsg("Extracting data...")
      const aadhaarData = await getAadhaarData(frontUrl, backUrl)

      if (!aadhaarData || !aadhaarData.name) {
        throw new Error("Could not extract Aadhaar name")
      }

      const payload = {
        aadhar_num,
        aadhar_front_img_url: frontUrl,
        aadhar_back_img_url: backUrl,
        name: aadhaarData.name,
      }

      // Insert into Supabase
      setStatusMsg("Saving details...")
      const { data, error } = await supabase
        .from('parents')
        .insert(payload)
        .select('parent_id')
        .single()

      if (error || !data?.parent_id) {
        throw new Error(error?.message || "Failed to save parent")
      }

      // Done
      setSuccess(true)
      setParentId(data.parent_id)
      setFrontImage(null)
      setBackImage(null)
      setStatusMsg("Completed")
    } catch (err) {
      console.error("Aadhaar Details Error:", err)
      setSuccess(false)
      setStatusMsg("Failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Aadhaar Front Image
        </label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFrontImage(e.target.files?.[0] || null)}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Aadhaar Back Image
        </label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setBackImage(e.target.files?.[0] || null)}
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !frontImage || !backImage}
        className="w-full"
      >
        {loading ? statusMsg : "Submit Aadhaar Details"}
      </Button>

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          Aadhaar verified and parent registered successfully!
        </div>
      )}
    </form>
  )
}

export default AadhaarDetailsForm
