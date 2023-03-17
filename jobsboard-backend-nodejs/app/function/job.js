const fs = require('fs');

function getJobs() {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    let jobListDto = JSON.parse(jobDto);
    return jobListDto;
}

function getJob(jobId) {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    let jobListDto = JSON.parse(jobDto);
    let job = jobListDto.filter(i => i.JobId == jobId);
    return job[0];
}

function postJob(job) {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    let jobListDto = JSON.parse(jobDto);
    console.log(jobListDto.length);
    if (jobListDto.length == 0) {
        job.JobId = 1;
    } else {
        jobListDto.sort((a, b) => (a.JobId < b.JobId) ? 1 : ((b.JobId < a.JobId) ? -1 : 0));
        job.JobId = +jobListDto[0].JobId + 1;
    }

    let newJob = [job];
    let mergeData = [...jobListDto, ...newJob];

    let finalData = JSON.stringify(mergeData);

    fs.writeFile("./app/data/main-data.json", finalData, (err) => {
        // Error checking
        if (err) throw err;
        console.log("New data added");
    });

    return "Success";
}

function putJob(jobVm, jobId) {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    let jobListDto = JSON.parse(jobDto);

    let newJobList = jobListDto.filter(function (obj) {
        return obj.JobId !== +jobId;
    });
    let jobParse = [jobVm];
    let mergeData = [...newJobList, ...jobParse];
    let finalData = JSON.stringify(mergeData);
    fs.writeFile("./app/data/main-data.json", finalData, (err) => {
        // Error checking
        if (err) throw err;
        console.log("Updated");
    });

    return "Success";
}

function purgeJob(jobId) {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    let jobListDto = JSON.parse(jobDto);

    let newJobList = jobListDto.filter(function (obj) {
        return obj.JobId !== +jobId;
    });

    let finalData = JSON.stringify(newJobList);

    fs.writeFile("./app/data/main-data.json", finalData, (err) => {
        // Error checking
        if (err) throw err;
        console.log("Updated");
    });

    return "Success";
}

exports.getJobs = getJobs;
exports.getJob = getJob;
exports.postJob = postJob;
exports.putJob = putJob;
exports.purgeJob = purgeJob;