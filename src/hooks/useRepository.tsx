import axios from "axios";
import { useEffect, useState } from "react";

interface IRepositoryList {
	name: string;
	forks: number;
	language: string;
	owner: {
		avatar_url: string;
		url: string;
	};
}

const useRepository = (): IRepositoryList[] => {
	const [repositoryList, setRepositoryList] = useState<IRepositoryList[]>([]);

	const getRepositories = (): Promise<any> => {
		return axios.get(
			"https://api.github.com/search/repositories?q=facebook/react"
		);
	};

	useEffect(() => {
		getRepositories()
			.then((e) => setRepositoryList(e.data.items))
			.catch((err) => console.log(err));
	}, []);

	return repositoryList;
};

export default useRepository;
