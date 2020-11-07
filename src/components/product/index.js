import { h } from 'preact';
import clsx from 'clsx';
import { Button,
    Card,
    CardActions,
    CardContent, 
    CardHeader, 
    CardMedia,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import style from './style';
import { useState } from 'preact/hooks';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

const Product = ({item, addItem}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [selectedVariant, setVariant] = useState(item.item_data.variations[0].item_variation_data.sku);
    const [quantity, setQuantity] = useState(1); //Todo get from max stock

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleAddToCart = (_ev) => {
       
      const {name} = item.item_data;
      const product = {
        name,
      };

      // if item has variations get selected variant
      if (item.item_data.variations.length > 0) {
        // filter product variations for price
        const variantDetails = item.item_data.variations.filter(_item => _item.item_variation_data.sku == selectedVariant);
        console.log(variantDetails);
        const {amount} = variantDetails[0].item_variation_data.price_money;

        product.sku = selectedVariant;
        product.amount = amount;

        addItem(product);
        return;
      }

      // Todo: do same process for non-variant product
      addItem(item);
    }

    const handleChange = (_ev) => {
      console.log('handling change', _ev.target)
      setVariant(_ev.target.value);
    }

    const GetVariations = (_itemData) => {
      console.log(_itemData.variations)
      return _itemData.variations.map(_item => (<MenuItem value={_item.item_variation_data.sku}>{_item.item_variation_data.name} - £{_item.item_variation_data.price_money.amount / 100} </MenuItem>) )
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={item.item_data.name} />
            <CardMedia className={classes.media}
                image={item.imagePath}
                title={item.item_data.name} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.item_data.description}
                </Typography>
                <FormControl variant="outlined">
                  <Select id={`${item.item_data.name}-variations`} value={selectedVariant} labelId={`${item.item_data.name}-variation`} onChange={handleChange}>
                    {GetVariations(item.item_data)}
                  </Select>
                </FormControl>
            </CardContent>
            <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )
}

Product.propTypes = {
    item: PropTypes.object.isRequired
}

export default Product;