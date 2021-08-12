import { getLocaleDateFormat } from "@angular/common";

export class JobModel {
        JobId: number = 0;
        JobTitle: string = "";
        CompanyId: number = 0;
        CompanyName: string = "";
        JobDescription: string = ""
        JobType: string = "";
        Salary: string = "";
        CreatedDate: string = "";
        CreatedBy: string= "";
        UpdatedBy: string = "";
        UpdatedDate: string ="";
        Purge: string = "N";
}

export class NewEditJobModel {
        JobId: number = 0;
        JobTitle: string = "";
        CompanyId: number = undefined;
        JobDescription: string = ""
        JobType: string = "";
        Salary: string = "";
        CreatedDate: string = "";
        CreatedBy: string= "";
        UpdatedBy: string = "";
        UpdatedDate: string ="";
        Purge: string = "N";
}
