// Frontend API client to communicate with CyberGuardian MySQL backend

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
    this.isDbConnected = false;
    this.dbDetails = null;
  }

  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.isDbConnected = data.database?.success || false;
      this.dbDetails = data.database;
      return data;
    } catch (err) {
      this.isDbConnected = false;
      this.dbDetails = { error: err.message };
      return { status: 'OFFLINE', database: { success: false, error: err.message } };
    }
  }

  async getDbStats() {
    try {
      const res = await fetch(`${this.baseUrl}/db/status`);
      return await res.json();
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  _headers() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('cg_token');
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  _storeSession(data) {
    if (data?.token) localStorage.setItem('cg_token', data.token);
    return data;
  }

  async login(email, password) {
    try {
      const res = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return this._storeSession(await res.json());
    } catch (err) {
      console.warn('Backend offline, using fallback auth:', err);
      return null;
    }
  }

  async register(email, password, callsign, tier) {
    try {
      const res = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, callsign, tier })
      });
      return this._storeSession(await res.json());
    } catch (err) {
      console.warn('Backend offline, fallback:', err);
      return null;
    }
  }

  async getUserProfile(userId) {
    try {
      const res = await fetch(`${this.baseUrl}/user/profile/${userId}`);
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async updateUserProfile(userId, profileData) {
    try {
      const res = await fetch(`${this.baseUrl}/user/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async getCourses() {
    try {
      const res = await fetch(`${this.baseUrl}/courses`);
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async recordTaskXP(userId, xpGained = 100) {
    try {
      const res = await fetch(`${this.baseUrl}/progress/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, xpGained })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async completeModule(userId, courseId, moduleId) {
    try {
      const res = await fetch(`${this.baseUrl}/progress/module`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId, moduleId })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async recordQuiz(userId, courseId, moduleId, correct) {
    try {
      const res = await fetch(`${this.baseUrl}/progress/quiz`, {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({ userId, courseId, moduleId, correct })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async askMentor({ message, moduleTitle, taskText, taskHint }) {
    try {
      const res = await fetch(`${this.baseUrl}/mentor/chat`, {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({ message, moduleTitle, taskText, taskHint })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      return null;
    }
  }

  async logLabCommand(userId, command, exitCode = 0, cwd = '/home/student', success = true, output = '') {
    try {
      await fetch(`${this.baseUrl}/lab/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, command, exitCode, cwd, success, output })
      });
    } catch (err) {
      // Non-blocking log
    }
  }
}

export const api = new ApiService();
export default api;
