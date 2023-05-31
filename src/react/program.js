"use strict";
import "./node_modules/d3-dsv/dist/d3-dsv.min.js";

const locations = {
  Tamedia: "Tamedia HQ (TX Group)",
  ETH: "ETH Main Building",
  Main: "Main Room (HG F1)",
  Panel: "Panel Room (HG F26.3)",
  "Workshop 1": "Workshop room 1",
  "Workshop 2": "Workshop room 2",
  "Main Hall": "HG Main Hall",
};

const ListItem = (item) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div class="program-item">
      <div class="program-item-info">
        <div class="program-item-time">
          <div>{item.start}</div>
          <div>{item.end}</div>
        </div>
        <div class="program-item-name">
          <div class="program-item-name-category">{item.category}</div>
          <div>
            <strong>{item.title}</strong>
          </div>
          {item.venue && (
            <div class="program-item-name-location">
              <img
                style={{ width: "25px", marginRight: "5px" }}
                src={"/img/location-icon.svg"}
              />
              <div>
              <a
                target="_blank"
                href={`${
                  item.venue === "Tamedia"
                    ? "https://www.google.com/maps/place/TX+Group/@47.3727896,8.5297603,18z/data=!3m1!4b1!4m6!3m5!1s0x8afae1b3e767e801:0x34974205f9f19891!8m2!3d47.3727878!4d8.5310504!16s%2Fg%2F11fy26wx25?entry=ttu"
                    : "https://ethz.ch/en/campus/access/zentrum.html"
                }`}
              >
                {locations[item.venue]}
              </a>
              {item.room ? `, ${locations[item.room]}` : ""}
              </div>
            </div>
          )}
        </div>
        <div class="program-item-speaker">
          {item.speaker.split(/,\s*|\sand\s/).map((s, i) => {
            const twitterHandles = item.twitter.split(/,\s*|\sand\s/).map(h => h.replace(/^@/, ""))

            return twitterHandles && twitterHandles[i] ? (
              <span><a href={`https://www.twitter.com/${twitterHandles[i]}`}>{s}</a>{i < item.speaker.split(/,\s*|\sand\s/).length - 1 ? ", " : ""}</span>
            ) : (
              <span>{s}{i < item.speaker.split(/,\s*|\sand\s/).length - 1 ? ", " : ""}</span>
            );
          })}
        </div>
      </div>
      {item.description.length > 2 && (
        <div class={`program-item-description`}>
          <div
            class={`program-item-description-text ${open ? "open" : "close"}`}
          >
            {item.description}
          </div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            class="program-item-expand-container"
          >
            <div class="program-item-expand">
              {open ? "Close" : "Read more"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

      {items.length > 0 ? (
        items
          .filter((item) => item.day.getDate() === selectedDate)
          .map((item, i) => <ListItem key={`item-${selectedDate}-${i}`} {...item} />)
      ) : (
        <div class="loading-container">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

let domContainer = document.querySelector("#like_button_container");
ReactDOM.render(<LikeButton />, domContainer);
