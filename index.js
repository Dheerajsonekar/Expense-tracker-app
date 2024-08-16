const uL = document.getElementsByTagName('ul')[0];

const form = document.getElementsByTagName("form")[0];
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    const Details = {
        expenseAmount: amount,
        expenseDescription: description,
        expenseCategory: category
       }
    
       localStorage.setItem("Details", JSON.stringify(Details) );
       
       const newLi= document.createElement('li');
       newLi.classList.add('expense');
       newLi.innerHTML =`${amount} ${description} ${category}
       <button class="delete-btn">Delete Expense</button>
       <button class="edit-btn">Edit Expense</button>` ;

       
       uL.appendChild(newLi);

       form.reset();

   });

uL.addEventListener('click', function(event){
  event.preventDefault();

  if(event.target.classList.contains('delete-btn')){
    const toBeDeleted = event.target.parentElement;
    uL.removeChild(toBeDeleted);
  }
});

uL.addEventListener('click', function(event){
    event.preventDefault();

  if(event.target.classList.contains('edit-btn')){
    
    const toBeEdited = event.target.parentElement;
    const [amount, description, category] =toBeEdited.childNodes[0].textContent.split('');
    document.getElementById('amount').value = amount;
   document.getElementById('description').value = description;
   document.getElementById('category').value = category;
   

   uL.removeChild(toBeEdited);
   }

})