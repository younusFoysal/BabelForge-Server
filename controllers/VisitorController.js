var Crisp = require('crisp-api');
const { query } = require('express');
var CrispClient = new Crisp();

CrispClient.authenticateTier(
  'plugin',
  'a464a16f-ec8c-4c3e-a88e-9ee2c54f8d16',
  'ffeebb66ccb00fb2b3266d0428dd250c9d4d94bf6ffe000b36ea554c38638534'
);

const visitorsInfo = async (req, res) => {
  const visitorsInfo = {};

  const query = {
    metric: 'visitor_visit',
    type: 'total',
  };

  CrispClient.website
    .generateAnalytics('5808b502-a3b5-4da9-bf99-653712d4cf93', query)
    .then(function (totalVisit) {
      // visitorsInfo.totalVisits = totalVisit.total_visits;
      console.log(totalVisit);
      // res.send(visitorsInfo);
    })
    .catch(function (error) {
      console.error('Error:', error);
      //   res.status(500).send(error);
    });

  CrispClient.website
    .countVisitors('5808b502-a3b5-4da9-bf99-653712d4cf93')
    .then(function (visitor) {
      visitorsInfo.currentVisitors = visitor.count;
      visitorsInfo.activeVisitors = visitor.active;
      res.send(visitorsInfo);
    })
    .catch(function (error) {
      console.error('Error:', error);
      res.status(500).send(error);
    });
};

module.exports = { visitorsInfo };
