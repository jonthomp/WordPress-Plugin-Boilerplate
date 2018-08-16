const COLORS = {
  blue: ["#1E88E5", "#90CAF9"],
  brown: ["#6D4C41", "#D7CCC8"],
  gray: ["#212121", "#BDBDBD"],
  green: ["#388E3C", "#A5D6A7"],
  red: ["#E53935", "#EF9A9A"],
  orange: ["#F4511E", "#FFAB91"],
  purple: ["#8E24AA", "#E1BEE7"],
  yellow: ["#FFD600", "#FFF59D"]
};

const print = Object.entries(COLORS).reduce(
  (api, [name, colors]) => ({
    [name]: (shortLabel, longerMessage, optionalSuffix = "") =>
      console.log(
        `%c${shortLabel}%c${longerMessage}%c${optionalSuffix}`,
        `background-color: ${
          colors[0]
        }; color: #fff; padding: 2px 4px; font-weight: bold;`,
        `background-color: ${colors[1]}; color: #000; padding: 2px 4px;`,
        optionalSuffix !== ""
          ? `background-color: ${
              colors[0]
            }; color: #fff; padding: 2px 4px; font-weight: bold;`
          : ""
      ),
    ...api
  }),
  {}
);

// have a look at https://gist.github.com/robatron/5681424

function setConsolex(enable) {
  if (enable) {
    window.consolex = {
      log: (shortLabel, longerMessage, optionalSuffix = "") =>
        Function.prototype.bind.call(
          console.log,
          console,
          `%c${shortLabel}%c${longerMessage}%c${optionalSuffix}`,
          `background-color: ${
            COLORS.blue[0]
          }; color: #fff; padding: 2px 4px; font-weight: bold;`,
          `background-color: ${COLORS.blue[1]}; color: #000; padding: 2px 4px;`,
          optionalSuffix !== ""
            ? `background-color: ${
                COLORS.blue[0]
              }; color: #fff; padding: 2px 4px; font-weight: bold;`
            : ""
        )(),
      error: (shortLabel, longerMessage, optionalSuffix = "") =>
        window.console.error.call(
          window.console,
          `%c${shortLabel}%c${longerMessage}%c${optionalSuffix}`,
          `background-color: ${
            COLORS.red[0]
          }; color: #fff; padding: 2px 4px; font-weight: bold;`,
          `background-color: ${COLORS.red[1]}; color: #000; padding: 2px 4px;`,
          optionalSuffix !== ""
            ? `background-color: ${
                COLORS.red[0]
              }; color: #fff; padding: 2px 4px; font-weight: bold;`
            : ""
        ),
      info: (shortLabel, longerMessage, optionalSuffix = "") =>
        window.console.info
          .bind(window.console, "%c%s%c%s%c%s")
          .call(
            window.console,
            shortLabel,
            longerMessage,
            optionalSuffix,
            `background-color: ${
              COLORS.blue[0]
            }; color: #fff; padding: 2px 4px; font-weight: bold;`,
            `background-color: ${
              COLORS.gray[1]
            }; color: #000; padding: 2px 4px;`,
            optionalSuffix !== ""
              ? `background-color: ${
                  COLORS.gray[0]
                }; color: #fff; padding: 2px 4px; font-weight: bold;`
              : ""
          ),
      warn: window.console.warn.bind(window.console, "warn: %s")
    };
  } else {
    var __no_op = function() {};

    window.consolex = {
      log: __no_op,
      error: __no_op,
      warn: __no_op,
      info: __no_op
    };
  }
}

setConsolex(true);
