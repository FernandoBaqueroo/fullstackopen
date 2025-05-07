import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    if (response.status === 200) {
      console.log("Data fetched successfully:", response.data);
    } else {
      console.error("Failed to fetch data:", response.status);
    }
    return response;
  }
  ).catch((error) => {
    console.error("Error fetching data:", error);
    throw error;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    if (response.status === 201) {
      console.log("Data created successfully:", response.data);
    } else {
      console.error("Failed to create data:", response.status);
    }
    return response;
  }
  ).catch((error) => {
    console.error("Error creating data:", error);
    throw error;
  });
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => {
        if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        } else {
        console.error("Failed to update data:", response.status);
        }
        return response;
    }
    ).catch((error) => {
        console.error("Error updating data:", error);
        throw error;
    });
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(`Person with id ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete person with id ${id}.`);
      }
    })
    .catch((error) => {
      console.error(`Error deleting person with id ${id}:`, error);
      throw error;
    });
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
};
