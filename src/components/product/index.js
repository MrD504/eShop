import { h } from 'preact';
import style from './style';

const Product = ({item}) => {
    return (
        <article>
            <h3>{item.item_data.name}</h3>
            {InlineImage(item.item_data.description, item.item_data.name, item.imagePath) }
            <p>{item.item_data.description}</p>
        </article>
    )
}
function InlineImage(alt, title, src) {
	return (
		<div class={style.inlineImageContainer}>
			<img class={style.inlineImage} src={src} alt={alt} />
			{title && <span class={style.inlineImageTitle}>{title}</span>}
		</div>
	);
}


export default Product;