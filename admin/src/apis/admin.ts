export const fetchMatches = async (
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>,
  status: string,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://thesprotos-backend.vercel.app/api/user/matches',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch matches: ${response.status} ${response.statusText}`,
      );
    }

    const data: MatchesResponse = await response.json();

    if (data.success && data.matches) {
      setMatches(data.matches.filter((match) => match.status === status));
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching live matches:', error);
  }
};

export const addMatch = async (match: Match): Promise<void> => {
  try {
    const response = await fetch(
      'https://thesprotos-backend.vercel.app/api/admin/add/match',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(match),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch matches: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.match) {
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching live matches:', error);
  }
};
