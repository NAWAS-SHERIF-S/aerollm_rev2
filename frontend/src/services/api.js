const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error (${res.status}): ${errorText}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[AeroLLM API] Endpoint ${endpoint} unreachable:`, error.message);
    throw error;
  }
}

export const apiService = {
  // 1. Health status
  getHealth: async () => {
    try {
      return await fetchAPI('/api/health');
    } catch {
      return { backend: 'offline', novatrix: { status: 'offline' } };
    }
  },

  // 2. Main RAG Analysis API
  analyzeMaintenanceReport: async (reportText) => {
    return await fetchAPI('/api/maintenance/analyze', {
      method: 'POST',
      body: JSON.stringify({ report: reportText }),
    });
  },

  // RAG Direct Endpoints
  queryRAG: async (queryText) => {
    return await fetchAPI('/api/rag/query', {
      method: 'POST',
      body: JSON.stringify({ query: queryText }),
    });
  },

  getDebugRAG: async (queryText) => {
    return await fetchAPI(`/api/rag/debug?query=${encodeURIComponent(queryText)}`);
  },

  reindexRAG: async () => {
    return await fetchAPI('/api/rag/reindex', {
      method: 'POST',
    });
  },

  // 3. Maintenance History
  getMaintenanceHistory: async (aircraftFilter = '') => {
    try {
      const query = aircraftFilter ? `?aircraft=${encodeURIComponent(aircraftFilter)}` : '';
      return await fetchAPI(`/api/maintenance/history${query}`);
    } catch {
      return { records: [] };
    }
  },

  // 4. Single Maintenance Record
  getMaintenanceRecord: async (id) => {
    return await fetchAPI(`/api/maintenance/${id}`);
  },

  // 5. Aircraft Fleet
  getAircraftList: async () => {
    try {
      return await fetchAPI('/api/aircraft');
    } catch {
      return { aircraft: [] };
    }
  },

  // 6. Aircraft Details
  getAircraftDetails: async (id) => {
    return await fetchAPI(`/api/aircraft/${id}`);
  },

  // 7. Aircraft Maintenance History
  getAircraftMaintenance: async (id) => {
    return await fetchAPI(`/api/aircraft/${id}/maintenance`);
  },

  // 8. Dashboard Statistics
  getDashboardStats: async () => {
    try {
      return await fetchAPI('/api/dashboard/stats');
    } catch {
      return {
        total_aircraft: 5,
        active_aircraft: 3,
        aircraft_in_maintenance: 1,
        total_reports: 4,
        total_faults: 4,
        maintenance_actions: { REPLACED: 3, INSPECTED: 2, REPAIRED: 1, TESTED: 1 }
      };
    }
  },

  // 9. Faults / Issues List
  getFaults: async (aircraftFilter = '') => {
    try {
      const query = aircraftFilter ? `?aircraft=${encodeURIComponent(aircraftFilter)}` : '';
      return await fetchAPI(`/api/faults${query}`);
    } catch {
      return { faults: [] };
    }
  },

  // 10. Global Search
  search: async (query) => {
    try {
      return await fetchAPI(`/api/search?q=${encodeURIComponent(query)}`);
    } catch {
      return { query, results: [] };
    }
  },

  // 11. Reports List
  getReports: async (page = 1, limit = 10) => {
    try {
      return await fetchAPI(`/api/reports?page=${page}&limit=${limit}`);
    } catch {
      return { page: 1, limit, total: 0, total_pages: 1, reports: [] };
    }
  }
};
