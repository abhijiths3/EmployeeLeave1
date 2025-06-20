import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService {
  private apiUrl='https://localhost:7225/api/Employee';
  private loginUrl='https://localhost:7225/api/Authorization/login';
  private apiUrl2='https://localhost:7225/api/Leavetype';
  private apiUrl3='https://localhost:7225/api/Department';
  private apiUrl4='https://localhost:7225/api/LeaveRequest/All Leave Requests';
  private apiUrl5='https://localhost:7225/api/LeaveRequest/ApproveRequest19'
  private apiUrl6='https://localhost:7225/api/Leavetype'
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

}