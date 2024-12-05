export const fetchMatches = async (
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>,
  status: string,
): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/api/user/matches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
