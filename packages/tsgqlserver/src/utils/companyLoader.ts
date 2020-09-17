import DataLoader from "dataloader";
import { In } from "typeorm";
import { Company } from "../entity/Company";
import { EmployeeEmployer } from "../entity/EmployeeEmployer";

const batchCompanies = async (userIds: readonly number[]) => {
  const employeeEmployer = await EmployeeEmployer.find({
    join: {
      alias: "employeeEmployer",
      innerJoinAndSelect: {
        company: "employeeEmployer.company",
      },
    },
    where: {
      userId: In([userIds]),
    },
  });

  const userIdToCompanies: { [key: number]: Company[] } = [];

  employeeEmployer.forEach((ee) => {
    if (ee.userId in userIdToCompanies) {
      userIdToCompanies[ee.userId].push((ee as any).__company__);
    } else {
      userIdToCompanies[ee.userId] = [(ee as any).__company__];
    }
  });
  return userIds.map((userId) => userIdToCompanies[userId]);
};

export const createCompaniesLoader = () => new DataLoader(batchCompanies);
