const pool = require("../config/db");

const createBlogEntry = async (title, content, user_id, relation_key, relation_id) => {
  const result = await pool.query(
    "INSERT INTO blog_entries (title, content, user_id, relation_key, relation_id, publication_date) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
    [title, content, user_id, relation_key, relation_id]
  );
  return result.rows[0];
};

const getAllBlogEntries = async () => {
  const result = await pool.query("SELECT * FROM blog_entries ORDER BY publication_date DESC");
  return result.rows;
};

const getBlogEntryById = async (id) => {
  const result = await pool.query("SELECT * FROM blog_entries WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = { createBlogEntry, getAllBlogEntries, getBlogEntryById };
