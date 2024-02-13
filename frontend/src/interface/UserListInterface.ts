export interface UserList {
	userName: string;
}

export interface UserData {
	memberId: string;
	email: string;
	username: string;
}

interface UserDataProps {
	username: string | undefined;
	isLoading: boolean;
	isError: boolean;
}
