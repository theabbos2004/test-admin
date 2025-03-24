export const createGroup = async ({ token, name, creatorId,testTime }) => {
    try {
        const createGroupRes = await fetch("http://26.207.100.35:9090/group/create", {
            method: "POST",
            headers: { 
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                creatorId,
                testTime
            })
        });

        const data = await createGroupRes.json();

        return createGroupRes.ok 
            ? { success: true, data }
            : { success: false, error: data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};
export const getGroupAll = async ({token}) => {
    try {
        const createGroupRes = await fetch("http://26.207.100.35:9090/group/getAll", {
            method: "GET",
            headers: { 
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await createGroupRes.json();

        return createGroupRes.ok 
            ? { success: true, data }
            : { success: false, error: data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};

export const getGroupByUserId = async ({token,user}) => {
    try {
        const createGroupRes = await fetch(`http://26.207.100.35:9090/group/getAll/${user?.id}`, {
            method: "GET",
            headers: { 
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await createGroupRes.json();

        return createGroupRes.ok 
            ? { success: true, data }
            : { success: false, error: data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};
export const updateGroup = async ({ token, name ,groupId,creatorId}) => {
    try {
        const createGroupRes = await fetch(`http://26.207.100.35:9090/group/update/${groupId}`, {
            method: "PUT",
            headers: { 
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                creatorId
            })
        });

        const data = await createGroupRes.json();

        return createGroupRes.ok 
            ? { success: true, data }
            : { success: false, error: data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};
export const delGroup = async ({ groupId}) => {
    try {
        const createGroupRes = await fetch(`http://26.207.100.35:9090/group/delete/${groupId}`, {
            method: "DELETE",
            headers: { 
                "Accept": "*/*"
            }
        });

        const data = await createGroupRes.json();

        return createGroupRes.ok 
            ? { success: true, data }
            : { success: false, error: data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};