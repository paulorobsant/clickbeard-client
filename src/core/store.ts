export const getStore = () => {
	return JSON.parse(localStorage.getItem('persist:root') as string);
};
