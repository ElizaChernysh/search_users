import React, { useState } from "react";
import "./RepoCard.css";
import { IRepo } from "../../../models/models";
import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";

export const RepoCard = ({ repo }: { repo: IRepo }) => {

  const {addFavorite, removeFavorite} = useActions();
  const {favorites} = useAppSelector(state => state.github);

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));
  
  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    addFavorite(repo.html_url)
    setIsFav(true)
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    removeFavorite(repo.html_url);
    setIsFav(false);
  }

  return (
    <div className="RepoCard">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="RepoCard__title">{repo.full_name}</h2>
        <p>
          Forks: <span>{repo.forks}</span>
          Watchers:<span>{repo.watchers}</span>
        </p>
        <p>{repo?.description}</p>
      </a>
      {!isFav && <button className="RepoCard__button"
       onClick={addToFavorite}>
        Add
      </button>}

      {isFav && <button className="RepoCard__button"
       onClick={removeFromFavorite}>
        Delete
      </button>}
    </div>
  );
};
