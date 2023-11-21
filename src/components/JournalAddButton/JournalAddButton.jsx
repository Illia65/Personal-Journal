import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton() {
  return (
    <CardButton className="journal-add">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          d="M10 4.96265V16.6293"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.16669 10.796H15.8334"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      New memory
    </CardButton>
  );
}

export default JournalAddButton;
