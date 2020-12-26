
export default {
    signin: (formData) => {
      return fetch("/users/signin", {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status !== 401) return res.json({message: {msgBody : "Login was successful"}, msgError : false}).then((data) => data);
        else return { isAuthenticated: false, user: { matric: "", role: "" } };
      });
    },
    signup: (formData) => {
      return fetch("/users/signup", {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.status !== 401) return res.json({message: {msgBody : "Signup was successful"}, msgError : false}).then((data) => data);
        else return { isAuthenticated: false, user: { matric: "", role: "" } };
      });
    }
  }; 
