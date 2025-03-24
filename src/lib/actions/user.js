export const getUser = async ({usename,password}) => {
    try {
        const response = await fetch(`http://26.207.100.35:9090/user/login?username=${usename}&password=${password}`);

        if (!response.ok) {
            throw new Error(`Server xatosi: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // JSON formatga o‘tkazish
        return { success: true, data };
    } 
    catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};
