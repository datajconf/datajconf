"use strict";
import "./node_modules/d3-dsv/dist/d3-dsv.min.js";

const LikeButton = () => {
  const [items, setItems] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(22);

  React.useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbfoHgabkIB0vzYf9zQcCDYaMzCt3LT_iHUDuCYENraqGASDQ5IRnKC28y9Hgjyv8aSxI0OwK5r1xV/pub?output=csv"
    )
      .then((response) => response.text())
      .then((data) => {
        const d = d3.csvParse(data).map((item) => {
          const dt = item.day.split(".").map((i) => parseInt(i));
          return {
            ...item,
            day: new Date(dt[2], dt[1] - 1, dt[0]),
            description: item.description.split("\n").map((i) => <p>{i}</p>),
          };
        });
        setItems(d);
      });
  }, []);

  console.log(items);

  return (
    <div class="program-container">
      <div class="date-menu-container">
        <div class="date-menu">
          <div
            class={`date-item ${selectedDate === 22 ? "selected" : ""}`}
            onClick={() => {
              setSelectedDate(22);
            }}
          >
            Thursday
          </div>
          <div
            class={`date-item ${selectedDate === 23 ? "selected" : ""}`}
            onClick={() => {
              setSelectedDate(23);
            }}
          >
            Friday
          </div>
          <div
            class={`date-item ${selectedDate === 24 ? "selected" : ""}`}
            onClick={() => {
              setSelectedDate(24);
            }}
          >
            Saturday
          </div>
        </div>
      </div>
      {items
        .filter((item) => item.day.getDate() === selectedDate)
        .map((item) => (
          <div class="program-item">
            <div class="program-item-info">
              <div class="program-item-time">
                {item.start} - {item.end}
              </div>
              <div class="program-item-name">
                <div>{item.category}</div>
                <div>
                  <strong>{item.title}</strong>
                </div>
                <div>
                  {item.venue} {item.room}
                </div>
              </div>
              <div class="program-item-speaker">{item.speaker}</div>
            </div>
            <div class="program-item-description">
              <div class="program-item-description-text">
                {item.description}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

let domContainer = document.querySelector("#like_button_container");
ReactDOM.render(<LikeButton />, domContainer);
