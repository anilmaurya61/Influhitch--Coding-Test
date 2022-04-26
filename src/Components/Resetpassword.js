import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import './Resetpassword.css'

export default function Resetpassword(){
	return (
		<Container component="main" maxWidth="xs">
			<div className="paper">
                <div className="heder">
                <Avatar className="avatar"></Avatar>
				<Typography component="h1" variant="h5">
					Forget password
				</Typography>
                </div>
				
				<form className="form" noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className="c-submit"
					>
						Send Link
					</Button>
					<Grid container>
						<Link component={RouterLink} to="/" variant="body2">
							{"Back to Sign In"}
						</Link>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<p>Copyright</p>
			</Box>
		</Container>
	);
}
