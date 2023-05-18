const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Помилка при отриманні списку контактів:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const res = data.find((vel) => vel.id === contactId);
    return res || null;
  } catch {
    console.error("Помилка при отриманні контакту за ID:", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.findIndex((vel) => vel.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  } catch {
    console.error("Помилка при видаленні контакту:", error);
    return null;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch {
    console.error("Помилка при додаванні контакту:", error);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
