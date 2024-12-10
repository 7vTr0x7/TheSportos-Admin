import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  fetchBanner,
  fetchFeaturedPlayer,
  fetchLeague,
  fetchMatches,
  fetchNews,
  fetchPlayers,
  fetchSponsor,
  fetchStandings,
  fetchStarPerformers,
  fetchTrophies,
} from '../apis/admin';
import { Banner } from '../types/banner';
import { FeaturedPlayer, Match } from '../types/fixture';
import { ILeague } from '../types/league';
import { INews } from '../types/news';
import { SinglePlayer } from '../types/player';
import { Sponsor } from '../types/sponsor';
import { IStarPerformers } from '../types/starPerformer';
import { Trophy } from '../types/trophy';
import { Standing } from '../types/standing';

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
  news: INews[];
  starPerformers: IStarPerformers[];
  standings: Standing[];
  refreshMatches: () => void;
  refreshPlayers: () => void;
  refreshBanner: () => void;
  refreshSponsor: () => void;
  refreshTrophies: () => void;
  refreshFeaturedPlayer: () => void;
  refreshLeagues: () => void;
  refreshNews: () => void;
  refreshStarPerformers: () => void;
  refreshStandings: () => void;
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
  const [news, setNews] = useState<INews[]>([]);
  const [starPerformers, setStarPerformers] = useState<IStarPerformers[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);

  const refreshMatches = useCallback(() => {
    fetchMatches(setLiveMatches, 'Live');
    fetchMatches(setScheduledMatches, 'Upcoming');
    fetchMatches(setCompletedMatches, 'Completed');
  }, []);

  const refreshPlayers = useCallback(() => {
    fetchPlayers(setPlayers);
  }, []);

  const refreshBanner = useCallback(() => {
    fetchBanner(setBanner);
  }, []);

  const refreshSponsor = useCallback(() => {
    fetchSponsor(setSponsor);
  }, []);

  const refreshTrophies = useCallback(() => {
    fetchTrophies(setTrophies);
  }, []);

  const refreshFeaturedPlayer = useCallback(() => {
    fetchFeaturedPlayer(setFeaturedPlayer);
  }, []);

  const refreshLeagues = useCallback(() => {
    fetchLeague(setLeagues);
  }, []);

  const refreshNews = useCallback(() => {
    fetchNews(setNews);
  }, []);

  const refreshStarPerformers = useCallback(() => {
    fetchStarPerformers(setStarPerformers);
  }, []);
  const refreshStandings = useCallback(() => {
    fetchStandings(setStandings);
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
        news,
        starPerformers,
        standings,
        refreshPlayers,
        refreshMatches,
        refreshBanner,
        refreshSponsor,
        refreshTrophies,
        refreshFeaturedPlayer,
        refreshLeagues,
        refreshNews,
        refreshStarPerformers,
        refreshStandings,
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
