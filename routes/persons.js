const express = require('express')

const router = express.Router()

const Person = require('../models/Person')
const Source = require('../models/Source')
const Version = require('../models/Version')
const Function = require('../models/Function')
const Name = require('../models/Name')
const Group = require('../models/Group')
const Process = require('../models/Process')
const Event = require('../models/Event')
const Activity = require('../models/Activity')
const Detail = require('../models/Detail')


// @route   GET api/persons
// @desc    
// @access  Public
router.get('/',async (req,res) => {
  
    const persons = await Person.find()
    .populate([
    {path: 'functions' , populate: {
      path: 'activities', populate: {
        path: 'versions', populate: {
          path: 'source'
        }
      }
    }},
    {path: 'names', populate:{
      path: 'source'
    }},
    {path: 'groups'
    ,populate: {
      path: 'members' , populate: {
        path: 'names' 
      }
    }
    ,populate: {
      path: 'processes' , populate:[ 
        {
        path: 'subprocesses' , populate: {
          path: 'events', populate: {
            path: 'versions', populate: {
              path: 'source'
            } 
          } 
        }
      },
      {path: 'events', populate: {
        path: 'versions', populate: {
          path: 'source'
        } 
      }},
      {path: 'details', populate: {
        path: 'source'
      }}
      ]
    },
    populate: {
      path: 'members',populate:{
        path: 'names'
      }
    }
  
  }
    ])

    if(!persons) {
        return res.status(404).send('No persons in the database !')
    }
    else{
        res.json(persons)
    }

})
   

// @route   GET api/persons
// @desc    
// @access  Public
router.get('/groups/:id',async (req,res) => {
  
  const group = await Group.findById(req.params.id)
  .populate([
  {path: 'members' , populate: {path: 'names'}},{path: 'processes', populate:{
    path: 'subprocesses', populate: {
      path: 'events'
    }
  }
}
  ])

  if(!group) {
      return res.status(404).send('Group doesnt exist !')
  }
  else{
      res.json(group)
  }

})

// @route   GET api/persons
// @desc    
// @access  Public

router.post('/',async (req,res) => {
  /*
  const source = new Source({
      livre: 'Livre Source 1',
      page: 55
    });
    
    source.save(function (err) {
      if (err) return handleError(err);
    
      const v1 = new Version({
        title: 'Version 1',
        source: source._id    // assign the _id from the person
      });
    
      v1.save();
    });
res.json(source)*/
  
})


module.exports = router