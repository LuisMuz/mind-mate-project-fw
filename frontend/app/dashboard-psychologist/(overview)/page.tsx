'use client'
import { FormattedUsersTable, Role } from '@/app/lib/definitions';
import ClientsTable from '@/app/ui/dashboard/psychologist/clients_table';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/lib/UserContext';

export default function Page() {
  const { userId } = useAppContext();
  const [users, setUsers] = useState<FormattedUsersTable[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenInput, setTokenInput] = useState<string>("");

  useEffect(() => {
    fetchUsers();
    fetchTokens();
  }, [userId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3030/session/psycho/clients/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('An error occurred while fetching users.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTokens = async () => {
    try {
      const response = await fetch(`http://localhost:3030/sessionToken/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tokens');
      }
      const data = await response.json();
      setTokens(data.map((tokenObj: { token: string }) => tokenObj.token));
    } catch (error) {
      setError('An error occurred while fetching tokens.');
    }
  };

  const handleGenerateToken = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3030/sessionToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          psycho_id: userId,
          token: tokenInput,
        })
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.error);
      }

      const data = await response.json();
      setTokenInput("");
      fetchTokens();
    } catch (error) {
      setError("An error occurred while generating the token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className="mb-4 text-2xl md:text-4xl font-bold text-gray-800 pb-2">
        Users
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ClientsTable users={users} />
      )}
      <div className="flex flex-row pt-4">
        <div className="flex-grow ml-4 p-6 rounded-xl bg-gray-50 shadow-md mr-9">
          <h2 className="text-xl font-bold text-gray-800 pb-2">Active Tokens</h2>
          <ul>
            {tokens.length === 0 ? (
              <li className="text-gray-800">No active tokens</li>
            ) : (
              tokens.map((token, index) => (
                <li key={index} className="text-gray-800">
                  {token}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className='flex flex-col'>
          <div className="flex flex-row items-center mt-3 mb-4">
            <form>
              <input
                id='token'
                type="text"
                placeholder="Enter token (min 6)"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                className="px-2 py-2 border rounded-md mr-2"
                required
              />
              <button
                onClick={handleGenerateToken}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loading || tokenInput.length < 6}
              >
                {loading ? "Generating..." : "Generate Token"}
              </button>
            </form>
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
        </div>
      </div>
    </main>
  );
}
