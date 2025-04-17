
import { useState, useEffect } from 'react';
import GeneratorForm from '@/components/GeneratorForm';
import Inbox from '@/components/Inbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateEmail } from '@/utils/generators';
import { Shield, Mail } from 'lucide-react';

const Index = () => {
  const [currentEmail, setCurrentEmail] = useState(() => generateEmail());
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white pb-16">
      {/* Header */}
      <header className="pt-16 pb-10 px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-purple-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">SecurePass</h1>
        <p className="mt-4 text-gray-300 max-w-md mx-auto">
          Generate secure random passwords and temporary email addresses for online protection
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 space-y-10 mt-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full max-w-3xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 bg-black/20 border border-white/10">
            <TabsTrigger value="generator" className="data-[state=active]:bg-purple-900/50">
              <Shield className="mr-2 h-4 w-4" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="inbox" className="data-[state=active]:bg-purple-900/50">
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="mt-6">
            <GeneratorForm onEmailGenerated={setCurrentEmail} />
          </TabsContent>
          
          <TabsContent value="inbox" className="mt-6">
            <Inbox email={currentEmail} />
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <section className="pt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Why Use SecurePass?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-transform hover:transform hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-gray-300 text-sm">
                Generate strong, unique passwords to protect your accounts from unauthorized access and data breaches.
              </p>
            </div>
            
            <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-transform hover:transform hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
              <p className="text-gray-300 text-sm">
                Use temporary email addresses to avoid spam and protect your primary email from marketing lists and data miners.
              </p>
            </div>
            
            <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-transform hover:transform hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-purple-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-300 text-sm">
                Generate secure credentials with one click and easily copy them to use anywhere. No complicated setup required.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 SecurePass. All rights reserved.</p>
          <p className="mt-2">This is a demo application - emails and inboxes are simulated for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
