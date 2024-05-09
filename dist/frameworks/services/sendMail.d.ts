import { ISendEmail } from "../../useCases/interface/services/sendMail";
export declare class SendMail implements ISendEmail {
    private transporter;
    constructor();
    sendEmail(name: string, email: string, password: string): Promise<{
        success: boolean;
    }>;
}
