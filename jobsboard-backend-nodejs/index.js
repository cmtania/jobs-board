
const jobFunction = require('./app/function/job.js');
const applicantFunction = require('./app/function/applicant.js')
const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
//console.log(JSON.stringify(jobList));

/*-------job API -------*/
app.get("/api/job", (req, res) => {
  const result = jobFunction.getJobs();
  res.json(result);
});

app.get("/api/job/:id", (req, res) => {
  let result = jobFunction.getJob(req.params.id);
  res.json(result);
});

app.post("/api/job", (req, res) => {
  console.log(req.body);
  const result = jobFunction.postJob(req.body);
  res.json(result);
});

app.put("/api/job/:id", (req, res) => {
  console.log(req.body);
  const result = jobFunction.putJob(req.body, req.params.id);
  res.json(result);
});

app.delete("/api/job/:id", (req, res) => {
  console.log(req.body);
  let result = jobFunction.purgeJob(req.params.id);
  res.json(result);
});


/*-------applicant API -------*/
app.post("/api/applicant", (req, res) => {
  console.log(req.body);
  const result = applicantFunction.postApplicant(req.body);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});