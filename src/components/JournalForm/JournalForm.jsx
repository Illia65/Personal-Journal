import "./JournalForm.css";
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
    <form className="journal-form" onSubmit={addJournalItem}>
      <input
        type="text"
        name="title"
        className={`input ${formValidState.title ? "" : "invalid"}`}
      />
      <input
        type="date"
        name="date"
        className={`input ${formValidState.date ? "" : "invalid"}`}
      />
      <input type="text" name="tag" />
      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        placeholder="Enter your text"
        className={`input ${formValidState.post ? "" : "invalid"}`} //динамическая стилизация класом
      ></textarea>
      <Button text="Save" />
    </form>
  );
}

export default JournalForm;
