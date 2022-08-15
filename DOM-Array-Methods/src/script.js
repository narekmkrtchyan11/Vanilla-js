const main = document.getElementById("main");
const add_user = document.getElementById("add-user");
const double_money = document.getElementById("double-money");
const show_millionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculate_welth = document.getElementById("calculate-welth");
const total = document.querySelector("#total");
const totalWealth = document.querySelector(".totalWealth");

let users = [];

getUser();
getUser();
getUser();

async function getUser() {
   try{
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        wealth: Math.floor(Math.random() * 1000000)
    };
    addUser(user,users)
   } catch (error) {
       console.log("Error")
   }
}

function addUser(user, users) {
    users.push(user);
    updateUsers(users);
    totalWealth.style.visibility = "hidden"
}
 
function updateUsers(users) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth </h2>`
    users.forEach(user => {
       const div =  document.createElement("div");
       div.innerHTML = `<h3>${user.name}</h3> <h4>${replaceMoney(user.wealth)}</h4>`;
       div.className = "personsInfo";
       main.appendChild(div);
    });
} 

function replaceMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(users) {
    currentUsers = users.map(user => {
       return {
        name: user.name,
        wealth: 2 * user.wealth
        }
    })
    updateUsers(currentUsers);
}

function showMillonaires(users) {
    updateUsers(users.filter(user => user.wealth > 1000000));
}

function sortUsers(users) {
    users.sort((user1, user2) => user1.wealth - user2.wealth);
    updateUsers(users);
}

function calculateTotalWealth(users) {
    const wealth = users.reduce((acc, user) => acc + user.wealth,0);
    total.innerText = `${replaceMoney(wealth)}`;
    totalWealth.style.visibility = "visible";
}

add_user.addEventListener("click", getUser);
double_money.addEventListener("click", () => {
    doubleMoney(users);
});
show_millionaires.addEventListener("click", () => {
    showMillonaires(users);
});
sort.addEventListener("click", () => {
    sortUsers(users);
});
calculate_welth.addEventListener("click", () => {
    calculateTotalWealth(users);
})

