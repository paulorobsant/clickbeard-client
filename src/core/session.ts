export const getAccessToken = (): string | null => {
	return localStorage.getItem('accessToken');
};

export const doLogoutStorage = () => {
	localStorage.removeItem('accessToken');
};
