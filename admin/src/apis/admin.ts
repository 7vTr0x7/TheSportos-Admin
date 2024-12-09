import { Banner, BannerResponse } from '../types/banner';
import { FeaturedPlayer, Match, MatchesResponse } from '../types/fixture';
import { PlayerResponse, SinglePlayer } from '../types/player';
import { Sponsor, SponsorResponse } from '../types/sponsor';
import { Trophy, TrophyResponse } from '../types/trophy';
import { ILeague } from '../types/league';

export const fetchMatches = async (
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>,
  status: string,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/matches',
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
      'https://the-sportos-v1.vercel.app/api/admin/add/match',
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
        `Failed to add match: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.match) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add match:', error);
  }
};

export const deleteMatch = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/match/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add match: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add match:', error);
  }
};

export const updateMatch = async (id: string, match: Match): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/match/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(match),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add match: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add match:', error);
  }
};

export const fetchPlayers = async (
  setPlayers: React.Dispatch<React.SetStateAction<SinglePlayer[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/players',
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch players: ${response.status} ${response.statusText}`,
      );
    }

    const data: PlayerResponse = await response.json();

    if (data.success && data.players) {
      setPlayers(data.players);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  players:', error);
  }
};

export const addPlayer = async (player: SinglePlayer): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/admin/add/player',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add player: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.player) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add player:', error);
  }
};

export const updatePlayer = async (
  id: string,
  player: SinglePlayer,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/player/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add player: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add player:', error);
  }
};

export const deletePlayer = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/player/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete player: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete player:', error);
  }
};

export const fetchBanner = async (
  setBanner: React.Dispatch<React.SetStateAction<Banner[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/banner',
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch banner: ${response.status} ${response.statusText}`,
      );
    }

    const data: BannerResponse = await response.json();

    if (data.success && data.banner) {
      setBanner(data.banner);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  banner:', error);
  }
};

export const addBanner = async (banner: Banner): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/admin/add/banner',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banner),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add banner: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.banner) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add banner:', error);
  }
};

export const updateBanner = async (
  id: string,
  banner: Banner,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/banner/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banner),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add banner: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);
    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add banner:', error);
  }
};

export const deleteBanner = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/banner/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete banner: ${response.status} ${response.statusText}`,
      );
    }

    const data: BannerResponse = await response.json();
    console.log(data);

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete banner:', error);
  }
};

export const fetchSponsor = async (
  setSponsor: React.Dispatch<React.SetStateAction<Sponsor[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/sponsor',
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch sponsor: ${response.status} ${response.statusText}`,
      );
    }

    const data: SponsorResponse = await response.json();

    if (data.success && data.sponsor) {
      setSponsor(data.sponsor);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  sponsor:', error);
  }
};

export const addSponsor = async (sponsor: Sponsor): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/admin/add/sponsor',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsor),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add sponsor: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.sponsor) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add sponsor:', error);
  }
};

export const updateSponsor = async (
  id: string,
  sponsor: Sponsor,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/sponsor/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsor),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add sponsor: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);
    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add sponsor:', error);
  }
};

export const deleteSponsor = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/sponsor/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete sponsor: ${response.status} ${response.statusText}`,
      );
    }

    const data: SponsorResponse = await response.json();
    console.log(data);

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete sponsor:', error);
  }
};

export const fetchTrophies = async (
  setTrophies: React.Dispatch<React.SetStateAction<Trophy[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/trophies',
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch trophies: ${response.status} ${response.statusText}`,
      );
    }

    const data: TrophyResponse = await response.json();

    if (data.success && data.trophies) {
      setTrophies(data.trophies);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  trophies:', error);
  }
};

export const addTrophy = async (trophy: Trophy): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/admin/add/trophy',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trophy),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add trophy: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.trophy) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add trophy:', error);
  }
};

export const updateTrophy = async (
  id: string,
  trophy: Trophy,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/trophy/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trophy),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add trophy: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);
    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add trophy:', error);
  }
};

export const deleteTrophy = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/trophy/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete trophy: ${response.status} ${response.statusText}`,
      );
    }

    const data: TrophyResponse = await response.json();
    console.log(data);

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete trophy:', error);
  }
};

export const fetchFeaturedPlayer = async (
  setFeaturedPlayer: React.Dispatch<React.SetStateAction<FeaturedPlayer[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/featured-player',
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch featuredPlayer: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.players) {
      setFeaturedPlayer(data.players);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  featuredPlayer:', error);
  }
};

export const addFeaturedPlayer = async (
  featuredPlayer: FeaturedPlayer,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/admin/add/featured-player',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(featuredPlayer),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add featuredPlayer: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.featuredPlayer) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add featuredPlayer:', error);
  }
};

export const updateFeaturedPlayer = async (
  id: string,
  featuredPlayer: FeaturedPlayer,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/featured-player/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(featuredPlayer),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add featuredPlayer: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add featuredPlayer:', error);
  }
};

export const deleteFeaturedPlayer = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/featured-player/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete featuredPlayer: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete featuredPlayer:', error);
  }
};

export const fetchLeague = async (
  setLeagues: React.Dispatch<React.SetStateAction<ILeague[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/user/leagues',
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch leagues: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.leagues) {
      setLeagues(data.leagues);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  leagues:', error);
  }
};

export const addLeague = async (league: ILeague): Promise<void> => {
  try {
    const response = await fetch(
      'https://the-sportos-v1.vercel.app/api/admin/add/league',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(league),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add league: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add league:', error);
  }
};

export const updateLeague = async (
  id: string,
  league: ILeague,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/update/league/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(league),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add league: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add featuredPlayer:', error);
  }
};

export const deleteLeague = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://the-sportos-v1.vercel.app/api/admin/delete/league/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete league: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete league:', error);
  }
};
