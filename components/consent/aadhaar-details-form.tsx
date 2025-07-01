"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { uploadImage } from "@/utils/upload-image";
import { getAadhaarData } from "@/utils/get-aadhaar-data";
import { createClient } from "@/lib/supabase/client";

interface AadhaarDetailsFormProps {
  aadhar_num: string
  setParentId: Function
}

const AadhaarDetailsForm = (props: AadhaarDetailsFormProps) => {
  const { aadhar_num, setParentId } = props;
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState("upload");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    console.log("running");
    

    if (frontImage === null || backImage === null) return;

    try {
      setStatusMsg('uploading...');
      const supabase = createClient();
      const frontUrl = await uploadImage(frontImage);
      const backUrl = await uploadImage(backImage);

      console.log("uploaded", frontUrl, backUrl);
      
      setStatusMsg('extracting data...')
      const aadhaarData = await getAadhaarData(frontUrl, backUrl);

      console.log("aadhar data", aadhaarData);
      
      const payload = {
        aadhar_num: aadhar_num,
        aadhar_front_img_url: frontUrl,
        aadhar_back_img_url: backUrl,
        name: aadhaarData.name
      }
      if (frontUrl && backUrl && aadhaarData !== null) {
        setStatusMsg('creating user...');
        const { data, error } = await supabase.from('parents').insert(payload).select('parent_id');

        console.log("parent data", data);
        
        if (data !== null) {
          setSuccess(true);
          setFrontImage(null);
          setBackImage(null);
          setParentId(data[0].parent_id);
        }else throw Error("user cannot be created");
      }
    } catch (error) {
      console.log("an error", error);
      
      setSuccess(false);
    } finally {
      setLoading(false);
      setStatusMsg('completed');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
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
        {statusMsg}
      </Button>
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          Aadhaar images uploaded successfully!
        </div>
      )}
    </form>
  );
};

export default AadhaarDetailsForm;
