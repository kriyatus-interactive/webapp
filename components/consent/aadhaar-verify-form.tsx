"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { createClient } from "@/lib/supabase/client";
import AadhaarDetailsForm from "./aadhaar-details-form";

const AadhaarVerifyForm: React.FC = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setParentId(null);
    console.log("running");
    

    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('parents').select('parent_id').eq("aadhar_num", aadhaar);
      console.log(data);

      if(data === null) throw Error(error.message);

      if(data.length === 0) setShowForm(true);

      if(error === null && data.length > 0){
        setShowForm(false)
        setParentId(data[0].parent_id)
      }
      
    } catch (error) {
      setParentId(null);
      console.log("an error occured:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
      >
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
        disabled={loading || showForm || parentId !== null}
        className="mb-2 flex-3"
      />
      <Button
        type="submit"
        disabled={loading || aadhaar.length !== 12 || parentId !== null || showForm}
        className="flex-1 w-full"
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
      </div>
    </form>
    {parentId !== null ? (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          <span className="font-bold">Aadhaar is verified.</span>
        </div>
      ) : showForm && <AadhaarDetailsForm aadhar_num={aadhaar} setParentId={setParentId} />}
        </>
  );
};

export default AadhaarVerifyForm;
