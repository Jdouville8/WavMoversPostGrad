import React, { useState } from 'react';
import './App.css';
import PlayerContext from './utils/PlayerContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import NavBar from './components/navBar/NavBar.js';
import Landing from './pages/Landing';
import FileSubmit from './pages/fileSubmit';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Education from './pages/EducationalResources';
import Footer from './components/Footer/Footer';
import UserProfile from './pages/userProfile';
import Background from './images/wallpaper.jpg';
import NoMatch from './pages/NoMatch';
import Lessons from './pages/Lessons';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IbyXTGpEScSSzwXh44D5mrHcdtU3kD902kW87kXDu1RIkJco8MEujFZtgG0C49nFMIODD1QWWOYdkgmF8VbtnR400lPNyG32Q');

function App() {

	const [src, setSrc] = useState({
		audioSrc: '',
	});

	const handlePlayClick = (str) => {
		setSrc({ audioSrc: str });
	};

	return (
		<Elements stripe={stripePromise}>
		<PlayerContext.Provider value={handlePlayClick}>
			<Router>
				<div
					style={{
						backgroundImage: `url(${Background})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						backgroundAttachment: 'fixed',
					}}
				>
					<NavBar />
					<Switch>
						<Route exact path={'/search'}>
							<Search />
						</Route>
						<Route exact path={['/', '/landing']}>
							<Landing />
						</Route>
						<Route exact path={'/upload'}>
							<FileSubmit />
						</Route>
						<Route exact path={'/login'}>
							<Login />
						</Route>
						<Route exact path={'/signup'}>
							<Signup />
						</Route>
						<Route exact path={'/home'}>
							<Home />
						</Route>
						<Route exact path={'/lessons'}>
							<Lessons />
						</Route>
						<Route exact path={'/education'}>
							<Education />
						</Route>
						<Route>
							<NoMatch />
						</Route>
					</Switch>
					<Footer audioSrc={src.audioSrc} />
				</div>
			</Router>
		</PlayerContext.Provider>
		</Elements>
	);
}

export default App;
