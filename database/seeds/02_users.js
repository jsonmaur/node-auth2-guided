// pre-hashed password for "abc123"
const hashedPassword = "$2a$14$UbduEci6eG9o9UWqBeJ6wO9jB8L5zrdAoALUovYZCdyWASDzitc2a"

exports.seed = async function(knex) {
	await knex("users").insert([
		{ id: 1, username: "janedoe", password: hashedPassword, role_id: 1 },
		{ id: 2, username: "johndoe", password: hashedPassword, role_id: 2 },
	])
}