import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<Link href="/"><h1>Jane Doe</h1></Link>
		<nav>
			<Link activeClassName={style.active} href="/blogs">Blogs</Link>
			<Link activeClassName={style.active} href="/contact">Contact me</Link>
			<Link activeClassName={style.active} href="/shop">Shop</Link>
			<Link activeClassName={style.active} href="/payment">Payment</Link>
		</nav>
	</header>
);

export default Header;
