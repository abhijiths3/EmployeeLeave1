
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {
  clearSession() {
    throw new Error('Method not implemented.');
  }
  private apiUrl='https://localhost:7225/api/Employee';
 
  private loginUrl='https://localhost:7225/api/Authorization/login';
  private apiUrl2='https://localhost:7225/api/Leavetype';
  private apiUrl3='https://localhost:7225/api/Department';
  private apiUrl4='https://localhost:7225/api/LeaveRequest/All Leave Requests';
  private apiUrl5='https://localhost:7225/api/LeaveRequest/ApproveRequest19'
  private apiUrl6='https://localhost:7225/api/Leavetype'
  private apiUrlReset='https://localhost:7225/api/Employee/ResetAnnualLeave';
  private apiUrlRegister='https://localhost:7225/api/Employee';
  constructor(private http:HttpClient) { }
  
  //Employee

  getUser(): Observable<any[]>{
   return this.http.get<any[]>(this.apiUrl,{
    withCredentials: true
   });
   
}
  authenticate(data: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, data,{
      withCredentials: true
    });
  }     

  
logOut():Observable<any>{
return this.http.post('https://localhost:7225/api/Authorization/logout',{},{
  withCredentials: true
});
}

//Type

 getType(): Observable<any[]>{
   return this.http.get<any[]>(this.apiUrl2,{
    withCredentials: true
   });
}
 getDepartment(): Observable<any[]>{
   return this.http.get<any[]>(this.apiUrl3,{
    withCredentials: true
   });
}

 getRequests(): Observable<any[]>{
   return this.http.get<any[]>(this.apiUrl4,{
    withCredentials: true
   });
}
// service: user-api-service.service.ts
acceptOrRejectRequest(requestId: number, status: 'Approved' | 'Rejected') {
  const payload = { status }; // Only status in body
  const apiUrl = `https://localhost:7225/api/LeaveRequest/ApproveRequest/${requestId}`;
  return this.http.put(apiUrl, payload, {
    withCredentials: true
  });
}
addLeaveType(data: { Type: string; Description?: string }): Observable<any> {
  return this.http.post(this.apiUrl6, data, {
    withCredentials: true
  });
}

anualReset():Observable<any>{
  return this.http.put(this.apiUrlReset,{},{
    withCredentials: true
  })
}

registerEmployee(employeeData: any): Observable<any> {
  return this.http.post(this.apiUrlRegister, employeeData, {
    withCredentials: true
  });
}
createLogin(login: any): Observable<any> {
  return this.http.post<any>('https://localhost:7225/api/Login', login);
}
submitLeave(LeaveRequest: any): Observable<any> {
  return this.http.post<any>('https://localhost:7225/api/LeaveRequest', LeaveRequest, {
    withCredentials: true
  });
}

getUserById(requestId: number) {
  const apiUrl = `https://localhost:7225/api/Employee/${requestId}`;
  return this.http.get(apiUrl,{
    withCredentials: true
  });
}
editProfile(requestId: number, data: { id: Number; EmployeeName: string; Age?: Number; Phone?: String; Email?: String;}): Observable<any> {
  console.log("Passed to backend",data);
  const apiUrl = `https://localhost:7225/api/Employee/${requestId}`;
  return this.http.put(apiUrl,data,{
    withCredentials: true
  })
}
}
