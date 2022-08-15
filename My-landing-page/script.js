const navigationBtn = document.querySelector(".navigationBtn");
const navigationdiv = document.querySelector(".navigationDiv");
const signBtn = document.querySelector(".signBtn");
const modal = document.querySelector(".modal");
const closeSignUpDiv = document.querySelector(".closeSignUpDiv");
const signUpDiv = document.querySelector(".signUpDiv"); 
const navigationContainer = document.querySelector(".navigationContainer")


navigationBtn.addEventListener("click",() => {
    navigationContainer.classList.toggle('animation');
});
closeSignUpDiv.addEventListener("click", () => modal.style.display = "none")
signBtn.addEventListener("focusin",() => modal.style.display = "block");
window.addEventListener('click', e => {
    e.target == modal ? modal.style.display = "none" : false;
});
