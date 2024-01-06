import { Card, CardContent, Grid, Rating, Typography } from '@mui/material';
import { Review } from '../../types/review';

export function ReviewCard(props: Review) {
	const {
		createdOn,
		reviewText,
		rating,
		user: { email: userEmail, firstName, lastName },
		company: { name: companyName },
	} = props;

	return (
		<Card>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<Typography variant="subtitle1">
							Name: {firstName} {lastName}
						</Typography>
						<Typography variant="subtitle1">Email: {userEmail}</Typography>
						<Typography variant="subtitle1">Company: {companyName}</Typography>
					</Grid>
					<Grid item xs={12} md={9} style={{ paddingLeft: '1rem' }}>
						<Typography component="legend">
							{new Date(createdOn).toLocaleDateString(undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								weekday: 'long',
							})}
						</Typography>
						<Rating name="simple-controlled" value={rating} />
						<Typography variant="body1">{reviewText}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
