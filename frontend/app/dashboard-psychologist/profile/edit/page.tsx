'use client'
import { PsychologistProfileView } from '@/app/lib/definitions';
import EditProfilePage from '@/app/ui/dashboard/psychologist/editProfile';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/lib/UserContext';

export default function Page() {
    const { userId } = useAppContext();

    const [profile, setProfile] = useState<PsychologistProfileView | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch psychologist profile
                const profileResponse = await fetch(`http://localhost:3030/psychologistProfile/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch psychologist profile');
                }

                const profileData = await profileResponse.json();

                // Fetch user data
                const userResponse = await fetch(`http://localhost:3030/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await userResponse.json();

                // Combine psychologist profile and user data
                const combinedProfile: PsychologistProfileView = {
                    psychologist_id: profileData.psychologist_id,
                    name: userData.name,
                    description: profileData.description,
                    specialty: profileData.specialty,
                    experience: profileData.experience,
                    education: profileData.education,
                    certifications: profileData.certifications,
                    areas_of_expertise: profileData.areas_of_expertise,
                };

                setProfile(combinedProfile);
                setLoading(false);
            } catch (error) {
                setError("An error occurred while fetching the profile");
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);


    const handleSave = async (updatedProfile: PsychologistProfileView) => {
        try {
            const { name, ...profileToSave } = updatedProfile;

            const response = await fetch(`http://localhost:3030/psychologistProfile/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileToSave),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            router.back(); 
        } catch (error) {
            setError("An error occurred while saving the profile");
        }
    };

    const handleReturnToProfile = () => {
        router.replace("/dashboard-psychologist/profile");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div>{error}</div>
                <button onClick={handleReturnToProfile} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                    Return to Profile
                </button>
            </div>

        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                    Edit profile
                </h1>
            </div>
            <div className='flex'>
                {profile && <EditProfilePage profile={profile} onSave={handleSave} />}
            </div>
            {/* <div className=' p-2'>
            <button onClick={handleReturnToProfile} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                Return to Profile
            </button>
            </div> */}
            
        </div>
    );
}
