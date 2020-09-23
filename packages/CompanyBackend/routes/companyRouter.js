// import modules
const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const dateTimeHelper = require('../utils/dateTimeHelper');

// db setup
const DbConnection = require('../db');

// GET all companies
router.get("/companies", async (req, res) => {
		const dbCollection = await DbConnection.getCollection("helixcompany");
		console.log(dbCollection)
		const companies = await dbCollection.find().toArray((err, result) => {
			console.log(result)
			if (err) throw err;
			res.json(result);
		});
	}
);

// GET one company identified by id
router.get("/companies/:id", async (req, res) => {
    try {
        const companyId = req.params.id
        const dbCollection = await DbConnection.getCollection("helixcompany");
        const company = await dbCollection.findOne({ _id: ObjectId(companyId) })
        res.json(company)
    } catch(err) {
        throw new Error("Db Call error: " + err);
    }
});

// POST (create) a company 
router.post("/companies", async (req, res) => {
	const newCompany = req.body;

	if (!newCompany.CustomApiRequests){
		newCompany.CustomApiRequests = [];
	}
	console.log('Adding new company: ', newCompany);

	const dbCollection = await DbConnection.getCollection("helixcompany");
	const company = await dbCollection.findOne({_id: ObjectId(newCompany.id)});

	if (company) {
		res.json({
			error: "Company with given Company Id already exists"
		})
	} else {
		let companies = await dbCollection.find().toArray();

		await dbCollection.insertOne({
			...newCompany,
			createdAt: dateTimeHelper.getTimeStamp(),
		});

		// return updated list
        companies = await dbCollection.find().toArray();
        res.json(companies)
	}
});

// PUT (update) a company
router.put("/companies/:id", async (req, res) => {
	const companyId = req.params.id;
	const updatedcompany = req.body;
	console.log("Editing company ", companyId, " to be ", updatedcompany);

	const dbCollection = await DbConnection.getCollection("helixcompany");
	const company = await dbCollection.findOne({ _id: ObjectId(companyId) });

	if (!company) {
		res.json({
			error: "company with given id doesn't exist"
		})
	}

	updatedcompany.updatedAt = dateTimeHelper.getTimeStamp();
	await dbCollection.updateOne({ _id: ObjectId(companyId) }, { $set: updatedcompany });

	// return updated list
    const companies = await dbCollection.find().toArray();
    res.json(companies)
});

// DELETE a company
router.delete("/companies/:id", async (req, res) => {
	const companyId = req.params.id;
	console.log("Delete company with id: ", companyId);

	const dbCollection = await DbConnection.getCollection("helixcompany");
	const company = await dbCollection.findOne({ _id : ObjectId(companyId) });

	if (!company) {
		res.json({
			error: "company with given id doesn't exist"
		})
	}

	await dbCollection.deleteOne({ _id: ObjectId(companyId) });

	// return updated list
	const companies = await dbCollection.find().toArray();
	res.json(companies)
});

module.exports = router; 