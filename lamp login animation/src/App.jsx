import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import './index.css';

// Fireflies (Jugnu) floating across the entire screen
const Fireflies = ({ isOn }) => {
  // Generate random wandering paths for each firefly
  const firefliesData = useMemo(() => {
    return [...Array(18)].map(() => {
      const xPath = [];
      const yPath = [];
      // Create 6 random waypoints across the screen
      for (let i = 0; i < 6; i++) {
        xPath.push(Math.floor(Math.random() * 100) + 'vw');
        yPath.push(Math.floor(Math.random() * 100) + 'vh');
      }
      // Loop back to the start smoothly
      xPath.push(xPath[0]);
      yPath.push(yPath[0]);
      
      return { 
        x: xPath, 
        y: yPath, 
        delay: Math.random() * 3, 
        duration: Math.random() * 30 + 35, // 35-65 seconds to complete full path (slower movement)
        size: Math.random() * 4 + 3 
      };
    });
  }, []);

  if (!isOn) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 15, overflow: 'hidden' }}>
      {firefliesData.map((data, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: data.x[0], 
            y: data.y[0],
            opacity: 0
          }}
          animate={{ 
            opacity: [0.4, 1, 0.7, 1, 0.5, 1], // Kept above 0.4 so they never fully disappear
            x: data.x,
            y: data.y
          }}
          transition={{
            duration: data.duration,
            repeat: Infinity,
            delay: data.delay,
            ease: "easeInOut",
            opacity: {
              duration: 3, // Flicker opacity every 3 seconds independently
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: data.size,
            height: data.size,
            backgroundColor: '#FFEA00', // Yellow firefly color
            borderRadius: '50%',
            boxShadow: '0 0 10px 3px rgba(255, 234, 0, 0.9), 0 0 20px rgba(255, 179, 0, 0.6)'
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [isOn, setIsOn] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const d = useTransform([x, y], ([latestX, latestY]) => {
    return `M 0 0 L ${latestX} ${80 + latestY}`;
  });

  const handleDragEnd = (event, info) => {
    // If pulled down far enough, toggle the lamp
    if (info.offset.y > 30) {
      setIsOn(prev => !prev);
    }
  };

  return (
    <div className={`room ${isOn ? 'on' : ''}`} style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      backgroundColor: isOn ? '#111' : '#050505',
      transition: 'background-color 0.8s ease',
      overflow: 'hidden'
    }}>
      {/* Background Room Lighting Effect */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isOn ? 1 : 0,
          scale: isOn ? 1.5 : 0.5
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '-30%',
          left: '0%',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(255, 220, 100, 0.15) 0%, rgba(255, 214, 0, 0.05) 30%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Fireflies (Jugnu) */}
      <Fireflies isOn={isOn} />

      {/* Left side: Lamp */}
      <div style={{ 
        flex: 1, 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5 
      }}>
        {/* Lamp container */}
        <div className="lamp-container">
          <div className="lamp-glow"></div>
          <div className="lamp-head"></div>
          <div className="light-beam"></div>
          <div className="lamp-stem"></div>
          <div className="lamp-base"></div>
          <div className="desk-surface"></div>

          {/* Dynamic SVG for the realistic string line */}
          <svg style={{ position: 'absolute', top: 45, left: '50%', marginLeft: 55, width: 2, height: 2, overflow: 'visible', zIndex: 5, pointerEvents: 'none' }}>
            <motion.path
              d={d}
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Draggable Handle */}
          <motion.div
            className="string-handle"
            style={{
              position: 'absolute',
              top: 125, // 45 + 80
              left: '50%',
              marginLeft: 49, // 55 minus half handle width (10/2 = 5... wait 55 - 5 = 50, but original was 49. Keeping original 49)
              x,
              y,
              cursor: 'grab',
              zIndex: 6,
            }}
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={{ top: 0, bottom: 0.6, left: 0.3, right: 0.3 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 4 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
          />
        </div>
      </div>

      {/* Right side: Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, paddingRight: '10%' }}>
        <motion.div 
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={isOn ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: 50, filter: 'blur(10px)', pointerEvents: 'none' }}
          transition={{ duration: 0.6, delay: isOn ? 0.2 : 0, type: 'spring', stiffness: 100 }}
          className="glass"
          style={{
            padding: '48px',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '440px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Glass reflection highlight */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)' }} />

          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px', color: '#fff', letterSpacing: '-0.5px' }}>Welcome Back</h2>
            <p style={{ color: '#aaa', fontSize: '15px' }}>Enter your details to access your account</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Username Input */}
            <div style={{ position: 'relative' }}>
              <User size={20} color="#888" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Username" style={inputStyle} />
            </div>

            {/* Email Input */}
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="#888" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" placeholder="Email Address" style={inputStyle} />
            </div>

            {/* Password Input */}
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="#888" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="password" placeholder="Password" style={inputStyle} />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#ffdc64', color: '#000', boxShadow: '0 0 20px rgba(255,220,100,0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '16px',
              borderRadius: '16px',
              border: 'none',
              backgroundColor: '#ffd600',
              color: '#000',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'all 0.3s'
            }}
          >
            Sign In
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: '#888', fontSize: '13px', fontWeight: 500 }}>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              style={socialButtonStyle}
            >
              <GoogleIcon />
              Google
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              style={socialButtonStyle}
            >
              <GithubIcon />
              GitHub
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating text prompt if light is off */}
      <motion.div
        animate={{ opacity: isOn ? 0 : 1, y: isOn ? -20 : 0 }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '18%',
          transform: 'translateX(-50%)',
          color: '#555',
          fontSize: '18px',
          fontWeight: 500,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>Pull the string to turn on the login form</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, #555, transparent)' }}
        />
      </motion.div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '16px 16px 16px 48px',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  backgroundColor: 'rgba(0,0,0,0.4)',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.3s',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
};

