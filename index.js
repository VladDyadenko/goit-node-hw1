const contacts = require("./contacts");
const argv = require("yargs").argv;

const invokAction = async ({ action, id, name, email, phone }) => {
  let result;

  switch (action) {
    case "list":
      result = await contacts.listContacts();
      console.log(result);
      break;
    case "get":
      result = await contacts.getContactById(id);
      console.log(result);
      break;
    case "remove":
      result = await contacts.removeContact(id);
      console.log(result);
      break;
    case "add":
      result = await contacts.addContact(name, email, phone);
      console.log(result);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokAction(argv);
