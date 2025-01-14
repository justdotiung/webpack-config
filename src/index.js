import "./style.css";

const a = 1;

console.log(a);

const app = document.getElementById("app");
const div = document.createElement("div"); // Create a div element

div.classList.add("container"); // Add a class to the div element

const input = document.createElement("input"); // Create an input element
input.setAttribute("type", "text"); // Set the type attribute of the input element
input.setAttribute("placeholder", "Enter your name"); // Set the placeholder attribute of the input element

div.appendChild(input); // Append the input element to the div element

app.appendChild(div); // Append the div element to the app element
