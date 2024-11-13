export interface Employee {
    id?: number;
    name: string;
    role: string;
    startDate: Date;
    endDate?: Date;
  }

  export const roles = [
    {id: 1, name: 'Product Designer'},
    {id: 2, name: 'Flutter Developer'},
    {id: 3, name: 'QA Tester'},
    {id: 4, name: 'Product Owner'},
  ]