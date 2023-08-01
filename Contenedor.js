const fs = require('fs').promises;

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(object) {
    try {
      const objects = await this.getAllObjects();
      const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0;
      const newId = lastId + 1;
      object.id = newId;
      objects.push(object);
      await this.saveAllObjects(objects);
      return newId;
    } catch (error) {
      throw new Error('Error saving object:', error);
    }
  }

  async getById(id) {
    try {
      const objects = await this.getAllObjects();
      return objects.find((object) => object.id === id) || null;
    } catch (error) {
      throw new Error('Error getting object by ID:', error);
    }
  }

  async getAll() {
    try {
      return await this.getAllObjects();
    } catch (error) {
      throw new Error('Error getting all objects:', error);
    }
  }

  async deleteById(id) {
    try {
      const objects = await this.getAllObjects();
      const updatedObjects = objects.filter((object) => object.id !== id);
      await this.saveAllObjects(updatedObjects);
    } catch (error) {
      throw new Error('Error deleting object by ID:', error);
    }
  }

  async deleteAll() {
    try {
      await this.saveAllObjects([]);
    } catch (error) {
      throw new Error('Error deleting all objects:', error);
    }
  }

  async getAllObjects() {
    try {
      const data = await fs.readFile(this.fileName, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File does not exist, return an empty array
        return [];
      }
      console.error('Error al leer el archivo:', error);
      throw new Error('Error reading file:', error);
    }
  }

  async saveAllObjects(objects) {
    try {
      await fs.writeFile(this.fileName, JSON.stringify(objects, null, 2));
    } catch (error) {
      throw new Error('Error writing to file:', error);
    }
  }
}

module.exports = Contenedor;