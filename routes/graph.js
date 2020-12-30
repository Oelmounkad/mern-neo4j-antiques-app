const express = require('express')

const router = express.Router()
var neo4j = require('neo4j-driver');//20.74.17.168
var driver = neo4j.driver('bolt://54.172.13.65:32824', neo4j.auth.basic('neo4j', 'cams-pushes-headers'));
//var session = driver.session();

router.get('/persons',async (req,res) => {
    const query = 
 /* `MATCH (n:Person)-[r]-(g) \
   with n, [type(r),g] as relative  \
   RETURN {root: n, relatives: collect(relative)} \
   LIMIT $limit`;*/
   `MATCH (n:Person) return n order by n.name`

const params = {"limit": 10};

let records = []
var session = driver.session();
    session.run(query, params)
    .then(function(result) {
      result.records.forEach(function(record) {
         console.log(record._fields[0]);
         records.push(record._fields[0])
      })
      res.json(records)
    })
    .catch(function(error) {
      console.log(error);
    });

})

// Add Person
router.post('/persons',async (req,res) => {
  const {name,gender,birth,death} = req.body

  const query = `Create(n:Person {name: "${name}", gender: "${gender}", birth: "${birth}",death: "${death}"})`


var session = driver.session();
  session.run(query)
  .then(res.send("Person added"))
  .catch(function(error) {
    console.log(error);
  });
  
})

router.get('/persons/:id',async (req,res) => {
  const query = `MATCH (n:Person) where id(n)=${req.params.id} return n`

const params = {"limit": 10};
var session = driver.session();
  session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
       console.log(record._fields[0]);
       res.json(record._fields[0])
    })
    
    
  })
  .catch(function(error) {
    console.log(error);
  });
  

  
})

router.delete('/persons/:id',async (req,res) => {
  const query = `MATCH (n:Person) where id(n)=${req.params.id} delete n`

var session = driver.session();
  session.run(query)
  .then(
    res.send("Person deleted")
  )
  .catch(function(error) {
    console.log(error);
  });

})


router.get('/groups/:id',async (req,res) => {
  const query = `MATCH (n:Group) where id(n)=${req.params.id} return n`

const params = {"limit": 10};
var session = driver.session();
  session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
       console.log(record._fields[0]);
       res.json(record._fields[0])
    })
    
    
  })
  .catch(function(error) {
    console.log(error);
  });
  
})
// group by id members
router.get('/groups/:id/members',async (req,res) => {
  const query = `MATCH (n:Group)<-[:WAS_MEMBER_IN]-(p:Person) where id(n)=${req.params.id} return p`

const params = {"limit": 10};
let members = []

var session = driver.session();
  session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
       console.log(record._fields[0]);
       members.push(record._fields[0])
    })
     res.json(members)
    
  })
  .catch(function(error) {
    console.log(error);
  });
  
})


// group by id processes / sub-processes / events
router.get('/groups/:id/processes',async (req,res) => {
  const query = `MATCH (g:Group) where id(g) = ${req.params.id}
  RETURN {
  processes: [(g)-[:DID_PROCESS]->(process) | 
      {
       node: process, 
       subprocesses: [(process)-[:SUB_PROCESS]->(sub) | 
            {node: sub, events: [(sub)-[:HAS_EVENT]->(event) | event]}
         ]
      }
    ]
  }`

const params = {"limit": 10};
//let records = []

var session = driver.session();
  session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
       console.log(record._fields);
      // records.push(record._fields) 
       res.json(record._fields) 
    })
    
    
  })
  .catch(function(error) {
    console.log(error);
  });
  
})

router.get('/persons/:id/groups',async (req,res) => {

/* getting groups of person(id) */
const query = `MATCH (n:Person)-[:WAS_MEMBER_IN]-> (g:Group) where id(n)=${req.params.id} return g order by g.label desc`

const params = {"limit": 10};
let groups = []
var session = driver.session();
  session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
       console.log(record._fields[0]);
       groups.push(record._fields[0])
    })
    res.json(groups)
  })
  .catch(function(error) {
    console.log(error);
  });
  
})

router.get('/persons/:id/names',async (req,res) => {

  /* getting names of person(id) */
  const query = `MATCH (p:Person) where id(p) = ${req.params.id}
  RETURN {
  names: [(p)-[:NAMED]->(name) | 
      {
       node: name, 
       sources: [(name)-[:ACCORDING_TO]->(source) | 
            {node: source}
         ]
      }
    ]
  }`
  
  const params = {"limit": 10};
  //let names = []
  var session = driver.session();
    session.run(query, params)
    .then(function(result) {
      result.records.forEach(function(record) {
         console.log(record._fields[0]);
         //names.push(record._fields[0])
         res.json(record._fields)
      })
      
    })
    .catch(function(error) {
      console.log(error);
    });
    
  })


router.get('/persons/byname/:name',async (req,res) => {
 /* `MATCH (p:Person) where p.name = "${req.params.name}" return p`*/
   const query =`MATCH (n:Person) where n.name =~ '.*(?i)${req.params.name}.*' return n order by n.name`
  const params = {"limit": 10};

  let records = []
  var session = driver.session();
  session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
       console.log(record._fields[0]);
       records.push(record._fields[0])
    })
    res.json(records)
  })
  .catch(function(error) {
    console.log(error);
  });

})


module.exports = router