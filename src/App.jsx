import "./App.css";
import Button from "./components/Button/Button";
import JournalItem from "./components/JournalItem/Journalitem";
import CardButton from "./components/CardButton/CardButton";
import LeftPanel from "./Layout/LeftPanel/LeftPanel";
import Body from "./Layout/Body/Body";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/use.localstorage.hook";


function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date),
  }));
}

function App() {
  const [items, setItem] = useLocalStorage([])

  const addItem = (item) => {
    setItem([
      ...mapItems(items),
      {
        post: item.post,
        title: item.title,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
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
        <JournalList items={mapItems(items)}>
        {items && items.length === 0 && (
          <p>There are no entries yet, add the first one! </p>
        )}
        {items && items.length > 0 &&
          items.sort(sortItem).map((el) => (
            <CardButton key={el.id}>
              <JournalItem title={el.title} text={el.post} date={el.date} />
            </CardButton>
          ))}
      </JournalList>
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
