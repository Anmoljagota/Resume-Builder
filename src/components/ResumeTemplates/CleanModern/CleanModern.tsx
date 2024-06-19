import { UserProfile } from '@/utils/interfaces';
import React from 'react'
import ProfileInformation from './ProfileInformation';
import ContactInformation from '../ModernMilestone/ContactInformation';
interface Props {
    user?: UserProfile | null;
    userId?: string;
  }
const CleanModern = ({user,userId}:Props) => {
  return (
    <div
        style={{
            backgroundColor: "white",
            width: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            // padding: "15px",
            display: "flex",
            flexDirection: "column",
            // gap: "20px",
            color: "#000",
        }}
      >
        <ProfileInformation data={user} />
        <ContactInformation data={user} />
      </div>
  )
}

export default CleanModern
