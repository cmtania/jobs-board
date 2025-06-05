export class BaseModel {
    CreatedDate: string = this.getCreateDate();
    CreatedBy: string= "";
    UpdatedBy: string = "";
    UpdatedDate: string ="";
    Purge: string = "N";

    getCreateDate(): string | undefined {
        return new Date().toISOString();
    }
}


