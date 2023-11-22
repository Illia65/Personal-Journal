import "./App.css";
// import Button from "./components/Button/Button";
import JournalItem from "./components/Journalitem/Journalitem";
import CardButton from "./components/CardButton/CardButton";
import LeftPanel from "./Layout/LeftPanel/LeftPanel";
import Body from "./Layout/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useEffect, useState } from "react";

// [
//   {
//     "id": 1,
//     "title": "Подготовка к обновлению курсов",
//     "text": "Сегодня провёл весь день за...",
//     "date": "2023-11-22T10:30:00.000Z"
//   },
//   {
//     "id": 2,
//     "title": "Поход в годы",
//     "text": "Думал, что очень много време...",
//     "date": "2023-11-22T10:30:00.000Z"
//   }
// ]


function App() {
  const [items, setItem] = useState([]);

  useEffect(() => {   //читаем с localStorage
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setItem(
        data.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
  }, []);

useEffect(() => {
  if (items.length) {  //Записываем localStorage
    localStorage.setItem('data', JSON.stringify(items)); //приводи к строке обьект
  }
}, [items]);


  const addItem = (item) => {
    setItem((oldItems) => [
      ...oldItems,
      {
        post: item.post,
        title: item.title,
        date: new Date(item.date),
        id:
          oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  const sortItem = (a, b) => {
    if (a.date > b.date) {
      return -1;
    } else {
      return 1;
    }
  };
  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {items.length === 0 && <p>Записей пока нету добавьте первую</p>}
          {items.length > 0 &&
            items.sort(sortItem).map(
              (
                el //приобразование данных в конктертный jsx element
              ) => (
                <CardButton key={el.id}>
                  <JournalItem title={el.title} text={el.text} date={el.date} />
                </CardButton>
              )
            )}
        </JournalList>
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
