export const nameSize = (str) => {
  if (str.length > 16) {
    return "h6";
  } else if (str.length > 6) {
    return "h5";
  } else {
    return "h4";
  }
};

export const statusIcon = (str) => {
  if (str === "Alive") {
    return "🌱 " + str;
  } else if (str === "Dead") {
    return "💀 " + str;
  } else {
    return "❓ " + str;
  }
};

export const speciesIcon = (str) => {
  if (str === "Human") {
    return "👤 " + str;
  } else if (str === "Alien") {
    return "👽 " + str;
  } else if (str === "Mythological Creature") {
    return "🧝🏽‍♂️ " + str;
  } else if (str === "Disease") {
    return "🦠 " + str;
  } else if (str === "Robot") {
    return "🤖 " + str;
  } else {
    return "❓ " + str;
  }
};
