import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, getDocs, collection, query, where, serverTimestamp, addDoc } from 'firebase/firestore';
import { LogOut, X, Search, FileText, Phone, Mail, User as UserIcon, Calendar, BookOpen, GraduationCap, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function StudentPortal() {
  const { user, userRole, hasProfile, checkProfileExists, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Prefer not to say');
  const [classLevel, setClassLevel] = useState('11');
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());
  const [parentContact, setParentContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate('/');
      return;
    }

    if (hasProfile === null) {
      return; // Wait for the auth context to determine profile existence
    }

    const loadData = async () => {
      setLoading(true);
      if (hasProfile === false) {
        setLoading(false);
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, 'studentProfiles'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
      } catch (error) {
        console.error(error);
        handleFirestoreError(error, OperationType.LIST, 'studentProfiles');
      }
      setLoading(false);
    };

    loadData();
  }, [user, userRole, hasProfile, authLoading, navigate]);

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    try {
      setFormError('');
      const parentNumClean = parentContact.trim();
      const profileData = {
        ownerUid: user.uid,
        googleEmail: user.email || '',
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        dateOfBirth: dob,
        gender: gender,
        classLevel: classLevel,
        academicYear: academicYear,
        parentContactNumber: parentNumClean,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'studentProfiles', user.uid), profileData);
      
      // Trigger Welcome Email
      try {
        await addDoc(collection(db, 'mail'), {
          to: user.email,
          message: {
            subject: 'Welcome to Student Portal!',
            html: `
              <h2>Welcome, ${profileData.firstName}!</h2>
              <p>Your student profile has been successfully created.</p>
              <p><strong>Class:</strong> ${profileData.classLevel}</p>
              <p><strong>Academic Year:</strong> ${profileData.academicYear}</p>
              <br/>
              <p>You can now access exclusive study materials and schedules at the portal.</p>
            `
          }
        });
      } catch (mailError) {
        console.error("Failed to queue welcome email:", mailError);
        // Continue even if email queuing fails
      }

      await checkProfileExists(user.uid);
      
    } catch (error: any) {
      console.error(error);
      setFormError(error.message || 'Failed to save profile. Please try again.');
      handleFirestoreError(error, OperationType.CREATE, `studentProfiles/${user.uid}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (hasProfile === false) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4 py-12 relative z-0">
        <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
        <div className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative z-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display mb-2">Complete Your Profile</h2>
              <p className="text-muted text-sm">Please provide your details to access the portal.</p>
            </div>
            <button onClick={handleLogout} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition border border-white/5">
              <LogOut className="w-5 h-5 text-white/70" />
            </button>
          </div>
          
          <form onSubmit={handleSubmitProfile} className="space-y-6">
            {formError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm">
                {formError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">First Name</label>
                <input required value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">Last Name</label>
                <input required value={lastName} onChange={e => setLastName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">Date of Birth</label>
                <input required value={dob} onChange={e => setDob(e.target.value)} type="date" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">Gender</label>
                <select required value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition text-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">Class</label>
                <select required value={classLevel} onChange={e => setClassLevel(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition text-white">
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">Academic Year</label>
                <input required value={academicYear} onChange={e => setAcademicYear(e.target.value)} type="text" placeholder="e.g. 2026" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-2">Parents Contact Number</label>
              <input required value={parentContact} onChange={e => setParentContact(e.target.value)} type="tel" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-white/30 outline-none transition" />
            </div>

            <button 
              disabled={isSubmitting} 
              type="submit" 
              className="w-full py-4 mt-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter profiles
  const years = Array.from(new Set(profiles.map(p => p.academicYear))).sort().reverse();
  const filteredProfiles = profiles.filter(p => {
    const matchYear = selectedYear === 'All' || p.academicYear === selectedYear;
    const matchClass = selectedClass === 'All' || p.classLevel === selectedClass;
    const matchSearch = searchQuery === '' || p.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchYear && matchClass && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative z-0 pb-20">
      <div className="fixed inset-0 halftone-overlay opacity-10 pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
               <GraduationCap className="w-5 h-5 text-white" />
             </div>
             <div>
               <h1 className="font-display text-xl leading-tight">Student Portal</h1>
               <span className="text-xs text-muted font-mono">{userRole === 'admin' || userRole === 'teacher' ? 'Admin Access' : 'Student Access'}</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => navigate('/')} className="text-sm text-muted hover:text-white transition">Home</button>
             <button onClick={handleLogout} className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
               <LogOut className="w-4 h-4" />
             </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto w-full px-6 py-8 relative z-10 flex-1">
        
        <div className="mb-8 space-y-4">
          <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-white/30 outline-none transition text-base"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                <button onClick={() => setSelectedClass('All')} className={`px-4 py-2 rounded-lg text-sm transition ${selectedClass === 'All' ? 'bg-white text-black font-medium' : 'text-muted hover:text-white'}`}>All Classes</button>
                <button onClick={() => setSelectedClass('11')} className={`px-4 py-2 rounded-lg text-sm transition ${selectedClass === '11' ? 'bg-white text-black font-medium' : 'text-muted hover:text-white'}`}>Class 11</button>
                <button onClick={() => setSelectedClass('12')} className={`px-4 py-2 rounded-lg text-sm transition ${selectedClass === '12' ? 'bg-white text-black font-medium' : 'text-muted hover:text-white'}`}>Class 12</button>
              </div>

              <div className="flex flex-wrap gap-2 items-center text-sm">
                <span className="text-muted"><Filter className="w-4 h-4 inline mr-1"/> Year:</span>
                <button onClick={() => setSelectedYear('All')} className={`px-3 py-1.5 rounded-lg transition border ${selectedYear === 'All' ? 'bg-white/10 border-white/30 text-white' : 'border-transparent text-muted hover:bg-white/5'}`}>All</button>
                {years.map(y => (
                  <button key={y} onClick={() => setSelectedYear(y)} className={`px-3 py-1.5 rounded-lg transition border ${selectedYear === y ? 'bg-white/10 border-white/30 text-white' : 'border-transparent text-muted hover:bg-white/5'}`}>{y}</button>
                ))}
              </div>
            </div>
          </div>

        {filteredProfiles.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <UserIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-lg">No profiles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredProfiles.map((p, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  key={p.id}
                  onClick={() => setSelectedProfile(p)}
                  className="group cursor-pointer bg-[#111] hover:bg-[#1A1A1A] border border-white/10 hover:border-white/30 rounded-2xl p-5 transition-all duration-300 flex items-center gap-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-white font-medium text-lg">
                    {p.firstName[0]}{p.lastName[0]}
                  </div>
                  
                  <div className="flex-1 relative z-10 overflow-hidden">
                    <h3 className="font-semibold text-base truncate">{p.fullName}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted mt-1">
                       <span className="bg-white/10 px-2 py-0.5 rounded text-white font-mono">Cl {p.classLevel}</span>
                       <span>•</span>
                       <span>{p.academicYear}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Profile Detail Drawer/Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:justify-end sm:px-0">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedProfile(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />
             <motion.div
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative z-10 w-full max-w-md bg-[#111] h-full sm:h-auto sm:min-h-screen border-l border-white/10 shadow-2xl flex flex-col"
             >
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                  <h2 className="text-xl font-display">Student Profile</h2>
                  <button onClick={() => setSelectedProfile(null)} className="p-2 rounded-full hover:bg-white/10 transition">
                    <X className="w-5 h-5 text-white/60" />
                  </button>
                </div>
                
                <div className="p-8 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-5 mb-8">
                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-3xl font-display">
                        {selectedProfile.firstName[0]}{selectedProfile.lastName[0]}
                     </div>
                     <div>
                       <h3 className="text-2xl font-semibold mb-1">{selectedProfile.fullName}</h3>
                       <div className="text-muted text-sm flex gap-3">
                         <span className="bg-white/10 px-2 py-1 rounded-md text-white font-mono">Class {selectedProfile.classLevel}</span>
                         <span className="bg-white/10 px-2 py-1 rounded-md text-white font-mono">{selectedProfile.academicYear}</span>
                       </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div>
                       <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3 border-b border-white/10 pb-2">Personal Details</h4>
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <p className="text-xs text-muted mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> DOB</p>
                           <p className="text-sm">{selectedProfile.dateOfBirth}</p>
                         </div>
                         <div>
                           <p className="text-xs text-muted mb-1 flex items-center gap-1"><UserIcon className="w-3 h-3"/> Gender</p>
                           <p className="text-sm">{selectedProfile.gender}</p>
                         </div>
                       </div>
                     </div>
                     
                     <div>
                       <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3 border-b border-white/10 pb-2">Contact Info</h4>
                       <div className="space-y-4">
                         <div>
                           <p className="text-xs text-muted mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Google Email</p>
                           <p className="text-sm break-all">{selectedProfile.googleEmail}</p>
                         </div>
                         <div>
                           <p className="text-xs text-muted mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Parent's Contact</p>
                           <p className="text-sm font-mono">{selectedProfile.parentContactNumber}</p>
                         </div>
                       </div>
                     </div>

                  </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
