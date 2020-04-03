import { Employee, Cloth } from 'models';

export class EmployeeCloth
{
    employeeId: number;
    employee: Employee;

    clothId: number;
    cloth: Cloth;

    beginDate: Date | string | null;
    endDate: Date | string | null;
}
