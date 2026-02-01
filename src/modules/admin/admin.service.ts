import { prisma } from "../../lib/prisma"; 

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    orderBy: { 
      createdAt: "desc" 
    },
  });
  return result;
};

const toggleUserStatusInDB = async (id: string) => {
  const user = await prisma.user.findUnique({ 
    where: { id } 
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";

  const result = await prisma.user.update({
    where: { id },
    data: { status: newStatus },
  });
  
  return result;
};

export const AdminService = {
  getAllUsersFromDB,
  toggleUserStatusInDB,
};