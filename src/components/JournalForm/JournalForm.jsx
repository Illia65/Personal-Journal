import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer } from "react";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import { useRef } from "react";
import cn from "classnames";
import Input from "../Input/Input";

//INITIAL_STATE начальное состояние
function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || isValid.post || isValid.title) {
      focusError(isValid);
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
      onSubmit(values);
      dispatchForm({ type: "CLEAR-FORM" });
    }
  }, [isFormReadyToSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET-VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault(); //что бы не было дефолтной перезагрузки страницы
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData); //Разобрать 16/15 строку
    dispatchForm({ type: "SUBMIT", payload: formProps });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <Input
          appearance={"title"}
          type="text"
          ref={titleRef}
          isValid={isValid.title}
          onChange={onChange}
          value={values.title}
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
        <Input
          ref={dateRef}
          isValid={isValid.date}
          type="date"
          onChange={onChange}
          value={values.date}
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
        <Input
          type="text"
          onChange={onChange}
          value={values.tag}
          name="tag"
          id="tag"
          className={styles["input"]}
        />
      </div>

      <textarea
        name="post"
        ref={postRef}
        value={values.post}
        onChange={onChange}
        cols="30"
        rows="10"
        placeholder="Enter your text"
        className={`${styles["input"]} ${
          isValid.post ? "" : styles["invalid"]
        }`}
      ></textarea>

      <Button text="Save" />
    </form>
  );
}

export default JournalForm;
