import React, { useEffect, useState } from "react";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../../store/github/github.api";
import "./HomePage.css";
import { useDebounce } from "../../hooks/debounce";
import { RepoCard } from "../../components/Navigation/RepoCard/RepoCard";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: isReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="HomePage">
      {isError && <p className="HomePage__error">Something went wrong</p>}

      <div className="HomePage__search">
        <input
          type="text"
          className="HomePage__input"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className="HomePage__drop">
            {isLoading && <p className="Drop__loading">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                className="Drop__user"
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {isReposLoading && <p> Repos are loading</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
