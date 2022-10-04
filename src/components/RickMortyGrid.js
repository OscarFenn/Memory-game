import Character from "../components/RickMorty";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function RickMortyGrid({character, shuffle, checkClick}) {
    return (
      <Container maxWidth="lg">
<Grid sx={{ flexGrow: 1 }} container spacing={2} >
        
        {character.map((c) => {
        return (
          <Grid item xs={3}>
          <Character
          key={c.id}
          character={c}
          name={c.name}
          image={c.image}
          shuffle={shuffle}
          checkClick={checkClick} 
          />
          </Grid>
          );
        })}
        
      </Grid>
      </Container>
    );
}

export default RickMortyGrid;