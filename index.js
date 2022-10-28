import express from 'express'
import { createClothing, getAllClothing, updateClothing } from './src/clothing.js'

const app = express() //Our app will use express the api 
app.use(express.json())

app.post('/clothing', createClothing)
app.get('/clothing', getAllClothing)
app.patch('/clothing', updateClothing)



app.listen(3030, () => console.log('Listening on http://localhost:3030....'))