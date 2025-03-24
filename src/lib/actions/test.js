export const getTestByGroup = async ({groupId,token}) => {
    try {
        const response = await fetch(`http://26.207.100.35:9090/test/all/byGroup/${groupId}`,{
            method: "GET",
            headers: { 
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();

        return response.ok 
            ? { success: true, data }
            : { success: false, error: data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : error };
    }
};
export const createTest = async ({ question, groupId})=> {
    try {
      const formdata = new FormData();
      formdata.append("question", question);
      formdata.append("groupId", groupId);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };

      const data = await fetch("http://26.207.100.35:9090/test/create", requestOptions)
      .then((response) =>{
        return response.text()
      })
      .then((response) =>{
        return JSON.parse(response)
      })
      if (!data.success) {
        throw new Error(data?.message || "Failed to create test");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  };
export const updateTest = async ({ question, groupId,testId})=> {
    try {
      const formdata = new FormData();
      formdata.append("question", question);
      formdata.append("groupId", groupId);

      const requestOptions = {
        method: "PUT",
        body: formdata,
        redirect: "follow"
      };

      const data = await fetch(`http://26.207.100.35:9090/test/update/${testId}`, requestOptions)
      .then((response) =>{
        return response.text()
      })
      .then((response) =>{
        return JSON.parse(response)
      })
      if (!data.success) {
        throw new Error(data?.message || "Failed to create test");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  };
export const delTest = async ({ testId})=> {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };

      const data = await fetch(`http://26.207.100.35:9090/test/delete/${testId}`, requestOptions)
      .then((response) =>{
        return response.text()
      })
      .then((response) =>{
        return JSON.parse(response)
      })
      if (!data.success) {
        throw new Error(data?.message || "Failed to create test");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  };
