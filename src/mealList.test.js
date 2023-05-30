import displayMealList from '../module/mealList.js';

describe('displayMealList', () => {
  test('updates menu item with meal count', () => {
    // Creating a mock DOM structure
    document.body.innerHTML = `
      <div id="mealList"></div>
      <div id="mealsMenuItem"><span>Meals (0)</span></div>
    `;

    // Sample meals data
    const meals = [{}, {}, {}];

    displayMealList(meals);

    // Check if the menu item text has been updated
    const mealsMenuItem = document.getElementById('mealsMenuItem');
    expect(mealsMenuItem.firstChild.textContent).toBe('Meals (3)');
  });

  test('updates menu item with meal count - empty meals array', () => {
    // Mock DOM structure
    document.body.innerHTML = `
      <div id="mealList"></div>
      <div id="mealsMenuItem"><span>Meals (0)</span></div>
    `;

    const meals = []; // Empty meals array

    // Call the function being tested
    displayMealList(meals);

    // Check if the menu item text has been updated to indicate zero meals
    const mealsMenuItem = document.getElementById('mealsMenuItem');
    expect(mealsMenuItem.firstChild.textContent).toBe('Meals (0)');
  });
});