const socialButtonStyle = {
  flex: 1,
  padding: '14px',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)',
  backgroundColor: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: '15px',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  transition: 'background-color 0.3s'
};

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.35H19.28C21.36 18.43 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.35L15.71 17.58C14.73 18.24 13.47 18.64 12 18.64C9.16 18.64 6.75 16.73 5.88 14.15H2.21V17C4.01 20.57 7.72 23 12 23Z" fill="#34A853"/>
    <path d="M5.88 14.15C5.66 13.49 5.53 12.77 5.53 12C5.53 11.23 5.66 10.51 5.88 9.85V7H2.21C1.47 8.47 1.05 10.17 1.05 12C1.05 13.83 1.47 15.53 2.21 17L5.88 14.15Z" fill="#FBBC05"/>
    <path d="M12 5.36C13.62 5.36 15.07 5.92 16.22 7.01L19.36 3.87C17.45 2.09 14.97 1 12 1C7.72 1 4.01 3.43 2.21 7L5.88 9.85C6.75 7.27 9.16 5.36 12 5.36Z" fill="#EA4335"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.49C9.339 21.582 9.52 21.273 9.52 21.008C9.52 20.77 9.511 20.148 9.506 19.308C6.727 19.911 6.14 17.965 6.14 17.965C5.686 16.812 5.032 16.505 5.032 16.505C4.126 15.886 5.101 15.899 5.101 15.899C6.104 15.969 6.631 16.929 6.631 16.929C7.522 18.456 8.966 18.016 9.539 17.761C9.629 17.11 9.891 16.671 10.181 16.422C7.964 16.169 5.632 15.312 5.632 11.478C5.632 10.386 6.022 9.492 6.657 8.791C6.555 8.539 6.216 7.525 6.755 6.146C6.755 6.146 7.59 5.879 9.502 7.172C10.294 6.952 11.15 6.843 12 6.839C12.85 6.843 13.706 6.952 14.499 7.172C16.41 5.879 17.244 6.146 17.244 6.146C17.784 7.525 17.445 8.539 17.343 8.791C17.98 9.492 18.367 10.386 18.367 11.478C18.367 15.324 16.031 16.165 13.808 16.411C14.17 16.723 14.492 17.337 14.492 18.283C14.492 19.64 14.48 20.732 14.48 21.008C14.48 21.276 14.66 21.588 15.168 21.488C19.138 20.163 22 16.416 22 12C22 6.477 17.523 2 12 2Z" fill="white"/>
  </svg>
);
