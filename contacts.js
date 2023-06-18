const fs = require("fs").promises;

const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  const foundContact =
    allContacts.find((contact) => contact.id === contactId) || null;
  return foundContact;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  const deletedIndex = allContacts.findIndex((contact) => contact.id === contactId);
  
   if (deletedIndex === -1) {
     return null;
  }
  const deletedContact = allContacts.splice(deletedIndex, 1)[0];
  return deletedContact;
}

function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
