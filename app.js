console.log("JS is working");
// Register service worker for offline use
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.log('SW registration failed:', err));
    });
  }
  function logWorkout() {
    document.getElementById("workoutModal").classList.remove("hidden");
  }
  
  function logMeal() {
    document.getElementById("mealModal").classList.remove("hidden");
  }
  
  function logWater() {
    document.getElementById("waterModal").classList.remove("hidden");
  }
  
  function logSupplements() {
    document.getElementById("supplementModal").classList.remove("hidden");
  }
  
  function showSummary() {
    alert("Daily summary feature coming soon!");
  }
// Show Modal
document.querySelector(".card button").addEventListener("click", () => {
    document.getElementById("workoutModal").classList.remove("hidden");
  });
  
  // Close Modal
  function closeModal() {
    document.getElementById("workoutModal").classList.add("hidden");
  }
  
  // Handle Form Submit
  document.getElementById("workoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const workout = {
      exercise: document.getElementById("exercise").value,
      sets: document.getElementById("sets").value,
      reps: document.getElementById("reps").value,
      weight: document.getElementById("weight").value,
      time: document.getElementById("time").value,
      date: new Date().toLocaleDateString()
    };
  
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("workouts")) || [];
    existing.push(workout);
    localStorage.setItem("workouts", JSON.stringify(existing));
  
    alert("Workout Saved!");
    this.reset();
    closeModal();
  });
  // Show Meal Modal
document.querySelectorAll(".card button")[1].addEventListener("click", () => {
    document.getElementById("mealModal").classList.remove("hidden");
  });
  
  // Close Meal Modal
  function closeMealModal() {
    document.getElementById("mealModal").classList.add("hidden");
  }
  
  // Handle Meal Form Submit
  document.getElementById("mealForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const meal = {
      name: document.getElementById("mealName").value,
      calories: parseInt(document.getElementById("calories").value),
      protein: parseInt(document.getElementById("protein").value) || 0,
      carbs: parseInt(document.getElementById("carbs").value) || 0,
      fats: parseInt(document.getElementById("fats").value) || 0,
      date: new Date().toLocaleDateString()
    };
  
    const existing = JSON.parse(localStorage.getItem("meals")) || [];
    existing.push(meal);
    localStorage.setItem("meals", JSON.stringify(existing));
  
    alert("Meal saved!");
    this.reset();
    closeMealModal();
  });
  // Show Water Modal
document.querySelectorAll(".card button")[2].addEventListener("click", () => {
    document.getElementById("waterModal").classList.remove("hidden");
  });
  
  // Close Water Modal
  function closeWaterModal() {
    document.getElementById("waterModal").classList.add("hidden");
  }
  
  // Handle Water Form Submit
  document.getElementById("waterForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const water = {
      amount: parseInt(document.getElementById("waterAmount").value),
      date: new Date().toLocaleDateString()
    };
  
    const existing = JSON.parse(localStorage.getItem("water")) || [];
    existing.push(water);
    localStorage.setItem("water", JSON.stringify(existing));
  
    alert("Water logged!");
    this.reset();
    closeWaterModal();
  });
  // Show Supplement Modal
