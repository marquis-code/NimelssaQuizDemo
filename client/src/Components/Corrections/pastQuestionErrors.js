export const setPastQuestionErrors = (question, category, answer) => {
    const errors = {};
    errors.question = question? "" : "Question Field cannot be empty"
    errors.category = category? "" : "Question category Field cannot be empty"
    errors.answer =  answer? "" : "Answer Field cannot be empty"
    return errors; 
}
