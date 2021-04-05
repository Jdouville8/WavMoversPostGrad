import React, { useState } from 'react';
import {
	Card,
	Typography,
	CardContent,
	makeStyles,
	Button,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { InlineWidget } from 'react-calendly';
import CheckoutContainer from '../components/CheckoutContainer/index';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login';

const useStyles = makeStyles({
	root: {
		marginTop: '19%',
	},
	cardTitle: {
		fontWeight: '20px',
	},
	button: {
		color: '#5e235b',
		margin: 'auto',
		backgroundColor: '#8989fc',
	},
});

function Lessons() {
	const { isAuthenticated } = useAuth0();
	const classes = useStyles();

	const [showItem, setShowItem] = useState(false);

	const [paySuccess, setPaySuccess] = useState({
		success: false,
	});

	const handlePaySuccess = () => {
		setPaySuccess({ success: true });
	};

	if (isAuthenticated) {
		return (
			<div
				style={{
					height: '100vh',
					width: '100%',
				}}
			>
				<Grid container direction="row" alignItems="center" justify="center">
					<Grid
						item
						style={{ height: '700px', width: '25%', minWidth: '500px' }}
					>
						<Card
							className={classes.root}
							variant="outlined"
							style={{ opacity: '.95', boxShadow: '5px 5px 15px #424242' }}
						>
							<CardContent>
								<Typography
									style={{ opacity: '1' }}
									className={classes.cardTitle}
								>
									Are you interested in receiving technical and industry related
									feedback from your favorite artists in the scene?
								</Typography>
								<br />
								<Typography>
									<b>WavMovers</b> offers 1-on-1 lesson scheduling with
									professional artists to give you the tools you need to create.
									Our artists can cover a vast array of topics including: Track
									arrangement, DAW Workflow, Sound design, Mixing, Mastering,
									DJing, Music theory, Track feedback, Industry consulting, and
									Artistic identity guidance
								</Typography>
								<br />
								<Typography>
									WavMovers 1-on-1 lessons will empower you to grow leaps and
									bounds in your musical journey through honing the skills
									needed to get you from the bedroom to the main stage
								</Typography>
								<br />

								{showItem ? (
									<CheckoutContainer />
								) : (
									<div>
										<h3>$30/hr</h3>
										<Button
											className={classes.button}
											onClick={() => setShowItem(true)}
										>
											Purchase a lesson!
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</Grid>
					{paySuccess.success ? (
						<Grid item style={{ width: '60%' }}>
							<InlineWidget
								styles={{
									height: '650px',
								}}
								url="https://calendly.com/backleftmusic"
							/>
						</Grid>
					) : (
						<></>
					)}
				</Grid>
			</div>
		);
	} else return <Login />;
}

export default Lessons;
