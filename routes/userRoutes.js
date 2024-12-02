const express = require('express');
const {postExpense, getExpense, getOneExpense, deleteExpense, editExpense} = require('../controllers/userController');

const router = express.Router();

router.post('/insert', postExpense);
router.get('/expense', getExpense);
router.get('/expenseOne/:id', getOneExpense);
router.delete('/delete/:id', deleteExpense );
router.put('/edit/:id', editExpense);

module.exports = router;