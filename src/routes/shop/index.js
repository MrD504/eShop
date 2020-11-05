import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Product from '../../components/product';
import style from './style';

const Shop = (_props) => {
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
    
        // Get all products and images
        fetch("/.netlify/functions/getproducts")
        .then(async(_res) => {
            if (!_res.ok) {
                console.error(`failed to get products ${_res}`)
                return;
            }
            const formattedResult = await _res.json();
            const prods = formattedResult.result.objects.filter(_item => _item.type === "ITEM");
            const images = formattedResult.result.objects.filter(_item => _item.type === "IMAGE");
            const prodsWithImg = prods.map(_item => {

                // Get image that matches product
                const imagePath = images.filter(_img => _item.image_id === _img.id)
                _item.imagePath = imagePath[0].image_data.url;
                return _item;
            })
            SetProducts(prodsWithImg);
        })

        // Get all imagepaths
    },[]);

    return (
        <div class={style.home}>
            Shop
            <ul>
                {products && products.map(product => {
                    return <Product item={product} />
                })}
            </ul>
        </div>
    )
}

export default Shop;