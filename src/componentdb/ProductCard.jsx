import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    '&:hover': {
      boxShadow: '0px 5px 10px 5px rgba(0,0,0,0.3) ',
    },
  },
});

export default function ProductCard(props) {
  const classes = useStyles();
  const { image, name, caption, price, stock } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="320"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          {
            <Typography gutterBottom variant="h6" component="h2">
              Rp{price.toLocaleString()}
            </Typography>
          }
          <Typography variant="body2" color="textSecondary" component="p">
            {caption}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button variant="contained" size="small" color="primary">
          Buy
        </Button>
      </CardActions> */}
    </Card>
  );
}
