import { render } from '@testing-library/react';
import ReviewsList from './reviews-list';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('ReviewsList', () => {
	const mockAxios = new MockAdapter(axios);
	const mockResponse = {
		reviews: [
			{
				id: 1,
				reviewText: 'Awesome review',
				rating: 5,
				createdOn: '2022-01-01T00:00:00.000Z',
				user: {
					id: 1,
					firstName: 'John',
					lastName: 'Doe',
					email: 'bZKQm@example.com',
				},
				company: {
					id: 1,
					name: 'Company 1',
				},
			},
		],
	};

	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList />);
		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', async () => {
		const mockCountResponse = {
			reviewsCount: 3,
		};
		mockAxios.onGet('/api/reviews/count').reply(200, mockCountResponse);
		mockAxios.onGet('/api/reviews?page=1&limit=20').reply(200, mockResponse);

		const { findAllByTestId } = render(<ReviewsList />);
		const reviewCards = await findAllByTestId('review-card');
		expect(reviewCards.length).toBe(mockResponse.reviews.length);
	});

	it('should display message if no reviews are found', async () => {
		const mockCountResponse = {
			reviewsCount: 0,
		};
		mockAxios.onGet('/api/reviews/count').reply(200, mockCountResponse);
		const { findByText } = render(<ReviewsList />);
		const message = await findByText('Unfortunately, there are no reviews found');
		expect(message).toBeTruthy();
	});

	it('should display the review text if provided', async () => {
		const { findByText } = render(<ReviewsList />);
		const reviewText = await findByText('Awesome review');
		expect(reviewText).toBeTruthy();
	});
});
