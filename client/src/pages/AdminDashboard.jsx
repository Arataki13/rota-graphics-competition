import React, { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Download, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data } = await api.get('/admin/submissions');
      setSubmissions(data);
    } catch (err) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/submissions/${id}/status`, { status });
      toast.success(`Submission marked as ${status}`);
      fetchSubmissions();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const deleteSubmission = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await api.delete(`/admin/submissions/${id}`);
        toast.success('Submission deleted');
        fetchSubmissions();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  if (loading) return <div className="min-h-[60vh] flex justify-center items-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <div className="text-sm font-medium text-slate-500">
          Total Submissions: {submissions.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">University Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Design</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {submissions.map((sub) => (
                <tr key={sub._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-900">{sub.fullName}</div>
                    <div className="text-sm text-slate-500">{sub.email}</div>
                    <div className="text-sm text-slate-500">{sub.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{sub.university}</div>
                    <div className="text-sm text-slate-500">{sub.faculty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                      sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                      sub.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={sub.designUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-indigo-900 inline-flex items-center gap-1 text-sm font-medium">
                      <Download className="w-4 h-4" /> View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 text-slate-400">
                      {sub.status !== 'approved' && (
                        <button onClick={() => updateStatus(sub._id, 'approved')} className="text-green-600 hover:bg-green-50 p-1.5 rounded-md" title="Approve">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {sub.status !== 'rejected' && (
                        <button onClick={() => updateStatus(sub._id, 'rejected')} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md" title="Reject">
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                      <div className="w-px h-6 bg-slate-200 mx-1"></div>
                      <button onClick={() => deleteSubmission(sub._id)} className="text-slate-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {submissions.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No submissions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
