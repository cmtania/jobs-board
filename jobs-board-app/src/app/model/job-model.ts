import { getLocaleDateFormat } from "@angular/common";
import { BaseModel } from "./base.model";

export class JobModel extends BaseModel {
        JobId: number = 0;
        JobTitle: string = "";
        CompanyId: number = 0;
        CompanyName?: string = "";
        CompanyLogo?: string = "";
        JobDescription: string = ""
        JobType: string = "";
        Salary: string = "";
}
