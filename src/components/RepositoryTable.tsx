import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import useRepository from "../hooks/useRepository";
import { IRepositoryList } from "../types/repositoryTypes";

const columns: GridColDef[] = [
	{
		field: "owner",
		headerName: "Owner Profile",
		width: 120,
		sortable: false,
		renderCell: (e) => (
			<>
				<img
					width="50"
					src={e.row.owner.avatar_url}
					alt={e.row.owner.avatar_url}
				/>
			</>
		),
	},
	{ field: "name", headerName: "Repository Name", width: 250, sortable: false },

	{ field: "language", headerName: "Language", width: 130, sortable: false },
	{ field: "forks", headerName: "Fork", width: 120 },
	{
		field: "url",
		headerName: "Repository URL",
		sortable: false,
		width: 500,
		renderCell: (e) => (
			<>
				<a target="_blank" href={e.row.url}>
					{e.row.url}
				</a>
			</>
		),
	},
];

const AppStyledProvider = styled.div`
	height: 650px;
	width: 90%;
	margin: auto;
`;
const StyledTextField = styled(TextField)`
	margin: 10px 0;
	width: 30%;
`;


function RepositoryTable() {
	const [searchWord, setSearchWord] = useState<string>("");
	const repositoryList = useRepository();

	const globalSearch = (): IRepositoryList[] => {
		const filteredRepositories = repositoryList.filter((value) => {
			return (
				value?.name?.toLowerCase().includes(searchWord?.toLowerCase()) ||
				value?.language?.toLowerCase().includes(searchWord?.toLowerCase()) ||
				value?.forks?.toString().includes(searchWord?.toLowerCase())
			);
		});
		return filteredRepositories;
	};

	const filterRepositoryList: IRepositoryList[] | [] = searchWord
		? globalSearch()
		: repositoryList;

	return (
		<AppStyledProvider>
			<h2>Repository List </h2>
			<StyledTextField
				value={searchWord}
				onChange={(event) => setSearchWord(event.target.value)}
				label="Search Repositories"
				variant="outlined"
			/>
			<DataGrid
				rows={filterRepositoryList && filterRepositoryList}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[5]}
			/>
		</AppStyledProvider>
	);
}

export default RepositoryTable;
