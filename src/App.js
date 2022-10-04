import React, { useEffect, useState } from "react";
import RickMortyGrid from "./components/RickMortyGrid";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
const [score, setScore] = useState({ currentScore: 0, highScore: 0});
const [character, setCharacter] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetchCharacter();
}, []);

const fetchCharacter = async () => {
  const api = await fetch("https://rickandmortyapi.com/api/character");
  const resapi = await api.json();
  const randomCharacter = [];
  const allCharacters = resapi.results;
  for (let i = 0; i < 10; i++) {
    randomCharacter.push(
      allCharacters.splice(Math.floor(Math.random() * allCharacters.length), 1)
    );
  }
  getCharacter(randomCharacter);
};

const getCharacter = async (randomCharacter) => {
  const characterList = [];
  for (let i = 0; i < randomCharacter.length; i++){
    const characterURL = randomCharacter[i][0].url;
    const response = await fetch(characterURL);
    const character = await response.json();
    const id = character.id;
    const name = character.name[0].toUpperCase() + character.name.substring(1);
    const image = character.image;
    characterList.push({id, name, image});

  }
setCharacter(characterList);
setLoading(false);

};

useEffect(() => {
  if (score.currentScore > score.highScore) {
    setScore((current) => {
      return {
        ...current,
        highScore: score.currentScore,
      };
    });
  }
}, [score]);

useEffect(() => {
  if (score.highScore === 10) {
    setLoading(true);
    newGame();
  }

}, [score.highScore]);

function checkClick(id) {
  const characterList = [...character];
  const target = characterList.find((c) => c.id === id);
  if (target.clicked === true) {
    gameOver();
  } else {
    target.clicked = true;
    setCharacter(characterList);
    setScore((current) => {
      return {
        ...current,
        currentScore: score.currentScore + 1,
      };
    });
  }
}

function shuffle() {
  const characterList = [...character];
  for (let i = characterList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); 

    [characterList[i], characterList[j]] = [characterList[j], characterList[i]];
  }
  setCharacter(characterList);
}

function newGame() {
  alert("Congrats! You won!");
  fetchCharacter();
  setScore(() => {
    return {
      currentScore: 0,
      highScore: 0,
    };
  });
}



function gameOver() {
  alert("Game Over! You lose!");
  const characterList = [...character];
  characterList.map((c) => (c.clicked = false));
  setCharacter(characterList);
  setScore((current) => {
    return {
      ...current,
      currentScore: 0,
    };
  });
}

  return (
    <div className="App">
      <header>
      <h1>Rick and Morty Memory Game</h1>
        <div>
          <div>Memorize and Click each character only once!</div>
          <div>
            <p>Score: {score.currentScore}</p>
            <p>High Score: {score.highScore}</p>
          </div>
        </div>
      </header>
      {loading ? (
        <CircularProgress />
      ) : (
        <RickMortyGrid
          character={character}
          shuffle={shuffle}
          checkClick={checkClick}
        />
      )}
    </div>
  );
}

export default App;
