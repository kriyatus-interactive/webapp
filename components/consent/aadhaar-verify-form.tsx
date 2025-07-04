'use client'

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { CardDescription } from "@/components/ui/card"

interface AadhaarVerifyFormProps {
  aadhaar: string
  setAadhaar: (aadhaar: string) => void
  setParentId: (id: string) => void
  setShowForm: (show: boolean) => void
  setVerified: (val: boolean) => void
}

const AadhaarVerifyForm: React.FC<AadhaarVerifyFormProps> = ({
  aadhaar,
  setAadhaar,
  setParentId,
  setShowForm,
  setVerified
}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setParentId("")
    setShowForm(false)

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('parents')
        .select('parent_id')
        .eq("aadhar_num", aadhaar)

      if (error) throw new Error(error.message)

      if (data && data.length > 0) {
        // Parent already exists
        setParentId(data[0].parent_id)
        setVerified(true)
      } else {
        // No parent found, show Aadhaar details form
        setShowForm(true)
      }
    } catch (error) {
      console.error("Error verifying Aadhaar:", error)
      setShowForm(true) // Still show form if error, you may change this logic
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <CardDescription>
            Parent must provide Aadhaar verification and then consent for their child to use Kriyatus.
      </CardDescription>
      <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">
        Parent Aadhaar Number
      </label>
      <div className="flex gap-2">
        <Input
          id="aadhaar"
          name="aadhaar"
          type="text"
          pattern="\d{12}"
          maxLength={12}
          minLength={12}
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 12-digit Aadhaar number"
          required
          disabled={loading}
          className="mb-2 flex-3"
        />
        <Button
          type="submit"
          disabled={loading || aadhaar.length !== 12}
          className="flex-1 w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </form>
  )
}

export default AadhaarVerifyForm
