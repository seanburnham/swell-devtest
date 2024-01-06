import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviewsCount() {
		return this.prisma.review.count();
	}

	getAllReviews(page: number, limit: number) {
		const skip = (page - 1) * limit;

		return this.prisma.review.findMany({
			include: {
				company: true,
				user: true,
			},
			orderBy: {
				createdOn: 'desc',
			},
			take: limit,
			skip,
		});
	}
}
