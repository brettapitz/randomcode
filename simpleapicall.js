const age = document.getElementById('agify_output');
let name_in = document.getElementById('agify_input');
// Can arrow functions not be passed by name? This isn't the first time
// I've had to use the '() => func()' syntax. Last time I blamed it on React,
// but is this just a stupid JavaScript thing?
name_in.addEventListener("change", () => getAge());

const getAge = () => {
  let url = 'https://api.agify.io/?name=' + name_in.value;
  age.innerHTML = 'Agifying...';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.age != null) {
        age.innerHTML = "I bet you're " + data.age + " years old!";
      } else {
        age.innerHTML = "Sorry, I'm too stupid to handle that."
      }
    })
}