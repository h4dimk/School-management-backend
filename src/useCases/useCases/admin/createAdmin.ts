import { IAdmin } from "../../../entities/adminEntity";
import { IAdminRepository } from "../../interface/repository/adminRepository";

export const createAdmin = async (
    adminRepository: IAdminRepository,
    email: string,
    password: string
): Promise<void> => {
    try {
        // Check if admin already exists with the given email
        const existingAdmin = await adminRepository.findByEmail(email);
        if (existingAdmin) {
            throw new Error('Admin with this email already exists');
        }
        
        // Create the admin object
        const admin: IAdmin = { email, password };

        // Insert the admin data into the repository
        await adminRepository.create(admin);
    } catch (error) {
        console.error('Error creating admin:', error);
        throw new Error('Failed to create admin');
    }
};
