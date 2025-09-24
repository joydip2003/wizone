export interface WifiSchemeRequest {
    wifiSchemeRequestId?: number;
    user?: {
      userId: number;
      username: string;
      email?: string;
      mobileNumber?: string;
      userRole?: string;
    };
    wifiScheme?: any;
    requestDate?: Date;
    status?: string;
    comments?: string;
    proof?: string;
    streetName?: string;
    landmark?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    preferredSetupDate?: Date;
    timeSlot?: string;
  }
  