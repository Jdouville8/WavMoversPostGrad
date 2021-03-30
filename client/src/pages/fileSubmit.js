import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
	card: {
		width: 300,
		height: 180,
	},
}));

export default function FileSubmit() {
	const classes = useStyles();

	const [file, setFile] = useState("");

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	const log = () => {
		console.log(file);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		
		fetch('/api/files', {
		  method: 'POST',
		  body: data,
		});
	};

	return (
		<div
			style={{
				position: "absolute",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
			}}>
			<Card
				className={classes.card}
				spacing={0}
				align="center"
				justify="center"
				p={2}>
				<CardActions>
					<form
						className={classes.root}
						noValidate
						autoComplete="off"
						onSubmit={onSubmit}>
						<label>Please choose a File</label>
						<br />
						<TextField name="upload-audio" type="file" onChange={onChange} />
						<Button
							variant="contained"
							color="primary"
							value="Upload"
							onClick={onSubmit}>
							Submit
						</Button>
					</form>
				</CardActions>
			</Card>
		</div>
	);
}
