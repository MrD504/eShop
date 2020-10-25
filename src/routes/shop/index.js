import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style';

const Shop = (props) => {
    const [products, SetProducts] = useState([]);
	/**
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */

	useEffect(() => {
		if (window !== undefined && window.location.href.includes('#invite_token')) {
			const { href } = window.location;
            window.location.href= `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`;
        }

    fetch(".netlify/functions/getproducts")
        .then((_res) => {
            console.log(products);
            SetProducts(products.objects);
        })
    },[]);

    return (
        <div class={style.home}>
            Shop
            <ul>
                {products && products.map(product => {
                    return <li>product.item_data.name</li>;
                })}
            </ul>
        </div>
    )
}

export default Shop;