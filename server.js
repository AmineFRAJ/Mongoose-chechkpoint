//require exxpress
const express = require("express");

//initialize express app
const app = express();

//use body-parser middleware to parse JSON request bodies
app.use(express.json());

//crete port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Create route
app.listen(PORT, (error) => {
  error
    ? console.log("error")
    : console.log(`the server is running at http://127.0.0.1:${PORT}`);
});

// Create a GET route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to our server</h1>");
});

//connect to DB
const connect = require("./connectDB/connectDB");
connect();

// require mongoose
const mongoose = require("mongoose");

// create a schema
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    favoriteFoods: [String],
  },
  {
    collection: "persons ",
    timestamps: true,
  }
);

// create the person model
const Person = mongoose.model("Person", personSchema);

// ************************************************create a new person with save *********************************
// const newPerson = {
//   name: "John Doe",
//   age: 30,
//   email: "john.doe@example.com",
//   favoriteFoods: ["Pizza", "Burger"],
// };
// //simple usage
// const createPerson = async (newPerson) => {
//   try {
//     const person = new Person(newPerson);
//     const savedPerson = await person.save();
//     console.log("person created successfully", savedPerson);
//   } catch (error) {
//     console.error("error saving person", error);
//   }
// };
// // createPerson(newPerson);

//***************************create Array of persson**********************************/
const arrofPerson = [
  {
    name: "John Doean",
    age: 30,
    email: "john.doe@example.com",
    favoriteFoods: ["Pizza", "Burger"],
  },
  {
    name: "John Doean",
    age: 30,
    email: "johna.doe@example.com",
    favoriteFoods: ["Pizza", "Burger"],
  },
  {
    name: "person1",
    age: 30,
    email: "jane.@example.com",
    favoriteFoods: ["Pizza", "Burger"],
  },
  {
    name: "person2",
    age: 30,
    email: "person2@example.com",
    favoriteFoods: ["Pizza", "Burger"],
  },
  {
    name: "person3",
    age: 30,
    email: "person3@example.com",
    favoriteFoods: ["Pizza", "Burger"],
  },
];
//simple usage
const createPersons = async (arrofPerson) => {
  try {
    //const person = new Person(newPerson);
    const savedPersons = await Person.insertMany(arrofPerson);
    console.log("array of person created successfully", savedPersons);
  } catch (error) {
    console.error("error saving array of persons", error);
  }
};
// createPersons(arrofPerson);

 //*************************find  all person**********************************
 const findAll= async () =>{
  try {
    const persons = await Person.find();
 
      console.log("Persons found",persons);
    
  } catch (error) {
    console.log(`Error saving persons `, error)
  }
 };
// findAll();

 //**********************find person by name ******************************
 const findPersonByName= async (name) =>{
  try {
    const persons = await Person.find({ name: name });
    if (persons.length > 0) {
      console.log(`People with name ${name} is found`,persons);
    }else {
      console.log(`People not found with name ${name}`);
    }
  } catch (error) {
    console.log(`Error ${name} not found`, error)
  }
 };
//  findPersonByName("person2");

 //**************************************find person by favoritefood ***************************
 const findPersonByFavoritFood= async (food) =>{
  try {
    const persons = await Person.find({ favoriteFoods: food });
    if (persons.length > 0) {
      console.log(`People with favorit food ${food} is found`,persons);
    }else {
      console.log(`People not found with favorite food ${food}`);
    }
  } catch (error) {
    console.log(`Error ${food} not found`, error)
  }
 };
//  findPersonByFavoritFood("Burger");


// ***************************find person by ID*******************************************
 
 const findPersonById= async (id) =>{
  try {
    const persons = await Person.findById(id);
 
      console.log("Person found",persons);
    
  } catch (error) {
    console.log(`Error can't found person with  ${id}  `, error)
  }
 };
//  findPersonById ('6694ee0e155112f0784fc14c');


//*****************************find By id and delete******************************** */
 const findPersonAndDeleteById= async (id) =>{
  try {
    const person = await Person.findByIdAndDelete(id);
    if (person) {
      console.log(`Person with id ${id} is deleted`,person);
    }else {
      console.log(`Person not found with id ${id}`);
    }
  } catch (error) {
    console.log(`Error can't found person with  ${id}  and can't delete it `, error)
  }
 };
//  findPersonAndDeleteById ('6694ee0e155112f0784fc14c');

 //***************************find by id and update************************* */
 const findPersonByIdAndUpdate = async (id, update) => {
  try {
    const person = await Person.findByIdAndUpdate(id, update, { new: true });

    if (person) {
      console.log("Person found and updated", person);
    } else {
      console.log(`No person found with id: ${id}`);
    }
  } catch (error) {
    console.log(`Error can't find or update person with id ${id}`, error);
  }
};

// const id = '6694ee0e155112f0784fc149';
// const update = { name: 'James Bond', age: 28 };  

// findPersonByIdAndUpdate(id, update);