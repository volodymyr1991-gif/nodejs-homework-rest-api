const express = require('express')
const router = express.Router()
const Cats = require('../../model') 

router.get('/', async (req, res, next) => {
  try{
const contacts = await Cats.listContactsAll()
res.json({ status: 'success', code:200 ,data:{contacts}})
  }catch(e){
    next()
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
