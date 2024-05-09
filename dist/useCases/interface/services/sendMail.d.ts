export interface ISendEmail {
    sendEmail(name: string, email: string, password: string): Promise<{
        success: boolean;
    }>;
}
