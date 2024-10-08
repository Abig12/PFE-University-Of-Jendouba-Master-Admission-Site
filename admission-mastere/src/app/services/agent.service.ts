import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private http: HttpClient) {}

  addagent(data: any) {
    return this.http.post('http://localhost:3000/agent/addagent', data);
  }

  getagents() {
    return this.http.get('http://localhost:3000/agent//getagent');
  }

  uptagent(
    user_id: any,
    data: {
      nom: string;
      prenom: string;
      email: string;
      telephone: number;
      passport_cin: string;
      sexe: string;
      etablissement: string;
    }
  ) {
    return this.http.patch(
      'http://localhost:3000/agent/updateagent/' + user_id,
      data
    );
  }

  delagent(user_id: any) {
    return this.http.delete(
      'http://localhost:3000/agent/deleteagent/' + user_id
    );
  }
}
