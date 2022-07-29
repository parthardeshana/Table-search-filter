import axios from "axios";
import { useEffect, useState } from "react";
import { IRepositoryList } from "../types/repositoryTypes";

const useRepository = (): IRepositoryList[] => {
	const [repositoryList, setRepositoryList] = useState<IRepositoryList[]>([]);

	const url = "https://api.github.com/search/repositories";
	const queryParams = "facebook/react";

	const getRepositories = (): Promise<any> => {
		return axios.get(`${url}?q=${queryParams}`);
	};

	useEffect(() => {
		getRepositories()
			.then((e) => setRepositoryList(e.data.items))
			.catch((err) => console.log(err));
	}, []);

	return repositoryList;
};

export default useRepository;
