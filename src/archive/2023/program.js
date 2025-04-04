"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import "./node_modules/d3-dsv/dist/d3-dsv.min.js";

var ListItem = function ListItem(item) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var roomEls = item.room ? item.room.split(" (") : null;
  var room = roomEls ? roomEls.length > 1 ? React.createElement(
    "div",
    { style: { marginTop: ".25em" } },
    roomEls[0],
    React.createElement(
      "span",
      { "class": "room-name" },
      roomEls[1].replace(")", "")
    )
  ) : React.createElement(
    "div",
    { style: { marginTop: ".25em" } },
    roomEls[0]
  ) : null;

  return React.createElement(
    "div",
    { "class": "program-item" },
    React.createElement(
      "div",
      { "class": "program-item-info" },
      React.createElement(
        "div",
        { "class": "program-item-time" },
        React.createElement(
          "div",
          null,
          item.start
        ),
        React.createElement(
          "div",
          null,
          item.end
        )
      ),
      React.createElement(
        "div",
        { "class": "program-item-name" },
        item.category && React.createElement(
          "div",
          { "class": "program-item-name-category" },
          item.category
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "strong",
            null,
            item.title
          )
        ),
        React.createElement(
          "div",
          { "class": "program-item-authors" },
          item.speaker.split(/,\s*|\sand\s/).map(function (s, i) {
            var twitterHandles = item.twitter.split(/,\s*|\sand\s/).map(function (h) {
              return h.replace(/^@/, "");
            });

            return twitterHandles && twitterHandles[i] ? React.createElement(
              "span",
              null,
              React.createElement(
                "a",
                {
                  target: "_blank",
                  href: "https://www.twitter.com/" + twitterHandles[i]
                },
                s
              ),
              i < item.speaker.split(/,\s*|\sand\s/).length - 1 ? ", " : ""
            ) : React.createElement("span", {
              dangerouslySetInnerHTML: {
                __html: s.replace(/\[([^([]*)\]\(([^([ ]*)\)/g, function (a, b, c) {
                  return "<a target=\"_blank\" href=" + c + ">" + b + "</a>";
                }) + (i < item.speaker.split(/,\s*|\sand\s/).length - 1 ? ", " : "")
              }
            });
          })
        )
      ),
      React.createElement(
        "div",
        { "class": "program-item-speaker" },
        item.venue && React.createElement(
          "div",
          { "class": "program-item-name-location" },
          React.createElement("img", {
            style: { width: "25px", marginRight: "5px" },
            src: "../img/location-icon.svg"
          }),
          React.createElement(
            "div",
            null,
            React.createElement(
              "a",
              {
                target: "_blank",
                href: "" + (item.venue === "Tamedia HQ (TX Group)" ? "https://www.google.com/maps/place/TX+Group/@47.3727896,8.5297603,18z/data=!3m1!4b1!4m6!3m5!1s0x8afae1b3e767e801:0x34974205f9f19891!8m2!3d47.3727878!4d8.5310504!16s%2Fg%2F11fy26wx25?entry=ttu" : "https://ethz.ch/en/campus/access/zentrum.html")
              },
              item.venue
            ),
            room ? room : ""
          )
        )
      )
    ),
    (item.description.length > 2 || item.video) && React.createElement(
      "div",
      { "class": "program-item-description" },
      React.createElement(
        "div",
        {
          "class": "program-item-description-text " + (open ? "open" : "close")
        },
        item.description
      ),
      React.createElement(
        "div",
        { "class": "program-item-expand-container" },
        item.description.length > 2 && React.createElement(
          "div",
          {
            onClick: function onClick() {
              setOpen(!open);
            },
            "class": "program-item-expand"
          },
          React.createElement("img", {
            style: { width: "15px", marginRight: "5px" },
            src: "../img/down-icon.svg"
          }),
          open ? "Close" : "Read more"
        ),
        item.paper && React.createElement(
          "div",
          {
            "class": "program-item-expand"
          },
          React.createElement("img", {
            style: { width: "15px", marginRight: "5px" },
            src: "../img/paper-icon.svg"
          }),
          React.createElement(
            "a",
            { target: "_blank", href: "../papers/" + item.paper },
            "Read the paper"
          )
        ),
        item.video && React.createElement(
          "div",
          {
            "class": "program-item-expand"
          },
          React.createElement("img", {
            style: { width: "15px", marginRight: "5px" },
            src: "../img/video-icon.svg"
          }),
          React.createElement(
            "a",
            { target: "_blank", href: item.video },
            "Watch the video"
          )
        )
      )
    )
  );
};

var LikeButton = function LikeButton() {
  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      items = _React$useState4[0],
      setItems = _React$useState4[1];

  var _React$useState5 = React.useState(23),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      selectedDate = _React$useState6[0],
      setSelectedDate = _React$useState6[1];

  React.useEffect(function () {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRbfoHgabkIB0vzYf9zQcCDYaMzCt3LT_iHUDuCYENraqGASDQ5IRnKC28y9Hgjyv8aSxI0OwK5r1xV/pub?output=csv").then(function (response) {
      return response.text();
    }).then(function (data) {
      var d = d3.csvParse(data).map(function (item) {
        var dt = item.day.split(".").map(function (i) {
          return parseInt(i);
        });
        return Object.assign({}, item, {
          day: new Date(dt[2], dt[1] - 1, dt[0]),
          description: item.description.split("\n").map(function (i) {
            return React.createElement("p", {
              dangerouslySetInnerHTML: {
                __html: i.replace(/\[([^([]*)\]\(([^([ ]*)\)/g, function (a, b, c) {
                  return "<a target=\"_blank\" href=" + c + ">" + b + "</a>";
                })
              }
            });
          })
        });
      });
      setItems(d);
    });
  }, []);

  console.log(items);

  return React.createElement(
    "div",
    { "class": "program-container" },
    React.createElement(
      "div",
      { "class": "date-menu-container" },
      React.createElement(
        "div",
        { "class": "date-menu" },
        React.createElement(
          "div",
          {
            "class": "date-item " + (selectedDate === 22 ? "selected" : ""),
            onClick: function onClick() {
              setSelectedDate(22);
            }
          },
          "Thursday"
        ),
        React.createElement(
          "div",
          {
            "class": "date-item " + (selectedDate === 23 ? "selected" : ""),
            onClick: function onClick() {
              setSelectedDate(23);
            }
          },
          "Friday"
        ),
        React.createElement(
          "div",
          {
            "class": "date-item " + (selectedDate === 24 ? "selected" : ""),
            onClick: function onClick() {
              setSelectedDate(24);
            }
          },
          "Saturday"
        )
      )
    ),
    items.length > 0 ? items.filter(function (item) {
      return item.day.getDate() === selectedDate;
    }).map(function (item, i) {
      return React.createElement(ListItem, Object.assign({ key: "item-" + selectedDate + "-" + i }, item));
    }) : React.createElement(
      "div",
      { "class": "loading-container" },
      React.createElement(
        "div",
        { "class": "lds-ring" },
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null)
      )
    )
  );
};

var domContainer = document.querySelector("#like_button_container");
ReactDOM.render(React.createElement(LikeButton, null), domContainer);