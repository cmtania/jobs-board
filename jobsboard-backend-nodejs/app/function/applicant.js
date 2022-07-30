const fs = require('fs');

function getJobs() {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    var jobListDto = JSON.parse(jobDto);
    return jobListDto;
}

function getJob(jobId) {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    var jobListDto = JSON.parse(jobDto);
    let job = jobListDto.filter(i => i.JobId == jobId);
    return job[0];
}

function postApplicant(applicantData) {
    const applicantFileData = fs.readFileSync('./app/data/applicant-data.json');//use to test in index.js
    var applicantListDto = JSON.parse(applicantFileData);
    console.log(applicantListDto.length);
    if (applicantListDto.length == 0) {
        applicantData.ApplicantID = 1;
    } else {
        applicantListDto.sort((a, b) => (a.ApplicantID < b.ApplicantID) ? 1 : ((b.ApplicantID < a.ApplicantID) ? -1 : 0));
        applicantData.ApplicantID = +applicantListDto[0].ApplicantID + 1;
    }

    let newApplicant = [applicantData];
    let mergeData = [...applicantListDto, ...newApplicant];

    let finalData = JSON.stringify(mergeData);

    fs.writeFile("./app/data/applicant-data.json", finalData, (err) => {
        // Error checking
        if (err) throw err;
        console.log("New data added");
    });

    return "Success";
}

function putJob(jobVm, jobId) {
    const jobDto = fs.readFileSync('./app/data/main-data.json');//use to test in index.js
    var jobListDto = JSON.parse(jobDto);

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
    var jobListDto = JSON.parse(jobDto);

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
exports.postApplicant = postApplicant;
exports.putJob = putJob;
exports.purgeJob = purgeJob;