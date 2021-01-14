const hashedPassword = 'eyJ1c2VySUQiOjMsImlhdCI6MTYxMDMzNDg2OH0'

exports.seed = async function(knex) {
  await knex("users").insert([
    { id: 1, username: "janedoe", password: hashedPassword, role_id: 1 },
    { id: 2, username: "johndoes", password: hashedPassword, role_id: 2 },
  ])
};
