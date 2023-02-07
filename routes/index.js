var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

const { v4: uuidv4 } = require('uuid');
const Task = require('../models/taskModel');

var taskModel = require('../models/taskModel');

console.log(uuidv4());
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ "\n" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let tasks = [
  {
    id: uuidv4(),
    createdAt: date,
    title: "pizza",
    description: "21 people...",
  
  },
];

/* GET home page. */
router.get('/', function(req, res) {
 
Task.find().then((tasks) =>{
  res.render('index' ,{tasks})
}
)
.catch((err) =>{
  res.send(err)
})


 
  // res.render('index', { tasks:tasks})
});

/* post / save page. */
router.post('/save', function(req, res) {
  // let title =req.body.title;
  // let description= req.body.description;
  let {title, description } = req.body;

  if(title.length<4 || description.length<10){
res.send(
  "<h1> Description aur task zyada likho</h1><a href='/'> Back</a>"
)

  }
  else{


Task.create({title, description})
.then(()=> {
  res.redirect("/")
}).catch((err) =>{
  res.send(err);
})


  // let newTask = {
  //   id: uuidv4(),
  //   createdAt:date,
  //   title,
  //  description
  // };
// tasks.push(newTask);

  // res.send (req.body);
}
});





/* get / more/:id page. */
router.get('/more/:id', function(req, res) {
  
  // var filteredTasks= tasks.filter(function (task){
  //   return req.params.id === task.id;
  // });

Task.findById(req.params.id).then((task) =>{ res.render("edit" , {tasks})
})
.catch((err) => res.send(err));
});

//   res.render("more", {task: filteredTasks[0]});
//   // console.log(filteredTask);
// });

/* post / update/:id page. */
router.post('/update/:id', function(req, res) {
const {id} = req.params;
const idx = tasks.findIndex(function (task){
    return id === task.id;
});
tasks[idx] = {...tasks[idx],...req.body};
res.redirect("/")
});
/* get / delete/:id page. */
router.get('/delete/:id', function(req, res) {
Task.findByIdAndDelete(req.params.id).then(
  ()=>{
    res.redirect("/")
  }
)
.catch((err ) => res.send(err));

  // var filteredTasks= tasks.filter(function (task){
  //   return req.params.id !== task.id;
  // });
  // tasks= filteredTasks;




  res.redirect("/")
  });
module.exports = router;
