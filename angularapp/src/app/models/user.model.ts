export class User {
    userId?: number;
    email: string;
    password: string;
    username: string;
    mobileNumber: string;
    userRole: string;
  
    constructor() {
      this.email = '';
      this.password = '';
      this.username = '';
      this.mobileNumber = '';
      this.userRole = '';
    }
  }