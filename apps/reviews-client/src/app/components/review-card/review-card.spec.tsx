import { render } from '@testing-library/react';
import { ReviewCard } from './review-card';

describe('ReviewCard', () => {
	const testUser = {
		id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'bZKQm@example.com',
	};

	const testCompany = {
		id: '1',
		name: 'Company 1',
	};

	it('should render successfully', () => {
		const { baseElement } = render(
			<ReviewCard
				id={'123'}
				reviewerId={'123'}
				companyId={'123'}
				reviewText={'Test Review Text'}
				rating={0}
				createdOn={'2022-01-01T00:00:00.000Z'}
				company={testCompany}
				user={testUser}
			/>,
		);
		expect(baseElement).toBeTruthy();
	});
});
