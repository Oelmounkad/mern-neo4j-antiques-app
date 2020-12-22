const express = require('express')

const router = express.Router()
var neo4j = require('neo4j-driver');//20.74.17.168
var driver = neo4j.driver('bolt://20.74.17.168:7687', neo4j.auth.basic('neo4j', '37B9BECE2B'));
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