import passport from "passport";

export const setErrors = (username, matric, password, role, email, confirmPassword) => {
    const errors = {};
    errors.username = username? "" : "Username Field cannot be empty"
    errors.matric = matric? "" : "Matric Field cannot be empty"
    errors.password =  password? "" : "Password Field cannot be empty"
    errors.role =  role? "" : "Role cannot be empty"
    errors.email =  email? "" : "Email Field cannot be empty"
    errors.confirmPassword =  confirmPassword? "" : "Confirm Field cannot be empty"
    return errors; 
}
