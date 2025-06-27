export class AddJob {
  static readonly type = '[Job] Add new job';
  constructor(public payload: any) {}
}

export class LoadJobs {
    static readonly type = '[Job] Load jobs';
    constructor(public payload: any) {}
  }

export class UpdateJob {
  static readonly type = '[Job] Hide';
  constructor(public payload: any) {}
}