document.querySelectorAll(".card button")[3].addEventListener("click", () => {
    document.getElementById("supplementModal").classList.remove("hidden");
  });
  
  // Close Supplement Modal
  function closeSupplementModal() {
    document.getElementById("supplementModal").classList.add("hidden");
  }
  
  // Handle Supplement Form Submit
  document.getElementById("supplementForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const checked = [...document.querySelectorAll("input[name='supplement']:checked")];
    const supplements = checked.map(input => input.value);
  
    const log = {
      supplements,
      date: new Date().toLocaleDateString()
    };
  
    const existing = JSON.parse(localStorage.getItem("supplements")) || [];
    existing.push(log);
    localStorage.setItem("supplements", JSON.stringify(existing));
  
    alert("Supplements logged!");
    this.reset();
    closeSupplementModal();
  });
  function renderDailySummary(dateStr = new Date().toLocaleDateString()) {
    const summaryDiv = document.getElementById("summaryContent");
  
    // Meals
    const meals = (JSON.parse(localStorage.getItem("meals")) || []).filter(m => m.date === dateStr);
    const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
    const totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
    const totalCarbs = meals.reduce((acc, m) => acc + m.carbs, 0);
    const totalFats = meals.reduce((acc, m) => acc + m.fats, 0);
  
    // Workouts
    const workouts = (JSON.parse(localStorage.getItem("workouts")) || []).filter(w => w.date === dateStr);
  
    // Water
    const water = (JSON.parse(localStorage.getItem("water")) || []).filter(w => w.date === dateStr);
    const totalWater = water.reduce((acc, w) => acc + w.amount, 0);
  
    // Supplements
    const supplements = (JSON.parse(localStorage.getItem("supplements")) || []).filter(s => s.date === dateStr);
    let todaySupps = [];
    supplements.forEach(entry => {
      todaySupps = todaySupps.concat(entry.supplements);
    });
    todaySupps = [...new Set(todaySupps)];
  
    summaryDiv.innerHTML = `
      <p><strong>Date:</strong> ${dateStr}</p>
      <p><strong>Meals:</strong> ${meals.length} logged</p>
      <p><strong>Calories:</strong> ${totalCalories} kcal | <strong>Protein:</strong> ${totalProtein}g | <strong>Carbs:</strong> ${totalCarbs}g | <strong>Fats:</strong> ${totalFats}g</p>
      <p><strong>Workouts:</strong> ${workouts.length} logged</p>
      <p><strong>Water:</strong> ${totalWater} ml</p>
      <p><strong>Supplements:</strong> ${todaySupps.length > 0 ? todaySupps.join(", ") : "None"}</p>
    `;
  }
  
  document.getElementById("summaryDate").addEventListener("change", (e) => {
    const selectedDate = new Date(e.target.value).toLocaleDateString();
    renderDailySummary(selectedDate);
  });
  
  function viewLogs() {
    const today = new Date().toLocaleDateString();
    const logsDiv = document.getElementById("logsContent");
    document.getElementById("logs").classList.remove("hidden");
  
    // Get all today's logs
    const meals = (JSON.parse(localStorage.getItem("meals")) || []).filter(m => m.date === today);
    const workouts = (JSON.parse(localStorage.getItem("workouts")) || []).filter(w => w.date === today);
    const water = (JSON.parse(localStorage.getItem("water")) || []).filter(w => w.date === today);
    const supplements = (JSON.parse(localStorage.getItem("supplements")) || []).filter(s => s.date === today);
  
    let html = '';
  
    if (meals.length) {
      html += `<h3>🍽 Meals</h3><ul>`;
      meals.forEach(m => {
        html += `<li><strong>${m.name}</strong> - ${m.calories} kcal, Protein: ${m.protein}g, Carbs: ${m.carbs}g, Fats: ${m.fats}g</li>`;
      });
      html += `</ul>`;
    }
  
    if (workouts.length) {
      html += `<h3>🏋️‍♂️ Workouts</h3><ul>`;
      workouts.forEach(w => {
        html += `<li><strong>${w.exercise}</strong> - ${w.sets}x${w.reps} reps, ${w.weight}kg at ${w.time}</li>`;
      });
      html += `</ul>`;
    }
  
    if (water.length) {
      html += `<h3>💧 Water</h3><ul>`;
      water.forEach(w => {
        html += `<li>${w.amount} ml</li>`;
      });
      html += `</ul>`;
    }
  
    if (supplements.length) {
      html += `<h3>💊 Supplements</h3><ul>`;
      const supps = supplements[supplements.length - 1].supplements;
      supps.forEach(s => {
        html += `<li>${s}</li>`;
      });
      html += `</ul>`;
    }
  
    if (!html) html = "<p>No logs found for today.</p>";
  
    logsDiv.innerHTML = html;
  }
  
  statsDiv.innerHTML = `
  <p>🗓 <strong>Past 7 Days:</strong></p>
  <ul>
    <li><span>🔥 Calories</span> <span>${weekCalories} kcal</span></li>
    <li><span>💧 Water</span> <span>${weekWater} ml</span></li>
    <li><span>🏋️‍♂️ Workouts</span> <span>${weekWorkouts}</span></li>
  </ul>

  <p>📆 <strong>Past 30 Days:</strong></p>
  <ul>
    <li><span>🔥 Calories</span> <span>${monthCalories} kcal</span></li>
    <li><span>💧 Water</span> <span>${monthWater} ml</span></li>
    <li><span>🏋️‍♀️ Workouts</span> <span>${monthWorkouts}</span></li>
  </ul>
`;

