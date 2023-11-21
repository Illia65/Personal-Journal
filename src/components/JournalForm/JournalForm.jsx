import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    post: true,
    date: true,
  }); //(валидация формы)

  const addJournalItem = (e) => {
    e.preventDefault(); //что бы не было дефолтной перезагрузки страницы
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData); //Разобрать 16/15 строку
    let isFormValid = true;
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }

    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, post: true }));
    }

    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={`${styles["input-title"]} ${
            formValidState.title ? "" : styles["invalid"]
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
            formValidState.date ? "" : styles["invalid"]
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
          formValidState.post ? "" : styles["invalid"]
        }`} //динамическая стилизация класом
      ></textarea>

      <Button text="Save" />
    </form>
  );
}

export default JournalForm;
