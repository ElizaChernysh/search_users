import React from 'react'
import { useAppSelector } from '../../hooks/redux'

export const FavoritesPage = () => {
  const {favorites } =  useAppSelector(state => state.github);

  if (favorites.length === 0) return <p> No items</p>
  return (
    <ul>
      {favorites.map(f => (
        <li key={f}>
          <a href={f} target="_blank" rel="noreferrer">{f}</a>
        </li>
      ))}
    </ul>
  )
}
