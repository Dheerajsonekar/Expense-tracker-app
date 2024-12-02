const form = document.getElementById("insertExpenseForm");
const expenseList = document.getElementById("expenseList");

document.addEventListener("DOMContentLoaded", () => {
  showExpenses();
});

form.addEventListener("submit", handleSubmit);

async function showExpenses() {
  try {
    const response = await fetch("/api/expense");
    if (!response.ok) {
      throw new Error("failed to fetch new error.");
    }

    const expenses = await response.json();
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
      expenseList.innerHTML = "<li>No expense inserted</li>";
      return;
    }

    expenses.forEach((expense) => {
      const newLi = document.createElement("li");

      newLi.innerHTML = `${expense.amount} ${expense.description} ${expense.category}
       <button data-id = "${expense.id}" class="delete-btn">Delete</button>
       <button data-id = "${expense.id}" class="edit-btn">Edit</button>`;

      expenseList.appendChild(newLi);
    });

    const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const userId = e.target.getAttribute("data-id");
        await deleteExpense(userId);
        showExpenses();
      });
    });

    const editBtn = document.querySelectorAll(".edit-btn");
    editBtn.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const userId = e.target.getAttribute("data-id");
        await editExpense(userId);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteExpense(userId) {
  try {
    const response = await fetch(`/api/delete/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "failed to delete");
    }
  } catch (error) {
    console.error(error);
  }
}

async function editExpense(userId) {
  try {
    const response = await fetch(`/api/expenseOne/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data!");
    }

    const expense = await response.json();
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;

    form.removeEventListener("submit", handleSubmit);

    form.addEventListener("submit", async function handleUpdate(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const updateResponse = await fetch(`/api/edit/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (updateResponse.ok) {
          showExpenses();
        }
      } catch (error) {
        console.error(error);
      } finally {
        form.reset();
        form.removeEventListener("submit", handleUpdate);
        form.addEventListener("submit", handleSubmit);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      showExpenses();
    }
  } catch (error) {
    console.error(error);
  }
  form.reset();
}
