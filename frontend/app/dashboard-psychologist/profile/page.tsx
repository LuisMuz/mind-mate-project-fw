'use client'

import { PsychologistProfileView } from '@/app/lib/definitions';
import ProfilePage from '@/app/ui/dashboard/psychologist/profile';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/lib/UserContext';

export default function Page() {
    const { userId, userRole } = useAppContext();

    const [onEdit, setOnEdit] = useState(false);
    const [profile, setProfile] = useState<PsychologistProfileView | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch the psychologist profile
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

                // Fetch the user data
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

                // Combine the user data and profile data
                const combinedProfile = {
                    ...profileData,
                    name: userData.name,
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

    const handleEdit = () => {
        router.push(`${pathName}/edit`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error} the {userId}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                    Profile
                </h1>
                <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" 
                onClick={handleEdit}>
                    Edit
                </button>
            </div>
            {profile && <ProfilePage profile={profile} />}
        </div>
    );
}
