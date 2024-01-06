import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Review } from '../../types/review';
import { ReviewCard } from '../review-card/review-card';
import Pagination from '@mui/material/Pagination';
import { ThumbDown } from '@mui/icons-material';

export function ReviewsList() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [totalReviews, setTotalReviews] = useState(0);

	const [page, setPage] = useState(1);
	const reviewsPerPage = 20;

	useEffect(() => {
		async function fetchReviews() {
			const response = await axios.get(`/api/reviews?page=${page}&limit=${reviewsPerPage}`);
			setReviews(response.data.reviews);
		}

		fetchReviews().catch(console.error);
	}, [page, reviewsPerPage]);

	useEffect(() => {
		async function fetchTotalReviews() {
			const response = await axios.get('/api/reviews/count');
			setTotalReviews(response.data.reviewsCount);
		}

		fetchTotalReviews().catch(console.error);
	}, []);

	const totalPages = Math.ceil(totalReviews / reviewsPerPage);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<div>
			{reviews.length > 0 ? (
				<>
					{reviews.map((review) => (
						<div key={review.id} data-testid="review-card" style={{ marginBottom: '1rem' }}>
							<ReviewCard {...review} />
						</div>
					))}

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Pagination count={totalPages} page={page} onChange={handlePageChange} />
					</div>
				</>
			) : (
				<div style={{ textAlign: 'center', marginTop: '4rem' }}>
					<div>
						<ThumbDown style={{ fontSize: '5rem' }} />
						<p style={{ fontSize: '1.5rem' }}>Unfortunately, there are no reviews found</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default ReviewsList;
