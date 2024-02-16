export interface UserList {
	username: string;
	roomName: string;
}

export interface UserData {
	memberId: string;
	email: string;
	username: string;
}

export interface UserDataProps {
	username: string | undefined;
	isLoading: boolean;
	isError: boolean;
}
