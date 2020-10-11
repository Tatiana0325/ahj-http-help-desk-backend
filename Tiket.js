const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Tiket {
  constructor(name, description) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.descriptionStatus = false;
    this.status = false;
    this.created = new Date().toLocaleString();
  }

  async save() {
    const tikets = await Tiket.getAll();
    tikets.push(this.toJSON());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "database.json"),
        JSON.stringify(tikets),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      descriptionStatus: this.descriptionStatus,
      status: this.status,
      created: this.created,
      id: this.id,
    };
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "public", "database.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const tikets = await Tiket.getAll();
    return tikets.find((elem) => elem.id === id);
  }

  static async update(tiket) {
    const tikets = await Tiket.getAll();
    const idx = tikets.findIndex((elem) => elem.id === tiket.id);
    tikets[idx].name = tiket.name;
    tikets[idx].description = tiket.description;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "database.json"),
        JSON.stringify(tikets),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async updateStatus(id) {
    const tikets = await Tiket.getAll();
    const idx = tikets.findIndex((elem) => elem.id === id);
    tikets[idx].status = !tikets[idx].status;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "database.json"),
        JSON.stringify(tikets),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async updateDescription(id) {
    const tikets = await Tiket.getAll();
    const idx = tikets.findIndex((elem) => elem.id === id);
    tikets[idx].descriptionStatus = !tikets[idx].descriptionStatus;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "database.json"),
        JSON.stringify(tikets),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async delete(id) {
    let tikets = await Tiket.getAll();
    tikets = tikets.filter((elem) => elem.id !== id);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "public", "database.json"),
        JSON.stringify(tikets),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = Tiket;
