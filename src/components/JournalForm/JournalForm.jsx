import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, } from "react";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";


//INITIAL_STATE начальное состояние
function JournalForm({ onSubmit }) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || isValid.post || isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET-VALIDITY" });
      }, 2000);
    }
  
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);
  

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit( values);
    }
  }, [isFormReadyToSubmit]);

  const addJournalItem = (e) => {
    e.preventDefault(); //что бы не было дефолтной перезагрузки страницы
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData); //Разобрать 16/15 строку
    dispatchForm({ type: "SUBMIT", payload: formProps });
    
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={`${styles["input-title"]} ${
            isValid.title ? "" : styles["invalid"]
          }`}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-labels"]}>
          <img src="calendar.svg" alt="icon-calendar" />
          <span>Date</span>
        </label>
        <input
          type="date"
          name="date"
          id=""
          className={`${styles["input"]} ${
            isValid.date ? "" : styles["invalid"]
          }`}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-labels"]}>
          <img src="folder.svg" alt="icon-folder" />
          <span>Marks</span>
        </label>
        <input type="text" name="tag" id="tag" className={styles["input"]} />
      </div>

      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        placeholder="Enter your text"
        className={`${styles["input"]} ${
          isValid.post ? "" : styles["invalid"]
        }`} //динамическая стилизация класом
      ></textarea>

      <Button text="Save" />
    </form>
  );
}

export default JournalForm;
