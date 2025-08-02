const calculate = document.getElementById("submit");
let birthDay = document.getElementById("day");
let birthMonth = document.getElementById("month");
let birthYear = document.getElementById("year");

let dayText = document.getElementsByClassName("day")[0];
let monthText = document.getElementsByClassName("month")[0];
let yearText = document.getElementsByClassName("year")[0];

let label = document.getElementsByClassName("red-text");
let errorText = [
  document.getElementsByClassName("error-text-one")[0],
  document.getElementsByClassName("error-text-two")[0],
  document.getElementsByClassName("error-text-three")[0]
];

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

function clearErrors() {
  for (let i = 0; i < 3; i++) {
    errorText[i].innerText = "";
    label[i].style.color = "";
  }
  birthDay.style.border = "";
  birthMonth.style.border = "";
  birthYear.style.border = "";
}

function setError(index, message) {
  errorText[index].innerText = message;
  label[index].style.color = "hsl(0, 100%, 67%)";
  if (index === 0) birthDay.style.border = "2px solid hsl(0, 100%, 67%)";
  if (index === 1) birthMonth.style.border = "2px solid hsl(0, 100%, 67%)";
  if (index === 2) birthYear.style.border = "2px solid hsl(0, 100%, 67%)";
}

function calculateAge(event) {
  event.preventDefault();
  clearErrors();

  let d = parseInt(birthDay.value);
  let m = parseInt(birthMonth.value);
  let y = parseInt(birthYear.value);

  const today = new Date();
  let currentDay = today.getDate();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  let hasError = false;

  // Empty field check
  if (birthDay.value.length === 0) {
    setError(0, "This field is required");
    hasError = true;
  }
  if (birthMonth.value.length === 0) {
    setError(1, "This field is required");
    hasError = true;
  }
  if (birthYear.value.length === 0) {
    setError(2, "This field is required");
    hasError = true;
  }

  // Only continue if no blank fields
  if (hasError) return;

  // Check for valid month
  if (m < 1 || m > 12) {
    setError(1, "Must be a valid month");
    hasError = true;
  }

  // Adjust February if leap year
  if (isLeapYear(y)) {
    months[1] = 29;
  }

  // Check for valid day
  if (d < 1 || d > months[m - 1]) {
    setError(0, "Must be a valid day");
    hasError = true;
  }

  // Check for future year
  if (y > currentYear) {
    setError(2, "Must be in the past");
    hasError = true;
  }

  if (hasError) return;

  // Borrowing logic
  if (currentDay < d) {
    currentDay += months[(currentMonth - 2 + 12) % 12];
    currentMonth -= 1;
  }

  if (currentMonth < m) {
    currentMonth += 12;
    currentYear -= 1;
  }

  let ageDay = currentDay - d;
  let ageMonth = currentMonth - m;
  let ageYear = currentYear - y;

  yearText.innerText = ageYear;
  monthText.innerText = ageMonth;
  dayText.innerText = ageDay;

}

calculate.addEventListener("click", calculateAge);
