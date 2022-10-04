import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Character({character, name, image, shuffle, checkClick}) {
    function handleClick() {
        checkClick(character.id);
        shuffle();
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          src={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default Character;