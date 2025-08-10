const toppingItems = document.querySelectorAll(".topping-item");
const pizzaContainer = document.getElementById("pizza-container");
const bin = document.getElementById("bin");
const finishBtn = document.getElementById("finish-btn");

let draggedTopping = null;
let draggedElement = null;

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pizza-topping").forEach(t => t.remove());
  bin.classList.add("hidden");
});

toppingItems.forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedTopping = item.dataset.topping;
    draggedElement = null;
    bin.classList.remove("hidden");
  });

  item.addEventListener("dragend", () => {
    bin.classList.add("hidden");
  });
});

pizzaContainer.addEventListener("dragover", e => e.preventDefault());

pizzaContainer.addEventListener("drop", e => {
  e.preventDefault();

  const rect = pizzaContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (draggedTopping) {
    const toppingWrapper = document.createElement("div");
    toppingWrapper.classList.add("pizza-topping");
    toppingWrapper.setAttribute("draggable", "true");

    const img = document.createElement("img");
    img.src = `assets/images/${draggedTopping}.png`;
    img.alt = draggedTopping;

    toppingWrapper.appendChild(img);
    toppingWrapper.style.left = `${x}px`;
    toppingWrapper.style.top = `${y}px`;

    makeDraggable(toppingWrapper);
    pizzaContainer.appendChild(toppingWrapper);
  } else if (draggedElement && e.target.id !== "bin") {
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
  }

  resetDrag();
});

function makeDraggable(topping) {
  topping.addEventListener("dragstart", () => {
    draggedElement = topping;
    draggedTopping = null;
    bin.classList.remove("hidden");
  });

  topping.addEventListener("dragend", () => {
    bin.classList.add("hidden");
  });
}

bin.addEventListener("dragover", e => e.preventDefault());

bin.addEventListener("drop", () => {
  if (draggedElement) {
    draggedElement.remove();
  }
  resetDrag();
});

function resetDrag() {
  draggedTopping = null;
  draggedElement = null;
  bin.classList.add("hidden");
}

// On finish, go to hungrycat.html
finishBtn.addEventListener("click", () => {
  // Clear toppings before navigation
  document.querySelectorAll(".pizza-topping").forEach(t => t.remove());
  window.location.href = "hungrycat.html";
});
