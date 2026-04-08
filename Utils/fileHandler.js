import fs from "fs";

// Read JSON file
export const readData = (file) => {
  try {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write JSON file
export const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};