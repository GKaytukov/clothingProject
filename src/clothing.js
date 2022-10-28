import dbConnect from "./dbConnect.js";


export function createClothing(req, res) {
    // connect to firestore
    const db = dbConnect()
    // add a new doc to clothing collection
    db.collection('clothing').add(req.body)
    // send back a response(err / not)
        .then(doc => res.status(201).send({ success: true, message: 'Created clothing: ' + doc.id })) //To create clothing collection  
        .catch(err => res.send.status(500).send({success: false, message: err}))

}

export function getAllClothing(req, res) { //To get the whole list of clothing
    const db = dbConnect() //Connect to db 
    db.collection('clothing').get()  // Get me the clothing 
        .then(collection => {
            const clothingList = collection.docs.map(doc => doc.data()) //Map means we are going one by one 
            res.send(clothingList) 
        }) // Send me the whole list in a doc data 
        .catch(err => res.send.status(500).send({success: false, message: err}))
}

export async function updateClothing(req, res) {
    const { uid } = req.params
    const db = dbConnect()
    const doc = await db.collection('clothing').doc(uid).update(req.body)
        .catch(err => res.status(500).send({ success: false, message: err }))
    res.status(202).send({ success: true, message: 'Clothing Updated ' + doc.id })
}

export async function deleteClothing(req, res) {
    const { uid } = req.params
    const db = dbConnect()
    const doc = await db.collection('clothing').doc(uid).delete()
        .catch(err => res.status(500).send({ success: false, message: err }))
    res.status(202).send({ success: true, message: 'Clothing Deleted' })
}

export async function getOneClothing(req, res) {
    const { uid } = req.params
    const db = dbConnect()
    const doc = await db.collection('clothing').doc(uid).get()
        .catch(err => res.status(500).send({ success: false, message: err }))
        res.status(202).send({ success: true, message: doc.data()})
}