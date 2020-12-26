export const complainErrors = (level, matric, complain) => {
    const errors = {};
    errors.level = level? "" : "Level Field cannot be empty"
    errors.matric = matric? "" : "Matric Field cannot be empty"
    errors.complain =  complain? "" : "Complain Field cannot be empty"

    return errors; 
}
