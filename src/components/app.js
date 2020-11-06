import { h, Component } from 'preact';
import { Provider as PreduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';
import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Blogs from '../routes/blogs';
import Blog from '../routes/blog';
import Contact from '../routes/contact';
import ContactSuccess from '../routes/contact-success';
import Shop from '../routes/shop';
import PaymentForm from '../routes/payment';
import NotFoundPage from '../routes/notfound';
import rootReducer from '../reducers/rootReducer';

const store = configureStore({
	reducer: rootReducer
});

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render(props) {
		return (
			<Provider value={props}>
				<div id="app">
					<PreduxProvider store={store}>
						<Header />
						<Router onChange={this.handleRoute}>
							<Home path="/" />
							<Blogs path="/blogs/" />
							<Blog path="/blog/:name" />
							<Contact path="/contact/" />
							<ContactSuccess path="/contact/success" />
							<Shop path="/shop/" />
							<PaymentForm path="/payment" />
							<NotFoundPage type="404" default />
						</Router>
					</PreduxProvider>
				</div>
			</Provider>
		);
	}
}
