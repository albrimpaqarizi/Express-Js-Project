

const express = require('express');


//init instance app
const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//setup mongo db
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/root';
const ObjectId = require('mongodb').ObjectId;

MongoClient.connect(mongoUrl, function(err, db) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Database sucessfully connected!');
    
    todos = db.collection('todos');
});


//Create Routes

app.get('/', function(req, res){
    
    todos.find().toArray(function(err, docs){
        if(err){
            console.log(err);
            return;
        }
         res.render('index', {docs: docs});
    });
});


app.get('/todos/:id', function(req, res){
    
    todos.findOne({_id: ObjectId(req.params.id)}, function(err, doc) {
        if(err){
            console.log(err);
            return;
        }
        res.render('show', {doc: doc});
    });
});

app.post('/todos/add', function(req, res){
    
    todos.insert(req.body, function(err, result){
        if(err){
            console.log('/');
            return;
        }
        
    })
    res.redirect('/');
});



app.get('/todos/edit/:id', function(req, res){
    
    todos.findOne({_id: ObjectId (req.params.id)}, function(err, doc){
      if(err){
            console.log('/');
            return;
        } 
        res.render('edit', {doc: doc});
    });
    
});

app.post('/todos/update/:id', function(req, res) {
   todos.updateOne({_id: ObjectId(req.params.id)},
                   {$set: { nrRendor: req.body.nrRendor,
                           llojiProkurimit: req.body.llojiProkurimit,
                           aktivitetiProkurimit: req.body.aktivitetiProkurimit, 
                           dataInicimit: req.body.dataInicimit, 
                           dataPublikimit: req.body.dataPublikimit, 
                           dataNenshkrimit: req.body.dataNenshkrimit, 
                           dataPare: req.body.dataPare, 
                           dataDyte: req.body.dataDyte, 
                           dataPermbylljes: req.body.dataPermbylljes, 
                           qmimiKontrates: req.body.qmimiKontrates, 
                           qmimiTotal: req.body.qmimiTotal, 
                           emridheMbiemri: req.body.emridheMbiemri } },
                   function(err, result) {
                      if (err) {
                        console.log(err);
                        return;
                     }
                     res.redirect('/');
                  });
});


app.get('/todos/delete/:id', function(req, res) {
   todos.deleteOne({_id: ObjectId(req.params.id)}, function(err, result) {
                      if (err) {
                        console.log(err);
                        return;
                     }
                     res.redirect('/');
                  });
             });


app.listen(3000, function(){
    console.log('App running at port 3000');
});