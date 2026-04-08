import { readData, writeData } from "../Utils/fileHandler.js";

const filePath = "./data/journals.json";

// CREATE ENTRY
export const createEntry = (req, res) => {
  const { mood, note } = req.body;

  if (!mood || !note) {
    return res.status(400).json({ message: "All fields required" });
  }

  let entries = readData(filePath);

  const newEntry = {
    id: Date.now(),
    user: req.user,
    mood,
    note,
    date: new Date(),
  };

  entries.push(newEntry);
  writeData(filePath, entries);

  res.status(201).json(newEntry);
};

// GET ALL ENTRIES (for logged-in user)
export const getEntries = (req, res) => {
  let entries = readData(filePath);

  const userEntries = entries.filter(
    (entry) => entry.user == req.user
  );

  res.json(userEntries);
};

// DELETE ENTRY
export const deleteEntry = (req, res) => {
  let entries = readData(filePath);

  const filtered = entries.filter(
    (entry) => entry.id != req.params.id
  );

  writeData(filePath, filtered);

  res.json({ message: "Deleted successfully" });
};