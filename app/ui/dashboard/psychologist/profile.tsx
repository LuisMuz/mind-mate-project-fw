import { PsychologistProfileView } from '@/app/lib/definitions';
import Image from 'next/image';
import pic from '@/public/profile_pic.png';

export default function ProfilePage({ profile }: { profile: PsychologistProfileView }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center origin-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={pic}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500">{profile.specialty}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          <p>{profile.experience} years</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          <p>{profile.education}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Certifications</h2>
          <ul>
            {profile.certifications?.map((certification, index) => (
              <li key={index}>{certification}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Areas of Expertise</h2>
          <ul>
            {profile.areas_of_expertise?.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{profile.description}</p>
      </div>
    </div>
  );
}
