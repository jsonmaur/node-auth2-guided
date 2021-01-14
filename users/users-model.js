const db = require("../database/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users as u")
		.innerJoin("roles as r", "r.id", "u.role_id")
		.select("u.id", "u.username", "r.name as role")
}

function findById(id) {
	return db("users as u")
		.innerJoin("roles as r", "r.id", "u.role_id")
		.where("u.id", id)
		.first("u.id", "u.username", "r.name as role")
}

function findByUsername(username) {
	return db("users as u")
		.innerJoin("roles as r", "r.id", "u.role_id")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password", "r.name as role")
}

module.exports = {
	add,
	find,
	findById,
	findByUsername,
}