
const expenses = require('../models/user');

exports.postExpense =  async (req, res) =>{
   try{
    const {amount, description, category } = req.body;
    const expense = await expenses.create({amount, description, category});
    return res.status(201).json(expense);
   }catch(error){
    return res.status(500).json({error: error.message});
   }
} 



exports.getExpense = async (req, res) => {
   try{
   const expensesAll = await expenses.findAll();
   return res.status(200).json(expensesAll);
   }catch(error){
     console.error('failed to request data.')
     return res.status(500).json(error);
   }
}

exports.getOneExpense = async (req, res) => {
   try{
     const expenseId = req.params.id;
     const expense = await expenses.findOne({where: {id: expenseId}});
     if(expense){
      return res.status(200).json(expense);
     }
     return res.status(404).json({error:'expense not found'})
   }catch(error){
     console.error(error);
     return res.status(500).json({error: "unable to fetch expense"});
   }
}


exports.deleteExpense = async (req, res) => {
     try{
       const expenseId = req.params.id;  
       const response = await expenses.destroy({where: {id: expenseId}}) 
       if(response === 0){
        return res.status(400).json({error: 'user not found'});
       }

       return res.status(200).json({message: 'user deleted successfully'});
     }catch(error){
        console.error(error);
        return res.status(500).json(error);
     }
}

exports.editExpense = async (req, res) => {
  
   try{
    
      const expenseId = req.params.id;
      const {amount, description, category} = req.body;

      const [updated] = await expenses.update({amount, description, category}, {where: {id: expenseId}});
      if(updated){
         const updatedExpense = await expenses.findOne({where: {id: expenseId}});
         return res.status(202).json(updatedExpense);
      }
      else{
        return res.status(404).json({error:"Expense not found!"});
      }


   }catch(error){
      console.error(error);
      return res.status(500).json({error: error.messsage});
   }
}


