const input = document.querySelector("input");
const serchBtn = document.querySelector(".searchBtn");
const mainnContainer = document.querySelector(".mainContainer");
const resaultDiv = document.querySelector(".resaultDiv")
const mealsDiv = document.querySelector(".mealsDiv")
const singleMealDiv = document.querySelector(".singleMealDiv");
let resault = document.querySelector(".resaultH1");
const randomBtn = document.querySelector(".randomBtn");

serchBtn.addEventListener("click",function (e) {
    singleMealDiv.style.display = 'none';
    
    let value = input.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then(response => response.json())
    .then(function (data) {
        
        if(data.meals == null){
            resault.innerText = "There are no search results. Try again!";
            input.value = "";
        } else if (value === "") {
            alert("Please enter a search term")
        }else {
            mealsDiv.style.display = "grid";
            resaultDiv.innerHTML = "";
            resault.innerText = `Search results for '${value}':`;
            const meals = data.meals.map((meal) => {
                return `<div class="meal" name=${meal.strMeal}>
                    <img class="mealImg" src="${meal.strMealThumb}" alt="">
                    <div class="mealInfo"> <h3> ${meal.strMeal} </h3> </div>
                </div>`
            }).join("");
            mealsDiv.innerHTML = meals;
            input.value = "";
        } 
        renderSinglMeal();
    })
})


function renderSinglMeal () {
    const meals = mealsDiv.querySelectorAll(".meal");
    for (let meal of meals) {
       meal.addEventListener("click", () => {
           singleMealDiv.style.display = "block";
           singleMealDiv.style.display = "flex"
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.getAttribute("name")}`)
            .then(response => response.json())
            .then(function (data) {
                let liArr = [];
                for(let i = 1; i <= 20; i++) {
                    if(data.meals[0][`strIngredient${i}`]){
                        liArr.push(data.meals[0][`strIngredient${i}`])
                    } else {
                        break;
                    }
                }
                let li = liArr.map((ing) => {
                    return `<li>${ing}</li>`
                }).join("");
                singleMealDiv.innerHTML = `
                    <h1>${data.meals[0].strMeal}</h1>
                    <img src=${data.meals[0].strMealThumb} alt="">
                    <div class="singleMealInfo">
                        <p>${data.meals[0].strCategory}</p>
                        <p>${data.meals[0].strArea}</p>
                    </div>
                    <div class="main">
                        <p>${data.meals[0].strInstructions}</p>
                        <h2>Ingredients</h2>
                        <ul class="ul">${li}</ul>
                    </div>`
            })
            singleMealDiv.scrollIntoView({behavior: "smooth",
            block: "start",
            inline: "nearest",
          })
       })
       
    }
   
}


randomBtn.addEventListener("click",function(){
    resault.innerText = "";
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(function (data) {
        singleMealDiv.style.display = "flex"
        mealsDiv.style.display = "none"
        console.log(data)
        let liArr = [];
        for(let i = 1; i <= 20; i++) {
            if(data.meals[0][`strIngredient${i}`]){
                liArr.push(data.meals[0][`strIngredient${i}`])
            } else {
                break;
            }
        }
        let li = liArr.map((ing) => {
            return `<li>${ing}</li>`
        }).join("");
        singleMealDiv.innerHTML = `
            <h1>${data.meals[0].strMeal}</h1>
            <img src=${data.meals[0].strMealThumb} alt="">
            <div class="singleMealInfo">
                <p>${data.meals[0].strCategory}</p>
                <p>${data.meals[0].strArea}</p>
            </div>
            <div class="main">
                <p>${data.meals[0].strInstructions}</p>
                <h2>Ingredients</h2>
                <ul class="ul">${li}</ul>
            </div>`
    })
})






    