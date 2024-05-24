import { useState } from 'react';
import pic from '@/public/profile_pic.png';
import Image from 'next/image';
import { PsychologistProfileView } from '@/app/lib/definitions';

export default function EditProfilePage({ profile, onSave }: { profile: PsychologistProfileView, onSave: (profile: PsychologistProfileView) => void }) {
  const [name, setName] = useState(profile.name);
  const [specialty, setSpecialty] = useState(profile.specialty);
  const [experience, setExperience] = useState(profile.experience);
  const [education, setEducation] = useState(profile.education);
  const [certifications, setCertifications] = useState(profile.certifications || []);
  const [areasOfExpertise, setAreasOfExpertise] = useState(profile.areas_of_expertise || []);
  const [description, setDescription] = useState(profile.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const editedProfile: PsychologistProfileView = {
      psychologist_id: profile.psychologist_id,
      name,
      specialty,
      experience,
      education,
      certifications,
      areas_of_expertise: areasOfExpertise,
      description,
    };
    onSave(editedProfile);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-semibold focus:outline-none"
              placeholder="Name"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Speciality</h2>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="focus:outline-none w-full text-gray-500"
              placeholder="Specialty"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Experience</h2>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="focus:outline-none w-full text-gray-500"
              placeholder="Experience (years)"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="focus:outline-none w-full text-gray-500"
              placeholder="Education"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Certifications</h2>
            <input
              type="text"
              value={certifications.join(", ")} // Join certifications array into a string for input value
              onChange={(e) => setCertifications(e.target.value.split(", "))} // Split input value into certifications array
              className="focus:outline-none w-full text-gray-500"
              placeholder="Certifications"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Areas of Expertise</h2>
            <input
              type="text"
              value={areasOfExpertise.join(", ")} 
              onChange={(e) => setAreasOfExpertise(e.target.value.split(", "))} 
              className="focus:outline-none w-full text-gray-500"
              placeholder="Areas of Expertise"
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            placeholder="Description"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
}
