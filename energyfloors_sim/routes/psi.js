var express = require('express');
const fs = require("fs");
const debug = require("debug");
var router = express.Router();

/* GET psi listing. */
router.get('/ActualEFState', function(req, res, next) {
  let randEnergy = Math.random() * 30;
  return res.json({
    Energy: (randEnergy * 1000.0).toFixed(2),
    EnergyUnit: 'mWh',
    Power: (randEnergy / 3.6).toFixed(2),
    PowerUnit: 'mW',
    Timestamp: Date.now()
  });
});

router.get('/ActualWFState', function(req, res, next) {
  let state = false;
  fs.writeFile('/tmp/wf-state.json', JSON.stringify({wfState: !state}));
  fs.readFile('/tmp/wf-state.json', function(err, data) {
    state = JSON.parse(data).wfState;

    res.json({state});
  });
});

router.post('/triggerWFState', function (req, res,) {
  let state = false;
  fs.readFile('/tmp/wf-state.json', function(err, data) {
    state = JSON.parse(data).wfState;
    fs.writeFile('/tmp/wf-state.json', JSON.stringify({wfState: !state}));
  });
})

module.exports = router;
