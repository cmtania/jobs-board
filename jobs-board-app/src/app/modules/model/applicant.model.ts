import { BaseModel } from "./base.model";

export class ApplicantModel extends BaseModel {
    FirstName: string = "";
    MiddleName: string = "";
    LastName: string = "";
    Age: number = 0;
    Gender: string = ""
    Address: string = "";
    Email: string = "";
}