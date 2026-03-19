import React, { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-hot-toast';
import { UploadCloud, CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';

const StudentDashboard = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    university: '',
    faculty: '',
    email: '',
    phone: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchMySubmission();
  }, []);

  const fetchMySubmission = async () => {
    try {
      const { data } = await api.get('/submissions/me');
      setSubmission(data);
    } catch (err) {
      if (err.response?.status !== 404) {
        toast.error('Failed to load submission data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error('Please select a file to upload');
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('design', file);

    setSubmitting(true);
    try {
      await api.post('/submissions', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Design submitted successfully!');
      fetchMySubmission();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] flex justify-center items-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Student Dashboard</h1>

      {submission ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className={`p-3 rounded-full ${
              submission.status === 'approved' ? 'bg-green-100 text-green-600' : 
              submission.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {submission.status === 'approved' ? <CheckCircle className="w-8 h-8" /> : 
               submission.status === 'rejected' ? <AlertCircle className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Submission Status: <span className="capitalize">{submission.status}</span></h2>
              <p className="text-slate-500 mt-1">Submitted on {new Date(submission.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Participant Details</h3>
              <p className="font-medium text-slate-800">{submission.fullName}</p>
              <p className="text-slate-600">{submission.university} - {submission.faculty}</p>
              <p className="text-slate-600">{submission.email}</p>
              <p className="text-slate-600">{submission.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Uploaded Design</h3>
              <a href={submission.designUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                View Submitted File
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Submit your Design</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">University</label>
                <input type="text" name="university" required value={formData.university} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Faculty</label>
                <input type="text" name="faculty" required value={formData.faculty} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Upload Design (JPG, PNG, PDF | Max 5MB)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer bg-slate-50">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary hover:text-indigo-600 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {file ? <span className="font-semibold text-primary">{file.name}</span> : 'PNG, JPG, PDF up to 5MB'}
                  </p>
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting} className={`w-full py-3 px-4 bg-primary text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {submitting ? 'Uploading...' : 'Submit Design'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
