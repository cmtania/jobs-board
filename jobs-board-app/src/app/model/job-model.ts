import { getLocaleDateFormat } from "@angular/common";
import { BaseModel } from "./base.model";

export class JobModel extends BaseModel {
        JobId: number = 0;
        JobTitle: string = "";
        CompanyId: number = 0;
        CompanyName: string = "";
        JobDescription: string = ""
        JobType: string = "";
        Salary: string = "";
}

export class NewEditJobModel extends BaseModel {
        JobId: number = 0;
        JobTitle: string = "";
        CompanyId: number = undefined;
        JobDescription: string = ""
        JobType: string = "";
        Salary: string = "";
}
