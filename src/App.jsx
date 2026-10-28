import React, { useState, useMemo, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ALL_COURSES } from './data/courses';
import { VirtualFileSystem } from './services/vfs';
import api from './services/api';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CourseCatalog from './components/CourseCatalog';
import CadetProfile from './components/CadetProfile';
import LabView from './components/LabView';
import TheoryView from './components/TheoryView';
import CertificateModal from './components/CertificateModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'dashboard' | 'catalog' | 'profile' | 'lab'
  const [user, setUser] = useState(() => ({
    id: 1,
    name: 'Agent Neo',
    email: 'neo@cyberguard.academy',
    clearance: 'LEVEL 1 // CADET DEFENDER',
    tier: 'tier1',
    joinedDate: 'October 2026'
  }));
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [dbStatus, setDbStatus] = useState({ connected: false });

  const [vfs, setVfs] = useState(() => new VirtualFileSystem());
  const [activeCourseId, setActiveCourseId] = useState('course-linux-basics');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [taskStatus, setTaskStatus] = useState({});
  const [moduleCompletionStatus, setModuleCompletionStatus] = useState({});
  const [xp, setXp] = useState(850);
  const [certificateCourse, setCertificateCourse] = useState(null);
  const taskStatusRef = useRef({});

  // Check database health on initial load
  useEffect(() => {
    async function checkDb() {
      try {
        const res = await api.checkHealth();
        if (res.database && res.database.success) {
          setDbStatus({
            connected: true,
            version: res.database.version,
            database: res.database.database
          });
        } else {
          setDbStatus({ connected: false });
        }
      } catch (e) {
        setDbStatus({ connected: false });
      }
    }
    checkDb();
  }, []);

  useEffect(() => {
    if (!user?.id) return undefined;
    let cancelled = false;
    api.getUserProfile(user.id).then((profile) => {
      if (cancelled || !profile?.success) return;
      if (Array.isArray(profile.completedModules)) {
        const map = {};
        profile.completedModules.forEach((id) => {
          map[id] = true;
        });
        setModuleCompletionStatus((prev) => ({ ...map, ...prev }));
      }
      if (typeof profile.user?.xp === 'number') setXp(profile.user.xp);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const currentCourse = useMemo(() => {
    return ALL_COURSES.find(c => c.id === activeCourseId) || ALL_COURSES[0];
  }, [activeCourseId]);

  const currentModule = currentCourse.modules[activeModuleIndex];

  // Handle command execution from the terminal
  const handleCommandRun = (cmd, res) => {
    const playgrounds = Array.isArray(res.playgrounds) ? res.playgrounds : [];
    const event = {
      raw: cmd,
      command: cmd.trim().split(' ')[0],
      success: res.code === 0,
      output: res.output,
      cwd: vfs.cwd,
      vfs,
      playground: res.playground || playgrounds[0] || null,
      playgrounds
    };

    let newlyCompletedCount = 0;
    const updatedStatus = { ...taskStatusRef.current };

    // Asynchronously log command to MySQL audit trail
    api.logLabCommand(user?.id, cmd, res.code, vfs.cwd, res.code === 0, res.output);

    currentModule.tasks.forEach(task => {
      if (!updatedStatus[task.id]) {
        try {
          if (playgrounds.includes(task.id) || task.validate(event, vfs)) {
            updatedStatus[task.id] = true;
            newlyCompletedCount++;
          }
        } catch (e) {
          console.error('Validation error on task', task.id, e);
        }
      }
    });

    if (newlyCompletedCount > 0) {
      taskStatusRef.current = updatedStatus;
      setTaskStatus(updatedStatus);
      const gainedXP = newlyCompletedCount * 100;
      setXp(prev => prev + gainedXP);

      if (user?.id) {
        api.recordTaskXP(user.id, gainedXP);
      }

      // Check if all tasks in this module are now finished
      const allDone = currentModule.tasks.every(t => updatedStatus[t.id]);
      if (allDone && !moduleCompletionStatus[currentModule.id]) {
        const nextCompletion = { ...moduleCompletionStatus, [currentModule.id]: true };
        setModuleCompletionStatus(nextCompletion);
        if (currentCourse.modules.every((mod) => nextCompletion[mod.id])) {
          setCertificateCourse(currentCourse);
        }
        setXp(prev => prev + 250); // Completion bonus

        if (user?.id) {
          api.completeModule(user.id, currentCourse.id, currentModule.id);
        }

        // Confetti celebration
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#00ff9d', '#3b82f6', '#f59e0b']
        });
      }
    }
  };

  const handleResetLab = () => {
    const newVfs = new VirtualFileSystem();
    setVfs(newVfs);
    taskStatusRef.current = {};
    setTaskStatus({});
  };

  const handleQuizAnswer = (correct) => {
    if (correct) setXp((prev) => prev + 25);
    if (user?.id) {
      api.recordQuiz(user.id, currentCourse.id, currentModule.id, correct).then((result) => {
        if (typeof result?.xp === 'number') {
          setXp((prev) => Math.max(prev, result.xp));
        }
      });
    }
  };

  const completedBadgesCount = useMemo(() => {
    return Object.values(moduleCompletionStatus).filter(Boolean).length;
  }, [moduleCompletionStatus]);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (typeof userData?.xp === 'number') setXp(userData.xp);
    setIsAuthOpen(false);
    setCurrentPage('dashboard');
    // Refresh db status
    api.checkHealth().then(res => {
      if (res.database?.success) {
        setDbStatus({
          connected: true,
          version: res.database.version,
          database: res.database.database
        });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('cg_token');
    setUser(null);
    setCurrentPage('landing');
  };

  const handleLaunchLab = (moduleIdx = 0, courseId) => {
    if (courseId) setActiveCourseId(courseId);
    setActiveModuleIndex(moduleIdx);
    taskStatusRef.current = {};
    setTaskStatus({});
    setVfs(new VirtualFileSystem());
    setCurrentPage('lab');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-slate-950">
      {/* Global Navbar */}
      {currentPage !== 'lab' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          user={user}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          xp={xp}
          badgesCount={completedBadgesCount}
          dbStatus={dbStatus}
        />
      )}

      {/* Primary Page Router */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={(page) => setCurrentPage(page)}
            onOpenAuth={handleOpenAuth}
            user={user}
          />
        )}

        {currentPage === 'dashboard' && (
          <Dashboard
            user={user}
            xp={xp}
            moduleCompletionStatus={moduleCompletionStatus}
            onLaunchLab={handleLaunchLab}
            onSelectModule={(idx) => {
              setActiveModuleIndex(idx);
              setCurrentPage('lab');
            }}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {currentPage === 'catalog' && (
          <CourseCatalog
            onLaunchLab={handleLaunchLab}
            onSelectModule={(idx) => {
              setActiveModuleIndex(idx);
              setCurrentPage('lab');
            }}
            moduleCompletionStatus={moduleCompletionStatus}
          />
        )}

        {currentPage === 'profile' && (
          <CadetProfile
            user={user}
            xp={xp}
            moduleCompletionStatus={moduleCompletionStatus}
            onLaunchLab={handleLaunchLab}
            onOpenCertificate={setCertificateCourse}
          />
        )}

        {currentPage === 'theory' && (
          <TheoryView
            course={currentCourse}
            moduleIndex={activeModuleIndex}
            onStartPractice={() => setCurrentPage('lab')}
            onBackToDashboard={() => setCurrentPage('dashboard')}
            onSelectModule={setActiveModuleIndex}
            onQuizAnswer={handleQuizAnswer}
          />
        )}

        {currentPage === 'lab' && (
          <LabView
            course={currentCourse}
            activeModuleIndex={activeModuleIndex}
            onSelectModule={(idx) => setActiveModuleIndex(idx)}
            taskStatus={taskStatus}
            moduleCompletionStatus={moduleCompletionStatus}
            vfs={vfs}
            onCommandRun={handleCommandRun}
            onBackToDashboard={() => setCurrentPage('dashboard')}
            onResetLab={handleResetLab}
            onOpenTheory={() => setCurrentPage('theory')}
          />
        )}
      </main>

      <CertificateModal
        course={certificateCourse}
        user={user}
        onClose={() => setCertificateCourse(null)}
      />

      {/* Authentication & Clearance Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
