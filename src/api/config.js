import allaxios from "./axios";

export const post = async (url, data, headers = {}) => {
    console.log(headers.token);
    
  try {
    const response = await allaxios.post(url, data, {
      headers: {
        Authorization: `Bearer ${headers.token}`,
        ...headers, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

// export const post = (api, data, header) => {
//     return new Promise((resolve, reject) => {
//       allaxios({ headers: header?header:{ "Content-Type": "multipart/form-data" }})
//         .post(api, data)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           console.error("err ", err);
//           reject(err);
//         });
//     });
//   };

export const get = async (url, headers = {}) => {
  try {
    const response = await allaxios.get(url, {
      headers: {
        Authorization: `Bearer ${headers.token}`,
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const put = async (url, data, headers = {}) => {
  try {
    const response = await allaxios.put(url, data, {
      headers: {
        Authorization: `Bearer ${headers.token}`,
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

export const patch = async (url, data, headers = {}) => {
  try {
    const response = await allaxios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${headers.token}`,
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("PATCH request error:", error);
    throw error;
  }
};

export const deleteRequest = async (url, headers = {}) => {
  try {
    const response = await allaxios.delete(url, {
      headers: {
        Authorization: `Bearer ${headers.token}`,
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};
