import { Injectable } from '@angular/core';
import { Company } from '../model/company.enum';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  getCompanyLogo(companyId: number): string {
    return Company[companyId].toLowerCase();
  }
}
