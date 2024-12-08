import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  fetchBanner,
  fetchFeaturedPlayer,
  fetchLeague,
  fetchMatches,
  fetchPlayers,
  fetchSponsor,
  fetchTrophies,
} from '../apis/admin';
import { SinglePlayer } from '../types/player';
import { Banner } from '../types/banner';
import { Sponsor } from '../types/sponsor';
import { Trophy } from '../types/trophy';
import { FeaturedPlayer, Match } from '../types/fixture';
import { ILeague } from '../types/league';

type MatchContextType = {
  liveMatches: Match[];
  scheduledMatches: Match[];
  completedMatches: Match[];
  players: SinglePlayer[];
  banner: Banner[];
  sponsor: Sponsor[];
  trophies: Trophy[];
  featuredPlayer: FeaturedPlayer[];
  leagues: ILeague[];
  refreshMatches: () => void;
  refreshPlayers: () => void;
  refreshBanner: () => void;
  refreshSponsor: () => void;
  refreshTrophies: () => void;
  refreshFeaturedPlayer: () => void;
  refreshLeagues: () => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [scheduledMatches, setScheduledMatches] = useState<Match[]>([]);
  const [completedMatches, setCompletedMatches] = useState<Match[]>([]);

  const [players, setPlayers] = useState<SinglePlayer[]>([]);
  const [featuredPlayer, setFeaturedPlayer] = useState<FeaturedPlayer[]>([]);
  const [banner, setBanner] = useState<Banner[]>([]);
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [leagues, setLeagues] = useState<ILeague[]>([]);

  const [refreshKey, setRefreshKey] = useState(0); // Track refresh trigger

  const refreshMatches = useCallback(() => {
    fetchMatches(setLiveMatches, 'Live');
    fetchMatches(setScheduledMatches, 'Upcoming');
    fetchMatches(setCompletedMatches, 'Completed');
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);

  const refreshPlayers = useCallback(() => {
    fetchPlayers(setPlayers);
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);

  const refreshBanner = useCallback(() => {
    fetchBanner(setBanner);
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);
  const refreshSponsor = useCallback(() => {
    fetchSponsor(setSponsor);
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);

  const refreshTrophies = useCallback(() => {
    fetchTrophies(setTrophies);
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);

  const refreshFeaturedPlayer = useCallback(() => {
    fetchFeaturedPlayer(setFeaturedPlayer);
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);
  const refreshLeagues = useCallback(() => {
    fetchLeague(setLeagues);
    setRefreshKey((key) => key + 1); // Increment key to force refresh
  }, []);

  return (
    <MatchContext.Provider
      value={{
        liveMatches,
        scheduledMatches,
        completedMatches,
        players,
        banner,
        sponsor,
        trophies,
        featuredPlayer,
        leagues,
        refreshPlayers,
        refreshMatches,
        refreshBanner,
        refreshSponsor,
        refreshTrophies,
        refreshFeaturedPlayer,
        refreshLeagues,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatchContext must be used within a MatchProvider');
  }
  return context;
};
