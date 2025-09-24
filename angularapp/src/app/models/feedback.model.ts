export interface Feedback{
    feedbackId?:number;
    userId:number;
    wifiSchemeId:number;
    category?:string;
    feedbackText?:string;
    date?:Date;
    user?: {
        userId: number;
        username: string;
        email?: string;
        mobileNumber?: string;
        userRole?: string;
      };
    wifiScheme?:{
        wifiSchemeId?:number;
        schemeName?:string;
        description?:string;
        region?:string;
        speed?:string;
        dataLimit?:string;
        fee?:number;
        availabilityStatus?:string;
    }
}