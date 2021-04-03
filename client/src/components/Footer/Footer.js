import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useEffect, useState } from 'react';
import { BottomNavigation, Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = {
	root: {
		flexGrow: 1,
	},
};

function Footer(props) {
	const classes = useStyles;

	return (
		<footer
			container
			style={{
				position: 'sticky',
				bottom: 0,
			}}
			className={classes.root}
		>
			<div>
				<AudioPlayer
					src={props.audioSrc}
					onPlay={(e) => console.log('onPlay')}
					style={{
						width: '33%',
						backgroundColor: `rgba(0,0,0,0.5)`,
						borderRadius: '10px',
						margin: 'auto',
					}}
				/>
			</div>
		</footer>
	);
}

export default Footer;
