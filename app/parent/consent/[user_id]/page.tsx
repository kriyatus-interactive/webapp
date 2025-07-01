import ParentDetails from '@/components/consent/parent-details';
import React from 'react'

interface ConsentPageProps {
  params: {
    user_id: string;
  };
}

const page = (props: ConsentPageProps) => {
  const { params } = props;

  return <ParentDetails child_id={params.user_id} />;
}

export default page