export const setErrors = (question, category, optionA, optionB, optionC, optionD, answer) => {
    const errors = {};
    errors.question = question? "" : "Question Field cannot be empty"
    errors.category = category? "" : "Question category Field cannot be empty"
    errors.optionA =  optionA? "" : "Option A Field cannot be empty"
    errors.optionB =  optionB? "" : "Option B Field cannot be empty"
    errors.optionC =  optionC? "" : "Option C Field cannot be empty"
    errors.optionD =  optionD? "" : "Option D Field cannot be empty"
    errors.answer =  answer? "" : "Answer Field cannot be empty"
    return errors; 
}
