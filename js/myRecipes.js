// ------------------------------------- MY RECIPES --------------------------------------

// select elements
const filterButtonsContainer = document.querySelector('.filter-buttons-container');
const filterButtons = document.querySelectorAll('.filter-button');
const recipeContainer = document.querySelector('.recipe-container');

// variable to store the currently selected category
let selectedCategory = null;

// add event listener
filterButtonsContainer.addEventListener('click', (e)=> {
    // check if the clicked element is a filter button
    if (e.target.classList.contains('filter-button')) {
		 // remove the filter-button--active class from all filter buttons
		 filterButtons.forEach(button => {
			button.classList.remove('filter-button--active');
		 });
		 
		 // add the filter-button--active class to the clicked button
        e.target.classList.add('filter-button--active');
			
        // get the category from the data-category attribute of the clicked button
        const category = e.target.dataset.category;

		// if the currently selected category is the same as the clicked category, clear the filter
		if (selectedCategory === category) {
			// remove the filter-button--active class from all filter buttons
			filterButtons.forEach(button => {
				button.classList.remove('filter-button--active');
			 });
			 
			// clear the filter by displaying all recipes
			displayRecipes();
			selectedCategory = null; // reset selected category
		} else {
			// cisplay recipes of the selected category
			displayRecipesByCategory(category);
			selectedCategory = category; // update selected category
		}
    }
});

// function to display recipes
function displayRecipes() {
    const existingRecipes = localStorage.getItem('data');
    const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

    // clear the recipe container
    recipeContainer.innerHTML = '';

    // iterate over each recipe
    recipes.forEach((recipe, index) => {
        // create a div for each recipe
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('my-recipe');

        // insert recipe data
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
        `;

        // append the recipe div to the recipe container
        recipeContainer.appendChild(recipeDiv);
    });
}

// Function to display recipes by category
function displayRecipesByCategory(category) {
    const existingRecipes = localStorage.getItem('data');
    const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

    // Clear the recipe container
    recipeContainer.innerHTML = '';

    // Iterate over each recipe
    recipes.forEach((recipe, index) => {
        // Check if the recipe matches the selected category
        if (recipe.category === category) {
            // Create a div to represent the recipe
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('my-recipe');

            // Populate the div with recipe data
            recipeDiv.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
				<p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
				<p><strong>Instructions:</strong><br>${recipe.instructions}</p>
            `;

            // Append the recipe div to the recipe container
            recipeContainer.appendChild(recipeDiv);
        }
    });
}

// call display function
displayRecipes();
