"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import "./node_modules/d3-dsv/dist/d3-dsv.min.js";

var LikeButton = function LikeButton() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      items = _React$useState2[0],
      setItems = _React$useState2[1];

  var _React$useState3 = React.useState(22),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedDate = _React$useState4[0],
      setSelectedDate = _React$useState4[1];

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
            return React.createElement(
              "p",
              null,
              i
            );
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
    items.filter(function (item) {
      return item.day.getDate() === selectedDate;
    }).map(function (item) {
      return React.createElement(
        "div",
        { "class": "program-item" },
        React.createElement(
          "div",
          { "class": "program-item-info" },
          React.createElement(
            "div",
            { "class": "program-item-time" },
            item.start,
            " - ",
            item.end
          ),
          React.createElement(
            "div",
            { "class": "program-item-name" },
            React.createElement(
              "div",
              null,
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
              null,
              item.venue,
              " ",
              item.room
            )
          ),
          React.createElement(
            "div",
            { "class": "program-item-speaker" },
            item.speaker
          )
        ),
        React.createElement(
          "div",
          { "class": "program-item-description" },
          React.createElement(
            "div",
            { "class": "program-item-description-text" },
            item.description
          )
        )
      );
    })
  );
};

var domContainer = document.querySelector("#like_button_container");
ReactDOM.render(React.createElement(LikeButton, null), domContainer);