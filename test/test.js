const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}

// <-- FIN


//Test for All Colors

it('Should return all colors', () => {
  return chai.request(app)
    .get('/colors')
    .then((value) => {
      //Check if it's status 200
      expect(value).to.have.status(200);
      //Check if it's a json
      expect(value).to.be.json;
      //Check if the body is an object
      expect(value.body).to.be.an('object');
      //Check if the result is an array
      expect(value.body.results).to.be.an('array');
      //Check if the contents is correct
      expect(value.contents).to.be.true;
    })
});

//Test for bad request
it('Should return 404 request', () => {
  return chai.request(app)
    .get('/colors')
    .catch((value) => {
      expect(value).to.have.status(404);
    });
});

