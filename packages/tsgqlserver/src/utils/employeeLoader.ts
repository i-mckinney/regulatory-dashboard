import { EmployeeEmployer } from "../entity/EmployeeEmployer";

const batchEmployers = async (userIds: number[]) => {
  const employeeEmployers = await EmployeeEmployer.find({
    join: {
      alias: "",
    },
  });
};
