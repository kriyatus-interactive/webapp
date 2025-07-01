"use client"

import React from 'react'
import AadhaarVerifyForm from './aadhaar-verify-form';
import AadhaarDetailsForm from './aadhaar-details-form';
import ParentConsent from './parent-consent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ParentDetailsProps {
    child_id: string
}

const ParentDetails = (props: ParentDetailsProps) => {
    const { child_id } = props;
    return (
            <div className={"flex flex-col gap-6 sm:mx-96 mx-1 my-2"}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Parent Consent</CardTitle>
                        <CardDescription>Parent have to provide the below details needed for parent consent</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <div>User ID: {child_id}</div> */}
                        <AadhaarVerifyForm />
                        {/* <AadhaarDetailsForm /> */}
                        <ParentConsent />
                    </CardContent>
                </Card>
                </div>
            )
}

export default ParentDetails