"use strict";
import "./node_modules/d3-dsv/dist/d3-dsv.min.js";

const ListItem = (item) => {
  const [open, setOpen] = React.useState(false);
  const roomEls = item.room ? item.room.split(" (") : null;
  const room = roomEls ? (
    roomEls.length > 1 ? (
      <div style={{ marginTop: ".25em" }}>
        {roomEls[0]}
        <span class="room-name">{roomEls[1].replace(")", "")}</span>
      </div>
    ) : (
      <div style={{ marginTop: ".25em" }}>{roomEls[0]}</div>
    )
  ) : null;

  return (
    <div class="program-item">
      <div class="program-item-info">
        <div class="program-item-time">
          <div>{item.start}</div>
          <div>{item.end}</div>
        </div>
        <div class="program-item-name">
          {item.category && (
            <div class="program-item-name-category">{item.category}</div>
          )}
          <div>
            <strong>{item.title}</strong>
          </div>
          <div class="program-item-authors">
            {item.speaker.split(/,\s*|\sand\s/).map((s, i) => {
              const twitterHandles = item.twitter
                .split(/,\s*|\sand\s/)
                .map((h) => h.replace(/^@/, ""));

              return twitterHandles && twitterHandles[i] ? (
                <span>
                  <a
                    target="_blank"
                    href={`https://www.twitter.com/${twitterHandles[i]}`}
                  >
                    {s}
                  </a>
                  {i < item.speaker.split(/,\s*|\sand\s/).length - 1
                    ? ", "
                    : ""}
                </span>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      s.replace(
                        /\[([^([]*)\]\(([^([ ]*)\)/g,
                        (a, b, c) => `<a target="_blank" href=${c}>${b}</a>`
                      ) +
                      (i < item.speaker.split(/,\s*|\sand\s/).length - 1
                        ? ", "
                        : ""),
                  }}
                />
              );
            })}
          </div>
        </div>
        <div class="program-item-speaker">
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
                    item.venue === "Tamedia HQ (TX Group)"
                      ? "https://www.google.com/maps/place/TX+Group/@47.3727896,8.5297603,18z/data=!3m1!4b1!4m6!3m5!1s0x8afae1b3e767e801:0x34974205f9f19891!8m2!3d47.3727878!4d8.5310504!16s%2Fg%2F11fy26wx25?entry=ttu"
                      : "https://ethz.ch/en/campus/access/zentrum.html"
                  }`}
                >
                  {item.venue}
                </a>
                {room ? room : ""}
              </div>
            </div>
          )}
        </div>
      </div>
      {(item.description.length > 2 ||
        item.video) && (
          <div class={`program-item-description`}>
            <div
              class={`program-item-description-text ${open ? "open" : "close"}`}
            >
              {item.description}
            </div>
            <div class="program-item-expand-container">
              {item.description.length > 2 && <div
                onClick={() => {
                  setOpen(!open);
                }}
                class="program-item-expand"
              >
                {open ? "Close" : "▼ Read more"}
              </div>}
              {item.paper && (
                <div
                  class="program-item-expand"
                  style={{ marginLeft: "0.5em" }}
                >
                  <img
                    style={{ width: "15px", marginRight: "5px" }}
                    src={"/img/paper-icon.svg"}
                  />
                  <a target="_blank" href={`../papers/${item.paper}`}>
                    Read the paper
                  </a>
                </div>
              )}
              {item.video && (
                <div
                  class="program-item-expand"
                  style={{ marginLeft: "0.5em" }}
                >
                  <img
                    style={{ width: "15px", marginRight: "5px" }}
                    src={"/img/video-icon.svg"}
                  />
                  <a target="_blank" href={item.video}>
                    Watch the video
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

const LikeButton = () => {
  const [items, setItems] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(23);

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
            description: item.description.split("\n").map((i) => (
              <p
                dangerouslySetInnerHTML={{
                  __html: i.replace(
                    /\[([^([]*)\]\(([^([ ]*)\)/g,
                    (a, b, c) => `<a target="_blank" href=${c}>${b}</a>`
                  ),
                }}
              />
            )),
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
          .map((item, i) => (
            <ListItem key={`item-${selectedDate}-${i}`} {...item} />
          ))
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
