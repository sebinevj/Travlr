const handleError = (res) => {
    if(!res.ok) {
      let error = new Error(res.statusText);
      error.status = res.status;
      throw error;
    }
    return res;
  };
  
  export default {
    get: (url) => {
      return fetch(url, {
        credentials: 'include',
        headers: {
        }
      }).then(handleError).then(res => {
        return res.json();
      });
    },
  
    post: (url, data) => {
      console.log(data);
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(handleError).then(res => {
        return res.json();
      });
    },
  
    put: (url, data) => {
      return fetch(url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(handleError).then(res => {
        return res.json();
      });
  
    },
  
    delete: (url) => {
      return fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {}
      }).then(handleError).then(res => {
        return res.json();
      });
    },
  
  };