import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router()

router.get("/", async function (request, response) {

    if (request.query.rating) {
        request.query.rating = +request.query.rating;
    }

    const tournament = await client
        .db("tournament")
        .collection("tournament list")
        .find(request.query)
        .toArray();
    response.send(tournament);
});

router.get("/:id", async function (request, response) {
    // const { id } = request.params;
    const id = new ObjectId(request.params.id);
    const tournament = await client.db("tournament").collection("tournament list").findOne({ _id: id })
    //const tournament = tournament list.find((mv) => mv.id === id);
    console.log(tournament);
    tournament ? response.send(tournament) : response.status(404).send({ message: "tournament not found" })
});

router.post("/", async function (request, response) {
    try {
        const data = request.body;
        console.log("data", data);
        const result = await client
            .db("tournament")
            .collection("tournament list")
            .insertOne(data);
        response.json(result);
    } catch (error) {
        console.log(error);
        return response.json(error.message)
    }

});

router.delete("/:id", async function (request, response) {
    // const { id } = request.params;
    const id = new ObjectId(request.params.id);
    const result = await client
        .db("tournament")
        .collection("tournament list")
        .deleteOne({ _id: id });

    result.deletedCount > 0
        ? response.send({ message: "tournament deleted successfully" })
        : response.status(404).send({ message: "tournament not found" });
})

router.put("/:id", async function (request, response) {
    try {
        // const { id } = request.params;
        const id = new ObjectId(request.params.id);
        const data = request.body;
        const result = await client
            .db("tournament")
            .collection("tournament list")
            .updateOne({ _id: id }, { $set: data });
        response.json(result);
    } catch (error){
        console.log(error);
        return response.json(error.message)
    }
    
});

export default router;