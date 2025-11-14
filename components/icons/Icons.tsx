import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const WorkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></IconWrapper>
);
export const NegotiationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M2 12h2"/><path d="M20 12h2"/><path d="M16 12a4 4 0 0 0-8 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m19.07 4.93-.88.88a4 4 0 0 0-5.65 0l-.88-.88"/><path d="m4.93 19.07.88-.88a4 4 0 0 0 5.66 0l.88.88"/></IconWrapper>
);
export const AcademicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></IconWrapper>
);
export const TourismIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></IconWrapper>
);
export const DiningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M2 12h20"/><path d="M7 2v20"/><path d="M17 2v20"/></IconWrapper>
);
export const ShoppingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></IconWrapper>
);
export const EntertainmentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="m12 19 7-12 7 12Z"/><path d="m2 10 7-8 7 8"/><path d="M17 10h.01"/></IconWrapper>
);
export const CrisisIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></IconWrapper>
);
export const MedicalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/><path d="M9 12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3z"/><path d="M15 12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3z"/></IconWrapper>
);
export const SpeakerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></IconWrapper>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="m6 9 6 6 6-6"></path></IconWrapper>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="m15 18-6-6 6-6"></path></IconWrapper>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></IconWrapper>
);
