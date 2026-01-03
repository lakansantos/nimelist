"use client";

import React, {createContext, useContext} from "react";
import {Anime, Genres} from "@app-types/anime";

type DetailsContextType = {
  anime: Anime | null;
  genres: Genres[] | null;
};

const DetailsContext = createContext<DetailsContextType | undefined>(undefined);

export const DetailsProvider = ({
  anime,
  genres,
  children,
}: {
  anime: Anime | null;
  genres: Genres[] | null;
  children: React.ReactNode;
}) => {
  return (
    <DetailsContext.Provider value={{anime, genres}}>
      {children}
    </DetailsContext.Provider>
  );
};

export const useDetails = () => {
  const context = useContext(DetailsContext);

  if (!context) {
    throw new Error("useDetails must be used within a DetailsProvider");
  }

  return context;
};
