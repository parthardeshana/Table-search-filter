export interface IRepositoryList {
	name: string;
	forks: number;
	language: string;
	owner: {
		avatar_url: string;
		url: string;
	};
}
