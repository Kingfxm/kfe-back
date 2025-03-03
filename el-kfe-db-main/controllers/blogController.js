const { createBlogEntry, getAllBlogEntries, getBlogEntryById } = require("../models/blogModel");
const { getUserById } = require("../models/userModel");

const createEntry = async (req, res) => {
  try {
    const { title, content, relation_key, relation_id } = req.body;
    const user_id = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Título y contenido son obligatorios" });
    }

    const userExists = await getUserById(user_id);
    if (!userExists) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const entry = await createBlogEntry(title, content, user_id, relation_key, relation_id);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la entrada del blog", error: error.message });
  }
};

const getEntries = async (req, res) => {
  try {
    const entries = await getAllBlogEntries();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener entradas del blog", error: error.message });
  }
};

const getMiniBlogEntries = async (req, res) => {
  try {
    const entries = await getAllBlogEntries();
    const miniEntries = entries.map(entry => ({
      id: entry.id,
      title: entry.title,
      excerpt: entry.content.split(".").slice(0, 2).join(".") + ".",
    }));
    res.json(miniEntries);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las entradas en miniatura", error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlogEntryById(id);
    if (!blog) {
      return res.status(404).json({ message: "Entrada del blog no encontrada" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la entrada del blog", error: error.message });
  }
};

module.exports = { createEntry, getEntries, getMiniBlogEntries, getBlogById };
