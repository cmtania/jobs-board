export class BaseModel {
    CreatedDate: string = this.getCreateDate();
    CreatedBy: string= "";
    UpdatedBy: string = "";
    UpdatedDate: string ="";
    Purge: string = "N";

    getCreateDate(){
        return new Date().toISOString();
    }
}



