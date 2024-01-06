interface Company {
	id: string;
	name: string;
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface Review {
	id: string;
	reviewerId: string;
	companyId: string;
	reviewText: string;
	rating: number;
	createdOn: string;
	company: Company;
	user: User;
}
