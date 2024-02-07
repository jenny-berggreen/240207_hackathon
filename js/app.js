// ------------------------------------- ADD RECIPES HOME PAGE --------------------------------------

// scroll to section
const getStartedButton = document.querySelector('.scroll-to-create');

getStartedButton.addEventListener('click', ()=> {
	document.querySelector('.main-title').scrollIntoView({ behavior: 'smooth' });
})

// declaring arrays/strings
let inputIngredients = '';

// selecting elements from the dom
const toast = document.querySelector('.toast');
const recipeForm = document.querySelector('.recipe-input-form');
const recipeName = document.querySelector('.name');
const recipeCategory = document.querySelector('.category');
const recipeIngredients = document.querySelector('.ingredients');
const addIngredientButton = document.querySelector('.add-ingredient');
const ingredientsList = document.querySelector('.ingredients-list');
const recipeInstructions = document.querySelector('.instructions');
const submitRecipeButton = document.querySelector('.submit-button');

// event listeners
addIngredientButton.addEventListener('click', (e)=> {
	e.preventDefault();

	if (recipeIngredients.value === '') {
		alert('Add ingredient!');
		return;
	} else {
		let ingredient = recipeIngredients.value; // ingredient is what you write in the input field

		if (inputIngredients === '') {
			inputIngredients += ingredient; // if ingredients is empty (it's the first item youre adding), add the ingridient as is
		} else {
			inputIngredients += ', ' + ingredient; // if there are other items, add a comma and space before the ingredient
		}
		
		console.log(ingredient);
		console.log(inputIngredients);

		recipeIngredients.value = ''; // empty input field

		// display ingredients in ingredients list
		ingredientsList.textContent = ''; // empty for each time you add
		ingredientsList.textContent = inputIngredients; // update list with new ingredients
	}
	
})

const displayErrorToast = ()=> {
	toast.textContent = 'Fill out all fields!';
	toast.style.display = 'block';
	toast.style.backgroundColor = 'red';
	setTimeout(() => { // display toast for 8 seconds
		toast.style.display = 'none';
	}, 8000);
}

const displaySuccessToast = ()=> {
	toast.textContent = 'New recipe added!';
	toast.style.display = 'block';
	toast.style.backgroundColor = 'green';
	setTimeout(() => { // display toast for 8 seconds
		toast.style.display = 'none';
	}, 8000);
}

recipeForm.addEventListener('submit', (e)=> {
	e.preventDefault();

	const name = recipeName.value;
    const category = recipeCategory.value;
    const instructions = recipeInstructions.value;

    if (name === '' || category === '' || inputIngredients === '' || instructions === '') { // check if fields are empty
        displayErrorToast();
        return;
    }

	let newRecipe = new Recipe(name, category, inputIngredients, instructions); // pass inputIngredients variable
	Recipe.addRecipe(newRecipe); // add recipe to array

	console.log(newRecipe); // log recipe
	console.log(Recipe.getRecipes()); // log all recipes

	// empty all fields
	recipeName.value = '';
	recipeCategory.value = '';
	recipeName.value = '';
	recipeName.value = '';
	inputIngredients = '';
	ingredientsList.textContent = '';
	recipeInstructions.value = '';

	displaySuccessToast();
})

// load existing data from localStorage if it exists
const existingRecipes = localStorage.getItem('data');
const data = existingRecipes ? JSON.parse(existingRecipes) : [];

// declaring recipe class
class Recipe {
	constructor(name, category, ingredients, instructions) {
		this.name = name;
		this.category = category;
		this.ingredients = ingredients;
		this.instructions = instructions;
	}

	// retrieve recipes from local storage
	static getRecipes() {
		const existingRecipes = localStorage.getItem('data');
		return existingRecipes ? JSON.parse(existingRecipes) : [];
    }

	// add recipe
	static addRecipe(recipe) {
		const recipes = Recipe.getRecipes(); // retrieve existing recipes
		recipes.push(recipe);

		// put data in local storage
		localStorage.setItem('data', JSON.stringify(recipes));
	}
}


