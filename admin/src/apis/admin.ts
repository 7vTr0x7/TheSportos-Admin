import { Banner, BannerResponse } from '../types/banner';
import { FeaturedPlayer, Match, MatchesResponse } from '../types/fixture';
import { ILeague } from '../types/league';
import { INews } from '../types/news';
import { PlayerResponse, SinglePlayer } from '../types/player';
import { Sponsor, SponsorResponse } from '../types/sponsor';
import { Standing } from '../types/standing';
import { IStarPerformers } from '../types/starPerformer';
import { Trophy, TrophyResponse } from '../types/trophy';
import { IUser } from '../types/user';

export const fetchMatches = async (
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>,
  status: string,
): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/api/user/matches', {
      method: 'GET',
      credentials: 'include',
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

export const addMatch = async (match: Match): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/api/admin/add/match', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    });

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
      `http://localhost:4000/api/admin/delete/match/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/update/match/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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
    const response = await fetch('http://localhost:4000/api/user/players', {
      method: 'GET',
      credentials: 'include',
    });

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
    const response = await fetch('http://localhost:4000/api/admin/add/player', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });

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
      `http://localhost:4000/api/admin/update/player/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/delete/player/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
    const response = await fetch('http://localhost:4000/api/user/banner', {
      method: 'GET',
      credentials: 'include',
    });

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
    const response = await fetch('http://localhost:4000/api/admin/add/banner', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(banner),
    });

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
      `http://localhost:4000/api/admin/update/banner/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/delete/banner/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
    const response = await fetch('http://localhost:4000/api/user/sponsor', {
      method: 'GET',
      credentials: 'include',
    });

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
      'http://localhost:4000/api/admin/add/sponsor',
      {
        method: 'POST',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/update/sponsor/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/delete/sponsor/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
    const response = await fetch('http://localhost:4000/api/user/trophies', {
      method: 'GET',
      credentials: 'include',
    });

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
    const response = await fetch('http://localhost:4000/api/admin/add/trophy', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trophy),
    });

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
      `http://localhost:4000/api/admin/update/trophy/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/delete/trophy/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
      'http://localhost:4000/api/user/featured-player',
      {
        method: 'GET',
        credentials: 'include',
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
      'http://localhost:4000/api/admin/add/featured-player',
      {
        method: 'POST',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/update/featured-player/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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
      `http://localhost:4000/api/admin/delete/featured-player/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
    const response = await fetch('http://localhost:4000/api/user/leagues', {
      method: 'GET',
      credentials: 'include',
    });

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
    const response = await fetch('http://localhost:4000/api/admin/add/league', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(league),
    });

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
      `http://localhost:4000/api/admin/update/league/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
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

export const deleteLeague = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/delete/league/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
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
export const deleteUserById = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/delete/single/user/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete user: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete user:', error);
  }
};

export const fetchNews = async (
  setNews: React.Dispatch<React.SetStateAction<INews[]>>,
): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/api/user/blogs', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.blogs) {
      setNews(data.blogs);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  blogs:', error);
  }
};

export const addNews = async (blog: INews): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/api/admin/add/blog', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add blog: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add blog:', error);
  }
};

export const updateNews = async (id: string, blog: INews): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/update/blog/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add blog: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add blog:', error);
  }
};

export const deleteNews = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/delete/blog/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete blog: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete blog:', error);
  }
};

export const fetchStarPerformers = async (
  setStarPerformer: React.Dispatch<React.SetStateAction<IStarPerformers[]>>,
): Promise<void> => {
  try {
    const response = await fetch(
      'http://localhost:4000/api/user/star-performers',
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch starPerformers: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.starPerformers) {
      setStarPerformer(data.starPerformers);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  starPerformers:', error);
  }
};

export const addStarPerformers = async (
  starPerformer: IStarPerformers[],
): Promise<void> => {
  try {
    const response = await fetch(
      'http://localhost:4000/api/admin/add/star-performer',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(starPerformer),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add starPerformer: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add starPerformer:', error);
  }
};

export const updateStarPerformer = async (
  id: string,
  starPerformer: IStarPerformers,
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/update/star-performer/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(starPerformer),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add starPerformer: ${response.status} ${response.statusText}`,
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
    console.error('Error add starPerformer:', error);
  }
};

export const deleteStarPerformer = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/delete/star-performer/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete starPerformer: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete starPerformer:', error);
  }
};

export const fetchStandings = async (
  setStandings: React.Dispatch<React.SetStateAction<Standing[]>>,
): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/api/user/standings', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch standings: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success && data.standingsData) {
      setStandings(data.standingsData);
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error fetching  standings:', error);
  }
};

export const addStanding = async (standing: Standing): Promise<void> => {
  try {
    const response = await fetch(
      'http://localhost:4000/api/admin/add/standing',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(standing),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add standing: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error add standing:', error);
  }
};

export const updateStanding = async (
  id: string,
  standing: Standing,
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/update/standing/${id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(standing),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to add standing: ${response.status} ${response.statusText}`,
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
    console.error('Error add standing:', error);
  }
};

export const deleteStanding = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/delete/standing/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete standing: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.success) {
      return;
    } else {
      console.error('Unexpected response format:', data);
    }
  } catch (error) {
    console.error('Error delete standing:', error);
  }
};
