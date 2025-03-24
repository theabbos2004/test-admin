export const createOption = async ({ optionText, testId,correct})=> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "optionText": optionText,
        "testId": testId,
        "correct": correct || false
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      const data=await fetch("http://26.207.100.35:9090/options/create", requestOptions)
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

  export const updateOption = async ({ optionText, testId,optionId,correct})=> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "optionText": optionText,
        "testId": testId,
        "correct": correct
      });
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      const data=await fetch(`http://26.207.100.35:9090/options/update/id/${optionId}`, requestOptions)
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
