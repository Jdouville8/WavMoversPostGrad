import React, { useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 1200,
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
	avatar: {
		backgroundColor: red[500],
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 204,
		height: 204,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
	type: {
		width: 960,
	},
}));

export default function Details(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const buttonRef = useRef(null);

	const handleFavClick = (e) => {
		e.preventDefault();

		const fav = buttonRef.id;
		axios
			.post('/api/users/favs', {
				favorites: fav,
			})
			.then(console.log('post success'));
	};

	const handlePlayClick = (e) => {
		e.preventDefault();

		let audioSrc = props.audioSrc;

		console.log(audioSrc);

		// const fav = buttonRef.id;
		// axios
		// 	.post('/api/users/favs', {
		// 		favorites: fav,
		// 	})
		// 	.then(console.log('post success'));
	};

	const handleDownload = (e) => {
		// e.preventDefault();
		console.log();
		// const data = file

		// THIS URL MUST CHANGE DYNAMICALLY
		const fileName = props.dlUrl;
		window.location.href =
			'http://localhost:3001/api/files/' + fileName + '.zip';
	};

	return (
		<div>
			<Card
				className={classes.root}
				style={{ marginTop: '15px', marginBottom: '15px' }}
			>
				<Grid container>
					<Grid item>
						<CardMedia
							className={classes.cover}
							image={props.src}
							title={props.title}
						/>
					</Grid>
					<Grid item>
						<CardHeader
							title={props.title}
							subheader={props.artist}
							subheaderTypographyProps={{ color: 'black' }}
						/>
						<CardContent>
							<Typography
								className={classes.type}
								variant="body2"
								color="textSecondary"
								component="p"
							>
								{props.overview}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<IconButton
								aria-label="add to favorites"
								onClick={handleFavClick}
								id={props.key}
								ref={buttonRef}
							>
								<FavoriteIcon />
							</IconButton>
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
							<CardContent className={classes.content}>
								<Typography component="h5" variant="h5">
									{props.trackList}
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{props.artist}
								</Typography>
							</CardContent>
							<div className={classes.controls}>
								<IconButton aria-label="previous">
									{theme.direction === 'rtl' ? (
										<SkipNextIcon />
									) : (
										<SkipPreviousIcon />
									)}
								</IconButton>
								<IconButton aria-label="play/pause" onClick={handlePlayClick}>
									<PlayArrowIcon className={classes.playIcon} />
								</IconButton>
								<IconButton aria-label="next">
									{theme.direction === 'rtl' ? (
										<SkipPreviousIcon />
									) : (
										<SkipNextIcon />
									)}
								</IconButton>
								<IconButton aria-label="Download" onClick={handleDownload}>
									<GetAppIcon />
								</IconButton>
							</div>
						</Collapse>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
