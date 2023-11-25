export const INITIAL_STATE = {
  isValid: {
    post: true,
    title: true,
    date: true,
  },

  //форма валидна  (вверху )
  values: {
    post: "",
    title: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};
//значениея не заданы
//values значения

export function formReducer(state, action) {
  switch (action.type) {
    case "CLEAN-FROM":
        return { ...state,isValid: INITIAL_STATE.isValid };
    case "RESET-VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
   
    case "SUBMIT": {
      const titleValidity = action.payload.title?.trim().length;
      const postValidity = action.payload.post?.trim().length;
      const dateValidity = action.payload.date;
      return {
        values: action.payload,
        isValid: {
          post: postValidity,
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: titleValidity && postValidity && dateValidity,
      };
    }
  }
}

//state предадущее состояние
//action то что надо сделать
