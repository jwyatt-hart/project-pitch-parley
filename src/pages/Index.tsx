
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProjectCard, { ProjectData } from '@/components/ProjectCard';
import CompanyDashboard from '@/components/CompanyDashboard';
import CharacterPortrait from '@/components/CharacterPortrait';
import DecisionControls from '@/components/DecisionControls';
import { useToast } from "@/hooks/use-toast";

// Mock data for initial company state
const initialCompanyState = {
  finances: 75000,
  reputation: 65,
  morale: 70,
  activeProjects: 2,
  companySize: 5,
};

// Mock data for sample projects
const sampleProjects: ProjectData[] = [
  {
    id: "P001",
    title: "E-commerce Website Redesign",
    client: {
      name: "Astra Global",
      reputation: 7,
    },
    complexity: 6,
    budget: 42000,
    deadline: 30,
    description: "Complete overhaul of our existing e-commerce platform with modern UI/UX design, improved performance, and mobile responsiveness. We need this done quickly to capture the upcoming holiday season traffic.",
  },
  {
    id: "P002",
    title: "Mobile App Development",
    client: {
      name: "TechStart Inc.",
      reputation: 4,
    },
    complexity: 8,
    budget: 85000,
    deadline: 60,
    description: "Develop a cross-platform mobile application for our inventory management system. The app must integrate with our existing ERP and include barcode scanning, real-time updates, and offline capabilities.",
  },
  {
    id: "P003",
    title: "Corporate Identity Rebrand",
    client: {
      name: "Novo Solutions",
      reputation: 9,
    },
    complexity: 4,
    budget: 28000,
    deadline: 45,
    description: "Comprehensive rebrand of our visual identity including logo redesign, brand guidelines, marketing collateral, and website update. We want a modern, professional look that reflects our innovative approach.",
  },
];

const Index = () => {
  const [companyState, setCompanyState] = useState(initialCompanyState);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);
  const [projectQueue, setProjectQueue] = useState<ProjectData[]>([]);
  const [isDecisionTime, setIsDecisionTime] = useState(false);
  const [day, setDay] = useState(1);
  const { toast } = useToast();

  // Initialize with a random project
  useEffect(() => {
    if (projectQueue.length === 0) {
      // In a real game, this would fetch from the server or generate dynamically
      setProjectQueue(sampleProjects);
    }
    
    if (!currentProject && projectQueue.length > 0) {
      const nextProject = projectQueue[0];
      setCurrentProject(nextProject);
      setProjectQueue(queue => queue.slice(1));
    }
  }, [currentProject, projectQueue]);

  // Handle project review completion
  const handleReviewComplete = () => {
    setIsDecisionTime(true);
    toast({
      title: "Review time's up!",
      description: "Make your decision quickly!",
      variant: "destructive",
    });
  };

  // Handle project decision
  const handleProjectDecision = (decision: 'approve' | 'reject') => {
    // Calculate effects on company metrics
    const updatedState = { ...companyState };
    
    if (decision === 'approve' && currentProject) {
      // Finance changes
      updatedState.finances += Math.round(currentProject.budget * 0.2); // 20% profit
      updatedState.activeProjects += 1;
      
      // Reputation effects based on complexity and completion success
      const successChance = (15 - currentProject.complexity) * 10; // Higher complexity = lower success chance
      const isSuccessful = Math.random() * 100 < successChance;
      
      if (isSuccessful) {
        updatedState.reputation = Math.min(100, updatedState.reputation + 5);
        updatedState.morale = Math.min(100, updatedState.morale + 3);
        
        toast({
          title: "Project Approved",
          description: `${currentProject.title} has been accepted. Team is excited to start!`,
          variant: "default",
        });
      } else {
        updatedState.reputation = Math.max(0, updatedState.reputation - 10);
        updatedState.morale = Math.max(0, updatedState.morale - 5);
        
        toast({
          title: "Project Approved but Risky",
          description: "The team is concerned about meeting the deadline.",
          // Fixed: Changed 'warning' to 'default' to match the allowed variants
          variant: "default",
        });
      }
    } else {
      // Reject project
      updatedState.reputation = Math.max(0, updatedState.reputation - 2);
      
      toast({
        title: "Project Rejected",
        description: `You've declined ${currentProject?.title}. Let's wait for new opportunities.`,
        variant: "default",
      });
    }
    
    // Update company state
    setCompanyState(updatedState);
    
    // Move to next project or day
    setCurrentProject(null);
    setIsDecisionTime(false);
    
    // Advance day (in a real game this would have more logic)
    setDay(day + 1);
  };

  // Get next project from queue
  const handleNextProject = () => {
    if (projectQueue.length > 0) {
      const nextProject = projectQueue[0];
      setCurrentProject(nextProject);
      setProjectQueue(queue => queue.slice(1));
    } else {
      toast({
        title: "End of Day",
        description: `Day ${day} is complete. No more projects to review.`,
        variant: "default",
      });
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="inline-block bg-corporate-100 dark:bg-corporate-800 rounded-lg px-3 py-1 text-sm text-corporate-600 dark:text-corporate-300 mb-2 animate-fade-in">
          Day {day}
        </div>
        <h2 className="text-2xl font-bold text-corporate-800 dark:text-corporate-100 mb-1 animate-fade-in">Project Review Dashboard</h2>
        <p className="text-corporate-500 dark:text-corporate-400 animate-fade-in">Evaluate incoming project requests and make strategic decisions.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {currentProject ? (
            <div className="animate-fade-in">
              <div className="mb-4">
                <CharacterPortrait 
                  name={currentProject.client.name + " Representative"}
                  role="Client"
                  mood={currentProject.client.reputation > 7 ? 'happy' : currentProject.client.reputation > 4 ? 'neutral' : 'stressed'}
                />
              </div>
              
              <ProjectCard 
                project={currentProject}
                reviewTime={40}
                onComplete={handleReviewComplete}
              />
              
              {isDecisionTime && (
                <div className="mt-4 animate-fade-in">
                  <DecisionControls 
                    onApprove={() => handleProjectDecision('approve')} 
                    onReject={() => handleProjectDecision('reject')} 
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-corporate-700 rounded-lg border border-corporate-200 dark:border-corporate-600 p-6 animate-fade-in">
              <p className="text-corporate-500 dark:text-corporate-400 mb-4">No active project to review</p>
              <button 
                onClick={handleNextProject}
                className="btn btn-primary"
                disabled={projectQueue.length === 0}
              >
                {projectQueue.length > 0 ? 'Get Next Project' : 'End Day'}
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <CompanyDashboard metrics={companyState} />
          
          <div className="dashboard-card animate-fade-in">
            <h3 className="text-lg font-semibold text-corporate-800 dark:text-corporate-100 mb-3">Project Queue</h3>
            
            {projectQueue.length > 0 ? (
              <div className="space-y-2">
                {projectQueue.map((project, index) => (
                  <div key={project.id} className="bg-corporate-100 dark:bg-corporate-800 p-3 rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-corporate-500 dark:text-corporate-400">{project.client.name}</p>
                    </div>
                    <div className="text-xs bg-corporate-200 dark:bg-corporate-700 px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-corporate-500 dark:text-corporate-400">
                <p>No more projects today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
